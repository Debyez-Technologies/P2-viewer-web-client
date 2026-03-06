import { registerComponent } from './componentRegistry';


function VerbatimText({ children, ...props }) {
  // Renders pre-formatted text.
  // The content is rendered exactly as it appears, preserving whitespace.
  return <pre {...props}>{children}</pre>;
}
registerComponent('VerbatimText', VerbatimText);

export default VerbatimText;