// A recursive helper to find the very first valid key (no '#') in the ToC.
export const findFirstKey = (nodes) => {
    if (!nodes) return null;
    for (const node of nodes) {
        // Return the key immediately if it's a valid chapter key
        if (node.key && !node.key.includes('#')) {
            return node.key;
        }
        // Otherwise, search deeper in its children
        if (node.children) {
            const childKey = findFirstKey(node.children);
            if (childKey) return childKey;
        }
    }
    return null;
};

// A recursive helper to find the very first title in the ToC.
export const findFirstTitle = (nodes) => {
    if (!nodes) return null;
    for (const node of nodes) {
        if (node.title) return node.title;
        if (node.children) {
            const childTitle = findFirstTitle(node.children); // Note: Corrected to call itself
            if (childTitle) return childTitle;
        }
    }
    return null;
};


// A recursive helper to find a node anywhere in the tree by its exact key.
export function findNodeByKey(nodes, key) {
    if (!nodes) return null;
    for (const node of nodes) {
        if (node.key === key) {
            return node;
        }
        if (node.children) {
            const foundInChildren = findNodeByKey(node.children, key);
            if (foundInChildren) {
                return foundInChildren;
            }
        }
    }
    return null;
}

/**
 * A recursive helper to check if a node or any of its descendants has a specific key.
 * This is crucial for filtering top-level chapters.
 * @param {object} node The starting node of the tree.
 * @param {string} keyToFind The key to search for.
 * @returns {boolean}
 */
export const nodeOrDescendantsContainsKey = (node, keyToFind) => {
    // Check the node itself
    if (node.key === keyToFind) {
        return true;
    }
    // If it has children, recursively check them
    if (node.children) {
        // `some` is efficient, as it stops as soon as it finds a match
        return node.children.some(child => nodeOrDescendantsContainsKey(child, keyToFind));
    }
    // If no key and no children, it's not here
    return false;
};

/**
 * Recursively flattens the treeData into an ordered list of all keys.
 * This is now the source of truth for navigation.
 * @param {Array} nodes The tree nodes to flatten.
 * @returns {Array<string>} A flat list of all keys.
 */
export const flattenTreeKeys = (nodes) => {
    let keys = [];
    if (!nodes) return keys;

    for (const node of nodes) {
        if (node.key) {
            keys.push(node.key);
        }
        if (node.children) {
            keys = keys.concat(flattenTreeKeys(node.children));
        }
    }
    return keys;
};
/**
 * --- REWRITTEN & DEFINITIVE ---
 * Computes a filtered AND pruned Table of Contents that perfectly matches the group keys.
 * This function recursively rebuilds the tree, removing any nodes at any level
 * that are not in the filter set or do not contain children that are in the set.
 * 
 * @param {Array} originalNodes The full, original treeData nodes.
 * @param {Set} filterSet A Set containing the `moduleKeys` for the current group.
 * @returns {Array} A new, perfectly pruned tree structure.
 */
export const computeFilteredTree = (originalNodes, filterSet) => {
    // If there's no filter, there's nothing to do. Return the original tree.
    if (!filterSet || filterSet.size === 0) {
        return originalNodes;
    }

    const filteredNodes = [];

    for (const node of originalNodes) {
        let filteredChildren = [];
        // Always recurse first. If a node has children, we need to know if any of them will be kept.
        if (node.children && node.children.length > 0) {
            filteredChildren = computeFilteredTree(node.children, filterSet);
        }

        // --- THE CORE PRUNING LOGIC ---
        // Keep the current node if one of these conditions is met:
        // 1. The node itself is a chapter that is explicitly in our filter list.
        // 2. The node is a structural heading (no key) but it CONTAINS children that survived the filter.
        if ((node.key && filterSet.has(node.key)) || (filteredChildren.length > 0)) {
            filteredNodes.push({
                ...node, // Copy all properties (title, key, etc.) of the original node.
                children: filteredChildren, // IMPORTANT: Replace its children with the pruned list.
            });
        }
    }

    return filteredNodes;
};

/**
 * Finds the group that a specific chapter key belongs to.
 * This replaces the old `_findGroupForKey`.
 * @param {string} key The DM key to find.
 * @param {Array} groups The array of group objects from the store.
 * @returns {object|null} The matching group object or null if not found.
 */
export const findGroupForKey = (key, groups) => {
    if (!key || !groups) return null;
    for (const group of groups) {
        if (group.moduleKeys && group.moduleKeys.includes(key)) {
            return group;
        }
    }
    return null;
};


/**
 * A recursive search function for finding text within the `publicationData`.
 * @param {Array} publicationData The array of { key, value } objects.
 * @param {string} searchQuery The text to search for.
 * @returns {Array} An array of result objects: { key, title, context }
 */
export function findMatchingItems(publicationData, searchQuery) {
    const results = [];
    if (!searchQuery || !publicationData) return results;

    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'i'); // Case-insensitive match

    // Helper to recursively search inside a RenderableUnit
    function searchRU(unit, rootKey) {
        if (!unit || typeof unit !== 'object') return;

        // Check the text of the current unit
        if (unit.text && regex.test(unit.text)) {
            // Check if this exact result (key + text) has already been added to avoid duplicates
            if (!results.some(r => r.key === rootKey && r.title === unit.text)) {
                results.push({
                    key: rootKey,
                    title: unit.text, // The matching text snippet
                });
            }
        }

        // Recurse into children
        if (unit.children) {
            for (const child of unit.children) {
                searchRU(child, rootKey);
            }
        }
    }

    // Iterate over each data module in the publication
    for (const item of publicationData) {
        if (item.value && item.value.content) {
            // Start the recursive search for each data module
            searchRU(item.value.content, item.key);
        }
    }

    return results;
}