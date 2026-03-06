import styles from '../../utils/styleMap.json'

function TableRow({ children, ...props }) {
  // A row in a table.
  const styleClass = styles['Row'];
  return <tr className={styleClass} {...props}>{children}</tr>;
}

export default TableRow;