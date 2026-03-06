import { useState } from "react";

import Spinner from "../../ui-components/Spinner";
import { useImportStore } from "../../../store/import-store";
import { useAiStore } from "@/store/ai-store";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import FileInput from "@/components/ui-components/FileInput";

interface ZipUploadProps {
    onClose: () => void
}

const ZipUpload = ({ onClose }: ZipUploadProps) => {
    const [file, setFile] = useState(null);
    const uploadPublication = useImportStore(
        (state) => state.uploadPublication,
    );
    const isLoading = useImportStore((state) => state.isLoading);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const publicationId = await uploadPublication(file);
            // console.log(publicationId, "publicationId after import");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-gray-600 mb-4">
                Select a compressed (.zip) publication package to begin.
            </p>
            <FileInput
            onChange={(e)=>setFile(e.target.files[0])}
            message="Select a compressed (.zip) publication package to begin."
            required
            accept=".zip"
            />
            <div className="mt-6 gap-3 flex justify-end">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={!file || isLoading}
                    className="px-4 py-2 bg-viewer-core text-white rounded-md disabled:bg-gray-400 flex items-center hover:bg-purple-700"
                >
                    <CloudUpload />
                    {isLoading ? <Spinner /> : "Upload and Continue"}
                </Button>
            </div>
        </form>
    );
};

export default ZipUpload;
