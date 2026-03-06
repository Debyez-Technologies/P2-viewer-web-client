// src/components/CheckListItem.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function CheckListItem({ children, ...props }) {
  // Safe identification using the static property
  const itemNumber = React.Children.toArray(children).find(child => child.type.componentType === 'ItemNumber');
  const name = React.Children.toArray(children).find(child => child.type.componentType === 'Name');
  const procedures = React.Children.toArray(children).filter(child => child.type.componentType === 'CheckListProcedure');

  return (
    <div className={styles['CheckListItem']} {...props}>
      {/* Left Column: Checkbox and Item Number */}
      {/* <div className={styles['CheckListItemMarker']}>
        <div className={styles['CheckListItemCheckbox']}></div>
        {itemNumber}
      </div> */}

      {/* Right Column: Content */}
      <div className={styles['CheckListItemContent']}>
        {name}
        {/* Procedures are now wrapped in their own styled group */}
        {procedures.length > 0 && (
          <div className={styles['CheckListProcedureGroup']}>
            {procedures}
          </div>
        )}
      </div>
    </div>
  );
}
CheckListItem.componentType = 'CheckListItem';
export default CheckListItem;