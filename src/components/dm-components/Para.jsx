import React from 'react';
import styles from "../../utils/styleMap.json";
// 1. Import the registry, not the components.
import { componentRegistry } from './componentRegistry'; 
import { registerComponent } from './componentRegistry'; // Also register itself

const BLOCK_LEVEL_CHILDREN = new Set([
  "SequentialList",
  "RandomList",
  "DefinitionList",
  "VerbatimText",
]);

function Para({ children, ...props }) {
  const hasBlockChild = React.Children.toArray(children).some(
    (child) => {
      if (!React.isValidElement(child)) return false;
      
      // 2. THE FIX: Look up the component type in the registry by its string name.
      // We find the component's constructor in the registry and compare it.
      for (const componentName of BLOCK_LEVEL_CHILDREN) {
        if (child.type === componentRegistry[componentName]) {
          return true;
        }
      }
      return false;
    }
  );

  const Tag = hasBlockChild ? "div" : "p";
  const styleClass = hasBlockChild ? styles["ParaContainingList"] : styles["Para"];
    
  return (
    <Tag className={styleClass} {...props}>
      {children}
    </Tag>
  );
}

registerComponent('Para', Para); // Register itself
export default Para;