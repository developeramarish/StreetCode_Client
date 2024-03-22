import React, { createRef, MouseEventHandler, ReactNode } from 'react';
import {
    act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TeamApi from '@/app/api/team/team.api';
import Image, { ImageCreate } from '@/models/media/image.model';
import { TeamCreateUpdate } from '@/models/team/team.model';

import '@testing-library/jest-dom';

import TeamModal from './TeamModal.component';

global.HTMLCanvasElement.prototype.getContext = jest.fn(); // warning from FileUploader
global.URL.createObjectURL = jest.fn(); // error(?) from FileUploader

jest.mock('@/app/api/team/team.api', () => ({
    create: jest.fn(() => { }),
    update: jest.fn(() => { }),
}));

jest.mock('@/app/api/media/images.api', () => ({
    create: (image: ImageCreate) => (
        Promise.resolve({
            id: 999,
            base64: image.baseFormat,
            blobName: image.title,
            mimeType: image.mimeType,
        } as Image)
    ),
}));

jest.mock('@stores/root-store', () => ({
    __esModule: true, // This property is needed when mocking modules that have a default export
    default: () => ({
        teamStore: {
            fetchTeamAll: jest.fn().mockResolvedValue([]),
            TeamMap: new Map(),
            getTeamArray: [],
            setInternalMap: jest.fn(),
            createTeam: (team: TeamCreateUpdate) => {
                TeamApi.create(team);
            },
            updateTeam: (team: TeamCreateUpdate) => {
                TeamApi.update(team);
            },
        },
    }),
}));

jest.mock('@/app/api/team/positions.api', () => ({
    getAll: jest.fn(() => Promise.resolve([
        { id: 1, position: 'Designer' },
        { id: 2, position: 'Developer' },
    ])),
}));

jest.mock('@features/AdminPage/NewStreetcode/MainBlock/PreviewFileModal/PreviewFileModal.component', () => ({
    __esModule: true,
    default: () => <div data-testid="mockPreviewModal">Mock Preview Modal</div>,
}));

const mockTeamMember = {
    id: 1,
    isMain: false,
    imageId: 0,
    teamMemberLinks: [],
    name: 'Jane Doe',
    positions: [{ id: 1, position: 'Designer' }],
    description: 'Some description',
};

// const setIsModalOpen = jest.fn();

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener() { },
        removeListener() { },
    };
};

