import { useEffect } from 'react';
import { useAnnotationContext } from '../../providers/AnnotationProvider';
import { usePublicationStore } from '../store/publication-store';
import renderUnit from '../utils/S1000DRenderer';
import { GetAnnotations } from '../../wailsjs/go/main/App';

const DataModuleRenderer = (props) => {
  // Select multiple values from the store
  const { currentKey, getContentMap, scrollToID, clearScrollToId } = usePublicationStore();
  const { containerRef } = useAnnotationContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentKey])

  // Call the derived state function to get the map
  const contentMap = getContentMap();
  const currentContent = currentKey ? contentMap[currentKey] : null;
  useEffect(() => {
    if (scrollToID) {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollToID);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Optional: Add a temporary highlight for user feedback
          element.style.transition = 'background-color 0.015s ease-in-out';
          element.style.backgroundColor = 'rgba(195, 217, 251, 0.5)';
          setTimeout(() => { element.style.backgroundColor = ''; }, 1000);
        }
        clearScrollToId(); // Reset the scroll command
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [scrollToID, currentContent, clearScrollToId]);

  if (!currentKey) {
    return <div>Select an item from the Table of Contents.</div>;
  }

  //   const currentContent = contentMap[currentKey];

  return (
    <article>
      <div ref={containerRef}>
        {currentContent ? renderUnit(currentContent) : "No content available for this entry."}
      </div>
    </article>
  );
}

export default DataModuleRenderer;