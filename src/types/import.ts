enum ImportStep {
    IDLE = "idle",
    UPLOADING = "uploading",
    VALIDATION = "validation",
    VIEWING_REPORT = "viewingReport",
    CONFIG_DETAILS = "configDetails",
    CONFIG_SPLITTING = "configSplitting",
    SAVING = "saving",
    SAVE_NO_CONFIG = "savenoConfig",
    ERROR = "error",
    SUCCESS = "success"
}

type DataModules = {
    key: string
    title: string
}

type Sections = {
    id: string
    name: string
    firstDmKey: string
    modules: DataModules[]
    isCollapsed: boolean
}

enum Level {
    LEVEL_PASS = "PASS",
    LEVEL_INFO = "INFO",
    LEVEL_WARNING = "WARNING",
    LEVEL_ERROR = "ERROR",
    LEVEL_FATAL = "FATAL",
}

type ValidationResult = {
    level: Level
    validator: string
    ruleID: string
    message: string
    lineNumber: number
}

type ValidationReport = {
    summary: string
    results: ValidationResult[]
}

type ImportStore = {
    importStep: ImportStep
    isLoading: boolean,
    error: string,
    publicationId: string,
    inferredName: string,
    isCollapsed: boolean,
    validationReport: any,
    dataModules: DataModules[],
    sections: Sections[],
    companyDetails: string

    startImport: () => void

    uploadPublication: (file: File) => Promise<string | void>

    runValidation: () => Promise<void>

    skipValidation: () => void

    proceedToConfiguration: () => void

    skipConfiguration: () => void

    saveProjectDetails: (
        details: {
            name: string
            companyDetails: string
            companyLogo?: File
            productImage?: File
        },
        configured: boolean
    ) => Promise<void>

    startEditConfiguration: (project: any) => Promise<void>

    addSection: (sectionName: string) => void

    toggleSectionCollapse: (sectionId: string) => void

    editSectionName: (sectionId: string, newName: string) => void

    handleDragEnd: (result: any) => void

    saveSections: () => Promise<void>

    closeWizard: () => void

    resetStore: () => void
}

export { ImportStore, ImportStep }