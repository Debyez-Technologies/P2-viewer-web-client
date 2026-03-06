import React from 'react';

/**
 * Component for the S1000D <circuitBreakerSpec> element.
 * 
 * A container for all properties of a single circuit breaker. It is the main
 * entry in a circuit breaker repository.
 * 
 * Parent: Structural <circuitBreakerRepository>
 * Children: <circuitBreakerIdent> (Structural), <name>, <circuitBreakerAlts> (Structural)
 */
export default function CircuitBreakerSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}