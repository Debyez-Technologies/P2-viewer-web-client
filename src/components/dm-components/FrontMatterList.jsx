

function FrontMatterList({ children, ...props }) {
  // Renders a complete front matter list section, such as a List of Effective Pages (LOEP) or Highlights.
  // Based on the S1000D schema, it can contain issue info, paragraphs, and sub-lists.
  
  const style = {
    padding: '20px',
    margin: '1em 0',
    border: '1px solid #4a5568',
    borderRadius: '8px',
  };

  return (
    <section className="frontmatter-list" style={style} {...props}>
      {children}
    </section>
  );
}

export default FrontMatterList;