import React from 'react';

// A map to create human-readable titles from the S1000D tag name.
const titleMap = {
  descrAccessory: 'Accessory Fields',
  descrConduit: 'Conduit Fields',
  descrConnector: 'Connector Fields',
  descrDistributionPart: 'Distribution Part Fields',
  descrElectricalEquip: 'Electrical Equipment Fields',
  descrHarness: 'Harness Fields',
  descrIdentSleeve: 'Identification Sleeve Fields',
  descrShrinkSleeve: 'Shrink Sleeve Fields',
  descrSolderSleeve: 'Solder Sleeve Fields',
  descrStandardPartGroup: 'Standard Part Fields',
  descrWire: 'Wire Fields',
  descrWireMaterial: 'Wire Material Fields',
};

/**
 * A reusable component for rendering a titled section within a Wiring Fields
 * data module (wrngflds). It derives its title from the S1000D element name.
 * 
 * This component replaces many specific components like <DescrAccessory>,
 * <DescrHarness>, etc.
 * 
 * @param {object} props
 * @param {string} props.name - The original S1000D tag name (e.g., 'descrAccessory').
 * @param {React.ReactNode} props.children - The child components to render,
 *   typically a list of <WiringField> components.
 */
export default function WiringDescriptionSection({ name, children }) {
  const title = titleMap[name] || name; // Fallback to the tag name if not in map

  return (
    <div className="p-4 my-4 border border-blue-200 rounded-lg bg-blue-50 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
        {title}
      </h2>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}