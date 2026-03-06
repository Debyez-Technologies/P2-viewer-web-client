import React from 'react';

/**
 * Component for the S1000D <controlIndicatorSpec> element.
 * 
 * Contains all information for a single control or indicator, such as a switch or light.
 * 
 * Parent: Structural <controlIndicatorGroup>
 * Children: <controlIndicatorKey> (TextBlock), <controlIndicatorName> (TextBlock), <ControlIndicatorDescr>
 */
export default function ControlIndicatorSpec({ attributes, children }) {
  return (
    <div className="p-3 my-2 border rounded-md">
      <h4 className="font-semibold">Control/Indicator: {attributes.controlIndicatorNumber}</h4>
      <div className="pl-4">{children}</div>
    </div>
  );
}