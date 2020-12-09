import actionTypes from "./actionTypes";

const actions = {
    setValidated: (payload) => ({
            type: actionTypes.SET_VALIDATED,
            payload: payload
    })
};
export default actions;

