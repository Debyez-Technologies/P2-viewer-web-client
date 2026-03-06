import { useState, useRef, useEffect } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";

// --- INTERNAL CONFIGURATION ---
const USE_STREAMING = true;
const API_URL = "http://localhost:8000/v1/chat";

const getUUID = () => crypto.randomUUID();

const ChatUI = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);

    // **THE FIX - PART 1: Create a ref to hold the current messages state.**
    const messagesRef = useRef(messages);

    // **THE FIX - PART 2: Keep the ref synchronized with the state.**
    // This effect runs after every render, ensuring messagesRef.current is always fresh.
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    // --- Other Effects (unchanged) ---
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // --- Error Helpers (unchanged) ---
    const getErrorFromAxios = (error) => {
        if (error.response) {
            const data = error.response.data;
            if (typeof data === "string") return data;
            return data.error || JSON.stringify(data);
        } else if (error.request) {
            return "No response from server.";
        } else {
            return error.message;
        }
    };

    // --- Core API and Message Handling Logic ---
    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: getUUID(),
            role: "user",
            content: input,
        };
        const assistantMessage = {
            id: getUUID(),
            role: "assistant",
            content: "",
        };

        // This initial state update is fine
        setMessages([...messages, userMessage, assistantMessage]);

        const currentInput = input;
        setInput("");
        setIsLoading(true);

        try {
            if (USE_STREAMING) {
                await handleStreamedResponse(currentInput);
            } else {
                await handleNonStreamedResponse(currentInput);
            }
        } catch (error) {
            console.error("API Error:", error);
            const errorMessage = error.message || getErrorFromAxios(error);
            // Use the ref to ensure we're updating the correct last message
            const currentMessages = messagesRef.current;
            const lastMessage = currentMessages[currentMessages.length - 1];
            if (lastMessage && lastMessage.role === "assistant") {
                lastMessage.content = `Error: ${errorMessage}`;
                setMessages([...currentMessages]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // --- KeyDown Handler (unchanged) ---
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // --- API Handlers ---

    // Non-streaming is fine as is.
    const handleNonStreamedResponse = async (prompt) => {
        try {
            const response = await axios.post(API_URL, {
                prompt,
                stream: false,
                user_id: "user-123",
                session_id: "session-abc",
            });
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].content = response.data.response;
                return updated;
            });
        } catch (error) {
            throw new Error(getErrorFromAxios(error));
        }
    };

    const handleStreamedResponse = async (prompt) => {
        return new Promise((resolve, reject) => {
            fetchEventSource(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "text/event-stream",
                },
                body: JSON.stringify({
                    prompt,
                    stream: true,
                    user_id: "user-123",
                    session_id: "session-abc",
                }),

                onmessage(event) {
                    const token = event.data;
                    if (token.startsWith("[ERROR]")) {
                        // throw new Error(token.substring(8));
                        reject(new Error(token.substring(8)));
                        return;
                    }
                    if (token === "[DONE]") {
                        // Handle a done signal if your API sends one
                        return;
                    }

                    // **THE FIX - PART 3: Use the ref to get the LATEST state.**
                    // This breaks the stale closure and prevents re-processing tokens.
                    const currentMessages = messagesRef.current;
                    const lastMessage =
                        currentMessages[currentMessages.length - 1];

                    if (lastMessage && lastMessage.role === "assistant") {
                        lastMessage.content += token;
                        // Set state with a new array to trigger a render
                        setMessages([...currentMessages]);
                    }
                },
                onclose() {
                    resolve();
                },
                onerror(err) {
                    reject(err);
                },
            });
        });
    };

    // --- Message Component (simplified back, no special IDs needed) ---
    const Message = ({ role, content }) => {
        const isUser = role === "user";
        const parts = content.split("```");

        if (role === "assistant" && !content && isLoading) {
            return (
                <div className="self-start">
                    <div className="px-4 py-3 rounded-2xl bg-gray-200 text-gray-500 rounded-bl-lg">
                        <span className="animate-pulse">...</span>
                    </div>
                </div>
            );
        }

        return (
            <div
                className={`max-w-3/4 lg:max-w-2/3 break-words ${isUser ? "self-end" : "self-start"}`}
            >
                <div
                    className={`px-4 py-2 rounded-2xl ${isUser ? "bg-blue-500 text-white rounded-br-lg" : "bg-gray-200 text-gray-800 rounded-bl-lg"}`}
                >
                    {parts.map((part, index) =>
                        index % 2 === 1 ? (
                            <pre
                                key={index}
                                className="bg-gray-800 text-white p-3 my-2 rounded-md overflow-x-auto text-sm"
                            >
                                <code>{part}</code>
                            </pre>
                        ) : (
                            <span key={index}>{part}</span>
                        ),
                    )}
                </div>
            </div>
        );
    };

    return (
        // The main JSX structure is unchanged
        <div className="m-4 flex flex-col shadow-lg w-full max-w-md mx-auto border rounded-lg h-[85vh] bg-white">
            <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
                {messages.length === 0 ? (
                    <div className="text-gray-500 text-center self-center my-auto">
                        No messages yet...
                    </div>
                ) : (
                    messages.map((msg) => <Message key={msg.id} {...msg} />)
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-2 border-t border-gray-200">
                {/* ... The form and textarea JSX is unchanged ... */}
                <div className="bg-white rounded-lg p-2">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message here..."
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] max-h-32 overflow-y-auto"
                                rows={1}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            disabled={!input.trim() || isLoading}
                            className="p-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center h-[48px] w-[48px]"
                        >
                            <RiSendPlane2Fill size="1.2em" />
                        </button>
                    </div>
                    {input && (
                        <div className="mt-2 text-xs text-center text-gray-500">
                            <strong>Enter</strong> to send,{" "}
                            <strong>Shift+Enter</strong> for new line
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatUI;
