import styles from "../../utils/styleMap.json";

function ListItemDefinition({ children, ...props }) {
  const styleClass = styles["ListItemDefinition"];
  return <dd className={styleClass} {...props}>{children}</dd>;
}

export default ListItemDefinition;