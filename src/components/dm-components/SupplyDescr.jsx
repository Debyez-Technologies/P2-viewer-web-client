// src/components/SupplyDescr.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function SupplyDescr({ children, ...props }) {
  const mainContent = [];
  const quantityContent = [];
  const otherContent = [];

  // Define which component types go into the main (left) column
  const mainTypes = ['Name', 'ShortName', 'IdentNumber'];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    // Use the minification-safe static property to identify the component
    const type = child.type.componentType;

    if (mainTypes.includes(type)) {
      mainContent.push(child);
    } else if (type === 'ReqQuantity') {
      quantityContent.push(child);
    } else {
      otherContent.push(child);
    }
  });

  return (
    <div className={styles['SupplyDescrWrapper']}>
      <div className={styles['SupplyDescr']} {...props}>
        {/* Left Column: Name and identifier */}
        <div className={styles['SupplyDescrMain']}>
          {mainContent}
        </div>
        {/* Right Column: Quantity */}
        <div className={styles['SupplyDescrAside']}>
          {quantityContent}
        </div>
      </div>
    </div>
  );
}

export default SupplyDescr;