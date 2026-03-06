import { create } from "zustand";
import axios from ".";


import {
    findFirstKey,
    findFirstTitle,
    findNodeByKey,
    computeFilteredTree,
    findGroupForKey,
    findMatchingItems,
} from "../utils/publicationUtils";
import { PublicationStore } from "@/types/publication";
import { getCurrentPublicationId } from "@/lib/utils";
import { useAuthStore } from "./auth";
import { API_BASE_URL } from "@/config/settings";

const usePublicationStore = create<PublicationStore>((set, get) => {
    return {
        publicationId: null,
        publicationData: [],
        treeData: [],
        textNodes: [],
        status: "idle",
        error: "",
        currentKey: null,
        activeKey: null,
        currentTitle: "",
        scrollToID: null,
        chapterFilter: null, // Will be { type: 'range' | 'list', ... } | null
        lastChapterFilter: null,
        filteredTreeData: [],
        projectGroup: "",
        resourceList: [],
        currentDmData: undefined,
        currentDMInfo: undefined,
        groups: [],

        getPublicationData: async (projectID) => {
            // Prevent re-fetching if already loading or succeeded
            // if (get().status !== 'idle') {
            //     return;
            // }
            if (get().status === "idle" || get().publicationId !== projectID) {
                set({ status: "loading", error: null });
            }

            try {
                // getPublicationJSON from DB for projectid
                const response = await axios.get(
                    `${API_BASE_URL}/api/v1/publication/${projectID}/config`,
                );
                console.log("api response: ", response);

                const data = JSON.parse(response.data.publication_json || "{}");
                const groups = JSON.parse(
                    response.data.group_config_json || "{}",
                );

                console.log("data: ", JSON.stringify(data));
                console.log("pub data: ", data.publicationData);
                console.log("group data: ", groups);

                console.log("total resources", data.resourceList);
                set({
                    status: "succeeded",
                    publicationId: projectID,
                    groups: groups,
                    publicationData: data["publicationData"],
                    currentKey: findFirstKey(data.treeData),
                    currentTitle: findFirstTitle(data.treeData),
                    treeData: data["treeData"],
                    filteredTreeData: data["treeData"], // Initially, the filtered tree is the full tree.
                    chapterFilter: null,
                    lastChapterFilter: null,
                    resourceList: data["resourceList"],
                });
            } catch (err) {
                console.error(err);
                set({
                    status: "failed",
                    error: err.message,
                });
            }
        },

        resetPublicationData: () => {
            try {
                if (Object.keys(get().publicationData).length !== 0) {
                    set({
                        publicationData: [],
                        treeData: [],
                        groups: [],
                        status: "reset",
                        publicationId: null,
                    });
                    console.log("status changed to : ", get().status);
                }
            } catch (error) {
                console.error(error);
                set({
                    error: error,
                });
            }
        },

        clearScrolltoID: () => set({ scrollToID: null }),

        setCurrentKey: (key) => {
            if (!key) return;
            let fileKey = key;
            let elementID = null;
            if (key.includes("#")) {
                [fileKey, elementID] = key.split("#");
            }
            const node = findNodeByKey(get().treeData, key);
            set({
                activeKey: key, // <-- Set the full active key
                currentKey: fileKey,
                scrollToID: elementID,
                currentTitle: node ? node.title : "Title not found",
            });
        },

        setChapterFilter: (group) => {
            // If no group is passed, clear the filter and reset the tree.
            if (!group) {
                set({
                    chapterFilter: null,
                    filteredTreeData: get().treeData, // Reset to the full, original tree
                    projectGroup: "",
                });
                return;
            }

            // Create a Set from the group's module keys for efficient lookups.
            const filterSet = new Set(group.moduleKeys || []);

            // Call the new, robust compute function.
            const newFilteredTree = computeFilteredTree(
                get().treeData,
                filterSet,
            );

            set({
                chapterFilter: group,
                filteredTreeData: newFilteredTree,
                projectGroup: group.name,
            });
        },

        clearChapterFilter: () => {
            const newFilteredTree = computeFilteredTree(get().treeData, null); // Recompute with no filter
            set({
                chapterFilter: null,
                filteredTreeData: newFilteredTree,
            });
        },

        // MODIFIED: This is now a simple selector that returns the stored state.
        // It is stable and will not cause re-renders.
        getFilteredTree: () => get().filteredTreeData,

        // Action to set the current page by its key
        // setCurrentKey: (key) => set({ currentKey: key }),

        // Create a map binding key --> item
        getOrderedKeys: () => {
            return get().publicationData.map((item) => item.key);
        },

        /**
         * --- MODIFIED: This function now works correctly with the pruned tree ---
         */
        getFilteredOrderedKeys: () => {
            const { chapterFilter } = get();

            // If a filter is active, the ordered keys are simply the keys from that group.
            // This is much more direct and avoids errors from traversing a partially filtered tree.
            if (chapterFilter && chapterFilter.moduleKeys) {
                return chapterFilter.moduleKeys;
            }

            // If no filter, return all keys from the full publication.
            return get().publicationData.map((item) => item.key);
        },

        /**
         * --- REWRITTEN: This now provides a complete, ordered list of ALL visible keys ---
         */
        // getFilteredOrderedKeys: () => {
        //     // We get the list of keys directly from the `filteredTreeData` that the user sees.
        //     const { filteredTreeData } = get();
        //     return flattenTreeKeys(filteredTreeData);
        // },

        setProjectGroup: (title) =>
            set({
                projectGroup: title,
            }),

        // --- NEW "SMART" NAVIGATION ACTION ---
        navigateToKey: (key) => {
            if (!key) return;
            const { groups } = get();

            // Find which group this key belongs to.
            const targetGroup = findGroupForKey(key, groups);

            // This single call now handles setting the filter and updating the tree correctly.
            get().setChapterFilter(targetGroup);

            // Finally, set the current key to navigate to the page.
            get().setCurrentKey(key);
        },

        setCurrentTitle: (key) => {
            const treeData = get().treeData;
            const res = findNodeByKey(treeData, key);

            if (res)
                set({
                    currentTitle: res.title,
                });
            else
                set({
                    currentTitle: "Title not found",
                });
        },

        // accumulator reduces the publication map; mapping key -> content
        // key called --> content loads corresponding to key
        getContentMap: () => {
            return get().publicationData.reduce((acc, item) => {
                acc[item.key] = item.value.content;
                return acc;
            }, {});
        },

        searchContent: (query, flag = "global") => {
            if (!query || query.trim().length === 0) {
                set({ textNodes: [] });
                return; // <-- The important fix is here.
            }

            // This part of the function is now only reached if the query is valid.
            const data = get().publicationData;
            const filteredKeys = get().getFilteredOrderedKeys();
            const searchResults = findMatchingItems(data, query);
            if (flag === "global") {
                set({
                    textNodes: searchResults,
                });
            } else {
                const filteredSearch = searchResults.filter((result) =>
                    filteredKeys.includes(result.key),
                );
                console.log(filteredSearch, "Search filtered");
                set({
                    textNodes: filteredSearch,
                });
            }
        },
        resetTextNodes: () => {
            set({ textNodes: [] });
        },

        setCurrentDmData: () => {
            const dmCode = get().currentKey;
            const publication = get().publicationData;

            const dmData = publication.find((pub) => pub.key === dmCode);
            console.log("Current DM data on DM load", dmCode, dmData);

            set({
                currentDmData: dmData,
            });
        },
        setCurrentDMInfo: async (dm) => {
            const { currentUser } = useAuthStore.getState()
            try {
                const pmid = getCurrentPublicationId(currentUser.id)
                const response = await axios.get(
                    `${API_BASE_URL}/api/v1/datamodule/${dm}/${pmid}`,
                );
                console.log(response.data, "dm data");
                console.log("setting current dm");
                // const data = Array.isArray(response.data) ? response.data : []
                set({
                    currentDMInfo: response.data
                });
            } catch (error) {
                console.error(error, "Error reteriving dm data");
            }
        },

        setPublicationIDinPublicationStore: (id) => {
            set({
                publicationId: id,
            });
        },

        getSignedUrlForProductImage: async (publicationId, userId) => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/v1/publication/${publicationId}/${userId}/product/signed-url`,
                );
                if (!res.data) {
                    return null;
                }
                const signed_url = res.data.image_url;
                return signed_url;
            } catch (error) {
                console.log(error, "error fetching signed url");
            }
        },

        resetStore: () => {
            set({
                publicationId: null,
                publicationData: [],
                treeData: [],
                textNodes: [],
                status: "idle",
                error: "",
                currentKey: null,
                activeKey: null,
                currentTitle: "",
                scrollToID: null,
                chapterFilter: null, // Will be { type: 'range' | 'list', ... } | null
                lastChapterFilter: null,
                filteredTreeData: [],
                projectGroup: "",
                resourceList: [],
                currentDmData: undefined,
                currentDMInfo: undefined,
                groups: []
            })
        },
    };
});

export { usePublicationStore };
