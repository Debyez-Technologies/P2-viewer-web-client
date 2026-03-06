import { useAiStore } from "@/store/ai-store";
import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

interface ChatMessageProps {
    handleClarification: (clarification: string) => Promise<void>;
}
export default function ChatMessages({
    handleClarification,
}: ChatMessageProps) {
    const { messages } = useAiStore();
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll to bottom when new messages arrive
        // Using scrollTop instead of scrollIntoView to prevent affecting parent layout
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
                scrollContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            ref={scrollContainerRef}
            className="h-full overflow-y-auto overflow-x-hidden px-4 py-6 scroll-smooth"
            style={{
                scrollBehavior: "smooth",
                // Ensure scrolling is contained within this element
                overscrollBehavior: "contain",
            }}
        >
            <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg}
                        onSelectOption={
                            msg.interrupt ? handleClarification : undefined
                        }
                    />
                ))}
                {/* Invisible element to help with scroll targeting */}
                <div ref={messagesEndRef} className="h-1" />
            </div>
        </div>
    );
}
