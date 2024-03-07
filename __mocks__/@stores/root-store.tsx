export const mockID = 1;
export const mockIsOpen = true;
export const mockSetModal = jest.fn();
export const mockUpdateNews = jest.fn();
export const mockCreateNews = jest.fn();
export const mockUpdateTeam = jest.fn();
export const mockCreateTeam = jest.fn();

export const useModalContext = () => ({
    modalStore: {
        setModal: mockSetModal,
        modalsState: {
            deleteStreetcode: {
                isOpen: mockIsOpen,
                fromCardId: mockID,
            },
        },
    },
});

export const useMobx = () => ({
    newsStore: {
        updateNews: mockUpdateNews,
        createNews: mockCreateNews,
        getNewsArray: [
            {
                id: 1,
                title: 'title',
                text: 'text',
                url: 'url',
                creationDate: '2024-01-29',
            },
        ],

        teamStore: {
            updateTeam: mockUpdateTeam,
            createTeam: mockCreateTeam,
            getTeamArray: [
                {
                    name: 'name',
                    imageId: 1,
                }],
        },
    },
});

export default useMobx;
