import { usePublicationStore } from "../../store/publication-store";


function Hyperlink({ linkData, children, substituteText }) {
  const { navigateToKey } = usePublicationStore();

  if (!linkData) {
    return <span>{substituteText || children}</span>;
  }

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default browser navigation

    // The target ID for scrolling, common to both internal and external-to-fragment links
    const targetId = linkData.targetFragmentId;
    console.log(targetId)
    const scrollToTarget = () => {
      if (!targetId) return;
      // We set a brief timeout to allow the new page to render before scrolling.
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight');
          setTimeout(() => element.classList.remove('highlight'), 2000);
        } else {
          console.warn(`Link target fragment not found: #${targetId}`);
        }
      }, 100);
    };

    switch (linkData.linkType) {
      case 'dm':
      case 'pm': // Treat PM links the same as DM links for now
      case 'dml': // Treat DML links the same as DM links for now
        if (linkData.targetDmKey) {
          console.log(`Navigating to ${linkData.linkType.toUpperCase()}: ${linkData.targetDmKey}`);
          navigateToKey(linkData.targetDmKey);
          scrollToTarget(); // Attempt to scroll to a fragment if specified
        }
        break;

      case 'internal':
        if (targetId) {
          console.log(`Scrolling to internal ID: ${targetId}`);
          // For internal links, we can scroll immediately
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('highlight');
            setTimeout(() => element.classList.remove('highlight'), 2000);
          } else {
            console.warn(`Internal link target not found: #${targetId}`);
          }
        }
        break;
      
      case 'externalPub':
        console.warn('Unhandled hyperlink click: External Publication. Attributes:', linkData.attributes);
        // Future implementation: Open a new tab or show a modal with publication info.
        // For example: window.open(linkData.attributes.externalPubCode, '_blank');
        break;

      case 'scorm':
        console.warn('Unhandled hyperlink click: SCORM Package. Attributes:', linkData.attributes);
        // Future implementation: Launch a SCORM player.
        break;

      default:
        console.warn('Unhandled hyperlink click with unknown type:', linkData);
        break;
    }
  };


  // Determine the display text. Use substituteText if provided, otherwise default to children.
  const displayText = substituteText || children || linkData.targetDmKey || 'Reference';

  return (
    <a href="#" onClick={handleClick} className="pl-2 text-[#0056b3] underline cursor-pointer hover:text-[#003d7a]">
      {displayText}
    </a>
  );
}

export default Hyperlink;

const style =  `.s1000d-hyperlink {
  color: #0056b3;
  text-decoration: underline;
  cursor: pointer;
}

.s1000d-hyperlink:hover {
  color: #003d7a;
}

/* Style for highlighting a scrolled-to element */
.highlight {
  animation: highlight-animation 2s ease-out;
}

@keyframes highlight-animation {
  0% {
    background-color: yellow;
    outline: 2px solid orange;
  }
  100% {
    background-color: transparent;
    outline: 2px solid transparent;
  }

}`