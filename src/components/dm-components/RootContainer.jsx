import styles from '../../utils/styleMap.json'

// This component acts as a simple wrapper for the entire document.
// It doesn't need any special styling itself, it just renders its children.
function RootContainer({ children, ...props }) {
    const styleclass = styles["RootContainer"]
  return <div className={styleclass} {...props}>{children}</div>;
}

export default RootContainer;