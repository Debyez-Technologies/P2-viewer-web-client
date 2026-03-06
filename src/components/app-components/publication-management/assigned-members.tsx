import { DataTable } from "@/components/ui-components/table"
import { Button } from "@/components/ui/button"
import { useAssignmentStore } from "@/store/assignment-store"
import { Role, User } from "@/types/user"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect } from "react"
import AssignMemberForm from "./assign-memeber-form"
import { RoleV2 } from "@/types/roles"

interface AssignedMembersProps {
    publicationId: string
}

const columns: ColumnDef<User>[] = [

    {
        accessorKey: "Profile.full_name",
        header: "Full Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "Roles",
        header: "Role",
        cell: ({ row }) => {
            const roles = row.getValue<RoleV2[]>("Roles")

            return roles?.length
                ? roles.map(role => role.role_name).join(", ")
                : "-"
        }
    },
    {
        accessorKey: "Profile.department",
        header: "Department"
    },
    {
        accessorKey: "Profile.designation",
        header: "Designation"
    }]

export default function AssignedMembers({ publicationId }: AssignedMembersProps) {

    const { fetchAssignedUsers, assignedUsers } = useAssignmentStore()

    useEffect(() => {
        const getAssignedUsers = async () => {
            try {
                await fetchAssignedUsers(publicationId)
            } catch (error) {
                console.error(error)
            }
        }

        getAssignedUsers()
    }, [])

    console.log(assignedUsers, "assigned users")
    return <div className="flex flex-col w-full">
        {/* <h2 className="p-4 text-xl font-medium" >Assign Users to publication</h2> */}
        <DataTable columns={columns} data={assignedUsers ?? []} toolbarActions={<AssignMemberForm />} />
    </div>
}