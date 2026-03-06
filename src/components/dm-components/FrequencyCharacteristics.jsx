import React from 'react';

/**
 * Component for the S1000D <frequencyCharacteristics> element.
 * 
 * Contains AC frequency characteristics of a wire material, such as impedance
 * and attenuation at various frequencies.
 * 
 * Hierarchy:
 *   - wireMaterial
 *     - frequencyCharacteristics
 * 
 * Potential Children:
 * - impedance (rendered as TextBlock)
 * - frequencyAttenuation (Structural)
 */
export default function FrequencyCharacteristics({ children }) {
  return (
    <div className="border-t border-dashed border-gray-300 mt-2 pt-2">
      <h4 className="text-sm font-semibold text-gray-600">Frequency Characteristics:</h4>
      <div className="pl-4 text-sm">
        {children}
      </div>
    </div>
  );
}