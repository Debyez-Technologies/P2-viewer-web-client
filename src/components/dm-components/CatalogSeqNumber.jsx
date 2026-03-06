// src/components/CatalogSeqNumber.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function CatalogSeqNumber({ children, item, ...props }) {
  const itemSeq = React.Children.toArray(children).find(child => child.type.componentType === 'ItemSeqNumber');
  if (!itemSeq) return null;

  // Find the children to be placed in cells
  const partRef = React.Children.toArray(itemSeq.props.children).find(child => child.type.componentType === 'PartRef');
  const quantity = React.Children.toArray(itemSeq.props.children).find(child => child.type.componentType === 'QuantityPerNextHigherAssy');
  const partSegment = React.Children.toArray(itemSeq.props.children).find(child => child.type.componentType === 'PartSegment');

  return (
    <tr className={styles['CatalogRow']} {...props}>
      <td className={styles['CatalogRowTd']}>
        <div className={styles['CatalogItemNumber']}>{item}</div>
      </td>
      <td className={styles['CatalogRowTd']}>
        {partRef}
      </td>
      <td className={styles['CatalogRowTd']}>
        {partSegment}
      </td>
      <td className={styles['CatalogRowTd']}>
        {quantity}
      </td>
    </tr>
  );
}
CatalogSeqNumber.componentType = 'CatalogSeqNumber';
export default CatalogSeqNumber;