import axios from 'axios';
import {
  sessionService
} from 'redux-react-session';
import {
  ACCEPTER_GROUP_FAIL,
  ACCEPTER_GROUP_REQUEST,
  ACCEPTER_GROUP_SUCCESS,
  DEMANDE_GROUP_FAIL,
  DEMANDE_GROUP_REQUEST,
  DEMANDE_GROUP_SUCCESS,
  GET_STADE_FAIL,
  GET_STADE_REQUEST,
  GET_STADE_SUCCESS,
  REJETER_GROUP_FAIL,
  REJETER_GROUP_REQUEST,
  REJETER_GROUP_SUCCESS,
  RESERVER_ADD_FAIL,
  RESERVER_ADD_REQUEST,
  RESERVER_ADD_SUCCESS,
  RESERVER_CANCEL_FAIL,
  RESERVER_CANCEL_REQUEST,
  RESERVER_CANCEL_SUCCESS,
  SEARCH_GROUP_FAIL,
  SEARCH_GROUP_REQUEST,
  SEARCH_GROUP_SUCCESS,
  SEARCH_STADE_FAIL,
  SEARCH_STADE_REQUEST,
  SEARCH_STADE_SUCCESS,
} from '../constant/UserConstant';


// Equipe 
export const SearchStadeAction = (stadename, villeID) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: SEARCH_STADE_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post('/user/searchstade', {
              stadename,
              villeID
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: SEARCH_STADE_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                stade
              } = data

              dispatch({
                type: SEARCH_STADE_SUCCESS,
                payload: stade
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: SEARCH_STADE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const getStadeAction = (id) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: GET_STADE_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/user/getstadebyID/${id}`, {},
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: GET_STADE_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                Stade
              } = data

              dispatch({
                type: GET_STADE_SUCCESS,
                payload: Stade
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_STADE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const Reserver = (id,socket) => async (dispatch) => {
  try {
    
    let config = {}
    dispatch({
      type: RESERVER_ADD_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/user/reserver`, {
              id
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: RESERVER_ADD_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                reservation
              } = data
              socket.emit("reserver", reservation)
              dispatch({
                type: RESERVER_ADD_SUCCESS,
                payload: reservation
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: RESERVER_ADD_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const CancelReservation = (id) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: RESERVER_CANCEL_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/user/annulerRes`, {
              id
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: RESERVER_CANCEL_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {

              dispatch({
                type: RESERVER_CANCEL_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: RESERVER_CANCEL_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const SearchGroupAction = (Nom) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: SEARCH_GROUP_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/user/searchgroupe`, {
              Nom
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: SEARCH_GROUP_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                groups
              } = data
              dispatch({
                type: SEARCH_GROUP_SUCCESS,
                payload: groups
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: SEARCH_GROUP_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const AccepterGroupAction = (chatId) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: ACCEPTER_GROUP_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/user/accept`, {
              chatId
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            console.log(data)
            if (data.status === 'FAILED') {
              dispatch({
                type: ACCEPTER_GROUP_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              dispatch({
                type: ACCEPTER_GROUP_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: ACCEPTER_GROUP_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const RejeterGroupAction = (chatId) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: REJETER_GROUP_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/user/leave`, {
              chatId
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            console.log(data)
            if (data.status === 'FAILED') {
              dispatch({
                type: REJETER_GROUP_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              dispatch({
                type: REJETER_GROUP_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: REJETER_GROUP_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const DemandeGroupAction = (chatId, socket) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: DEMANDE_GROUP_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/user/sendReq`, {
              chatId
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            console.log(data)
            if (data.status === 'FAILED') {
              dispatch({
                type: DEMANDE_GROUP_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {chat} = data
              socket.emit("add request", chat)
              dispatch({
                type: DEMANDE_GROUP_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: DEMANDE_GROUP_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}