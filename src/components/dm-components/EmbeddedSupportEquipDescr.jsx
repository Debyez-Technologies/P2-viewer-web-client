

function EmbeddedSupportEquipDescr({ children, ...props }) {
  // Description of embedded support equipment.
  // Contains text and other components describing the equipment.
  return <div className="embedded-equip" {...props}>{children}</div>;
}

export default EmbeddedSupportEquipDescr;