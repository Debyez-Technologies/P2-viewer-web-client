import React from 'react';

/**
 * Component for the S1000D <documentIncorporation> element.
 * 
 * Lists the specific data modules and publications that a technical
 * condition affects, along with their incorporation status.
 * 
 * Parent: <CondIncorporation>
 * Children: <refs>, <incorporationStatus> (Metadata)
 */
export default function DocumentIncorporation({ children }) {
  // The backend would process the <incorporationStatus> metadata and could pass it
  // as a prop here if needed for display logic. For now, we render the refs.
  return (
    <div className="p-2 border-t first:border-t-0">
      <h4 className="font-semibold">Affected Documents:</h4>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}