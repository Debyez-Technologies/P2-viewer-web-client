interface Role {
    id: string,
    roleName: string
    description: string
    isAdmin: boolean
}

interface RoleV2 {
    id: string,
    role_name: string
    description: string
    isAdmin: boolean
}

interface RolePayload {
    id?: string,
    roleName: string
    roleDescription: string
    admin: boolean
}

interface RoleStore {
    roles: Role[],

    getRoles: () => Promise<void>
    createRole: (data: RoleFormData) => Promise<void>
    editRole: (data: RoleFormData) => Promise<void>
    deleteRole: (id: string) => Promise<void>
    resetStore: () => void
}

type RoleFormData = {
    id?: string
    role_name: string
    description: string
    admin: boolean
}
export { Role, RoleStore, RoleFormData, RoleV2 }

