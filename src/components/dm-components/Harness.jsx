import React from 'react';

/**
 * Component for the S1000D <harness> element.
 * 
 * Represents a wire harness, which is a bundle of electrical wires. This component
 * is a major container for all information related to a specific harness.
 * 
 * Hierarchy:
 *   - wiringData
 *     - harnessGroup
 *       - harness
 * 
 * Potential Children:
 * - harnessIdent (rendered as TextBlock)
 * - harnessInfo (Structural)
 * - routing (Structural)
 * - responsiblePartnerCompany (Visible Component - assuming it exists)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
export default function Harness({ children }) {
  return (
    <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 my-2 shadow-md">
      <h3 className="text-xl font-bold text-purple-800 mb-2 border-b-2 border-purple-200 pb-2">Harness</h3>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}