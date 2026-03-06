import { LoginCredentials } from "./auth";

interface UIStoreState {
  
  expandViewState: boolean;
  bookmarkListState: boolean;
  floatingWindowState: boolean;
  bookmarkFormState: boolean;
  // If you are using React Refs, you can change 'any' to React.RefObject<HTMLDivElement>
  fullPublicationPrintRef: any | null; 
  isPrinting: boolean;
  annotationManagerState: boolean;
  noteWindowState: boolean;
  hotspottingMode: boolean;
  isChatUiOpen: boolean;
  // Replace 'any' with a specific Credential interface if you have one
  creds: any | null; 
  isWireframeMode: boolean;
  selectedDashbtn: string;
  isOpenRelatedSection: boolean;

  // Actions
  toggleFloatingWindowState: () => void;
  toggleAnnotationManagerState: () => void;
  toggleExpandedView: () => void;
  toggleBookmarkList: () => void; // Kept original naming (typo: Bookmar)
  toggleBookmarkForm: () => void;
  toggleNoteWindowState: () => void;
  toggleHotspotView: () => void;
  setCreds: (creds: LoginCredentials) => void;
  setIsWireframeMode: () => void;
  toggleChatUi: () => void;
  setSelectedDashbtn: (id: string) => void;
  setIsOpenRelatedSection: (state: boolean) => void;
}
