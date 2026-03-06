import { ChatMessage } from "@/types/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SourceAttribution from "./SourceAttribution";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatBubble({
    message,
    onSelectOption,
}: {
    message: ChatMessage;
    onSelectOption?: (option: string) => void;
}) {
    const isUser = message.role === "user";

    if (isUser) {
        return (
            <div className="flex w-full justify-end animate-fadeIn">
                <div className="max-w-[80%] px-5 py-3 rounded-2xl rounded-br-md text-base bg-purple-400 text-white shadow-md">
                    {message.content}
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full justify-start animate-fadeIn">
            <div className="max-w-[85%] px-5 py-3 rounded-2xl rounded-bl-md text-base bg-white border border-slate-200 text-slate-800 shadow-sm">
                {/*<ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                </ReactMarkdown>*/}
                {/* Normal response */}
                {message.content && (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>
                )}

                {/* INTERRUPT */}
                {message.interrupt && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                        <p className="font-medium mb-2">
                            {message.interrupt.instruction}
                        </p>

                        <ol className="space-y-2">
                            {message.interrupt.options.map((opt, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => onSelectOption?.(opt)}
                                        className="w-full text-left px-3 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-sm transition"
                                    >
                                        {/*<span className="font-semibold mr-2">
                                            {idx + 1}.
                                        </span>*/}
                                        {opt}
                                    </button>
                                </li>
                            ))}
                        </ol>

                        <p className="text-xs text-slate-500">
                            You can click an option or reply with its number
                        </p>
                    </div>
                )}

                <SourceAttribution sources={message.sources || []} />
            </div>
        </div>
    );
}
