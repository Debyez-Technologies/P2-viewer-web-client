import styles from '../../utils/styleMap.json';

function InfoName({ children, ...props }) {
  // THIS IS THE FIX:
  // Check if children is an array and its first element is "Title Page".
  if (Array.isArray(children) && children[0] === 'Title Page') {
    return null;
  }
  
  // Also keep the simple check for safety, though the array case is more common.
  if (children === 'Title Page') {
    return null;
  }

  const styleClass = styles['InfoName'];
  return (
    <h2 className={styleClass} {...props}>
      {children}
    </h2>
  );
}

export default InfoName;