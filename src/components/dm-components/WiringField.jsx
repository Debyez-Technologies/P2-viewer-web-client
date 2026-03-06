import React from 'react';

/**
 * A reusable component for rendering a single field description (a label/value pair)
 * from a Wiring Fields data module (wrngflds).
 * 
 * This component is designed to render any <descr...> element that contains
 * a <fieldName> child. It displays the fieldName as a label and any subsequent
 * children (like <descr> or <refs>) as the value.
 *
 * This single component replaces dozens of nearly identical components like
 * <DescrAmperage>, <DescrPartNumber>, etc.
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - The child components. The first is expected
 *   to be the <fieldName> (a TextBlock), and the rest are the description.
 */
export default function WiringField({ children }) {
  // The first child is the <fieldName> (label).
  const fieldName = children && children.length > 0 ? children[0] : null;
  // The rest of the children are the description, refs, etc.
  const remainingChildren = children && children.length > 1 ? children.slice(1) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 border-b border-gray-200 py-3 last:border-b-0">
      <div className="md:col-span-1 font-semibold text-gray-700 break-words">
        {fieldName}
      </div>
      <div className="md:col-span-2 text-gray-600 mt-1 md:mt-0">
        {/* Render the description, refs, etc. */}
        {remainingChildren}
      </div>
    </div>
  );
}