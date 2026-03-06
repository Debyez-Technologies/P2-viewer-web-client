import { useEffect, useState } from "react";
import { DataTable } from "../components/ui-components/table";
import { useUserStore } from "../store/user-store";
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table";
import { Role, User, UserFormValues } from "@/types/user";
import CreateNewUser from "@/components/app-components/user-management/create-user";
import EditUser from "@/components/app-components/user-management/edit-user";
import { Trash } from 'lucide-react';
import DeleteUser from "@/components/app-components/user-management/delete-user";


const columns: ColumnDef<User>[] = [
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "roles",
        header: "Role",
        cell: ({ row }) => {
            const roles = row.getValue<Role[]>("roles")

            return roles?.length
                ? roles.map(role => role.roleName).join(", ")
                : "-"
        }
    },
    {
        accessorKey: "profile.fullName",
        header: "Full Name"
    },
    {
        accessorKey: "profile.department",
        header: "Department"
    },
    {
        accessorKey: "profile.designation",
        header: "Designation"
    },
    {
        accessorKey: "Actions",
        header: "actions",
        cell: ({ row }) => {
            const data = row.original
            const [open, setOpen] = useState<boolean>(false)
            const [openDelete, setOpenDelete] = useState<boolean>(false)

            const initialFormState: UserFormValues = {
                id: data.id,
                full_name: data.profile?.fullName,
                email: data.email,
                password: "",
                roles: data?.roles.map(role => role.id),
                department: data.profile.department,
                designation: data.profile.designation,
                profile_image: "",
            };

            const [formData, setFormData] = useState<UserFormValues>(initialFormState)
            const handleClose = (flag: boolean) => {
                setOpen(flag)
            }
            return <div className="flex">
                <EditUser open={open} setOpen={handleClose} formData={formData} setFormData={setFormData} />
                <DeleteUser open={openDelete} setOpen={setOpenDelete} id={data.id} />
            </div>
        }
    }

]

const initialFormState: UserFormValues = {
    full_name: "",
    email: "",
    password: "",
    roles: [],
    department: "",
    designation: "",
    profile_image: null,
};

export default function UserManagement() {
    const { getUsersList } = useUserStore()
    const [open, setOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState<UserFormValues>(initialFormState)

    const usersList = useUserStore(state => state.usersList)
    const handleClose = (flag: boolean) => {
        setOpen(flag)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await getUsersList()
            } catch (error) {
                console.error("Error fetching users!")
            }
        }
        fetchUsers()
    }, [])

    console.log(usersList)
    return <div className="">
        <div>
            <h1 className="text-center text-xl font-medium">User Management</h1>
            <DataTable columns={columns} data={usersList} toolbarActions={<CreateNewUser open={open} setFormData={setFormData} formData={formData} setOpen={handleClose} />} />
        </div>
    </div>
}