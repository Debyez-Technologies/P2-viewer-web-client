

function TableFoot({ children, ...props }) {
  // The footer of a table.
  // Based on the schema, its children will be <TableRow> components.
  return <tfoot {...props}>{children}</tfoot>;
}

export default TableFoot;