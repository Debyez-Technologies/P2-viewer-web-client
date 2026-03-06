import styles from '../../utils/styleMap.json'

function FaultIsolation({ children, ...props }) {
  // Renders the main container for a fault isolation data module.
  // Based on the S1000D schema, it contains <commonInfo>, <preliminaryRqmts>,
  // and one or more <faultIsolationProcedure> sections.
  const styleClass = styles["FaultIsolation"]
  return (
    <main className={styleClass} {...props}>
      {children}
    </main>
  );
}

export default FaultIsolation;