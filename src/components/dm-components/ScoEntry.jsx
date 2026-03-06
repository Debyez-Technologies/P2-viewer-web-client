import React from 'react';

/**
 * Component for the S1000D <scoEntry> element.
 * 
 * This is a central element for a SCORM content package, representing a
 * learning event or a structural node in the course hierarchy (like a chapter
 * or module). It contains a title and a list of items.
 * 
 * Parent: (content) or <ScoEntryItem> (for nesting)
 * Children: <scoEntryTitle> (rendered as TextBlock), <ScoEntryItem>
 */
export default function ScoEntry({ children }) {
  return (
    <div className="pl-4 mt-2 border-l-2 border-gray-300">
      {children}
    </div>
  );
}