

function DefinitionListHeader({ children, ...props }) {
  // Renders the header for a definition list, containing column titles.
  // Based on the schema, children are <TermTitle> and <DefinitionTitle> components.
  return <div className="dl-header" {...props}>{children}</div>;
}

export default DefinitionListHeader;