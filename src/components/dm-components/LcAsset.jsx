import React from 'react';

/**
 * Component for the S1000D <lcAsset> element.
 * 
 * Contains images and other graphic assets to support an assessment interaction.
 * 
 * Parent: <LcCompletion>, <LcDragAndDrop>, <LcMatching>, etc.
 * Children: <figure>, <figureAlts>
 */
export default function LcAsset({ children }) {
  return (
    <div className="my-4 flex justify-center">
      {children}
    </div>
  );
}