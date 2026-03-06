import React from 'react';

/**
 * Component for the S1000D <address> element.
 * 
 * Renders a block of postal address information.
 * 
 * Hierarchy:
 *   - commentOriginator
 *     - dispatchAddress
 *       - address
 * 
 * Potential Children:
 * - department, street, postOfficeBox, postalZipCode, city, country,
 *   state, province, building, room, phoneNumber, faxNumber, email,
 *   internet, SITA (most will be rendered as TextBlocks).
 */
export default function AddressBlock({ children }) {
  return (
    <div className="mt-2 pl-4 border-l-2 border-gray-200">
      <h4 className="text-sm font-semibold text-gray-600">Address:</h4>
      <address className="not-italic text-gray-800">
        {children}
      </address>
    </div>
  );
}