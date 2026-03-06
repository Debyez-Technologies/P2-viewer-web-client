import FileInput from "@/components/ui-components/FileInput"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRoleStore } from "@/store/role-store"
import { UploadIcon } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

// Helper to convert file to Base64 (Go []byte expects Base64 string in JSON)
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            // Remove "data:*/*;base64," prefix for raw base64
            const result = reader.result as string
            const base64 = result.split(",")[1]
            resolve(base64)
        }
        reader.onerror = (error) => reject(error)
    })
}

type UserFormProps = {
    formData: {
        full_name: string
        email: string
        password: string
        roles: string[] // This is an array now
        department: string
        designation: string
        profile_image: string | null // Changed to string (Base64) for JSON compatibility
    }
    editMode: boolean
    onChange: (data: UserFormProps["formData"]) => void
    onSubmit: () => Promise<void>
    onCancel?: () => void
    openChangePasswordModal?: (flag: boolean) => void
    disableCredential?: boolean
    editRoles?: boolean
}

export function ProfileForm({
    formData,
    onChange,
    onSubmit,
    onCancel,
    editMode,
    openChangePasswordModal,
    disableCredential = false,
    editRoles = true
}: UserFormProps) {
    const { roles, getRoles } = useRoleStore()
    const [isUploaded, setIsUploaded] = useState<boolean>(false)
    const [isPfp, setPfp] = useState<string | undefined>(undefined)
    const inputRef = useRef(null)

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                await getRoles()
            } catch (error) {
                console.error("Error fetching roles!")
            }
        }
        setPfp(formData.profile_image)
        console.log(formData.profile_image, "image")
        fetchRoles()
    }, [])

    // Handle checking/unchecking roles
    const handleRoleToggle = (roleId: string, checked: boolean) => {
        const currentRoles = formData.roles || []
        if (checked) {
            // Add role
            onChange({ ...formData, roles: [...currentRoles, roleId] })
        } else {
            // Remove role
            onChange({ ...formData, roles: currentRoles.filter((id) => id !== roleId) })
        }
    }

    const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

    const openFileInput = () => {
        if (inputRef === null) {
            console.error("Error accessing file input")
            return;
        };

        inputRef.current.click()
    }
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files || !e.target.files[0]) return

        const file = e.target.files[0]


        if (file.size > MAX_FILE_SIZE) {
            alert("Image must be less than 2MB")
            return
        }

        try {
            const base64 = await fileToBase64(file)
            onChange({ ...formData, profile_image: base64 })
            setIsUploaded(true)
            setPfp(base64)
        } catch (err) {
            console.error("Error reading file", err)
            setIsUploaded(false)
            setPfp(undefined)
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
            }}
            className="space-y-8"
        >
            {/* Profile Image Section */}
            <div className="flex items-center gap-6">
                <img
                    src={
                        isPfp
                            ? `data:image/jpeg;base64,${isPfp}`
                            : "https://img.freepik.com/vector-premium/grafico-perfil-personas_24911-21373.jpg"
                    }
                    className="w-20 h-20 rounded-full object-cover border"
                />

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={openFileInput}>
                            <UploadIcon />
                            Upload new photo
                        </Button>

                        {isUploaded && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    onChange({ ...formData, profile_image: null })
                                    setIsUploaded(false)
                                    setPfp(undefined)
                                }}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                    <span className="mt-5 text-gray-500">Recommended size: 400x400px. Maximum file size: 2MB.</span>
                </div>

                <input
                    id="profile-upload"
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {/* 2 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                        value={formData.full_name}
                        onChange={(e) =>
                            onChange({ ...formData, full_name: e.target.value })
                        }
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            onChange({ ...formData, email: e.target.value })
                        }
                        required
                        disabled={disableCredential}
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label>Password</Label>

                    <div className="relative">
                        <Input
                            type="password"
                            value={formData.password}
                            disabled={!editMode}
                            className="pr-20"
                        />

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-2 text-blue-500 hover:text-blue-700"
                            onClick={() => {
                                openChangePasswordModal(true)
                            }}
                        >
                            Change
                        </Button>
                    </div>
                </div>

                {/* Department */}
                <div className="space-y-2">
                    <Label>Department</Label>
                    <Input
                        value={formData.department}
                        onChange={(e) =>
                            onChange({ ...formData, department: e.target.value })
                        }
                    />
                </div>

                {/* Designation */}
                <div className="space-y-2 md:col-span-2">
                    <Label>Designation</Label>
                    <Input
                        value={formData.designation}
                        onChange={(e) =>
                            onChange({ ...formData, designation: e.target.value })
                        }
                    />
                </div>
            </div>

            {/* Roles */}
            {
                editRoles && (
                    <div className="space-y-4">
                        <Label>Assign Roles</Label>
                        <div className="flex flex-wrap gap-3">
                            {roles.map((role) => {
                                const isSelected = formData.roles?.includes(String(role.id))

                                return (
                                    <Button
                                        key={role.id}
                                        type="button"
                                        variant={isSelected ? "default" : "outline"}
                                        className="rounded-full px-4"
                                        onClick={() =>
                                            handleRoleToggle(String(role.id), !isSelected)
                                        }
                                    >
                                        {role.roleName}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                )
            }

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button variant="addNewBtn" type="submit">
                    Save User
                </Button>
            </div>
        </form >)
}