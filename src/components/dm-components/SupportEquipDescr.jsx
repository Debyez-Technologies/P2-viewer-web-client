// src/components/SupportEquipDescr.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function SupportEquipDescr({ children, ...props }) {
  const mainContent = [];
  const quantityContent = [];
  const otherContent = [];

  const mainTypes = [
    'Name', 'ShortName', 'CatalogSeqNumberRef', 
    'NatoStockNumber', 'IdentNumber', 'ToolRef', 'MaterialSetRef'
  ];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    // Use the minification-safe static property to identify the component
    const type = child.type.componentType;

    if (mainTypes.includes(type)) {
      mainContent.push(child);
    } else if (type === 'ReqQuantity') {
      quantityContent.push(child);
    } else {
      // All other elements (Remarks, Footnotes, etc.) go here
      otherContent.push(child);
    }
  });

  return (
    <div className={styles['SupportEquipDescrWrapper']}>
      <div className={styles['SupportEquipDescr']} {...props}>
        {/* Left Column: Name and all identifiers */}
        <div className={styles['SupportEquipDescrMain']}>
          {mainContent}
        </div>
        {/* Right Column: Quantity */}
        <div className={styles['SupportEquipDescrAside']}>
          {quantityContent}
        </div>
      </div>
      {/* Optional: Render remarks or other elements below */}
      {otherContent.length > 0 && (
        <div className={styles['SupportEquipDescrExtras']}>
          {otherContent}
        </div>
      )}
    </div>
  );
}

export default SupportEquipDescr;