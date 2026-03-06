/**
 * projectGroups.js
 * 
 * This file defines the "supergroup" categories for the project dashboard,
 * structured in a task-oriented way for maximum user accessibility.
 * It has been carefully created based on the structure of the project's pm.xml.
 */
export const projects = [
  {
    data: {
        product:"Main Switch Board",
        author:"Waves Electronics",
        companyLogo:"../assets/images/waves.png",
        datamodules:68,
        published: "2025-08-11",
        productImage: "../assets/images/MSB.jpg"
    },
    groups: [
        {
            id: 'group-overview',
            title: 'Introduction & System Overview',
            description: 'Start here. Covers general info, system functions, specifications, and safety.',
            // RANGE: Combines the first two major sections ("General Information" and "System Description").
            startChapterKey: "DMC-MSB-A-HD0-00-00-00A-018A-D_001-00_EN-IN.xml", // First DM of "General Information"
            endChapterKey: "DMC-MSB-A-HD0-00-00-00A-044B-D_001-00_EN-IN.xml",   // Last DM of "System Description"
            firstDmKey: "DMC-MSB-A-HD0-00-00-00A-018A-D_001-00_EN-IN.xml",
        },
            {
            id: 'group-installation',
            title: 'Installation',
            description: 'Step-by-step guidance for installing and commissioning the MSB unit.',
            // RANGE: Covers the single "Installation and Commissioning" section.
            startChapterKey: "DMC-MSB-A-HD0-00-00-00A-842A-D_001-00_EN-IN.xml", // First DM of "Installation"
            endChapterKey: "DMC-MSB-A-HD0-00-00-00A-348A-D_001-00_EN-IN.xml",   // Last DM of "Installation"
            firstDmKey: "DMC-MSB-A-HD0-00-00-00A-842A-D_001-00_EN-IN.xml",
        },
        {
            id: 'group-operations',
            title: 'Operations',
            description: 'Procedures for daily use, including startup, shutdown, and emergency conditions.',
            // RANGE: Covers the single "Operation" section.
            startChapterKey: "DMC-MSB-A-HD2-00-00-00A-130A-D_001-00_EN-IN.xml", // First DM of "Operation"
            endChapterKey: "DMC-MSB-A-HD5-00-00-00A-142A-D_001-00_EN-IN.xml",   // Last DM of "Operation"
            firstDmKey: "DMC-MSB-A-HD2-00-00-00A-130A-D_001-00_EN-IN.xml",
        },
        {
            id: 'group-maintenance',
            title: 'Maintenance',
            description: 'Scheduled preventive maintenance, including safety, cleaning, and testing procedures.',
            // RANGE: Covers the single "Maintenance" section.
            startChapterKey: "DMC-MSB-A-HD0-00-00-00A-012B-D_001-00_EN-IN.xml", // First DM of "Maintenance"
            endChapterKey: "DMC-MSB-A-HD7-00-00-00A-340A-D_001-00_EN-IN.xml",   // Last DM of "Maintenance"
            firstDmKey: "DMC-MSB-A-HD0-00-00-00A-012B-D_001-00_EN-IN.xml",
        },
        {
            id: 'group-fault-iso',
            title: 'Repair & Fault Isolation',
            description: 'Diagnostic guides and procedures for troubleshooting and resolving faults.',
            // RANGE: Covers the single "Fault Isolation" section.
            startChapterKey: "DMC-MSB-A-HD0-00-00-00A-010A-D_001-00_EN-IN.xml", // First DM of "Fault Isolation"
            endChapterKey: "DMC-MSB-A-HD0-00-00-00A-420A-D_001-00_EN-IN.xml",   // Last DM of "Fault Isolation"
            firstDmKey: "DMC-MSB-A-HD0-00-00-00A-010A-D_001-00_EN-IN.xml",
        },
        {
            id: 'group-parts',
            title: 'Parts',
            description: 'Illustrated parts data, catalogs, and instructions for ordering spare parts.',
            // RANGE: Covers the single "Illustrated Parts Data" section.
            startChapterKey: "DMC-MSB-A-HD0-00-00-00A-010B-D_001-00_EN-IN.xml", // First DM of "Parts Data"
            endChapterKey: "DMC-MSB-A-HD0-00-00-00A-942A-D_001-00_EN-IN.xml",   // Last DM of "Parts Data"
            firstDmKey: "DMC-MSB-A-HD0-00-00-00A-010B-D_001-00_EN-IN.xml",
        },
        {
            id: 'group-schematics',
            title: 'Schematics & Appendices',
            description: 'Technical drawings, wiring diagrams, glossaries, and other supporting info.',
            startChapterKey: "DMC-MSB-A-HD0-00-00-00A-00DA-D_001-00_EN-IN.xml",
            endChapterKey: "DMC-MSB-A-HD0-00-00-00A-012C-D_001-00_EN-IN.xml",
            firstDmKey: "DMC-MSB-A-HD0-00-00-00A-00DA-D_001-00_EN-IN.xml",
            // LIST: Combines the "Supporting Information", "Storage", and "Appendices" sections.
            // chapterKeys: [
            //   "DMC-MSB-A-HD0-00-00-00A-00DA-D_001-00_EN-IN.xml", // Spares for 2 years"
            //   "DMC-MSB-A-HD0-00-00-00A-070A-D-001-00_EN-IN.xml", // Consulmables and materials
            //   "DMC-MSB-A-HD0-00-00-00A-061A-D-001-00_EN-IN.xml",
            //   "DMC-MSB-A-HD0-00-00-00A-054A-D-001-00_EN-IN.xml",
            //   "DMC-MSB-A-HD0-00-00-00A-054B-D-001-00_EN-IN.xml",
            //   "DMC-MSB-A-HD0-00-00-00A-054C-D-001-00_EN-IN.xml",
            //   "DMC-MSB-A-HD0-00-00-00A-051A-D-001-00_EN-IN.xml",

            //   "DMC-MSB-A-HD0-00-00-00A-812A-D_001-00_EN-IN.xml", // First DM of "Storage and Transportation"
            //   "DMC-MSB-A-HD0-00-00-00A-850A-D_001-00_EN-IN.xml",

            //   "DMC-MSB-A-HD0-00-00-00A-006A-D_001-00_EN-IN.xml",  // First DM of "Appendices"
            //   "DMC-MSB-A-HD0-00-00-00A-012C-D_001-00_EN-IN.xml",
            // ],
            // firstDmKey: "DMC-MSB-A-HD0-00-00-00A-00DA-D_001-00_EN-IN.xml",
        }
    ]
        
  }
];