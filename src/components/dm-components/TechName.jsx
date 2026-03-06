import styles from "../../utils/styleMap.json"

function TechName({ children, ...props }) {
  // Renders a standard paragraph.
  // Based on the S1000D schema, it can contain a mix of text and inline elements like <InternalRef>, <Emphasis>, etc.
  // These will be passed as children.
  const styleClass = styles["TechName"]
  return <p className={styleClass}{...props}>{children}</p>;
}

export default TechName;