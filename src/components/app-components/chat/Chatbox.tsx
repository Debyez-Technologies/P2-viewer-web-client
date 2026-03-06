import { ChatboxProps } from "@/types/ai";
import { useRef, useState, KeyboardEvent } from "react";
import { IoIosSend } from "react-icons/io";

export default function Chatbox({ handleSubmit }: ChatboxProps) {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 200) + "px";
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        handleSubmit(value);
        setValue("");
        // Reset height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    return (
        <form className="relative w-full" onSubmit={onSubmit}>
            <textarea
                ref={textareaRef}
                rows={1}
                value={value}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Shift + Enter for new line)"
                className="
                    w-full resize-none overflow-y-auto
                    rounded-2xl border-2 border-slate-200
                    px-5 py-4 pr-14
                    text-base text-slate-800 placeholder:text-slate-400
                    focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100
                    transition-all duration-200
                    shadow-sm hover:shadow-md
                    max-h-[200px]
                "
                style={{ minHeight: "56px" }}
            />
            <button
                type="submit"
                disabled={!value.trim()}
                className="
                    absolute right-3 bottom-3
                    flex h-10 w-10 items-center justify-center
                    rounded-xl bg-purple-500 text-white text-xl
                    hover:bg-purple-600 active:scale-95
                    disabled:bg-slate-300 disabled:cursor-not-allowed
                    transition-all duration-200
                    shadow-lg hover:shadow-xl
                "
            >
                <IoIosSend />
            </button>
        </form>
    );
}
