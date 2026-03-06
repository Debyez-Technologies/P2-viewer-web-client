import React from 'react';

/**
 * Component for the S1000D <shippingInfo> element.
 * 
 * Contains shipping information for a supply, such as packaging and shelf life.
 * 
 * Parent: <EnterpriseInfo>
 * Children: <packaging> (TextBlock), <transport> (TextBlock), <shelfLife> (TextBlock)
 */
export default function ShippingInfo({ children }) {
  return (
    <div className="mt-2 text-xs text-gray-500">
      <h5 className="font-semibold">Shipping Info:</h5>
      {children}
    </div>
  );
}