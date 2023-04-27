import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import {
    composeWithDevTools
} from 'redux-devtools-extension';
import {
    authLoginReducer,
    authRegisterReducer,
    authEmailVerifReducer,
    authResetPasswordReducer,
} from './reducer/authReduces';
import {
    sessionReducer,
    sessionService
} from 'redux-react-session'
import {
    contactReducer
} from './reducer/contactReducer';
import {
    userAccepteReducer,
    userSeenReducer,
    userDeleteReducer,
    addOwnerReducer,
    villeDeleteReducer,
    villeAddReducer,
    contactMessageSeenReducer,
    contactMessageDeleteReducer,
} from './reducer/AdminReducers';
import {
    AccepterGroupReducer,
    AddReservationUserReducer,
    CancelReservationReducer,
    DemandeGroupReducer,
    getStadeReducer,
    RejeterGroupReducer,
    SearchGroupReducer,
    SearchSatdeReducer,
} from "./reducer/UserReducers";
import {
    AcceptReducer,
    fetchReducer
} from "./reducer/chatReducers";
import { 
    AddReservationReducer, 
    DeleteEventReducer, 
    MystadeSeenReducer, 
    playerSearchReducer, 
    profileSeenReducer, 
    showReservationReducer, 
    stadeAddReducer, 
    stadeDeleteReducer, 
    stadeSeenReducer, 
    updatePicReducer, 
    UserFindByIDReducer, 
    UpdateProfileReducer, 
    villeSeenReducer 
} from "./reducer/rootReducers";



const reducer = combineReducers({
    // auth Reducers
    authLogin: authLoginReducer,
    authRegister: authRegisterReducer,
    authEmailVerif: authEmailVerifReducer,
    authResetPassword: authResetPasswordReducer,
    // Index reducers
    contact: contactReducer,
    //Admin Reducers
    userSeen: userSeenReducer,
    userAccepte: userAccepteReducer,
    userDelete: userDeleteReducer,
    addOwner: addOwnerReducer,
    villeDelete: villeDeleteReducer,
    villeAdd: villeAddReducer,
    contactMessageSeen: contactMessageSeenReducer,
    contactMessageDelete: contactMessageDeleteReducer,
    //Session Reducer
    session: sessionReducer,
    //root Reducers
    profileSeen:profileSeenReducer,
    updatePic:updatePicReducer,
    UpdateProfile:UpdateProfileReducer,
    stadeSeen:stadeSeenReducer,
    MystadeSeen:MystadeSeenReducer,
    stadeAdd:stadeAddReducer,
    stadeDelete:stadeDeleteReducer,
    villeSeen:villeSeenReducer,
    showReservation:showReservationReducer,
    AddReservation:AddReservationReducer,
    DeleteEvent:DeleteEventReducer,
    playerSearch:playerSearchReducer,
    UserFindByID: UserFindByIDReducer,
    // User Reducers
    SearchSatde: SearchSatdeReducer,
    getStade: getStadeReducer,
    AddReservationUser: AddReservationUserReducer,
    CancelReservation: CancelReservationReducer,
    SearchGroup: SearchGroupReducer,
    AccepterGroup: AccepterGroupReducer,
    RejeterGroup: RejeterGroupReducer,
    Demande: DemandeGroupReducer,
    //Chat
    fetch: fetchReducer,
    Accept: AcceptReducer,
})


const inistialState = {}

const middleware = [thunk];

const store = createStore(
    reducer,
    inistialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

sessionService.initSessionService(store)

export default store