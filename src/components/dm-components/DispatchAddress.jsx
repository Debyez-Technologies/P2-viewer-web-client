import React from 'react';

/**
 * Component for the S1000D <dispatchAddress> element.
 * 
 * A container that groups together the enterprise, the point of contact,
 * and the physical address of the sender.
 * 
 * Hierarchy:
 *   - commentOriginator
 *     - dispatchAddress
 * 
 * Potential Children:
 * - enterprise (Visible Component: EnterpriseInfo)
 * - dispatchPerson (Visible Component: DispatchPerson)
 * - address (Visible Component: AddressBlock)
 */
export default function DispatchAddress({ children }) {
  return (
    <div className="pl-4">
      {children}
    </div>
  );
}