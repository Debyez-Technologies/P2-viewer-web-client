// src/components/Wire.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function Wire({ children, ...props }) {
  // Children are in a predictable, flat order
  const childrenArray = React.Children.toArray(children);
  
  const wireNumberNode = childrenArray[0];
  const fromNode = childrenArray[1];
  const toNode = childrenArray[2];
  const wireTypeNode = childrenArray[3];
  const wireGaugeNode = childrenArray[4];
  const wireColorNode = childrenArray[5];
  const signalInfoNode = childrenArray[6];

  // --- START: The Fix ---
  // A helper function to create a new element with the correct text as its child
  const createRenderableNode = (node) => {
    if (!node || !node.props.linkData?.attributes?.functionalItemNumber) {
      return node; // Return the original node if data is missing
    }
    const displayText = node.props.linkData.attributes.functionalItemNumber;
    // Clone the original component, but give it the text as its new children
    return React.cloneElement(node, { children: displayText });
  };

  const renderableFromNode = createRenderableNode(fromNode);
  const renderableToNode = createRenderableNode(toNode);
  // --- END: The Fix ---

  return (
    <tr className={styles['WireRow']} {...props}>
      <td className={styles['WireRowTd']}>
        <div className={styles['WireNumber']}>{wireNumberNode}</div>
      </td>
      <td className={styles['WireRowTd']}>
        <div className={styles['WireConnection']}>{renderableFromNode}</div>
      </td>
      <td className={styles['WireRowTd']}>
        <div className={styles['WireConnection']}>{renderableToNode}</div>
      </td>
      <td className={styles['WireRowTd']}>
        <div className={styles['WireSignal']}>{signalInfoNode}</div>
        <div className={styles['WireDetails']}>
          {wireColorNode}, {wireGaugeNode} {wireGaugeNode?.props?.wireGaugeType?.toUpperCase()}, Type {wireTypeNode}
        </div>
      </td>
    </tr>
  );
}
Wire.componentType = 'Wire';
export default Wire;