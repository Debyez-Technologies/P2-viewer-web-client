import { useEffect, useRef, useState, createElement, forwardRef } from "react";

/**
 * Dynamically loads an SVG from a remote server and renders it.
 * @param {string} path The URL path to the SVG file.
 * @returns {{error: unknown, loading: boolean, SvgComponent: React.FC | null}}
 */
export function useDynamicSvgImport(path) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [Svg, setSvgComponent] = useState(null);

  useEffect(() => {
    if (!path) return;

    setLoading(true);
    setError(undefined);
    setSvgComponent(null);

    const importSvg = async () => {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Failed to fetch SVG: ${response.statusText}`);
        }
        const svgText = await response.text();

        // Create a React component that appends the SVG to the DOM
        const Component = forwardRef(({ onSvgLoad, ...props }, ref) => {
          const containerRef = useRef(null);

          useEffect(() => {
            const container = ref?.current || containerRef.current;
            if (container && svgText) {
              const parser = new DOMParser();
              const doc = parser.parseFromString(svgText, "image/svg+xml");
              const svgElement = doc.querySelector("svg");

              if (svgElement) {
                container.innerHTML = "";
                container.appendChild(svgElement);

                // ✅ Notify that SVG is ready
                onSvgLoad?.(svgElement);
              }
            }
          }, [svgText]);

          return createElement("div", {
            ref: ref || containerRef,
            style: { display: "inline-block", lineHeight: 0 },
            ...props,
          });
        });

        setSvgComponent(() => Component);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    importSvg();
  }, [path]);

  return { error, loading, Svg };
}
