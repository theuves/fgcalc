import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { isShareableEstimate } from '../utils/shareEstimate.js';
import ShareIcon from './ShareIcon.jsx';

const ShareDialog = lazy(() => import('./ShareDialog.jsx'));

export default function ShareEstimate(props) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const onClose = useCallback(() => setIsOpen(false), []);
  return (
    <>
      <button ref={triggerRef} type="button" className="share-trigger"
        disabled={!isShareableEstimate(props.estimate)} onClick={() => setIsOpen(true)}>
        <span className="share-trigger-icon"><ShareIcon /></span>
        <span>{props.messages.ui.share.button}</span>
      </button>
      {isOpen && <Suspense fallback={null}>
        <ShareDialog {...props} onClose={onClose} triggerRef={triggerRef} />
      </Suspense>}
    </>
  );
}
