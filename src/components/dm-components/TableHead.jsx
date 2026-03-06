import styles from '../../utils/styleMap.json'
import { TableContext } from '../../../providers/TableContext';

function TableHead({ children, ...props }) {
  const styleClass = styles['THead'];

  return (
    // Provide the context value { isHeader: true } to all descendants.
    <TableContext.Provider value={{ isHeader: true }}>
      <thead className={styleClass} {...props}>
        {children}
      </thead>
    </TableContext.Provider>
  );
}

export default TableHead;