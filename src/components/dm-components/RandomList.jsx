import styles from '../../utils/styleMap.json'
import { registerComponent } from './componentRegistry';

function RandomList({ children, ...props }) {
  // Renders a bulleted (unordered) list.
  // Based on the schema, its children will be <ListItem> components.
  const styleClass = styles["RandomList"]
  return <ul className={styleClass}{...props}>{children}</ul>;
}
registerComponent('RandomList', RandomList);

export default RandomList;