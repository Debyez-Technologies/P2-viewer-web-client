import styles from '../../utils/styleMap.json';

function PersonCategory({ personCategoryCode, ...props }) {
  const styleClass = styles['PersonCategory'];
  // The parser will likely pass the code as a prop, which we render as the child
  return (
    <span className={styleClass} {...props}>
      {personCategoryCode}
    </span>
  );
}

// In your data-to-component mapping, you would render this:
// <PersonCategory personCategoryCode="Electrical Operator" />

export default PersonCategory;