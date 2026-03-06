import { useHotspotStore } from "../store/hotspot-store";
import { useInteractiveSvg } from "../hooks/useInteractiveSvg"
import MainContent from "../layout/MainContent";
import Illustration from "../components/app-components/hotspot/Illustration";
import NavigationList from "../components/app-components/hotspot/NavigationList";
import Toolbar from "../components/app-components/toolbar/Toolbar";

function HotspotMode() {
  const { selected } = useHotspotStore();
  const { setSvg } = useInteractiveSvg();

  const handleSvgLoad = (svgElement) => {
    console.log("🔥 SVG fully loaded:", svgElement);
    setSvg(svgElement);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-2 overflow-y-auto border-l-2 border-black">
        <MainContent />
      </div>

      <div className="flex flex-col p-4 m-3">
        <Toolbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
          <Illustration url={selected.url} onSvgLoad={handleSvgLoad} />
          <NavigationList />
        </div>
      </div>
    </div>
  );
}

export default HotspotMode