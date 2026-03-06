import React from 'react';

/**
 * Component for the S1000D <sbConcurrentSbInfo> element.
 * 
 * Provides information about another Service Bulletin that must be accomplished
 * (or must not be accomplished) in relation to the current one.
 * 
 * Parent: <SbConcurrentSbList>
 * Children: <noInfo>, <refs>, <sbProductModification> (TextBlock)
 */
export default function SbConcurrentSbInfo({ attributes, children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      <p className="font-semibold capitalize">{attributes.sbConcurrentStatus?.replace(/([A-Z])/g, ' $1').trim()}:</p>
      <div className="pl-4">{children}</div>
    </div>
  );
}