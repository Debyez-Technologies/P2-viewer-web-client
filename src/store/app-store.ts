import { create } from "zustand";
import axios from ".";
import { API_BASE_URL } from "@/config/settings";
import { AppStore } from "@/types/publication";
import { useAuthStore } from "./auth";
import { projects } from "@/config/projectGroups";

const useAppStore = create<AppStore>((set, get) => ({
    projects: [],
    project: undefined,
    assignedProjects: [],
    projectPath: "",
    // publicationID: null,
    currentProjectInfo: undefined,
    isDeleteModalOpen: false,
    projectToDelete: null,
    importStep: "selectSource",
    currentProject: null,
    server: { connected: true, message: "server is connected" },

    // --- Actions ---

    fetchUserProjects: async (userID: string) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/publication/${userID}/user`,
            );
            const data = Array.isArray(response.data) ? response.data : []
            set({
                assignedProjects: data.map(d => ({
                    id: d.PublicationID,
                    companyDetails: d.CompanyDetails,
                    isConfigured: d.IsConfigured,
                    isEmbedded: d.IsEmbedded,
                    name: d.PublicationName

                })),
            });
        } catch (err) {
            console.error("Failed to fetch publications:", err);
        }
    },

    fetchProjects: async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/publication/`,
            );

            const data = Array.isArray(response.data) ? response.data : []

            set({
                projects: data.map(d => ({
                    id: d.PublicationID,
                    companyDetails: d.CompanyDetails,
                    isConfigured: d.IsConfigured,
                    isEmbedded: d.IsEmbedded,
                    name: d.PublicationName

                })),
            });

            console.log(response.data, "Publications");
        } catch (err) {
            console.error("Failed to fetch publications:", err);
        }
    },

    fetchProjectById: async (id) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/publication/${id}`,
            );

            set({
                project: response.data,
            });
        } catch (err) {
            console.error("Failed to fetch publications:", err);
        }
    },

    setProjectPath: (path) =>
        set({
            projectPath: path,
        }),

    // setPublicationID: (id: string) =>
    //     set({
    //         // publicationID: id,
    //     }),

    setCurrentProjectInfo: (project) => {
        if (!project) return;

        set({
            currentProjectInfo: project,
        });
    },

    openDeleteConfirmation: (project) =>
        set({
            isDeleteModalOpen: true,
            projectToDelete: project,
        }),

    closeDeleteConfirmation: () =>
        set({
            isDeleteModalOpen: false,
            projectToDelete: null,
        }),

    confirmDeleteProject: async () => {
        const { projectToDelete } = get();
        if (!projectToDelete) return;

        try {
            await axios.delete(
                `${API_BASE_URL}/api/v1/publication/${projectToDelete.id}`,
            );

            // Remove from localStorage if matches
            const { currentUser } = useAuthStore.getState()
            const storedPubRaw = localStorage.getItem(`publication-${currentUser.id}`);

            if (storedPubRaw) {
                const storedPub = JSON.parse(storedPubRaw);

                if (storedPub.PublicationID === projectToDelete.id) {
                    localStorage.removeItem("publication");
                }
            }

            get().closeDeleteConfirmation();
            get().fetchProjects();
        } catch (err) {
            console.error("Failed to delete project:", err);
        }
    },

    setCurrentProject: (projectData) => {
        if (!projectData) return;

        set({
            currentProject: projectData,
        });
    },

    getServerStatus: async () => {
        try {
            console.log("stats");
        } catch (err) {
            console.log("cant get server status", err);
        }
    },
    resetStore: () => {
        set({
            project: null,
            projects: [],
            assignedProjects: [],
            projectPath: "",
            currentProjectInfo: null,
            isDeleteModalOpen: false,
            projectToDelete: null,
            importStep: "",
            currentProject: null,
            server: null
        })
    }
}));

export { useAppStore };
