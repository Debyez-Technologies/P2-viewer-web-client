

function PmEntry({ children, ...props }) {
  // Renders a Publication Module (PM) entry, which acts like an item
  // in a table of contents or a tree view.
  //
  // Based on the S1000D schema, its children will be:
  // - An optional <pmEntryTitle> (rendered as a <TextBlock> component).
  // - A list of references (<DmRef>, <PmRef>, <ExternalPubRef>).
  // - It can also contain nested <PmEntry> components, creating a hierarchical structure.
  
  const style = {
    // Style to give it an indented, list-like appearance
    padding: '8px 12px',
    marginLeft: '25px',
    borderLeft: '1px solid #445566',
    marginBottom: '8px',
  };

  return (
    <div className="pm-entry" style={style} {...props}>
      {children}
    </div>
  );
}

export default PmEntry;