import { API_BASE_URL } from "@/config/settings";
import { UserFormValues, UserStore } from "@/types/user";
import axios from ".";
import { create } from "zustand";

const useUserStore = create<UserStore>((set, get) => ({

    usersList: [],
    user: undefined,


    getUsersList: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/users/`)
            const users = Array.isArray(response.data) ? response.data : []
            set({
                usersList: users.map(user => {
                    console.log(JSON.stringify(user), "user roles")
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
            })
        } catch (error) {
            console.log("Error reteriving user data!!", error)
        }
    },

    getUserById: async (id: string) => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/v1/users/${id}`)
            console.log(data, "userbyid")
            const user = data.user
            set({
                user: {
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
        } catch (error) {
            console.log("Error reteriving user data!!", error)
        }
    },

    createUser: async (data: UserFormValues) => {
        try {
            console.log(JSON.stringify(data), "user data")
            const response = await axios.post(`${API_BASE_URL}/api/v1/users/`, data);
            useUserStore.getState().getUsersList()
        } catch (error) {
            console.log(error, "create user error")
        }
    },

    updateUserPassword: async (data: {
        id: string,
        password: string
    }) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/api/v1/users/${data.id}/password`, {
                password_hash: data.password
            });
        } catch (error) {
            console.log(error, "create user error")
        }
    },

    updateUser: async (data: UserFormValues) => {
        try {
            console.log(JSON.stringify(data), "user data")
            const response = await axios.patch(`${API_BASE_URL}/api/v1/users/${data.id}`, data);
            useUserStore.getState().getUsersList()
        } catch (error) {
            console.log(error, "create user error")
        }
    },

    deleteUser: async (id: string) => {
        try {
            console.log("id type", typeof id)
            await axios.delete(`${API_BASE_URL}/api/v1/users/${id}`);
        } catch (error) {
            console.log(error, "delete user error")
        }
    },
    resetStore: () => {


        set({
            usersList: [],
            user: undefined,
        })
    }
}))

export { useUserStore }