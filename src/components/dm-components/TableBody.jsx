import styles from '../../utils/styleMap.json'
import { TableContext } from '../../../providers/TableContext';

function TableBody({ children, ...props }) {
  const styleClass = styles['TBody'];

  return (
    // Provide the context value { isHeader: false } to all descendants.
    <TableContext.Provider value={{ isHeader: false }}>
      <tbody className={styleClass} {...props}>
        {children}
      </tbody>
    </TableContext.Provider>
  );
}

export default TableBody;