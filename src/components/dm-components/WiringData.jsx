// src/components/WiringData.jsx
import React, { useState, useMemo } from 'react';
import styles from '../../utils/styleMap.json';

function WiringData({ children, ...props }) {
  // 1. Separate the children into their respective types
  const wires = React.Children.toArray(children).filter(child => child.type.componentType === 'Wire');
  const equipment = React.Children.toArray(children).filter(child => child.type.componentType === 'ElectricalEquip');
  
  // 2. State for sorting the table
  const [sortConfig, setSortConfig] = useState({ key: 0, direction: 'ascending' });

  // 3. Memoize the sorted wires so it only re-sorts when needed
  const sortedWires = useMemo(() => {
    let sortableItems = [...wires];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // This is a simplified sort; a real implementation would be more robust
        const aText = a.props.children[sortConfig.key]?.children[0]?.children[0]?.text || '';
        const bText = b.props.children[sortConfig.key]?.children[0]?.children[0]?.text || '';
        
        if (aText < bText) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aText > bText) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [wires, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles['WiringData']} {...props}>
      <h2 className={styles['WiringDataHeader']}>Wiring Data & Schematics</h2>
      
      <div className="overflow-x-auto">
        <table className={styles['WireListTable']}>
          <thead className={styles['WireListTableHead']}>
            <tr>
              <th className={styles['WireListTableTh']} onClick={() => requestSort(0)}>Wire No.</th>
              <th className={styles['WireListTableTh']} onClick={() => requestSort(1)}>From</th>
              <th className={styles['WireListTableTh']} onClick={() => requestSort(2)}>To</th>
              <th className={styles['WireListTableTh']} onClick={() => requestSort(6)}>Signal / Details</th>
            </tr>
          </thead>
          <tbody className={styles['WireListTableBody']}>
            {sortedWires}
          </tbody>
        </table>
      </div>

      {equipment.length > 0 && (
        <div className={styles['AssociatedDocuments']}>
          <h3 className={styles['WiringDataHeader']}>Associated Documents</h3>
          <div className={styles['DocumentList']}>
            {equipment}
          </div>
        </div>
      )}
    </div>
  );
}
// This is the critical link to your JSON data's root component
WiringData.componentType = 'WiringData';
export default WiringData;