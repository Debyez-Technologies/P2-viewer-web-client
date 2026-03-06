// src/components/PartSegment.jsx
import React from 'react';

function PartSegment({ children }) {
  // Find the children it needs to lay out
  const itemIdentData = React.Children.toArray(children).find(child => child.type.componentType === 'ItemIdentData');
  if (!itemIdentData) return null;

  const description = React.Children.toArray(itemIdentData.props.children).find(child => child.type.componentType === 'DescrForPart');
  const natoStockNumber = React.Children.toArray(itemIdentData.props.children).find(child => child.type.componentType === 'NatoStockNumber');

  return (
    <div>
      {description}
      {natoStockNumber}
    </div>
  );
}
PartSegment.componentType = 'PartSegment';
export default PartSegment;