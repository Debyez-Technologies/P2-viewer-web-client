import { User } from "./user";


interface LoginCredentials {
    email: string,
    password: string
}

interface AuthStore {
    currentUser: User | undefined
    isAuthenticated: boolean,
    isError: boolean,
    login: (cred: LoginCredentials) => Promise<boolean>,
    verifyPassword: (cred: LoginCredentials) => Promise<boolean>
    logout: () => void;
}

export { AuthStore, LoginCredentials }