describe('TeamModal Component', () => {
    let file: File;
    const mockAfterSubmit = jest.fn();
    const open = true;
    const setIsModalOpen = jest.fn();
    const descriptionInputRef = createRef<HTMLTextAreaElement>();

    beforeEach(() => {
        file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // it.only('should render itself and its elements', () => {
    //     // eslint-disable-next-line max-len
    //     const { container } = render(<TeamModal
    //         open={open}
    //         setIsModalOpen={setIsModalOpen}
    //         afterSubmit={mockAfterSubmit}
    //     />);
    // });

    test.skip('should create a team member with required fields', async () => {
        // await act(async () => render(<TeamModal open={true} setIsModalOpen={() => {}} />));
        render(<TeamModal open setIsModalOpen={() => { }} />);

        const button = screen.getByRole('button', { name: /зберегти/i });
        const nameInput = screen.getByTestId('surname-and-name-input');
        const fileInput = screen.getByTestId('fileuploader');
        const inputElement = fileInput as HTMLInputElement;

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'something' } });
            fireEvent.change(fileInput, {
                target: { files: [file] },
            });
        });

        expect(nameInput).toHaveValue('something');
        if (inputElement.files) {
            // console.log(inputElement);
            // console.log(inputElement.files);
            //   console.log('file', file);
            expect(inputElement.files[0]).toStrictEqual(file);
        } else {
            throw new Error('File input does not contain any files');
        }

        expect(button).toBeEnabled();

        await act(async () => {
            await new Promise((r) => {
                setTimeout(r, 3000);
            });
        }); // "wait" for image

        await act(async () => {
            userEvent.click(button);
        });

        await waitFor(() => {
            expect(TeamApi.create).toHaveBeenCalled();
            expect(TeamApi.update).not.toHaveBeenCalled();
        });
    }, 100000000);

    test.only('should create a team member with all possible fields', async () => {
        render(<TeamModal open setIsModalOpen={setIsModalOpen} afterSubmit={mockAfterSubmit} />);

        const button = screen.getByRole('button', { name: /зберегти/i });
        const nameInput = screen.getByTestId('surname-and-name-input');
        const fileInput = screen.getByTestId('fileuploader');
        const inputElement = fileInput as HTMLInputElement;

        // Fill in all fields
        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        });
        const positionsSelect = screen.getByTestId('positions-select');
        console.log('positionsSelect', positionsSelect);
        userEvent.type(positionsSelect, 'Developer');
        const isDescriptionInputVisible = () => screen.queryByTestId('description-input');

        const descriptionInput = await waitFor(isDescriptionInputVisible);
        await act(async () => {
            if (descriptionInput) {
                fireEvent.change(descriptionInput, { target: { value: 'Lorem ipsum' } });
            }
        });
        console.log('descriptionInput', descriptionInput);

        const socialSelect = screen.getByTestId('social-select');
        userEvent.type(socialSelect, 'LinkedIn');

        const urlInput = screen.getByTestId('url-test-input');
        userEvent.type(urlInput, 'https://www.linkedin.com/in/johndoe');

        await act(async () => {
            fireEvent.change(fileInput, {
                target: { files: [file] },
            });
        });

        expect(nameInput).toHaveValue('John Doe');
        if (inputElement.files) {
            expect(inputElement.files[0]).toStrictEqual(file);
        } else {
            throw new Error('File input does not contain any files');
        }

        expect(button).toBeEnabled();

        await act(async () => {
            await new Promise((r) => {
                setTimeout(r, 3000);
            });
        }); // "wait" for image

        await act(async () => {
            userEvent.click(button);
        });

        await waitFor(() => expect(mockAfterSubmit).toHaveBeenCalledWith(expect.any(Object)));

        expect(mockAfterSubmit).toHaveBeenCalledWith({
            id: 0,
            isMain: false,
            imageId: 999,
            teamMemberLinks: [
                {
                    id: 0,
                    logoType: 4, // Assuming LinkedIn has the index 4 in your SOCIAL_OPTIONS
                    targetUrl: 'https://www.linkedin.com/in/johndoe',
                },
            ],
            name: 'John Doe',
            positions: [{ id: expect.any(Number), position: 'Developer' }],
            description: 'Lorem ipsum',
        });
    }, 100000000);
    /*
            it('should edit a team member', async () => {
                const originalTeamMember = {
                    id: 1,
                    isMain: false,
                    imageId: 0,
                    teamMemberLinks: [],
                    name: 'Jane Doe',
                    positions: [{ id: 1, position: 'Designer' }],
                    description: 'Some description',
                };

                render(
                    <TeamModal
                        open
                        setIsModalOpen={setIsModalOpen}
                        afterSubmit={mockAfterSubmit}
                        teamMember={originalTeamMember}
                    />,
                );

                // Change the name and position
                userEvent.clear(screen.getByLabelText(/Прізвище та ім'я/i));
                userEvent.type(screen.getByLabelText(/Прізвище та ім'я/i), 'Edited Jane Doe');
                userEvent.clear(screen.getByLabelText(/Позиції/i));
                userEvent.type(screen.getByLabelText(/Позиції/i), 'Lead Designer');

                // Click the submit button
                userEvent.click(screen.getByText(/Зберегти/i));

                // Wait for the API call to finish
                await waitFor(() => expect(mockAfterSubmit).toHaveBeenCalledWith(expect.any(Object)));

                // Assert that the afterSubmit function is called with the correct data
                expect(mockAfterSubmit).toHaveBeenCalledWith({
                    id: 1,
                    isMain: false,
                    imageId: 0,
                    teamMemberLinks: [],
                    name: 'Edited Jane Doe',
                    positions: [{ id: 1, position: 'Lead Designer' }],
                    description: 'Some description',
                });
            });

            it('should close the modal when clicking the close icon', async () => {
                render(
                    <TeamModal
                        open
                        setIsModalOpen={setIsModalOpen}
                        afterSubmit={mockAfterSubmit}
                        teamMember={mockTeamMember}
                    />,
                );

                // Click the close icon
                userEvent.click(screen.getByTestId('modal-close'));

                // Assert that setIsModalOpen is called with false
                expect(setIsModalOpen).toHaveBeenCalledWith(false);
            });

            it('should set form fields when team member is edited', async () => {
                // Arrange: Render your component, set up any necessary preconditions
                const teamMember = {
                    id: 1,
                    isMain: false,
                    imageId: 0,
                    teamMemberLinks: [],
                    name: 'Jane Doe',
                    positions: [{ id: 1, position: 'Designer' }],
                    description: 'Some description',
                };

                render(
                    <TeamModal
                        open
                        setIsModalOpen={setIsModalOpen}
                        afterSubmit={mockAfterSubmit}
                        teamMember={mockTeamMember}
                    />,
                );

                // Act: Simulate the user interactions that should result in a call to setFieldsValue
                // This could be filling out fields, clicking buttons, etc.
                userEvent.type(screen.getByLabelText(/Прізвище та ім'я/i), 'John Doe');
                userEvent.type(screen.getByLabelText(/Позиції/i), 'Developer');
                userEvent.type(screen.getByLabelText(/Опис/i), 'Lorem ipsum');
                userEvent.click(screen.getByText(/Зберегти/i));

                // Assert: Check that setFieldsValue was called with the expected arguments
                expect(form.setFieldsValue).toHaveBeenCalledWith({
                    ...teamMember,
                    positions: teamMember.positions.map((s) => s.position),
                    image: getImageAsFileInArray(),
                });
            });

            it('renders mock preview modal', () => {
                render(
                    <TeamModal
                        open
                        setIsModalOpen={setIsModalOpen}
                        afterSubmit={mockAfterSubmit}
                        teamMember={mockTeamMember}
                    />,
                );

                expect(screen.getByTestId('mockPreviewModal')).toBeInTheDocument();
            });
            */
});
