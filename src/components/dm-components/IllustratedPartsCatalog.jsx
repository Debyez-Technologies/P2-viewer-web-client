// src/components/IllustratedPartsCatalog.jsx
import React from 'react';
import styles from '../../utils/styleMap.json';

function IllustratedPartsCatalog({ children, ...props }) {
  // Use the minification-safe static property for identification
  const figure = React.Children.toArray(children).find(child => child.type.componentType === 'Figure');
  const catalogItems = React.Children.toArray(children).filter(child => child.type.componentType === 'CatalogSeqNumber');

  return (
    <div className={styles['IllustratedPartsCatalog']} {...props}>
      {figure}
      
      {catalogItems.length > 0 && (
        <table className={styles['PartsListTable']}>
          <thead className={styles['PartsListTableHead']}>
            <tr>
              <th className={styles['PartsListTableTh']}>Item</th>
              <th className={styles['PartsListTableTh']}>Part Number</th>
              <th className={styles['PartsListTableTh']}>Description</th>
              <th className={styles['PartsListTableTh']} style={{ textAlign: 'center' }}>Qty</th>
            </tr>
          </thead>
          <tbody className={styles['PartsListTableBody']}>
            {catalogItems}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default IllustratedPartsCatalog;