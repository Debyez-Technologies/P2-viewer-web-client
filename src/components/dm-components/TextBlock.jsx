import styles from '../../utils/styleMap.json'

// A generic text container. Changed to a <span> for inline rendering,
// which is crucial for handling mixed content (text and elements) inside a paragraph.
// We also use React.Fragment to avoid adding extra DOM nodes when there are no other props.
function TextBlock({ children, ...props }) {
    const hasProps = Object.keys(props).length > 0;
    const styleClass = styles["TextBlock"]      
    // If there are props, render a span to hold them. Otherwise, just render the text.
    return hasProps ? <span className={styleClass}{...props}>{children}</span> : <>{children}</>;
}

export default TextBlock;
// 

// function TextBlock({ children, ...props }) {
//   // A generic block-level text container, used for various S1000D elements
//   // like simple paragraphs, names, titles, etc., that don't need special structure.
//   // Rendered as a div or span depending on context, defaults to div.
//   return <div {...props}>{children}</div>;
// }

// export default TextBlock;