

function CircuitBreakerDescrGroup({ children, ...props }) {
  // A container for circuit breaker descriptions.
  // Based on the schema, it will contain <CircuitBreakerDescr> components as children.
  return <div className="cb-descr-group" {...props}>{children}</div>;
}

export default CircuitBreakerDescrGroup;