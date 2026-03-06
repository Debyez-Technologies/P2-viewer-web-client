interface SearchResultsInfoProps {
    searchQuery: string;
    resultCount: number;
}

export default function SearchResultsInfo({
    searchQuery,
    resultCount
}: SearchResultsInfoProps) {
    if (!searchQuery) return null;

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
                Found <span className="font-semibold text-gray-900">{resultCount}</span> publication{resultCount !== 1 ? 's' : ''}
                {resultCount > 0 && (
                    <span> matching "{searchQuery}"</span>
                )}
            </p>
        </div>
    );
}