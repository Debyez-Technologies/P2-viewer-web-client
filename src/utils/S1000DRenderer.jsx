// Now we can use our barrel file for a clean import!
import * as Components from '../components/dm-components/index';

/**
 * Recursively renders a Renderable Unit (RU) into a React component.
 * @param {object} ru - The Renderable Unit from the Go backend.
 * @returns {React.ReactElement|null}
 */
function renderUnit(ru) {
    if (!ru || !ru.component) return null;

    // The component map is now just the imported Components object.
    const Component = Components[ru.component];
    
    if (!Component) {
        console.warn(`Unknown component type: ${ru.component}`);
        return (
            <div style={{ border: '1px dashed red', padding: '4px', margin: '4px' }}>
                <strong>Unknown: {ru.component}</strong>
                {ru.text}
                {ru.children && ru.children.map(child => renderUnit(child))}
            </div>
        );
    }
    
    return (
        <Component key={ru.id} id={ru.id} {...ru.props}>
            {ru.text}
            {ru.children && ru.children.map(child => renderUnit(child))}
        </Component>
    );
}

export default renderUnit