import { useEffect, useState } from "react";
import Overlay from "../../ui-components/Overlay";
import { useAppStore } from "../../../store/app-store";
import axios from "axios";
import { API_BASE_URL } from "@/config/settings";
import { getCurrentPublicationId } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

const VideoModal = ({ close, videoProps }) => {
    const handleBackdropClick = () => {
        close();
    };

    // This is the key function to prevent the modal from closing when clicking inside its content
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center"
            onClick={handleBackdropClick} // Add click handler to backdrop
        >
            <div
                className="relative bg-white p-4 rounded-lg shadow-xl overflow-hidden max-w-4xl w-full mx-4"
                onClick={handleContentClick} // This container stops the click from closing the modal
            >
                <video
                    {...videoProps}
                    controls
                    className="w-full h-auto max-h-[80vh]" // Make video responsive with max height
                >
                    <source src={videoProps.src} />
                </video>
            </div>
        </div>
    );
};

const VideoPlayer = ({ props }) => {

    const {currentUser} = useAuthStore()
    const userID = currentUser?.id
    const publicationID = getCurrentPublicationId(userID)
    if (!publicationID) {
        return (
            <div className="p-4 bg-gray-200 text-red-600">
                Video not found: {infoEntityIdent}
            </div>
        );
    }
    const {
        infoEntityIdent,
        multimediaObjectWidth,
        multimediaObjectHeight,
        multimediaType,
    } = props;


    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState("");

    useEffect(() => {
        // We define the async logic inside the effect
        const getUrl = async () => {
            // 1. Reset loading state when id changes
            setLoading(true);

            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/v1/datamodule/icn/${infoEntityIdent}`,
                );
                // 2. Check if data exists before setting
                if (res.data && res.data.url) {
                    setImg(res.data);
                    setImg(res.data.url);
                } else {
                    console.warn("No URL found in response");
                }
            } catch (error) {
                console.error("Error fetching url:", error);
                // Optional: Set a fallback image on error
                setImg("");
            } finally {
                // 3. Always turn off loading when done (success or fail)
                setLoading(false);
            }
        };

        if (infoEntityIdent) {
            getUrl();
        }
    }, [infoEntityIdent]); // Only re-run if the ID changes
    // const videoSrc = `${API_BASE_URL}/api/v1/publications/${publicationID}/media/${infoEntityIdent}.mp4`;

    const videoProps = {
        width: multimediaObjectWidth,
        height: multimediaObjectHeight,
        src: img,
    };

    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const openModal = () => setIsViewerOpen(true);
    const closeModal = () => setIsViewerOpen(false);
    const containerClasses =
        "relative group inline-block overflow-hidden rounded-md shadow-md";

    console.log("multimedia Type", multimediaType);
    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center">
                <video
                    className="max-w-[40vw] max-h-[40vh] object-contain pointer-events-none"
                    src={img}
                    autoPlay
                    muted
                    loop
                >
                    <source src={img} />
                </video>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Overlay opacity={70} bgColor="black">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
                        <button
                            className="pointer-events-auto border-white border p-3 rounded-md"
                            onClick={openModal}
                        >
                            Open
                        </button>
                    </div>
                </Overlay>
            </div>
            {isViewerOpen && (
                <VideoModal videoProps={videoProps} close={closeModal} />
            )}
        </div>
    );
};

export default VideoPlayer;
