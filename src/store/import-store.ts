import { create } from "zustand";
import axios from ".";
import { produce } from "immer";
import { useAppStore } from "./app-store";
import { API_BASE_URL } from "@/config/settings";
import { ImportStep, ImportStore } from "@/types/import";
import { PublicationMeta } from "@/types/publication";

// Helper function to simulate API calls
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// --- NEW: A recursive helper to extract all chapter keys from the tree ---
const extractAllChapterKeys = (nodes) => {
    let keys = [];
    for (const node of nodes) {
        // A chapter is a node with a key that does NOT have a '#'
        if (node.key && !node.key.includes("#")) {
            keys.push({ key: node.key, title: node.title });
        }
        if (node.children && node.children.length > 0) {
            keys = keys.concat(extractAllChapterKeys(node.children));
        }
    }
    return keys;
};

const useImportStore = create<ImportStore>((set, get) => ({
    // STATE
    importStep: ImportStep.IDLE, // 'idle', 'uploading', 'validation', 'viewingReport', 'configDetails', 'configSplitting', 'saving', 'savenoConfig', 'success', 'error'
    isLoading: false,
    error: null,
    publicationId: null,
    inferredName: "",
    companyDetails: "",
    isCollapsed: false,
    validationReport: null, // Will hold { summary, results: { 'filename': [...] } }
    // State for Step 3.2
    dataModules: [], // All available data modules for this publication
    sections: [], // The sections user creates and populates

    // ACTIONS

    /**
     * Starts the entire import process by opening the first modal.
     */
    startImport: () => {
        set({
            importStep: ImportStep.UPLOADING,
            isLoading: false,
            error: null,
            publicationId: null,
            inferredName: "",
            validationReport: null, // Reset on start
            dataModules: [],
            sections: [],
        });
    },

    /**
     * Step 1: Uploads the ZIP file to the backend.
     * @param {File} file The zip file from the input.
     */
    uploadPublication: async (file) => {
        set({ isLoading: true, error: null });
        try {
            const formData = new FormData();
            formData.append("publicationZip", file);

            // --- API CALL ---
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/import/zip`,
                formData,
            );
            // Expected response: { publicationId: 123, inferredName: "My-Publication", message: "..." }

            const { publicationId, inferredName } = response.data;
            console.log("pub id: ", publicationId);

            if (!publicationId) {
                return;
            }

            set({
                publicationId: publicationId,
                inferredName: inferredName,
                importStep: ImportStep.VALIDATION, // Move to the next step
            });

            return publicationId;
        } catch (err) {
            const message =
                err.response?.data?.error ||
                "An unexpected error occurred during upload.";
            set({ importStep: ImportStep.ERROR, error: message });
        } finally {
            set({ isLoading: false });
        }
    },

    /**
     * Step 2: Runs the validation process.
     */
    runValidation: async () => {
        set({ isLoading: true, error: null });
        const { publicationId } = get();
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/publication/${publicationId}/validate`,
            );

            // Store the entire report and move to the new viewing step
            set({
                validationReport: response.data,
                importStep: ImportStep.VIEWING_REPORT,
            });
        } catch (err) {
            const message = err.response?.data?.error || "Validation failed.";
            set({ importStep: ImportStep.ERROR, error: message });
        } finally {
            set({ isLoading: false });
        }
    },

    /**
     * Step 2: Skips validation and moves to configuration.
     */
    skipValidation: () => {
        set({ importStep: ImportStep.CONFIG_DETAILS });
    },

    proceedToConfiguration: () => {
        set({ importStep: ImportStep.CONFIG_DETAILS });
    },

    skipConfiguration: async () => {
        // await axios.get(`${API_BASE_URL}/api/v1/publications/list`)
        set({ importStep: ImportStep.SAVE_NO_CONFIG });
    },

    /**
     * Step 3.1: Saves project details (name, logo, images).
     * @param {{name: string, companyDetails: string, companyLogo: File, productImage: File}} details
     */
    /**
     * --- MODIFIED: Simplified for both create and edit flows ---
     */
    saveProjectDetails: async (details, configured) => {
        set({ isLoading: true, error: null, importStep: ImportStep.SAVING });
        const { publicationId, importStep } = get();
        try {
            // --- Step 1: Save the form data (works for both create and edit) ---
            const formData = new FormData();
            formData.append("name", details.name);
            formData.append("companyDetails", details.companyDetails);
            if (details.productImage)
                formData.append("productImage", details.productImage);
            await axios.patch(
                `${API_BASE_URL}/api/v1/publication/${publicationId}`,
                formData,
            );

            // --- Step 2: Decide where to go next ---
            // If we are in the initial import flow, we still need to generate the JSON.
            if (!configured) {
                console.log("generating json..");
                const jsonResponse = await axios.post(
                    `${API_BASE_URL}/api/v1/publication/${publicationId}/generate-json`,
                );
                //   call the api for groupconfig generation here.
                // want savesections() to be called here by generating the sections
                // set sections here
                console.log("jsonresponse: ", jsonResponse.data);
                const allModules = jsonResponse.data.dataModules || [];
                const autoGeneratedSections = jsonResponse.data.sections || [];

                // "Hydrate" the sections: map the module keys from the section config
                // to the full {key, title} objects from the dataModules list.
                const hydratedSections = autoGeneratedSections.map(
                    (section) => ({
                        ...section, // Includes id, name, firstDmKey, and moduleKeys
                        isCollapsed: false, // Add default UI state
                        // Find the full module object for each key in the section
                        modules: section.moduleKeys
                            .map((key) => allModules.find((m) => m.key === key))
                            .filter(Boolean), // Filter out any potential nulls if a key wasn't found
                    }),
                );
                console.log(
                    "Auto-generated and hydrated sections: ",
                    hydratedSections,
                );

                // Set the store's state to reflect the auto-configuration.
                // The user will be taken to the review step ('configSplitting').
                set({
                    // The 'unassigned' list will be empty because we have assigned everything.
                    dataModules: [],
                    // The sections are pre-populated with our generated structure.
                    sections: hydratedSections,
                    importStep: ImportStep.SUCCESS,
                });
            }
        } catch (err) {
            const message =
                err.response?.data?.error || "Could not save project details.";
            set({ importStep: ImportStep.ERROR, error: message });
        } finally {
            set({ isLoading: false });
        }
    },
    /**
     * --- REWRITTEN: Handles the "Edit" flow ---
     * Pre-loads all data needed for both config steps and starts at the Details form.
     */
    // startEditConfiguration: async (project) => {
    //     set({ isLoading: true, error: null, importStep: ImportStep.SAVING }); // Show a generic loading state
    //     try {
    //         // 1. Fetch the saved configuration JSON from the backend.
    //         const response = await axios.get(
    //             `${API_BASE_URL}/api/v1/publications/${project.id}/config`,
    //         );
    //         const { publicationJson, groupConfigJson } = response.data;

    //         const savedSections = JSON.parse(groupConfigJson || "[]");
    //         const fullPublication = JSON.parse(publicationJson || "{}");

    //         // 2. Prepare the data for the drag-and-drop step (ConfigSplitting).
    //         const allModules = extractAllChapterKeys(
    //             fullPublication.treeData || "[]",
    //         );
    //         const assignedKeys = new Set(
    //             savedSections.flatMap((section) => section.moduleKeys),
    //         );
    //         const unassignedModules = allModules.filter(
    //             (module) => !assignedKeys.has(module.key),
    //         );
    //         const hydratedSections = savedSections.map((section) => ({
    //             ...section,
    //             isCollapsed: false,
    //             modules: section.moduleKeys
    //                 .map((key) => allModules.find((m) => m.key === key))
    //                 .filter(Boolean),
    //         }));

    //         console.log("configr", project.IsConfigured);
    //         let dmsToFill = [];
    //         if (project.IsConfigured) {
    //             dmsToFill = dmsToFill;
    //         } else {
    //             dmsToFill = unassignedModules;
    //         }
    //         console.log("dmstofil: ", dmsToFill);
    //         console.log("unassigned: ", unassignedModules);
    //         // 3. Set all the pre-loaded data in the store and move to the first config step.
    //         set({
    //             publicationId: project.id,
    //             inferredName: project.name,
    //             companyDetails: project.companyDetails, // Pre-populate company details
    //             sections: hydratedSections,
    //             dataModules: dmsToFill,
    //             importStep: "configDetails", // <-- START at the details form
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         const message =
    //             err.response?.data?.error ||
    //             "Could not load configuration for editing.";
    //         set({ importStep: "error", error: message });
    //     } finally {
    //         set({ isLoading: false });
    //     }
    // },

    /**
     * Step 3.2: Adds a new empty section.
     * @param {string} sectionName
     */
    addSection: (sectionName) => {
        if (!sectionName.trim()) return;
        const newSection = {
            id: `section-${Date.now()}`,
            name: sectionName,
            modules: [], // This will hold the full {key, title} objects
            isCollapsed: false, // <-- NEW: Sections start expanded by default
            firstDmKey: null,
        };
        set(
            produce((state) => {
                state.sections.push(newSection);
            }),
        );
    },

    /**
     * --- NEW: Toggles the collapsed state of a section ---
     * @param {string} sectionId The ID of the section to toggle.
     */
    toggleSectionCollapse: (sectionId) => {
        set(
            produce((state) => {
                const section = state.sections.find((s) => s.id === sectionId);
                if (section) {
                    section.isCollapsed = !section.isCollapsed;
                }
            }),
        );
    },

    /**
     * --- NEW: Edits the name of a section ---
     * @param {string} sectionId The ID of the section to edit.
     * @param {string} newName The new name for the section.
     */
    editSectionName: (sectionId, newName) => {
        if (!newName.trim()) return;
        set(
            produce((state) => {
                const section = state.sections.find((s) => s.id === sectionId);
                if (section) {
                    section.name = newName;
                }
            }),
        );
    },

    /**
     * Step 3.2: Handles the logic after a drag-and-drop action.
     * @param {object} result The result object from react-beautiful-dnd.
     */
    /**
     * --- REWRITTEN: Correctly handles drop order and sets firstDmKey ---
     */
    handleDragEnd: (result) => {
        const { source, destination } = result;
        // Do nothing if the item is dropped outside a valid droppable area.
        if (!destination) {
            return;
        }

        // Do nothing if the item is dropped back into its starting position.
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        set(
            produce((state) => {
                let draggedModule;

                // 1. FIND AND REMOVE THE DRAGGED MODULE FROM ITS SOURCE

                const sourceList =
                    source.droppableId === "unassigned"
                        ? state.dataModules
                        : state.sections.find(
                            (s) => s.id === source.droppableId,
                        )?.modules;

                if (!sourceList) return; // Safety check

                // `splice` removes the item and returns it in an array.
                [draggedModule] = sourceList.splice(source.index, 1);

                // --- FIX FOR A SUBTLE BUG ---
                // If we just removed the first and only item from a section,
                // its `firstDmKey` should be reset to null.
                if (source.droppableId !== "unassigned") {
                    const sourceSection = state.sections.find(
                        (s) => s.id === source.droppableId,
                    );
                    if (sourceSection && sourceSection.modules.length === 0) {
                        sourceSection.firstDmKey = null;
                    }
                }

                // 2. FIND THE DESTINATION AND ADD THE DRAGGED MODULE

                const destList =
                    destination.droppableId === "unassigned"
                        ? state.dataModules
                        : state.sections.find(
                            (s) => s.id === destination.droppableId,
                        )?.modules;

                if (!destList) return; // Safety check

                // `splice` at the `destination.index` correctly inserts the item
                // at the exact spot the user dropped it. This is the key to preserving order.
                destList.splice(destination.index, 0, draggedModule);

                // --- NEW LOGIC: SET `firstDmKey` ---
                // If the module was dropped into a section (not back to unassigned)
                if (destination.droppableId !== "unassigned") {
                    const destSection = state.sections.find(
                        (s) => s.id === destination.droppableId,
                    );
                    // If this is the FIRST item ever dropped into this section, set its key.
                    if (destSection && destSection.modules.length === 1) {
                        destSection.firstDmKey = draggedModule.key;
                    }
                }
            }),
        );
    },

    /**
     * Step 3.2: Saves the final section structure to the backend.
     */
    saveSections: async () => {
        set({ isLoading: true, error: null, importStep: ImportStep.SAVING });
        const { publicationId, sections } = get();
        try {
            // Format the data for the API.
            const payload = sections.map((section) => ({
                id: section,
                name: section.name,
                // The backend only needs the list of keys (dm_name) in order.
                moduleKeys: section.modules.map((module) => module.key),
                firstDmKey: section.firstDmKey, // <-- SEND THE NEW KEY
            }));

            // API CALL
            await axios.patch(
                `${API_BASE_URL}/api/v1/publication/${publicationId}/groups`,
                payload,
            );

            set({ importStep: ImportStep.SUCCESS });
            get().closeWizard();
        } catch (err) {
            const message =
                err.response?.data?.error ||
                "Could not save section structure.";
            set({ importStep: ImportStep.ERROR, error: message });
        } finally {
            set({ isLoading: false });
        }
    },

    /**
     * --- REWRITTEN: Handles the "Edit" flow ---
     * Pre-loads all data needed for both config steps and starts at the Details form.
     */
    startEditConfiguration: async (project: PublicationMeta) => {
        set({ isLoading: true, error: null, importStep: ImportStep.SAVING }); // Show a generic loading state
        try {
            // 1. Fetch the saved configuration JSON from the backend.
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/publication/${project.id}/config`,
            );
            const { publicationJson, groupConfigJson } = response.data;

            const savedSections = JSON.parse(groupConfigJson || "[]");
            const fullPublication = JSON.parse(publicationJson || "{}");

            // 2. Prepare the data for the drag-and-drop step (ConfigSplitting).
            const allModules = extractAllChapterKeys(
                fullPublication.treeData || "[]",
            );
            const assignedKeys = new Set(
                savedSections.flatMap((section) => section.moduleKeys),
            );
            const unassignedModules = allModules.filter(
                (module) => !assignedKeys.has(module.key),
            );
            const hydratedSections = savedSections.map((section) => ({
                ...section,
                isCollapsed: false,
                modules: section.moduleKeys
                    .map((key) => allModules.find((m) => m.key === key))
                    .filter(Boolean),
            }));

            let dmsToFill = [];
            if (project.isConfigured) {
                dmsToFill = dmsToFill;
            } else {
                dmsToFill = unassignedModules;
            }
            console.log("dmstofil: ", dmsToFill);
            console.log("unassigned: ", unassignedModules);
            // 3. Set all the pre-loaded data in the store and move to the first config step.
            set({
                publicationId: project.id,
                inferredName: project.name,
                companyDetails: project.companyDetails, // Pre-populate company details
                sections: hydratedSections,
                dataModules: dmsToFill,
                importStep: ImportStep.CONFIG_DETAILS, // <-- START at the details form
            });
        } catch (err) {
            console.log(err);
            const message =
                err.response?.data?.error ||
                "Could not load configuration for editing.";
            set({ importStep: ImportStep.ERROR, error: message });
        } finally {
            set({ isLoading: false });
        }
    },

    /**
     * Resets the entire flow and closes the modal.
     */
    closeWizard: () => {
        useAppStore.getState().fetchProjects();
        set({ importStep: ImportStep.IDLE });
    },
    resetStore: () => {
        set({
            importStep: ImportStep.IDLE,
            isLoading: false,
            error: "",
            publicationId: "",
            inferredName: "",
            isCollapsed: false,
            validationReport: undefined,
            dataModules: [],
            sections: [],
            companyDetails: ""
        })
    }
}));

export { useImportStore };
