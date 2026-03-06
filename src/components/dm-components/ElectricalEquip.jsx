import React from 'react';

/**
 * Component for the S1000D <electricalEquip> element.
 * 
 * Represents a piece of electrical equipment in the product's wiring. This is a key
 * container for equipment-specific information.
 * 
 * Hierarchy:
 *   - wiringData
 *     - electricalEquipGroup
 *       - electricalEquip
 * 
 * Potential Children:
 * - functionalItemRef (Visible Component: FunctionalItemRef - assuming it exists)
 * - partNumber (rendered as TextBlock)
 * - altIdentGroup (Structural)
 * - assyInstruction (Structural)
 * - maxMountingPositions (rendered as TextBlock)
 * - systemBreakdownCode (Visible Component - assuming it exists)
 * - transverseLink (Structural)
 * - connectionListClass (rendered as TextBlock)
 * - electricalLogic (Visible Component: ElectricalLogic)
 * - responsiblePartnerCompany (Visible Component - assuming it exists)
 * - equipName (rendered as TextBlock)
 * - reqQuantity (Visible Component - assuming it exists)
 * - installationInfo (Structural)
 * - equipDescrRef (Visible Component: EquipDescrRef)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
// src/components/ElectricalEquip.jsx
import styles from '../../utils/styleMap.json';

function ElectricalEquip({ children }) {
  // Deconstruct children to get name and reference
  const [functionalItemRef, name, illustrationRef] = React.Children.toArray(children);

  return (
    <div className={styles['DocumentItem']}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles['DocumentIcon']}>
        <path fillRule="evenodd" d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm10.5 5.75a.75.75 0 0 0-1.5 0v2.5H10a.75.75 0 0 0 0 1.5h2.5V12a.75.75 0 0 0 1.5 0v-2.5H14a.75.75 0 0 0 0-1.5h-1.5V7.75Z" clipRule="evenodd" />
      </svg>
      <span className={styles['DocumentName']}>{name} ({illustrationRef})</span>
    </div>
  );
}
ElectricalEquip.componentType = 'ElectricalEquip';
export default ElectricalEquip;