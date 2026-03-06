import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useUserStore } from "@/store/user-store";
import { RoleForm } from "./role-form";
import { RoleFormData } from "@/types/roles";
import { SquarePen } from "lucide-react";
import { useRoleStore } from "@/store/role-store";

interface CreateNewRoleProps {
    open: boolean;
    setOpen: (flag: boolean) => void;
    setFormData: (data: RoleFormData) => void
    formData: RoleFormData
}


export default function EditRole({
    open, setOpen, setFormData, formData
}: CreateNewRoleProps) {
    const editRole = useRoleStore(state => state.editRole)
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button
                variant="tableEdit"
            >
                <SquarePen className="text-green-600" />
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
                        await editRole(formData)
                        // alert(`Role data` + JSON.stringify(formData))
                    } catch (error) {
                        console.error("Error creating role")
                    }
                }}
                onCancel={() => setOpen(false)}
            />
        </DialogContent>
    </Dialog>
}