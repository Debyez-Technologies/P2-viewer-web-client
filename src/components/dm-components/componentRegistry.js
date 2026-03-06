// This object will hold references to all our components.
// We will populate it dynamically to avoid circular dependencies.
export const componentRegistry = {};

// A helper function to register components.
export function registerComponent(name, component) {
  componentRegistry[name] = component;
}