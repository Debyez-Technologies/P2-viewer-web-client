import React from 'react';
import styles from '../../utils/styleMap.json';

// 1. Import the actual component types we need to check against.
import { Graphic, Title } from './index'; // Assuming index.js is in the same folder

function Figure({ children, ...props }) {
  const styleClass = styles['Figure'];

  let figureGraphic = null;
  let figureTitle = null;

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      // 2. THE CRITICAL FIX: Compare the component type directly, not by its string name.
      // This is safe from production minification.
      if (child.type === Graphic) {
        figureGraphic = child;
      } 
      else if (child.type === Title) {
        // Find the Title and pass a prop to change its rendering if needed.
        figureTitle = React.cloneElement(child, { isStandalone: true });
      }
    }
  });

  return (
    <figure className={styleClass} {...props}>
      {/* Render in the desired order */}
      {figureGraphic}
      {figureTitle}
    </figure>
  );
}

Figure.componentType = 'Figure';
export default Figure;