import Hyperlink from "./Hyperlink";

function FunctionalItemRef({ children, linkData, ...props }) {
  // Pass the extracted linkData and any text children to the Hyperlink component.
  // The 'props' are passed down so attributes like 'className' still work.
  console.log("linkdata: ", linkData)
  return (
    <Hyperlink linkData={linkData} substituteText={children} {...props} />
  );
}
export default FunctionalItemRef;