

function Logo({ children, ...props }) {
  // Renders a logo graphic.
  // Based on the schema, this is an empty element with attributes pointing to the image.
//   symbol component renders the image
  return (
    <div {...props}>
        {children}
    </div>
  )
}

export default Logo;