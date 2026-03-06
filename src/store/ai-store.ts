import {
    ChatMessage,
    ChatRequest,
    ChatResponse,
    ClarificationRequest,
    GetAllEmbeddingsResponse,
    Interrupt,
} from "@/types/ai";
import axios from "axios";
import { create } from "zustand";

interface AiStore {
    isChatting: boolean;
    publicationIdToEmbed: string | undefined;
    embeddedPublicationsMap: Record<string, string>;
    messages: ChatMessage[];
    pendingInterrupt: Interrupt | null;

    setIsChatting: (val: boolean) => void;
    addMessage: (msg: ChatMessage) => void;
    clearMessages: () => void;
    clearInterrupt: () => void;
    getEmbeddingMap: () => Record<string, string>;
    getEmbeddingId: (publicationId: string) => string | undefined;
    embedPublication: (publicationId: string) => Promise<void>;
    hydrateEmbeddingsFromBackend: () => Promise<void>;
    sendChatQuery: (queryBody: ChatRequest) => Promise<ChatResponse>;
    sendClarification: (body: ClarificationRequest) => Promise<ChatResponse>;
}

const AI_BASE_URL = "http://localhost:8000";

const useAiStore = create<AiStore>((set, get) => ({
    isChatting: false,
    publicationIdToEmbed: undefined,
    embeddedPublicationsMap: {},
    messages: [],
    pendingInterrupt: null,

    setIsChatting: (val) => {
        set(() => ({ isChatting: val }));
    },

    getEmbeddingMap: () => {
        return get().embeddedPublicationsMap;
    },

    // -----------------------------
    // Get embedding ID for a publication
    // -----------------------------
    getEmbeddingId: (publicationId: string) => {
        return get().embeddedPublicationsMap[publicationId];
    },

    embedPublication: async (publicationId) => {
        const { embeddedPublicationsMap } = get();

        // Avoid duplicate embedding
        if (embeddedPublicationsMap[publicationId]) {
            return;
        }

        try {
            const response = await axios.post(`${AI_BASE_URL}/embed/`, {
                publication_id: publicationId,
            });
            if (response.data.success) {
                set((state) => ({
                    embeddedPublicationsMap: {
                        ...state.embeddedPublicationsMap,
                        [publicationId]:
                            response.data.publication_embedding_uuid,
                    },
                }));
            }
        } catch (error) {
            console.log("error embedding publication");
        }
    },

    hydrateEmbeddingsFromBackend: async () => {
        try {
            const response = await axios.get<GetAllEmbeddingsResponse>(
                `${AI_BASE_URL}/embed/idmap`,
            );

            // {
            //   "success": true,
            //   "data": [
            //     {
            //       "publication_id": "pub-1",
            //       "embedding_id": "emb-aaa"
            //     },
            //     {
            //       "publication_id": "pub-2",
            //       "embedding_id": "emb-bbb"
            //     }
            //   ]
            // }

            if (!response.data.success) return;

            set((state) => {
                const mergedMap = { ...state.embeddedPublicationsMap };

                for (const record of response.data.data) {
                    // Avoid duplicates (idempotent)
                    if (!mergedMap[record.id]) {
                        mergedMap[record.id] = record.publication_embedding_id;
                    }
                }

                return { embeddedPublicationsMap: mergedMap };
            });
        } catch (error) {
            console.error("Failed to hydrate embeddings", error);
        }
    },

    sendChatQuery: async (reqBody) => {
        try {
            const res = await axios.post(`${AI_BASE_URL}/chat/query`, reqBody);
            const response = res.data;
            return response;
        } catch (error) {
            console.log("error in chat with agent");
        }
    },

    addMessage: (msg) =>
        set((state) => ({
            messages: [...state.messages, msg],
            pendingInterrupt: msg.interrupt ?? state.pendingInterrupt,
        })),

    clearInterrupt: () => set({ pendingInterrupt: null }),

    sendClarification: async (body) => {
        const res = await axios.post(`${AI_BASE_URL}/chat/clarify`, body);
        return res.data;
    },

    clearMessages: () => {
        set((state) => ({ messages: [] }));
    },
}));

export { useAiStore };
