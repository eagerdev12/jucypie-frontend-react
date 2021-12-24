import { HIDE_MODAL, SHOW_MODAL } from "../action-types";

export const showModal = () => ({
    type: SHOW_MODAL
});

export const hideModal = () => ({
    type: HIDE_MODAL
});
