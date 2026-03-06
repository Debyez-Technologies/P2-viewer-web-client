

function FrontMatterExternalPubEntry({ children, ...props }) {
  // Renders an external publication entry in a front matter list.
  // Based on the S1000D schema, it contains an <externalPubRef> and other info.
  
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  };

  return (
    <div className="frontmatter-externalpub-entry" style={style} {...props}>
      {children}
    </div>
  );
}

export default FrontMatterExternalPubEntry;