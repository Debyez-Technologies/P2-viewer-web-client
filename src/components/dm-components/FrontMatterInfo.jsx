

function FrontMatterInfo({ children, ...props }) {
  // Renders a block of miscellaneous front matter information, like a notice or availability statement.
  // Based on the S1000D schema, it contains a <title> and one or more <reducedPara> elements.
  
  const style = {
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid #4a5568',
  };

  return (
    <div className="frontmatter-info" style={style} {...props}>
      {children}
    </div>
  );
}

export default FrontMatterInfo;