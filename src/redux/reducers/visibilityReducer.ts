import { FILTER_NOTE, Action, TagValues } from "../actions/actions";

// A reducer cares about a specific part of the state (visibility in this case).
// Even if we setup an initialState when creating a store, if we fail to set a
// part of the state, then the responsibility of initializing that part  falls
// into the RELATED reducer.

// In this case, visibility is NOT initialized when creating the store, so we
// initialize it here, otherwise, it would be undefined.
const visibilityReducer = (visibility = TagValues.showAll, action: Action) =>
  action.type === FILTER_NOTE ? action.payload : visibility;

export default visibilityReducer;
