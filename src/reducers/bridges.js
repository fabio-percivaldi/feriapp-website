import { CALCULATE_BRIDGES } from "../constants/action-types";

const initialState = {
    bridges: ['pippo']
};
function rootReducer(state = initialState, action) {
    if (action.type === CALCULATE_BRIDGES) {
        state = { ...state, bridges: action.payload.bridges }
    }
    return state;
};
export default rootReducer;