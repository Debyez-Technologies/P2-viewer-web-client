import { createContext, useContext } from 'react';

// Create the context. We'll provide a default value for safety.
export const TableContext = createContext({ isHeader: false });

// Create a custom hook for easy access to the context.
export const useTableContext = () => useContext(TableContext);