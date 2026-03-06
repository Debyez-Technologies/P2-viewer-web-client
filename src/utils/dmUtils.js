/**
 * Parses an S1000D filename key to extract the infoCode.
 * Based on the structure: DMC-MIC-SDC-SC-SSC-AC-DC-IC-ILC_I-IW_L-C.xml
 * @param {string | null} key The full dmKey filename (e.g., "DMC-MSB-A-H00...xml").
 * @returns {string | null} The 3-digit infoCode (e.g., "001") or null if the key is invalid.
 */
export function getInfoCodeFromKey(key) {
  if (!key) {
    return null;
  }

  try {
    // 1. Isolate the dmCode part of the filename (before the underscore)
    const dmCodePart = key.split('_')[0];
    
    // 2. Split the dmCode into its constituent parts
    const parts = dmCodePart.split('-');
    
    // 3. The infoCode is in the 8th segment (index 7 is DisassyCode, index 8 is InfoCode)
    // Structure: [DMC, MIC, SDC, SC, SSC+SSC, AC, DC+DCV, IC+ICV, ILC] -> Your structure might slightly differ
    // Based on your Go code, it seems the 8th segment after DMC is the infoCode.
    // ["DMC", "MSB", "A", "H00", "00", "00", "00A", "001A", "D"] -> Let's target index 8
    const infoCodeAndVariant = parts[7];
    // 4. Extract the first 3 characters, which represent the infoCode.
    if (infoCodeAndVariant && infoCodeAndVariant.length >= 3) {
      return infoCodeAndVariant.substring(0, 3);
    }

    return null;
  } catch (error) {
    console.error("Failed to parse dmKey:", key, error);
    return null;
  }
}