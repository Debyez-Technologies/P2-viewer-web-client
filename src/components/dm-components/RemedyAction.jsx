import styles from '../../utils/styleMap.json'

function RemedyAction({ children, ...props }) {
  // Renders the corrective action or remedy for a malfunction or condition.
  // Based on the S1000D schema, it contains elements like <Para>, <Note>, <Warning>,
  // and can even be nested.
    const styleClass = styles["RemedyAction"]
  return (
    <div className={styleClass} {...props}>
      <strong style={{ color: '#a5b4fc', display: 'block', marginBottom: '8px' }}>
        Action / Remedy:
      </strong>
      {children}
    </div>
  );
}

export default RemedyAction;