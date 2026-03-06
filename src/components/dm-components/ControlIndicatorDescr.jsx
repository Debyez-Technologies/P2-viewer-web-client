import React from 'react';

/**
 * Component for the S1000D <controlIndicatorDescr> element.
 * 
 * Contains specific information for a control or indicator, like its function.
 * 
 * Parent: <ControlIndicatorSpec>
 * Children: <note>, <controlIndicatorFunction> (TextBlock)
 */
export default function ControlIndicatorDescr({ children }) {
  return (
    <div className="mt-2">
      {children}
    </div>
  );
}