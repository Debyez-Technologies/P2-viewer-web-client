import { usePublicationStore } from "@/store/publication-store";
import { Source } from "@/types/ai";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { useNavigate } from "react-router";

interface SourceAttributionProps {
    sources: Source[];
}

export default function SourceAttribution({ sources }: SourceAttributionProps) {
    const navigate = useNavigate();
    const { navigateToKey } = usePublicationStore();

    if (!sources || sources.length === 0) return null;

    const handleSourceClick = (source: Source) => {
        navigate(`/ietm/view`);
        navigateToKey(source.datamodule_code);
    };

    return (
        <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-start gap-2">
                <HiOutlineDocumentText className="text-slate-400 text-sm mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1.5 font-medium">
                        Sources:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {sources.map((source, index) => (
                            <button
                                key={index}
                                onClick={() => handleSourceClick(source)}
                                className="
                                    inline-flex items-center gap-1.5
                                    px-2.5 py-1
                                    text-xs text-slate-600
                                    bg-slate-50 hover:bg-purple-50
                                    border border-slate-200 hover:border-purple-300
                                    rounded-lg
                                    transition-all duration-200
                                    hover:shadow-sm
                                    group
                                    active:scale-95
                                "
                                title={`${source.datamodule_name} (${source.datamodule_code})`}
                            >
                                <span className="truncate max-w-[180px] font-medium">
                                    {source.datamodule_name}
                                </span>
                                <svg
                                    className="w-3 h-3 flex-shrink-0 text-slate-400 group-hover:text-purple-600 transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
