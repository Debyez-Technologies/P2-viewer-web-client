

function FrontMatterDmEntry({ children, ...props }) {
  // Renders a data module entry in a front matter list (eg, List of Effective Data Modules).
  // Based on the S1000D schema, it contains a <dmRef> and other info like <numberOfPages>.
  
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  };

  return (
    <div className="frontmatter-dm-entry" style={style} {...props}>
      {children}
    </div>
  );
}

export default FrontMatterDmEntry;