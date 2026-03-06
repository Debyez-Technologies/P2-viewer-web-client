import Hyperlink from "./Hyperlink";

export default function ScormContentPackageRef({ children, linkData, ...props }) {
  // Pass the extracted linkData and any text children to the Hyperlink component.
  // The 'props' are passed down so attributes like 'className' still work.
  return (
    <Hyperlink linkData={linkData} substituteText={children} {...props} />
  );
}