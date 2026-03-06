import React from 'react';

/**
 * Component for the S1000D <circuitBreaker> element.
 * 
 * Describes a circuit breaker and provides its details based on product configuration.
 * 
 * Parent: Structural <circuitBreakerAlts>
 * Children: <name>, <location>, <amperage>, etc.
 */
export default function CircuitBreaker({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}