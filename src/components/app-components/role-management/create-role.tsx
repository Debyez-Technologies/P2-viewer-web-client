import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RoleForm } from "./role-form";
import { RoleFormData } from "@/types/roles";
import { useRoleStore } from "@/store/role-store";

interface CreateNewRoleProps {
    open: boolean;
    setOpen: (flag: boolean) => void;
    setFormData: (data: RoleFormData) => void
    formData: RoleFormData
}


export default function CreateNewRole({
    open, setOpen, setFormData, formData
}: CreateNewRoleProps) {
    const {createRole,getRoles} = useRoleStore()
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button
                variant="addNewBtn" className="shadow-btn-box-shadow"
                onClick={() =>
                    setFormData({
                        role_name: "",
                        description: "",
                        admin: false,
                    })
                }
            >
                + Create Role
            </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Create Role</DialogTitle>
            </DialogHeader>
            <RoleForm
                formData={formData}
                onChange={setFormData}
                onSubmit={async () => {
                    setOpen(false)
                    try {
                        await createRole(formData)
                    } catch (error) {
                        console.error("Error creating role")
                    }
                }}
                onCancel={() => setOpen(false)}
            />
        </DialogContent>
    </Dialog>
}