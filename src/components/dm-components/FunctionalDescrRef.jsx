import Hyperlink from "./Hyperlink";

/**
 * Component for the S1000D <functionalDescrRef> element.
 * 
 * Contains references to other parts of the technical publications for further
 * functional information about an item (e.g., wire, harness, equipment).
 * 
 * Potential Children:
 * - refs (Visible Component: Refs - assuming it exists)
 */
export default function FunctionalDescrRef({ children, linkData, ...props }) {
  // Pass the extracted linkData and any text children to the Hyperlink component.
  // The 'props' are passed down so attributes like 'className' still work.
  return (
    <Hyperlink linkData={linkData} substituteText={children} {...props} />
  );
}