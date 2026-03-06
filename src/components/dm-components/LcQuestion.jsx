import React from 'react';

/**
 * Component for the S1000D <lcQuestion> element.
 * 
 * Displays the main text or "stem" of an assessment question.
 * 
 * Parent: <LcTrueFalse>, <LcSingleSelect>, etc.
 * Children: <description>
 */
export default function LcQuestion({ children }) {
  return (
    <div className="font-semibold text-gray-900 mb-4">
      {children}
    </div>
  );
}