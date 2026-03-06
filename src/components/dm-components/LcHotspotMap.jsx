import React from 'react';

/**
 * Component for the S1000D <lcHotspotMap> element.
 * 
 * Displays the media object (e.g., an image) over which interactive hotspot
 * regions are defined.
 * 
 * Parent: <LcHotspot>
 * Children: <figure>, <figureAlts>
 */
export default function LcHotspotMap({ children }) {
  // This component would likely render the figure and potentially an overlay for hotspots.
  return (
    <div className="relative my-4">
      {children}
    </div>
  );
}