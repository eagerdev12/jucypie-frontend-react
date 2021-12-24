import { SHOW_MODAL, HIDE_MODAL } from "../action-types";

const initialState = {
    show_modal: false
};

const UIReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                show_modal: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                show_modal: false
            };
        default:
            return state;
    }
}

export default UIReducer;
