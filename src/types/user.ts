import { LoginCredentials } from "./auth"
import { Role } from "./roles"

interface User {
    id: string,
    email: string,
    roles: Role[] | undefined | null
    profile: Profile
}

type Profile = {
    id: string
    fullName: string,
    department: string,
    designation: string
    profileImage: string
}

type UsersResponse = {
    id: string,
    email: string,
    password_hash: string,
    assignments: any,
    roles: any,
}

interface UserFormValues {
    id?: string;
    full_name: string;
    email: string;
    password: string;
    roles: string[]; // Array of IDs, not objects
    department: string;
    designation: string;
    profile_image: string;
}

interface UserStore {
    user: User | undefined
    usersList: User[]

    getUserById: (id: string) => Promise<void>
    getUsersList: () => Promise<void>
    createUser: (data: UserFormValues) => Promise<void>;
    updateUser: (data: UserFormValues) => Promise<void>;
    updateUserPassword: (data: {
        id: string,
        password: string
    }) => Promise<void>;
    deleteUser: (id: string) => Promise<void>
    resetStore: () => void
}

export { UserStore, Role, User, UsersResponse, UserFormValues }