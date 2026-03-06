import Hyperlink from "./Hyperlink";

/**
 * Component for the S1000D <equipDescrRef> element.
 * 
 * Contains references to other parts of the technical publications that provide
 * more information about a piece of electrical equipment.
 * 
 * Potential Children:
 * - refs (Visible Component: Refs - assuming it exists)
 */
export default function EquipDescrRef({ children, linkData, ...props }) {
  // Pass the extracted linkData and any text children to the Hyperlink component.
  // The 'props' are passed down so attributes like 'className' still work.
  return (
    <Hyperlink linkData={linkData} substituteText={children} {...props} />
  );
}