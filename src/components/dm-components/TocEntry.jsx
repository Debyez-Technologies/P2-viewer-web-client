

function TocEntry({ children, ...props }) {
  // Renders an entry in a Table of Contents. Can be nested to create hierarchy.
  // Based on the S1000D schema, it contains a <title>, a reference (<dmRef>, <pmRef>),
  // and can contain a nested <TocEntry>.
  
  const style = {
    padding: '4px 0 4px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <div className="toc-entry" style={style} {...props}>
      {children}
    </div>
  );
}

export default TocEntry;