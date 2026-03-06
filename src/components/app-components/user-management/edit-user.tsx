import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UserForm } from "./user-form";
import { useUserStore } from "@/store/user-store";
import { UserFormValues } from "@/types/user";
import { SquarePen } from 'lucide-react';

interface CreateNewUserProps {
    open: boolean;
    setOpen: (flag: boolean) => void;
    setFormData: (data: UserFormValues) => void
    formData: UserFormValues
}


export default function EditUser({
    open, setOpen, setFormData, formData
}: CreateNewUserProps) {
    const updateUser = useUserStore(state => state.updateUser)
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
                <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <UserForm
                editMode={true}
                formData={formData}
                onChange={setFormData}
                onSubmit={async () => {
                    setOpen(false)
                    try {
                        await updateUser(formData)
                    } catch (error) {
                        console.error("Error creating user")
                    }
                }}
                onCancel={() => setOpen(false)}
            />
        </DialogContent>
    </Dialog>
}