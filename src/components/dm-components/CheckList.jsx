import React, { useState, createContext } from 'react';
import styles from '../../utils/styleMap.json';

// Create a context to share state between CheckList and CheckListItem
export const CheckListContext = createContext();

/**
 * The main CheckList component using Context API instead of prop injection
 */
function CheckList({ children, ...props }) {
  const [itemStates, setItemStates] = useState({});

  /**
   * Handles state changes from any CheckListItem.
   * Allows toggling states on and off.
   * @param {string} itemId - The unique ID of the item being changed.
   * @param {'passed' | 'failed'} newState - The new state to apply.
   */
  const handleStateChange = (itemId, newState) => {
    setItemStates((prevStates) => {
      const isTogglingOff = prevStates[itemId] === newState;
      return {
        ...prevStates,
        [itemId]: isTogglingOff ? null : newState,
      };
    });
  };

  const contextValue = {
    itemStates,
    handleStateChange
  };

  return (
    <CheckListContext.Provider value={contextValue}>
      <div className={styles['CheckList']} {...props}>
        {children}
      </div>
    </CheckListContext.Provider>
  );
}

export default CheckList;