import React, { useState, useEffect, useMemo } from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { useImportStore } from "../../../store/import-store";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const levelStyles = {
    ERROR: { icon: "text-red-600", border: "border-red-500", bg: "bg-red-100" },
    WARNING: {
        icon: "text-yellow-600",
        border: "border-yellow-500",
        bg: "bg-yellow-100",
    },
    INFO: {
        icon: "text-blue-600",
        border: "border-blue-500",
        bg: "bg-blue-100",
    },
    FATAL: { icon: "text-red-700", border: "border-red-700", bg: "bg-red-100" },
};

const ValidationReportView = () => {
    const validationReport = useImportStore((state) => state.validationReport);
    const closeWizard = useImportStore((state) => state.closeWizard);
    const proceedToConfiguration = useImportStore(
        (state) => state.proceedToConfiguration,
    );

    const [activeTab, setActiveTab] = useState("Schema");
    const [activeFile, setActiveFile] = useState(null);

    // --- FIX 1: Corrected Grouping Logic ---
    // This now iterates through every result for every file and groups them correctly.
    const groupedResults = useMemo(() => {
        const processed = { Schema: {}, BREX: {} };
        if (!validationReport?.results) return processed;

        // Iterate over each file from the API response (e.g., "DMC-A-...")
        for (const [fileName, resultsList] of Object.entries(
            validationReport.results,
        )) {
            // Now, iterate over each individual result within that file's list
            for (const result of resultsList) {
                if (result.validator === "Schema") {
                    // Initialize the array for this file if it's the first schema result found
                    if (!processed.Schema[fileName]) {
                        processed.Schema[fileName] = [];
                    }
                    processed.Schema[fileName].push(result);
                } else {
                    // Group all other validators (BREX, Engine, etc.) under the BREX tab
                    if (!processed.BREX[fileName]) {
                        processed.BREX[fileName] = [];
                    }
                    processed.BREX[fileName].push(result);
                }
            }
        }
        return processed;
    }, [validationReport]);

    // --- FIX 2: Stabilized Effect for Setting Active File ---
    // This effect now has a single responsibility: ensure a valid file is selected for the current tab.
    // It will NEVER change the active tab itself.
    useEffect(() => {
        const filesForCurrentTab = Object.keys(groupedResults[activeTab]);

        // Check if the currently selected file is still valid for the active tab.
        const isActiveFileInList =
            activeFile && filesForCurrentTab.includes(activeFile);

        // If the selection is already valid and correct, DO NOTHING.
        // This prevents the infinite loop/revert behavior.
        if (isActiveFileInList) {
            return;
        }

        // If the selection is invalid (e.g., after a tab switch),
        // set the active file to the first file in the new list, or null if it's empty.
        setActiveFile(
            filesForCurrentTab.length > 0 ? filesForCurrentTab[0] : null,
        );
    }, [activeTab, groupedResults, activeFile]); // Dependencies are correct

    // --- The rest of the component's rendering logic is now reliable ---

    const hasErrors = validationReport?.summary.includes("error");
    const filesForActiveTab = Object.keys(groupedResults[activeTab]);
    const resultsForActiveFile =
        groupedResults[activeTab]?.[activeFile]?.filter(
            (r) => r.level !== "PASS",
        ) || [];

    const getIssueCount = (fileName, tab) => {
        return (
            groupedResults[tab]?.[fileName]?.filter(
                (res) => res.level !== "PASS",
            ).length || 0
        );
    };

    // Calculate total issue counts for the tab buttons
    const schemaIssueCount = Object.keys(groupedResults.Schema).reduce(
        (acc, file) => acc + getIssueCount(file, "Schema"),
        0,
    );
    const brexIssueCount = Object.keys(groupedResults.BREX).reduce(
        (acc, file) => acc + getIssueCount(file, "BREX"),
        0,
    );

    return (
        <div className="space-y-4">
            <div
                className={`p-4 rounded-lg flex items-start gap-4 ${hasErrors ? "bg-red-100" : "bg-green-100"}`}
            >
                {hasErrors ? (
                    <FaExclamationTriangle className="text-3xl text-red-500 mt-1 flex-shrink-0" />
                ) : (
                    <FaCheckCircle className="text-3xl text-green-500 mt-1 flex-shrink-0" />
                )}
                <div>
                    <h3 className="text-xl font-semibold">
                        {hasErrors
                            ? "Validation Complete with Issues"
                            : "Validation Successful"}
                    </h3>
                    <p className="text-sm text-gray-700">
                        {validationReport?.summary}
                    </p>
                </div>
            </div>

            <div className="flex gap-4" style={{ height: "350px" }}>
                <div className="w-1/3 flex flex-col border border-gray-300 rounded-lg">
                    <div className="flex border-b border-gray-300">
                        <button
                            onClick={() => setActiveTab("Schema")}
                            className={`flex-1 p-2 text-center font-semibold flex items-center justify-center gap-2 ${activeTab === "Schema" ? "bg-viewer-core text-white rounded-tl-md" : "hover:bg-gray-100"}`}
                        >
                            Schema{" "}
                            {schemaIssueCount > 0 && (
                                <span className="text-xs font-bold bg-red-500 rounded-full px-2 py-0.5">
                                    {schemaIssueCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("BREX")}
                            className={`flex-1 p-2 text-center font-semibold flex items-center justify-center gap-2 ${activeTab === "BREX" ? "bg-viewer-core text-white rounded-tr-md" : "hover:bg-gray-100"}`}
                        >
                            BREX{" "}
                            {brexIssueCount > 0 && (
                                <span className="text-xs font-bold bg-red-500 rounded-full px-2 py-0.5">
                                    {brexIssueCount}
                                </span>
                            )}
                        </button>
                    </div>
                    <div className="overflow-y-auto">
                        {filesForActiveTab.map((file) => (
                            <div
                                key={file}
                                onClick={() => setActiveFile(file)}
                                className={`flex justify-between items-center p-2 cursor-pointer border-l-4 ${activeFile === file ? "bg-gray-200 border-blue-500" : "border-transparent hover:bg-gray-100"}`}
                            >
                                <span className="text-sm truncate pr-2">
                                    {file}
                                </span>
                                {getIssueCount(file, activeTab) > 0 && (
                                    <span className="text-xs font-bold text-white bg-red-500 rounded-full h-5 w-5 flex items-center justify-center">
                                        {getIssueCount(file, activeTab)}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-2/3 border border-gray-300 rounded-lg p-3 overflow-y-auto">
                    {activeFile ? (
                        <>
                            <h4 className="font-bold border-b pb-2 mb-2">
                                Issues for:{" "}
                                <span className="font-mono">{activeFile}</span>
                            </h4>
                            {resultsForActiveFile.length > 0 ? (
                                <ul className="space-y-3">
                                    {resultsForActiveFile.map((res, i) => (
                                        <li
                                            key={i}
                                            className={`p-2 border-l-4 rounded-r-md text-sm ${levelStyles[res.level]?.border || "border-gray-400"} ${levelStyles[res.level]?.bg || "bg-gray-100"}`}
                                        >
                                            <strong
                                                className={`font-bold ${levelStyles[res.level]?.icon || "text-gray-800"}`}
                                            >
                                                [{res.level}]
                                            </strong>
                                            <span className="text-gray-600">
                                                {" "}
                                                (Validator: {res.validator},
                                                Rule: {res.ruleId})
                                            </span>
                                            <p className="mt-1 pl-2">
                                                {res.message}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center text-gray-500 pt-10">
                                    <FaCheckCircle className="mx-auto text-4xl text-green-500" />
                                    <p className="mt-2">
                                        No issues found for this file.
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-gray-500 pt-10">
                            Select a file to see the details.
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-end pt-4">
                <div className="flex gap-3 px-6 py-2 bg-gray-200  text-gray-800 rounded-lg transition-colors">
                    <Info />
                    Click Continue to setup Configuration
                </div>
                <Button
                    onClick={proceedToConfiguration}
                    className="px-6 py-2 bg-viewer-core hover:bg-purple-800 text-white rounded-lg transition-colors"
                >
                    {hasErrors ? "Continue" : "Continue to Configuration"}
                </Button>
            </div>
        </div>
    );
};

export default ValidationReportView;
