

function Acronym({ children, ...props }) {
  // Renders an acronym, often with a title attribute for the definition.
  // Based on the S1000D schema, children are typically <AcronymTerm> and <AcronymDefinition>.
  // In our architecture, these are flattened into the `children` prop as text.
  return <abbr {...props}>{children}</abbr>;
}

export default Acronym;