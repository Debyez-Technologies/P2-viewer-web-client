

function CircuitBreakerDescr({ children, ...props }) {
  // Description of a circuit breaker.
  // Likely contains text content or other simple inline elements.
  return <div className="cb-descr" {...props}>{children}</div>;
}

export default CircuitBreakerDescr;