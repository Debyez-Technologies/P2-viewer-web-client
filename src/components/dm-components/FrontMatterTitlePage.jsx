import styles from '../../utils/styleMap.json'

function FrontMatterTitlePage({ children, ...props }) {
  // Renders the main title page of a publication.
  // Based on the S1000D schema, it's a container for many specific title page elements
  // like <productIntroName>, <pmTitle>, <productIllustration>, <enterpriseLogo>, etc.
  
  const styleClass = styles["FrontMatterTitlePage"]

  return (
    <section className={styleClass} {...props}>
      {children}
    </section>
  );
}

export default FrontMatterTitlePage;