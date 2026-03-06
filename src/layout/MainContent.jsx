// import { useEffect } from "react";
// import { usePublicationStore } from "../store/publication-store";
import Toolbar from "../components/app-components/toolbar/Toolbar";
import PublicationLayout from "./PublicationLayout";
import { forwardRef, useRef } from "react";

const MainContent = forwardRef((props, ref) => {


  return (
    <div className="relative"> {/* Added relative to the main container */}
      <div className="flex px-12 py-8 bg-white"> {/* Added padding-top to account for the fixed toolbar */}
        <main className="pl-20 max-w-7xl flex text-left">
          <PublicationLayout printRef={ref} />
        </main>
      </div>
    </div>
  );
})

export default MainContent;