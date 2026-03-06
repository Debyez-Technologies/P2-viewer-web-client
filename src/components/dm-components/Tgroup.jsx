// This component is a structural pass-through.
// It ensures <thead> and <tbody> are rendered directly inside <table>.
function Tgroup({ children, ...props }) {
  return <>{children}</>;
}

export default Tgroup;