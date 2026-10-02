/* =============================================================
   state.js — Application State
   Single source of truth. No globals leaked to window.
   ============================================================= */

export const state = {
  // Currently displayed deity index
  currentDeityIdx: 0,

  // Currently filtered deity list
  filteredDeities: [],

  // Active tradition filter
  activeTradition: 'all',

  // Active section (for routing)
  activeSection: 'home',

  // Currently selected sacred text
  selectedTextId: null,

  // Currently selected tradition group (traditions section)
  selectedTraditionId: null,

  // Panel transition lock (prevent race conditions)
  transitioning: false,

  // Canvas animation frame ID
  animFrameId: null,
};

/** Update state and optionally run a callback */
export function setState(patch, callback) {
  Object.assign(state, patch);
  if (typeof callback === 'function') callback(state);
}

/** Reset filters to default */
export function resetFilters() {
  setState({
    activeTradition: 'all',
    currentDeityIdx: 0,
  });
}
