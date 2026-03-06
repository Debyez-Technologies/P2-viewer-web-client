import FileInput from "@/components/ui-components/FileInput"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox" // Import Checkbox
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRoleStore } from "@/store/role-store"
import { User2 } from "lucide-react"
import React, { useEffect, useState } from "react"

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
  disableCredential?: boolean
  editRoles?: boolean
}

export function UserForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  editMode,
  disableCredential = false,
  editRoles = true
}: UserFormProps) {
  const { roles, getRoles } = useRoleStore()
  const [isUploaded, setIsUploaded] = useState<boolean>(false)
  const [isPfp, setPfp] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await getRoles()
      } catch (error) {
        console.error("Error fetching roles!")
      }
    }
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      console.log(file, "loaded file")
      try {
        const base64 = await fileToBase64(file)
        console.log(base64, "converted file")
        onChange({ ...formData, profile_image: base64 })
        if (file) {
          setIsUploaded(true)
          setPfp(base64)
        } else {
          setIsUploaded(false)
          setPfp(undefined)
        }
      } catch (err) {
        console.error("Error reading file", err)
        setIsUploaded(false)
        setPfp(undefined)
      }
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6"
    >
      {/* 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div className="space-y-1">
          <Label>Full Name</Label>
          <Input
            value={formData.full_name}
            onChange={(e) =>
              onChange({ ...formData, full_name: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
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
        {!disableCredential && (
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                onChange({ ...formData, password: e.target.value })
              }
              required={!editMode}
            />
          </div>
        )}

        {/* Department */}
        <div
          className={`space-y-1 ${disableCredential ? "md:col-span-2" : ""
            }`}
        >
          <Label>Department</Label>
          <Input
            value={formData.department}
            onChange={(e) =>
              onChange({ ...formData, department: e.target.value })
            }
          />
        </div>

        {/* Designation */}
        <div className="space-y-1 md:col-span-2">
          <Label>Designation</Label>
          <Input
            value={formData.designation}
            onChange={(e) =>
              onChange({ ...formData, designation: e.target.value })
            }
          />
        </div>
      </div>

      {/* File Input (Outside Grid) */}
      <div className="space-y-1 md:col-span-1">
        <FileInput
          onChange={handleFileChange}
        />
      </div>

      {/* Roles as Toggle Buttons */}
      {editRoles && (
        <div className="space-y-3">
          <Label>Assign Roles</Label>

          <div className="flex flex-wrap gap-3">
            {roles.map((role) => {
              const isSelected = formData.roles?.includes(String(role.id))

              return (
                <Button
                  key={role.id}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  className={`rounded-full px-4 ${isSelected ? "shadow-md bg-viewer-core hover:bg-purple-700" : ""
                    }`}
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
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="addNewBtn" type="submit">
          Save User
        </Button>
      </div>
    </form>
  )
}