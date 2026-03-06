import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import axios from '.';
import { AssignmentStore } from '@/types/assignment';
import { API_BASE_URL } from '@/config/settings';

export const useAssignmentStore = create(
    immer<AssignmentStore>((set, get) => ({
        // State for all available users and roles to choose from
        allUsers: [],
        allRoles: [],

        // State for modals
        isAddUserModalOpen: false,
        activeProjectId: null, // Which project are we adding a user to?
        assignedUserIdsForActiveProject: [],
        refreshKey: 0,
        assignedUsers: [],

        // --- ACTIONS ---
        triggerRefresh: () => set(
            (state) => ({ refreshKey: state.refreshKey + 1 })
        ),

        // Fetch all users and roles once for the assignment modal
        fetchAllUsersAndRoles: async () => {
            try {
                const usersRes = await axios.get(`${API_BASE_URL}/api/v1/users/`)
                const rolesRes = await axios.get(`${API_BASE_URL}/api/v1/roles/`)

                const users = Array.isArray(usersRes.data) ? usersRes.data : []
                const roles = Array.isArray(rolesRes.data) ? rolesRes.data : []

                set(state => {
                    state.allUsers = users.map(user => {
                        return {
                            id: user.id,
                            email: user.email,
                            roles: user.Roles
                                ? user.Roles.map((r: any) => ({
                                    id: r.id,
                                    roleName: r.role_name,
                                    description: r.description,
                                    isAdmin: r.admin
                                }))
                                : [],
                            profile: {
                                id: user.Profile?.id,
                                fullName: user.Profile?.full_name,
                                designation: user.Profile?.designation,
                                department: user.Profile?.department,
                                profileImage: user.Profile?.profile_image
                            }
                        }

                    })
                    state.allRoles = roles;
                });
            } catch (err) {
                console.error("Failed to fetch users and roles:", err);
            }
        },

        openAddUserModal: (projectId, assignedUserIds = []) => {
            set(state => {
                state.isAddUserModalOpen = true;
                state.activeProjectId = projectId;
                state.assignedUserIdsForActiveProject = assignedUserIds;
            });
            // Fetch all users if they haven't been fetched yet.
            // This now only runs once per application lifecycle.
            get().fetchAllUsersAndRoles();
        },

        fetchAssignedUsers: async (id) => {
            try {

                const res = await axios.get(`${API_BASE_URL}/api/v1/publications/${id}/users`)
                set({
                    assignedUsers: res.data
                })
            } catch (err) {
                console.error("Failed to fetch users and roles:", err);
            }
        },

        assignUser: async (publicationId, userID) => {

            try {
                await axios.post(
                    `${API_BASE_URL}/api/v1/publications/${publicationId}/users`,
                    {
                        user_id: userID,
                    },
                );
                useAssignmentStore.getState().fetchAssignedUsers(publicationId)
            } catch (error) {
                console.error("error assigning user")
            }
        },
        closeAddUserModal: () => {
            set(state => {
                state.isAddUserModalOpen = false;
                state.activeProjectId = null;
            });
        },
        resetStore: () => {
            set({
                allUsers: [],
                allRoles: [],

                isAddUserModalOpen: false,
                activeProjectId: "",
                assignedUserIdsForActiveProject: null,
                refreshKey: 0,
                assignedUsers: []
            })
        }
    }))
);