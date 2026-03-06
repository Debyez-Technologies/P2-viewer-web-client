import React from 'react';

/**
 * Component for the S1000D <scoEntryItem> element.
 * 
 * Represents a single item within a SCO entry. This can be a direct reference
 * to a data module (like a learning content or assessment DM) or another
 * nested <scoEntry> to create a deeper hierarchy.
 * 
 * Parent: <ScoEntry>
 * Children: <dmRef>, <scormContentPackageRef>, <ScoEntry>
 */
export default function ScoEntryItem({ children }) {
  return (
    <div className="py-2">
      {children}
    </div>
  );
}