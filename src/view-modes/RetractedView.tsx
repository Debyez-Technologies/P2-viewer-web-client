import { MutableRefObject, useRef } from 'react';
import MainContent from '../layout/MainContent';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Controls from '../components/app-components/Controls/Controls';
import { useAnnotationContext } from '../../providers/AnnotationProvider';
import { usePublicationStore } from '../store/publication-store';
import { useEffect } from 'react';
import { useAnnotationStore } from '../store/annotation-store';
import Toolbar from '../components/app-components/toolbar/Toolbar';
import ChatUI from '../components/app-components/chat-ui/ChatUi';
import { useUIStore } from '../store/ui-store';
import AppHeader from '@/components/ui-components/app-header';
import SearchBar from '@/components/app-components/topbar/SearchBar';
import DMNavigation from '@/components/app-components/topbar/DMNavigation';

interface ToolBarProps {
  containerRef: MutableRefObject<HTMLElement>
}

function ToolBar({ containerRef }: ToolBarProps) {

  return <div className='flex gap-3 justify-end items-center w-full'>
    <SearchBar type={'local'} />
    <Toolbar componentToPrintRef={containerRef} />
    <div className='h-8 border-l p-0 m-0'></div>
    <DMNavigation />
  </div>
}

function RetractedView() {

  const { fetchAndHighlightAnnotations, highlights, highlightFirstOccurrence, containerRef } = useAnnotationContext()
  const { currentKey } = usePublicationStore()
  const { annotationVisible, annotationList, getAnnotationList } = useAnnotationStore()
  const { currentDMInfo } = usePublicationStore()
  const { isChatUiOpen } = useUIStore()
  const mainContentRef = useRef(null)

  useEffect(() => {
    if (annotationList === null || annotationList?.length === 0) {
      (async () => {
        try {
          await getAnnotationList()
        } catch (error) {
          console.log(error)
        }
      })()
    }

    if (annotationVisible) {
      fetchAndHighlightAnnotations()
    }
    console.log(currentKey, "key changes")
  }, [annotationVisible, currentKey])


  useEffect(() => {

    const distributeHighlight = async () => {
      const dmHighLights = highlights && highlights.filter(highlight => highlight.dmCode === currentKey)

      if (!dmHighLights || dmHighLights.length === 0) return;

      // dmHighLights.forEach(highlight => {
      //   highlightFirstOccurrence(highlight.id, highlight.text, null);
      // });

      for (const highlight of dmHighLights) {
        await highlightFirstOccurrence(currentDMInfo.id, highlight.id, highlight.text, null);
      }


      console.log(currentKey, dmHighLights, "Main content - highlights updated", highlights)
    }

    if (annotationVisible) distributeHighlight()

  }, [currentKey, highlights, annotationVisible])


  useEffect(() => {
    mainContentRef.current.scrollTo(0, 0)
  }, [currentKey])

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Controls /> {/* Renders at the very top */}
      <AppHeader tools={<ToolBar containerRef={containerRef} />} />
      {/* This row contains the Sidebar on the left and the main content area (Toolbar + MainContent) */}
      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Sidebar - 25% width, scrolls independently */}
        <div className="w-1/6 flex-shrink-0 overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content area (Toolbar and MainContent) - takes up remaining horizontal space */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div ref={mainContentRef} className="flex-1 m-2 overflow-y-auto">
            <MainContent ref={containerRef} />
          </div>
        </div>
        {isChatUiOpen ? <ChatUI /> : null}
      </div>
    </div>
  );
}

export default RetractedView;