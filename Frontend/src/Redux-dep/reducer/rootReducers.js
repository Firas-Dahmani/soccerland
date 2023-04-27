import { 
    DELETE_EVENT_FAIL,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    EVENT_ADD_FAIL,
    EVENT_ADD_REQUEST,
    EVENT_ADD_SUCCESS,
    EVENT_SEEN_FAIL,
    EVENT_SEEN_REQUEST,
    EVENT_SEEN_SUCCESS,
    MY_STADE_SEEN_FAIL,
    MY_STADE_SEEN_REQUEST,
    MY_STADE_SEEN_SUCCESS,
    PLAYER_SEARCH_FAIL,
    PLAYER_SEARCH_REQUEST,
    PLAYER_SEARCH_SUCCESS,
    PROFILE_SEEN_FAIL, 
    PROFILE_SEEN_REQUEST, 
    PROFILE_SEEN_SUCCESS, 
    STADE_ADD_FAIL, 
    STADE_ADD_REQUEST, 
    STADE_ADD_SUCCESS, 
    STADE_DELETE_FAIL, 
    STADE_DELETE_REQUEST, 
    STADE_DELETE_SUCCESS, 
    STADE_SEEN_FAIL, 
    STADE_SEEN_REQUEST, 
    STADE_SEEN_SUCCESS, 
    UPDATE_PIC_FAIL,
    UPDATE_PIC_REQUEST,
    UPDATE_PIC_SUCCESS,
    USER_FINDBYID_FAIL,
    USER_FINDBYID_REQUEST,
    USER_FINDBYID_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    VILLE_SEEN_FAIL,
    VILLE_SEEN_REQUEST,
    VILLE_SEEN_SUCCESS,
} from "../constant/rootConstant";

//User
export const profileSeenReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_SEEN_REQUEST:
            return {
                loading: true
            };

        case PROFILE_SEEN_SUCCESS:
            return {
                loading: false, seeProfile: action.payload
            };

        case PROFILE_SEEN_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const updatePicReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PIC_REQUEST:
            return {
                loading: true
            };

        case UPDATE_PIC_SUCCESS:
            return {
                loading: false, success: true
            };

        case UPDATE_PIC_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const UpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {
                loading: true
            };

        case USER_UPDATE_SUCCESS:
            return {
                loading: false, success: true
            };

        case USER_UPDATE_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

//Stade
export const stadeSeenReducer = (state = {}, action) => {
    switch (action.type) {
        case STADE_SEEN_REQUEST:
            return {
                loading: true
            };

        case STADE_SEEN_SUCCESS:
            return {
                loading: false, stade: action.payload
            };

        case STADE_SEEN_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const MystadeSeenReducer = (state = {}, action) => {
    switch (action.type) {
        case MY_STADE_SEEN_REQUEST:
            return {
                loading: true
            };

        case MY_STADE_SEEN_SUCCESS:
            return {
                loading: false, stade: action.payload
            };

        case MY_STADE_SEEN_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const stadeAddReducer = (state = {}, action) => {
    switch (action.type) {
        case STADE_ADD_REQUEST:
            return {
                loading: true
            };

        case STADE_ADD_SUCCESS:
            return {
                loading: false, success: action.payload
            };

        case STADE_ADD_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const stadeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STADE_DELETE_REQUEST:
            return {
                loading: true
            };

        case STADE_DELETE_SUCCESS:
            return {
                loading: false, success: true
            };

        case STADE_DELETE_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

//Ville
export const villeSeenReducer = (state = {}, action) => {
    switch (action.type) {
        case VILLE_SEEN_REQUEST:
            return {
                loading: true
            };

        case VILLE_SEEN_SUCCESS:
            return {
                loading: false, ville: action.payload
            };

        case VILLE_SEEN_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

//Reservation
export const showReservationReducer = (state = {}, action) => {
    switch (action.type) {
        case EVENT_SEEN_REQUEST:
            return {
                loading: true
            };

        case EVENT_SEEN_SUCCESS:
            return {
                loading: false, event: action.payload
            };

        case EVENT_SEEN_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const AddReservationReducer = (state = {}, action) => {
    switch (action.type) {
        case EVENT_ADD_REQUEST:
            return {
                loading: true
            };

        case EVENT_ADD_SUCCESS:
            return {
                loading: false, success: true
            };

        case EVENT_ADD_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const DeleteEventReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_EVENT_REQUEST:
            return {
                loading: true
            };

        case DELETE_EVENT_SUCCESS:
            return {
                loading: false, success: true
            };

        case DELETE_EVENT_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

//Seach user 
export const playerSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAYER_SEARCH_REQUEST:
            return {
                loading: true
            };

        case PLAYER_SEARCH_SUCCESS:
            return {
                loading: false, Users: action.payload
            };

        case PLAYER_SEARCH_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const UserFindByIDReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FINDBYID_REQUEST:
            return {
                loading: true
            };

        case USER_FINDBYID_SUCCESS:
            return {
                loading: false, User: action.payload
            };

        case USER_FINDBYID_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}