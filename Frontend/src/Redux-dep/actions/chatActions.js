import {
  sessionService
} from "redux-react-session"
import {
  ACCEPT_DEMANDE_FAIL,
  ACCEPT_DEMANDE_REQUEST,
  ACCEPT_DEMANDE_SUCCESS,
  FETCH_DEMANDE_FAIL,
  FETCH_DEMANDE_REQUEST,
  FETCH_DEMANDE_SUCCESS
} from "../constant/chatConstant"
import axios from 'axios'

export const FetchDemandeAction = (chatId) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: FETCH_DEMANDE_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/api/chat/fetch`, {
              chatId
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: FETCH_DEMANDE_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                RequestGroup
              } = data
              dispatch({
                type: FETCH_DEMANDE_SUCCESS,
                payload: RequestGroup
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: FETCH_DEMANDE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const AcceptDemandeAction = (chatId, userId) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: ACCEPT_DEMANDE_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.put(`/api/chat/accReq`, {
              chatId,
              userId
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: ACCEPT_DEMANDE_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              dispatch({
                type: ACCEPT_DEMANDE_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: ACCEPT_DEMANDE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}