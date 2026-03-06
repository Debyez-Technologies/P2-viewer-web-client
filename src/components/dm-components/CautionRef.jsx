import Hyperlink from './Hyperlink';

function CautionRef({ children, linkData, ...props }) {
  // You can add custom logic here if needed, e.g., prepending "CAUTION:"
  const substituteText = `CAUTION (see details)`;
  
  return (
    <Hyperlink 
      linkData={linkData} 
      substituteText={children || substituteText} 
      {...props} 
    />
  );
}

export default CautionRef;