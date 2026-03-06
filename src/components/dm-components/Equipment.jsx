

function Equipment({ children, ...props }) {
  // Renders a container identifying a piece of equipment.
  // Based on the S1000D schema, its children are identifying elements like
  // <name>, <NatoStockNumber>, <IdentNumber>, or <PartRef>.
  
  const style = {
    fontStyle: 'italic',
    color: '#94a3b8',
  };

  return (
    <span className="equipment" style={style} {...props}>
      {children}
    </span>
  );
}

export default Equipment;