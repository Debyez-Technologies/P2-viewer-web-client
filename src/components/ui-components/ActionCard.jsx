import { useState } from "react";

const ActionCard = ({ title, description, action }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Character limits
    const TITLE_LIMIT = 100;
    const DESCRIPTION_LIMIT = 150;

    // Helper functions for text truncation
    const truncateText = (text, limit) => {
        if (!text || text.length <= limit) return text;
        return text.substring(0, limit) + '...';
    };

    const shouldShowExpandButton = (text, limit) => {
        return text && text.length > limit;
    };

    const displayTitle = isExpanded ? title : truncateText(title, TITLE_LIMIT);
    const displayDescription = isExpanded ? description : truncateText(description, DESCRIPTION_LIMIT);

    const needsExpansion = shouldShowExpandButton(title, TITLE_LIMIT) ||
        shouldShowExpandButton(description, DESCRIPTION_LIMIT);

    return (
        <div className="w-full rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow border border-gray-200">
            <div className="flex items-center justify-between p-4 gap-4">
                {/* Left side - Content */}
                <div className="flex-1 min-w-0"> {/* min-w-0 allows flex item to shrink */}
                    <div className="flex items-start justify-between gap-4">
                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-900 mb-1 break-words">
                                {displayTitle}
                            </h3>
                            {displayDescription && <p className="text-gray-600 text-sm break-words">
                                {displayDescription}
                            </p>}
                        </div>

                        {/* Right side - Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Expand/Collapse button */}
                            {needsExpansion && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="px-3 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                                >
                                    {isExpanded ? 'Show Less' : 'View Full'}
                                </button>
                            )}

                            {/* Action button */}
                            <div>
                                {action || 'Actions'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionCard;