import { API_BASE_URL } from '@/config/settings';
import { useAppStore } from '@/store/app-store';
import { usePublicationStore } from '@/store/publication-store';
import axios from 'axios';
import { useState, useEffect } from 'react';

const FALLBACK_IMAGE =
    "https://freesvg.org/img/Simple-Image-Not-Found-Icon.png?w=150&h=150&fit=fill&fm=png";


function Symbol({ infoEntityIdent, className = '', children, ...props }) {
    const { resourceList } = usePublicationStore();
    const currentProjectInfo = useAppStore((state) => state.currentProjectInfo);
    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState("");

    const fullFilename = resourceList.find((resource) =>
        resource.startsWith(infoEntityIdent),
    );

    useEffect(() => {
        const getUrl = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/v1/datamodule/icn/${infoEntityIdent}`,
                );

                if (res.data && res.data.url) {
                    setImg(res.data.url);
                } else {
                    setImg(FALLBACK_IMAGE);
                }
            } catch (error) {
                console.error("Error fetching url:", error);
                setImg(FALLBACK_IMAGE);
            } finally {
                setLoading(false);
            }
        };

        if (infoEntityIdent) {
            getUrl();
        }
    }, [infoEntityIdent]);

    if (!fullFilename || !currentProjectInfo.id) {
        return (
            <div className="flex items-center justify-center h-20 w-32 rounded-md bg-gray-100 text-xs text-red-500 border">
                Logo not found
            </div>
        );
    }

    return (
        <div
            className={`flex items-center justify-center
            h-20 w-32
            bg-white
            border border-gray-200
            rounded-lg
            shadow-sm
            p-2
            overflow-hidden
            ${className}`}
            {...props}
        >
            {loading ? (
                <div className="animate-pulse bg-gray-200 h-10 w-20 rounded"></div>
            ) : (
                <img
                    src={img}
                    alt={infoEntityIdent}
                    className="max-h-full max-w-full object-contain"
                />
            )}

            {children}
        </div>
    );
}

export default Symbol;