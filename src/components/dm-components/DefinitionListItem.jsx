function DefinitionListItem({ children, ...props }) {
  // This component doesn't need its own style, it's just a container.
  return <div {...props}>{children}</div>;
}

export default DefinitionListItem;