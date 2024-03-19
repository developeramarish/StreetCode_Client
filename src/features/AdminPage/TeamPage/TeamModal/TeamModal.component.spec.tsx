import React, { MouseEventHandler, ReactNode } from 'react';
import {
    act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import matchMediaPolyfill, { Mock } from 'match-media-mock';
import { Form } from 'antd';

import * as PositionsApi from '@/app/api/team/positions.api';

import TeamModal from './TeamModal.component';
import TeamApi from '@/app/api/team/team.api';

const form = {
    setFieldsValue: jest.fn(),
    resetFields: jest.fn(),
    validateFields: jest.fn(),
    submit: jest.fn(),
};

const getImageAsFileInArray = jest.fn();

jest.mock('@/app/api/team/positions.api', () => ({
    getAll: jest.fn(() => Promise.resolve([
        { id: 1, position: 'Designer' },
        { id: 2, position: 'Developer' },
    ])),
}));

jest.mock('antd', () => {
    const originalAntd = jest.requireActual('antd');
    return {
        ...originalAntd,
        ...jest.requireActual('antd/es/form/Form'),
    };
});
const originalModule = jest.requireActual('antd');

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
    const mockAfterSubmit = jest.fn();
    const open = true;
    const setIsModalOpen = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });
    let file: File;

    // it.only('should render itself and its elements', () => {
    //     // eslint-disable-next-line max-len
    //     const { container, debug } = render(<TeamModal
    //         open={open}
    //         setIsModalOpen={setIsModalOpen}
    //         afterSubmit={mockAfterSubmit}
    //     />);

    //     debug();
    // });

    beforeEach(() => {
        file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should create a team member with required fields', async () => {
        render(<TeamModal open setIsModalOpen={() => {}} />);

        const inputElement = screen.getByTestId('surname-and-name-input');
        const fileInput = screen.getByTestId('file-input');
        const submitButton = screen.getByRole('button', { name: /зберегти/i });

        // const createTeamWithRequiredOnly: TeamMember = {
        //   id: 1,
        //   isMain: false,
        //   name: "John Doe",
        //   imageId: 0,
        //   teamMemberLinks: [],
        //   positions: [],
        // };

        // Simulate user interaction
        await waitFor(() => {
            userEvent.type(inputElement, 'John Doe');
            userEvent.upload(fileInput, file);
            userEvent.click(submitButton);
        });
        // Assert that the TeamApi.create method was called
        const fileinputElement = fileInput as HTMLInputElement;

        expect(inputElement).toHaveValue('John Doe');
        if (fileinputElement.files) {
            expect(fileinputElement.files[0]).toStrictEqual(file);
        } else {
            throw new Error('File input does not contain any files');
        }
        expect(TeamApi.create).toHaveBeenCalled();
    }, 10000);
    /*
        it('should create a team member with all possible fields', async () => {
            render(<TeamModal open setIsModalOpen={setIsModalOpen} afterSubmit={mockAfterSubmit} />);

            // Fill in all fields
            userEvent.type(screen.getByLabelText(/Прізвище та ім'я/i), 'John Doe');
            userEvent.type(screen.getByLabelText(/Позиції/i), 'Developer');
            userEvent.type(screen.getByLabelText(/Опис/i), 'Lorem ipsum');
            // Add social media link
            userEvent.selectOptions(screen.getByLabelText(/Соціальна мережа/i), 'LinkedIn');
            userEvent.type(screen.getByLabelText(/URL/i), 'https://www.linkedin.com/in/johndoe');

            // Click the submit button
            userEvent.click(screen.getByText(/Зберегти/i));

            // Wait for the API call to finish
            await waitFor(() => expect(mockAfterSubmit).toHaveBeenCalledWith(expect.any(Object)));

            // Assert that the afterSubmit function is called with the correct data
            expect(mockAfterSubmit).toHaveBeenCalledWith({
                id: 0,
                isMain: false,
                imageId: 0,
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
        });

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
