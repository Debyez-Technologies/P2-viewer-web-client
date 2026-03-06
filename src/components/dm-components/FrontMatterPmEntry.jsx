

function FrontMatterPmEntry({ children, ...props }) {
  // Renders a publication module entry in a front matter list.
  // Based on the S1000D schema, it contains a <pmRef> and other info.
  
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  };

  return (
    <div className="frontmatter-pm-entry" style={style} {...props}>
      {children}
    </div>
  );
}

export default FrontMatterPmEntry;