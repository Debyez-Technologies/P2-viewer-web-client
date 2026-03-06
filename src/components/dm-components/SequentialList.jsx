// 1. Import the registration function
import { registerComponent } from './componentRegistry';
import styles from '../../utils/styleMap.json';

function SequentialList({ children, ...props }) {
  // Renders a numbered (ordered) list.
  // Based on the schema, its children will be <ListItem> components.
  return <ol className={styles['SequentialList']} {...props}>{children}</ol>;
}

registerComponent('SequentialList', SequentialList);

export default SequentialList;