export interface EmbeddingRecord {
    id: string; // publication_id
    publication_embedding_id: string;
}

export interface GetAllEmbeddingsResponse {
    success: boolean;
    data: EmbeddingRecord[];
}

export interface ChatboxProps {
    handleSubmit: (message: string) => void;
}

export type ChatRole = "user" | "assistant";

export interface Source {
    datamodule_name: string;
    datamodule_code: string;
}

export interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
    sources?: Source[]; // Optional sources array
    interrupt?: Interrupt;
}

export interface Interrupt {
    instruction: string;
    options: string[];
}

export interface ClarificationRequest {
    user_id: string;
    session_id: string;
    clarification: string;
}

export interface ChatRequest {
    user_id: string;
    session_id: string;
    publication_embedding_id: string;
    message: string;
}

export interface ChatResponse {
    response: string;
    sources?: Source[];
    interrupt?: Interrupt | null;
}
