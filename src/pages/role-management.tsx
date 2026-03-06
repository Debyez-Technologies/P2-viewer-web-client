import { useEffect, useState } from "react";
import { DataTable } from "../components/ui-components/table";
import { useUserStore } from "../store/user-store";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import CreateNewUser from "@/components/app-components/user-management/create-user";
import { Role, RoleFormData } from "@/types/roles";
import { useRoleStore } from "@/store/role-store";
import CreateNewRole from "@/components/app-components/role-management/create-role";
import EditRole from "@/components/app-components/role-management/edit-role";
import { Trash } from "lucide-react";

const columns: ColumnDef<Role>[] = [
    {
        accessorKey: "roleName",
        header: "Role Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "isAdmin",
        header: "Admin",
    },
    {
        accessorKey: "Actions",
        header: "actions",
        cell: ({ row }) => {
            const data = row.original;
            const [open, setOpen] = useState<boolean>(false);
            const [formData, setFormData] = useState<RoleFormData>({
                id: data.id,
                role_name: data.roleName,
                description: data.description,
                admin: data.isAdmin,
            });
            const handleClose = (flag: boolean) => {
                setOpen(flag);
            };
            return (
                <div className="flex gap-4">
                    <EditRole
                        open={open}
                        setOpen={handleClose}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <Button variant="tabelDelete">
                        <Trash className="text-red-500" />
                    </Button>
                </div>
            );
        },
    },
];

export default function RoleManagement() {
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<RoleFormData>({
        role_name: "",
        description: "",
        admin: false,
    });

    const rolesList = useRoleStore((state) => state.roles);
    const getRoles = useRoleStore((state) => state.getRoles);
    const handleClose = (flag: boolean) => {
        setOpen(flag);
    };

    useEffect(() => {
        const fetchRoles = async () => {
            console.log("ffffffffffffffff");
            try {
                await getRoles();
            } catch (error) {
                console.error("Error fetching roles!");
            }
        };
        fetchRoles();
    }, []);

    return (
        <div>
            <h1 className="text-center text-xl font-medium">Role Management</h1>
            <DataTable
                columns={columns}
                data={rolesList}
                toolbarActions={
                    <CreateNewRole
                        open={open}
                        setFormData={setFormData}
                        formData={formData}
                        setOpen={handleClose}
                    />
                }
            />
        </div>
    );
}
