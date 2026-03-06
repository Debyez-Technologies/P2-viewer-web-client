// src/components/print/FullPublicationPrinter.jsx
import { forwardRef, useMemo } from "react";
import { usePublicationStore } from "../store/publication-store";
import renderUnit from "../utils/S1000DRenderer";

const FullPublicationPrinter = forwardRef(({ isPrinting }, ref) => {
  const publicationData = usePublicationStore((state) => state.publicationData);

  // Memoize the data for performance

  const orderedKeys = useMemo(
    () => publicationData.map((item) => item.key),
    [publicationData]
  );

  const contentMap = useMemo(
    () =>
      publicationData.reduce((acc, item) => {
        acc[item.key] = item.value.content;

        return acc;
      }, {}),
    [publicationData]
  );

//   console.log("FullPublicationPrinter is rendering its content for printing!");

  // 2. Return the full, visible content.
  // The `printable-content` class in your style.css will handle text color.
//   console.log("ref in fullpublicationprinter: ", ref);

  // 1. ALWAYS render the container div. This is the fix.
  // The ref will attach to this div as soon as the component mounts.
  // 1. Determine the classes based on the `isPrinting` prop.

  const containerClasses = `printable-content ${!isPrinting ? "print-container-hidden" : ""}`;

  return (
    <div ref={ref} className={containerClasses}>
      {/* 2. ONLY render the expensive content when it's time to print. */}

      {isPrinting &&
        orderedKeys.map((key) => {
          const content = contentMap[key];

          if (!content) return null;

          return <article key={key}>{renderUnit(content)}</article>;
        })}
    </div>
  );
});

export default FullPublicationPrinter;
