import React from 'react';

/**
 * Component for the S1000D <contentDescription> element.
 * 
 * Displays annotations or descriptive text about a SCO or a training step.
 * It's typically used to provide context or introductory information.
 * 
 * Parent: <ScoContentContainer>, <TrainingStep>
 * Children: <simplePara> (rendered as TextBlock or similar)
 */
export default function ContentDescription({ children }) {
  return (
    <div className="p-3 my-2 bg-blue-50 border-l-4 border-blue-400 text-blue-800 italic">
      {children}
    </div>
  );
}