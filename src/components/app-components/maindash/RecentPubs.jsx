import { FaFileImage, FaImage } from "react-icons/fa";
import ImageWithFallback from "../../ui-components/ImageWithFallback";
import { API_BASE_URL } from "@/config/settings";

const RecentPublications = ({ publications, isLoading }) => {
    if (isLoading) {
        // A simple loader that respects the component's container style
        return <div className="bg-white p-6 rounded-lg shadow-md">Loading...</div>;
    }
    
    // Placeholder for when there are no publications
    if (!publications || publications.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4">Recent Publications</h3>
                <div className="flex flex-col justify-center items-center h-full text-gray-400 min-h-[200px]">
                    <FaFileImage size={40} className="mb-2" />
                    <p>No recent publications found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Recent Publications</h3>
            <div className="space-y-4">
                {/* The check above guarantees 'publications' is a non-empty array */}
                {publications.map((pub) => (
                    <div key={pub.pm_id} className="flex items-center space-x-4">
                        {/* 
                          We assume if a publication object exists, it has an image.
                          If an image can be optional, you'd check pub.product_image here.
                        */}
                        <ImageWithFallback
                            src={`${API_BASE_URL}/api/v1/projects/${pub.pm_id}/product-image`}
                            alt={`Publication ${pub.pm_id}`}
                            className="w-16 h-16 object-cover rounded-md" 
                        />
                        {/* <img
                            src={`${API_BASE_URL}/api/v1/projects/${pub.pm_id}/product-image`}
                            alt={`Publication ${pub.pm_id}`}
                            className="w-16 h-16 object-cover rounded-md bg-gray-200" // Added background color for loading state
                            // Handle image loading errors gracefully
                            onError={(e) => e.target.style.display = 'none'}
                        /> */}
                        <div>
                            <p className="font-semibold">Publication ID: {pub.pm_id}</p>
                            <p className="text-gray-500 text-sm">
                                Added: {new Date(pub.added_time).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentPublications;