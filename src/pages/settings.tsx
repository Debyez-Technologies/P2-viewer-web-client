import { ProfileForm } from "@/components/app-components/user-management/profile-form";
import { UserForm } from "@/components/app-components/user-management/user-form"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth"
import { useUserStore } from "@/store/user-store";
import { UserFormValues } from "@/types/user";
import { ChangeEvent, useEffect, useState } from "react";

function EditUserProfile({ handlePasswordChangeModal }: { handlePasswordChangeModal: (flag: boolean) => void }) {
  const currentUser = useAuthStore(s => s.currentUser)
  const { getUserById, user } = useUserStore()
  const updateUser = useUserStore(s => s.updateUser)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserById(currentUser.id)
      } catch (error) {
        console.error("Error retreiving user data", error)
      }
    }
    fetchData()
    console.log(user, "from user")
  }, [currentUser])

  const initialFormState: UserFormValues = {
    id: currentUser.id,
    full_name: currentUser.profile?.fullName,
    email: currentUser.email,
    password: "",
    roles: currentUser?.roles.map(role => role.id),
    department: currentUser?.profile?.department,
    designation: currentUser?.profile?.designation,
    profile_image: currentUser.profile.profileImage,
  };
  const [formData, setFormData] = useState<UserFormValues>(initialFormState)
  const handleUpdate = async () => {
    try {
      // alert(JSON.stringify(formData))
      await updateUser(formData)
    } catch (error) {
      console.error("Error creating user")
    }
  }

  return <div className="border pb-5 boder-md m-3 gap-y-3 rounded-md">
    <div className="border-b">
      <h1 className="m-5">Edit User profile</h1>
    </div>
    <div className="m-5">
      <ProfileForm editMode={true}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleUpdate}
        editRoles={false}
        disableCredential={true}
        openChangePasswordModal={handlePasswordChangeModal} />
    </div>
  </div>
}

interface ChangePasswordProps {
  isOpen: boolean
  handleOpen: (flag: boolean) => void
}

const ChangePassword = ({ isOpen, handleOpen }: ChangePasswordProps) => {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false)
  const [currentPassword, setCurrentPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const verifyPassword = useAuthStore(s => s.verifyPassword)
  const currentUser = useAuthStore(s => s.currentUser)
  const updatePassword = useUserStore(s => s.updateUserPassword)

  const resetState = () => {
    setIsPasswordCorrect(false)
    setCurrentPassword("")
    setNewPassword("")
    setError("")
  }

  const verifyPasswordTrue = async () => {
    if (!currentPassword) {
      setError("Please enter current password")
      return
    }

    try {
      setLoading(true)
      setError("")


      const isValid = await verifyPassword({
        email: currentUser.email,
        password: currentPassword,
      })

      if (!isValid) {
        setError("Incorrect password")
        return
      }

      setIsPasswordCorrect(true)
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const saveNewPassword = async () => {
    if (!newPassword) {
      setError("Please enter new password")
      return
    }

    try {
      setLoading(true)
      setError("")

      await updatePassword({
        id:currentUser.id,
        password: newPassword
      })

      handleOpen(false)
      resetState()
    } catch (err) {
      setError("Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (flag: boolean) => {
    if (!flag) resetState()
    handleOpen(flag)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal">
            {!isPasswordCorrect ? "Verify Password" : "Set New Password"}
          </DialogTitle>
        </DialogHeader>

        {!isPasswordCorrect ? (
          <>
            <Input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value)
                setError("")
              }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={verifyPasswordTrue} className="bg-viewer-core hover:bg-purple-800 text-white" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </>
        ) : (
          <>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
                setError("")
              }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={saveNewPassword} className="bg-viewer-core text-white" disabled={loading}>
              {loading ? "Saving..." : "Save Password"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function Settings() {
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] = useState<boolean>(false)

  const toggleChangePasswordModal = (flag: boolean) => {
    setIsOpenChangePasswordModal(flag)
  }

  return <div>
    <h1 className="text-center text-xl font-medium">Settings</h1>
    <EditUserProfile handlePasswordChangeModal={toggleChangePasswordModal} />
    <ChangePassword isOpen={isOpenChangePasswordModal} handleOpen={toggleChangePasswordModal} />
  </div>
}