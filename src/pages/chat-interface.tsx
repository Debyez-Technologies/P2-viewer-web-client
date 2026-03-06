import { useAiStore } from "@/store/ai-store";
import Chatbox from "@/components/app-components/chat/Chatbox";
import { ChatMessage, ChatRequest, ChatResponse } from "@/types/ai";
import ChatMessages from "@/components/app-components/chat/ChatMessages";
import { usePublicationStore } from "@/store/publication-store";
import { useEffect,useState } from "react";
import { useAuthStore } from "../store/auth";
import PublicationTile from "@/components/app-components/publication-management/publication-tile";
import { useAppStore } from "@/store/app-store";
import { User } from "@/types/user";
import { PublicationMeta } from "@/types/publication";

function IntroBox({ currentUser }: { currentUser: User }) {

    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl space-y-6">
                <h1 className="text-3xl text-center">
                    Welcome Back,{" "}
                    <span className="inherit text-viewer-core">
                        {currentUser?.profile?.fullName ?? `John Doe`}
                    </span>
                </h1>
                <p className="text-2xl text-slate-700 font-light">
                    How can I help you today?
                </p>
            </div>
        </div>
    );
}

export default function ChatInterface() {
    const { isChatting, setIsChatting } = useAiStore();
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuthStore();
    const {
        addMessage,
        sendChatQuery,
        hydrateEmbeddingsFromBackend,
        embeddedPublicationsMap,
        getEmbeddingId,
        sendClarification,
        pendingInterrupt,
        clearInterrupt,
    } = useAiStore();

    const pub = JSON.parse(localStorage.getItem("publication"));
    const [open, setOpen] = useState(false);

    const fetchUserProjects = useAppStore((state) => state.fetchUserProjects);
    const assignedProjects = useAppStore((state) => state.assignedProjects);
    const setCurrentProjectInfo = useAppStore(
        (state) => state.setCurrentProjectInfo,
    );
    const setPublicationIDinPublicationStore = usePublicationStore(
        (state) => state.setPublicationIDinPublicationStore,
    );
    const publicationId = usePublicationStore((state) => state.publicationId);

    const handleProjectOpen = (project: PublicationMeta) => {
        if (pub === null) {
            localStorage.setItem("publication", JSON.stringify(project));
        }
        setPublicationIDinPublicationStore(project.id);
        setCurrentProjectInfo(project);
        setOpen(false);
    };

    useEffect(() => {
        if (pub) {
            handleProjectOpen(pub);
        }

        fetchUserProjects(currentUser.id);
    }, []);

    useEffect(() => {
        if (!pub) {
            setOpen(true);
        }
    }, [pub]);

    console.log(publicationId, "pubId");
    useEffect(() => {
        hydrateEmbeddingsFromBackend();
    }, []);

    const handleQuerySubmit = async (message: string) => {
        if (!publicationId) {
            console.log("publication not selected");
            return;
        }

        setIsChatting(true);
        setLoading(true);

        const userMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: message,
        };

        addMessage(userMsg);

        const pub_embedding_id = getEmbeddingId(publicationId);

        console.log(embeddedPublicationsMap, "embedidmap");

        const body: ChatRequest = {
            message,
            user_id: "user123",
            session_id: "session1",
            publication_embedding_id: pub_embedding_id,
        };

        try {
            let response: ChatResponse;

            // INTERRUPT FLOW
            if (pendingInterrupt) {
                const clarification =
                    pendingInterrupt.options[Number(message) - 1] || message;

                response = await sendClarification({
                    user_id: "user123",
                    session_id: "session1",
                    clarification,
                });

                clearInterrupt();
            }
            // NORMAL FLOW
            else {
                response = await sendChatQuery({
                    message,
                    user_id: "user123",
                    session_id: "session1",
                    publication_embedding_id: pub_embedding_id,
                });
            }

            // Render AI response
            addMessage({
                id: crypto.randomUUID(),
                role: "assistant",
                content: response.response ?? "",
                sources: response.sources || [],
                interrupt: response.interrupt ?? undefined,
            });
        } catch {
            addMessage({
                id: crypto.randomUUID(),
                role: "assistant",
                content: "❌ Failed to contact server",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClarification = async (clarification: string) => {
        setLoading(true);

        // show selection as user message
        addMessage({
            id: crypto.randomUUID(),
            role: "user",
            content: clarification,
        });

        try {
            const response = await sendClarification({
                user_id: "user123",
                session_id: "session1",
                clarification,
            });

            addMessage({
                id: crypto.randomUUID(),
                role: "assistant",
                content: response.response ?? "",
                sources: response.sources || [],
                interrupt: response.interrupt ?? undefined,
            });

            clearInterrupt();
        } catch {
            addMessage({
                id: crypto.randomUUID(),
                role: "assistant",
                content: "❌ Failed to process clarification",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full overflow-hidden flex flex-col">
            {/* Messages Area - Takes available space */}
            <div className="flex-1 overflow-hidden">
                {!isChatting ? (
                    <IntroBox currentUser={currentUser} />
                ) : (
                    <ChatMessages handleClarification={handleClarification} />
                )}
            </div>

            {/* Input Area - Fixed at bottom  border-t border-slate-200 bg-white/80 */}
            <div className="flex-shrink-0  backdrop-blur-sm">
                <div className="w-full max-w-4xl mx-auto px-4 py-4">
                    {loading && (
                        <div className="text-sm text-slate-500 mb-2 flex items-center gap-2">
                            <div className="flex gap-1">
                                <span
                                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0ms" }}
                                ></span>
                                <span
                                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                                    style={{ animationDelay: "150ms" }}
                                ></span>
                                <span
                                    className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                                    style={{ animationDelay: "300ms" }}
                                ></span>
                            </div>
                            <span>Thinking...</span>
                        </div>
                    )}
                    {!open ? (
                        <Chatbox handleSubmit={handleQuerySubmit} />
                    ) : (
                        <div
                            className={`flex h-full w-full justify-center items-start`}
                        >
                            <PublicationTile
                                projects={assignedProjects}
                                handleOpen={handleProjectOpen}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
