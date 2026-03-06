

function Foldout({ children, ...props }) {
  // A container for foldout content, often large graphics or tables.
  // Based on the schema, children are typically <Figure> or <Table> components.
  return <div className="foldout" {...props}>{children}</div>;
}

export default Foldout;