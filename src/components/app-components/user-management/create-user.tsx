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
import { Plus } from 'lucide-react';

interface CreateNewUserProps {
    open: boolean;
    setOpen: (flag: boolean) => void;
    setFormData: (User: UserFormValues) => void
    formData: UserFormValues
}

const initialFormState: UserFormValues = {
    full_name: "",
    email: "",
    password: "",
    roles: [],
    department: "",
    designation: "",
    profile_image: null,
};

export default function CreateNewUser({
    open, setOpen, setFormData, formData
}: CreateNewUserProps) {
    const createUser = useUserStore(state => state.createUser)
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button  variant="addNewBtn" className="shadow-btn-box-shadow"
                onClick={() =>
                    setFormData(initialFormState)
                }
            >
                 <Plus />
                 Create User
            </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Create User</DialogTitle>
            </DialogHeader>
            <UserForm
                editMode={false}
                formData={formData}
                onChange={setFormData}
                onSubmit={async () => {
                    setOpen(false)
                    try {
                        await createUser(formData)
                        // alert(JSON.stringify(formData) + "User created")
                    } catch (error) {
                        console.error("Error creating user")
                    }
                }}
                onCancel={() => setOpen(false)}
            />
        </DialogContent>
    </Dialog>
}