

function Note({ children, ...props }) {
  // A block for displaying a note.
  // Based on the S1000D schema, it contains <NotePara> or other text elements.
  // In our model, these are rendered as text children.
  return <div className="note-block" {...props}>{children}</div>;
}

export default Note;