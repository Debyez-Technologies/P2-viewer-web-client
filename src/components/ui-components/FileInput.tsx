// import { ChangeEvent, HTMLAttributes, InputHTMLAttributes, useEffect, useRef } from "react"
// import { Input } from "../ui/input"
// import { UploadCloud } from "lucide-react"

// interface FileInputProps {
//     message?: string
// }


// export default function FileInput({ onChange, message, className = "hidden", ...inputProps }: FileInputProps & InputHTMLAttributes<HTMLInputElement>) {
//     const inputRef = useRef()

//     console.log("User input ref",inputRef)    
//     return <>
//         <label htmlFor="file-upload">
//             <div className="w-full p-5 rounded-md border border-dashed items-center flex flex-col bg-slate-200">
//                 <div className="flex rounded-full items-center justify-center w-14 h-14 bg-slate-100">
//                     <UploadCloud />
//                 </div>
//                 <div className="flex flex-col text-center">
//                     <span className="font-semibold">Choose File</span>
//                     <span className="text-gray-400">
//                         {message?.length > 0 ? message : `Upload file from your computer`}
//                     </span>
//                 </div>
//             </div>
//         </label>
//         <Input
//             id='file-upload'
//             type="file"
//             ref={inputRef}
//             onChange={onChange}
//             className={className}
//             {...inputProps}
//         />
//     </>
// }

import { InputHTMLAttributes, useRef, useState } from "react"
import { Input } from "../ui/input"
import { UploadCloud } from "lucide-react"

interface FileInputProps {
    message?: string
}

export default function FileInput({
    onChange,
    message,
    className = "hidden",
    ...inputProps
}: FileInputProps & InputHTMLAttributes<HTMLInputElement>) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setSelectedFile(file)

        // call parent onChange if provided
        if (onChange) onChange(e)
    }

    return (
        <>
            <label htmlFor="file-upload">
                <div className="w-full p-5 rounded-md border border-dashed items-center flex flex-col bg-slate-200 cursor-pointer">
                    <div className="flex rounded-full items-center justify-center w-14 h-14 bg-slate-100">
                        <UploadCloud />
                    </div>

                    {!selectedFile ? (
                        <div className="flex flex-col text-center">
                            <span className="font-semibold">Choose File</span>
                            <span className="text-gray-400">
                                {message?.length
                                    ? message
                                    : "Upload file from your computer"}
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col text-center mt-2">
                            <span className="font-semibold text-green-600">
                                File Uploaded ✓
                            </span>
                            <span className="text-sm">
                                {selectedFile.name}
                            </span>
                            <span className="text-xs text-gray-500">
                                {(selectedFile.size / 1024).toFixed(2)} KB
                            </span>
                            <span className="text-xs text-gray-400">
                                {selectedFile.type || "Unknown type"}
                            </span>
                        </div>
                    )}
                </div>
            </label>

            <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className={className}
                {...inputProps}
            />
        </>
    )
}