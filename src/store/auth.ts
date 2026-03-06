import { create } from "zustand";
import { AuthStore, LoginCredentials } from "../types/auth";
import axios from "axios";
import { API_BASE_URL } from "@/config/settings";

const useAuthStore = create<AuthStore>()((set) => {
    return {
        isAuthenticated: false,
        currentUser: undefined,
        isError: false,
        login: async (cred: LoginCredentials) => {

            set({
                isAuthenticated: false
            })

            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
                    email: cred.email,
                    password: cred.password
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const loginResponse = response.data

                localStorage.setItem(`token`,loginResponse.user.token)
                set({
                    currentUser: {
                        id: loginResponse.user.id,
                        email: loginResponse.user.email,
                        roles: loginResponse.user?.role.map(r => {
                            return {
                                id: r.id,
                                roleName: r.role_name,
                                description: r.description,
                                isAdmin: r.admin
                            }
                        }) ?? undefined,
                        profile: {
                            id: loginResponse.user.profile.id,
                            fullName: loginResponse.user.profile.full_name,
                            department: loginResponse.user.profile.department,
                            designation: loginResponse.user.profile?.designation,
                            profileImage:loginResponse.user.profile?.profile_image
                        }
                    },
                    isAuthenticated: loginResponse.isSuccess
                })
                set({
                    isError: false
                })
                return loginResponse.isSuccess
            } catch (error) {
                console.error(error, "Error logging in!!")
                set({
                    isError: true
                })
                return false
            }
        },
        verifyPassword: async (cred: LoginCredentials) => {
            try {
                const res = await axios.post(`${API_BASE_URL}/api/v1/auth/pass/verify`, {
                    email: cred.email,
                    password: cred.password
                })

                return res.data.verified
            } catch (error) {
                console.log("error logging in!!")
                return false
            }
        },

        logout: () => {
            set({
                currentUser: undefined,
                isAuthenticated: false
            })
        },
    }
})

export { useAuthStore }