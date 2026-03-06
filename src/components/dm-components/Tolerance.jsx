

function Tolerance({ toleranceValue, toleranceType, ...props }) {
  // Renders the tolerance values for a threshold (eg, +/- 5 hours).
  // This is a terminal component that formats its props rather than using children.
  
  const toleranceSymbol = toleranceType === 'plusorminus' ? '±' : (toleranceType === 'plus' ? '+' : '-');
  
  return (
    <span className="tolerance" {...props}>
      {' '}({toleranceSymbol} {toleranceValue})
    </span>
  );
}

export default Tolerance;