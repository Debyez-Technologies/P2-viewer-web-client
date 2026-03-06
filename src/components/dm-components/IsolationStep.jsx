import styles from '../../utils/styleMap.json'

function IsolationStep({ children, ...props }) {
  // Renders a single, interactive step in a fault isolation procedure.
  // Based on the S1000D schema, it contains a question, an action, and an answer block.
  const styleClass = styles["IsolationStep"]
  return (
    <div className={styleClass} {...props}>
      {children}
    </div>
  );
}

export default IsolationStep;