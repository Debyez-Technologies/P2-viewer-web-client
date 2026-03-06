import styles from '../../utils/styleMap.json'

function IsolationProcedureEnd({ children, ...props }) {
  // Renders the concluding step or outcome of an isolation procedure.
  // Based on the S1000D schema, it can contain a <title>, <warning>, <note>, and an <action>.

  const styleClass = styles["IsolationProcedureEnd"]
  return (
    <div className={styleClass} {...props}>
      <strong>Procedure End:</strong>
      {children}
    </div>
  );
}

export default IsolationProcedureEnd;