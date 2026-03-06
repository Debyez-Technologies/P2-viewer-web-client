import React from 'react';
import styles from '../../utils/styleMap.json';
import { registerComponent } from './componentRegistry';


// Accepts 'level' and a special 'isStandalone' prop for non-hierarchical cases.
function Title({ children, level = 1, isStandalone = false, ...props }) {
  let styleClass;
  let Tag;

  if (isStandalone) {
    // This handles titles inside a <figure>, which are not headings.
    styleClass = styles['FigureTitle'];
    Tag = 'figcaption'; // The semantically correct tag for a figure's title.
  } else {
    // --- Hierarchical Title Logic ---
    // Construct the style key dynamically based on the received level.
    const styleKey = `Title-Level${level}`;
    // Use the specific style, or the default style as a fallback.
    styleClass = styles[styleKey] || styles['Title-Default'];

    // Determine the semantic HTML tag (h2, h3, etc.).
    // A level 1 title becomes an <h2>, level 2 an <h3>, and so on.
    // We cap it at <h6>, as that's the deepest HTML heading tag.
    const headingLevel = level + 1 > 6 ? 6 : level + 1;
    Tag = `h${headingLevel}`;
  }

  return (
    <Tag className={styleClass} {...props}>
      {children}
    </Tag>
  );
}

registerComponent('Title', Title);
export default Title;