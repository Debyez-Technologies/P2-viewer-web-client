import React, { forwardRef } from 'react';
const ModuleItem = forwardRef(({ title, dmKey, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="p-2 mb-1 bg-white rounded border border-gray-300 shadow-sm"
      title={dmKey} // Show the full key on hover for debugging
    >
      <p className="text-sm font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 truncate">{dmKey}</p>
    </div>
  );
});

export default ModuleItem;