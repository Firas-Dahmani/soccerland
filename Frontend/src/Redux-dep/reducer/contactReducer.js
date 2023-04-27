import {
    CONTACT_SEND_REQUEST,
    CONTACT_SEND_SUCCESS,
    CONTACT_SEND_FAIL,
} from './../constant/contactConstant';

export const contactReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_SEND_REQUEST:
            return {
                loading: true
            };

        case CONTACT_SEND_SUCCESS:
            return {
                loading: false, data: action.payload
            };

        case CONTACT_SEND_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}