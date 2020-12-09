const initialState = {
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setValidated":
            let update = {};
            switch(action.payload.inputFieldName) {
                case "firstName":
                    update = {... state, firstName: action.payload.newValue};
                    break;
                case "lastName":
                    update = {... state, lastName: action.payload.newValue};
                    break;
                case "email":
                    update = {... state, email: action.payload.newValue};
                    break;
                case "phoneNumber":
                    update = {... state, phoneNumber: action.payload.newValue};
                    break;
                default:
                    update = {};
            }
            return update;
        default:
            return state
    }
}
export default reducer;
