import styles from "../../utils/styleMap.json";

function ListItemTerm({ children, ...props }) {
  const styleClass = styles["ListItemTerm"];
  return <dt className={styleClass} {...props}>{children}</dt>;
}

export default ListItemTerm;