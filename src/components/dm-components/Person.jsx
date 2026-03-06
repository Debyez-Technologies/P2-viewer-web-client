

function Person({ children, ...props }) {
  // Renders information about a person.
  // Based on the schema, children could be <FirstName>, <LastName>, etc., which are rendered as text children.
  return <span className="person" {...props}>{children}</span>;
}

export default Person;