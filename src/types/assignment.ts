import { Role, User } from "./user";

interface AssignmentStore {
    allUsers: User[]
    allRoles: Role[]

    isAddUserModalOpen: boolean
    activeProjectId: string
    assignedUserIdsForActiveProject: any
    refreshKey: number
    assignedUsers: User[]

    triggerRefresh: () => void;
    fetchAllUsersAndRoles: () => Promise<void>;
    openAddUserModal: (
        projectId: string,
        assignedUserIds?: any
    ) => void;
    fetchAssignedUsers: (id: string) => Promise<void>;
    assignUser: (publicationId: string, userID: string) => Promise<void>;
    closeAddUserModal: () => void;
    resetStore: () => void
}

export { AssignmentStore }