

function FrontMatterTableOfContent({ children, ...props }) {
  // Renders the Table of Contents section.
  // Based on the S1000D schema, it contains issue info and a <tocList>.
  
  const style = {
    padding: '20px',
    margin: '1em 0',
  };

  return (
    <section className="frontmatter-toc" style={style} {...props}>
      <h2>Table of Contents</h2>
      {children}
    </section>
  );
}

export default FrontMatterTableOfContent;