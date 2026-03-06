import { create } from "zustand";
import axios from ".";
import { RoleStore } from "@/types/roles";
import { API_BASE_URL } from "@/config/settings";

const useRoleStore = create<RoleStore>((set, get) => ({
    roles: [],

    getRoles: async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/roles/`,
            );
            const rolesResponse: Array<any> = response.data;
            set({
                roles: rolesResponse.map((role) => {
                    return {
                        id: role.id,
                        description: role.description,
                        roleName: role.role_name,
                        isAdmin: role.admin,
                    };
                }),
            });
        } catch (error) {
            console.log("Error fetching roles", error);
        }
    },

    createRole: async (data) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/roles/`,
                data,
            );
            console.log("roles from database", response.data);
            set({
                roles: response.data,
            });
            useRoleStore.getState().getRoles();
        } catch (error) {
            console.log("Error creating roles", error);
        }
    },

    editRole: async (data) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/v1/roles/${data.id}`,
                data,
            );
            console.log(response);
            useRoleStore.getState().getRoles();
        } catch (error) {
            console.log("Error creating roles", error);
        }
    },

    deleteRole: async (id) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/api/v1/roles/${id}`,
            );
            useRoleStore.getState().getRoles();
        } catch (error) {
            console.log("Error deleting roles", error);
        }
    },
    resetStore: () => {
        set({
            roles: []
        })
    }
}));

export { useRoleStore };
