import React from 'react';
import styles from '../../utils/styleMap.json';

// 1. Import the component type for comparison
import { Title } from './index';

function Table({ children, ...props }) {
  const containerStyle = styles['TableContainer'];
  const tableStyle = styles['Table'];

  let tableTitle = null;
  const tableContent = React.Children.map(children, child => {
    // 2. Use direct type comparison
    if (React.isValidElement(child) && child.type === Title) {
      tableTitle = child;
      return null;
    }
    return child;
  });

  return (
    <div {...props}>
      {tableTitle}
      <div className={containerStyle}>
        <table className={tableStyle}>
          {tableContent}
        </table>
      </div>
    </div>
  );
}

export default Table;