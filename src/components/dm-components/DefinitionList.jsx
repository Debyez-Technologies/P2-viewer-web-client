import styles from "../../utils/styleMap.json";
import { registerComponent } from './componentRegistry';


function DefinitionList({ children, ...props }) {
  const styleClass = styles["DefinitionList"];
  return <dl className={styleClass} {...props}>{children}</dl>;
}

registerComponent('DefinitionList', DefinitionList);

export default DefinitionList;