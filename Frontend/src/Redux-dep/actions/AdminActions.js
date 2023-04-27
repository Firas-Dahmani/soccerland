import {
  USERS_ACCEPTE_FAIL,
  USERS_ACCEPTE_REQUEST,
  USERS_ACCEPTE_SUCCESS,
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_SEEN_FAIL,
  USERS_SEEN_REQUEST,
  USERS_SEEN_SUCCESS,
  USER_REGISTER_OWNER_FAIL,
  USER_REGISTER_OWNER_REQUEST,
  USER_REGISTER_OWNER_SUCCESS,
  VILLE_DELETE_SUCCESS,
  VILLE_DELETE_REQUEST,
  VILLE_DELETE_FAIL,
  VILLE_ADD_REQUEST,
  VILLE_ADD_FAIL,
  VILLE_ADD_SUCCESS,
  CONTACT_MESSAGE_SEEN_SUCCESS,
  CONTACT_MESSAGE_SEEN_FAIL,
  CONTACT_MESSAGE_SEEN_REQUEST,
  CONTACT_MESSAGE_DELETE_REQUEST,
  CONTACT_MESSAGE_DELETE_FAIL,
  CONTACT_MESSAGE_DELETE_SUCCESS,
} from "../constant/AdminConstant";
import axios from 'axios';
import {
  sessionService
} from 'redux-react-session';

// User
export const userSeenAction = () => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: USERS_SEEN_REQUEST
    })

    sessionService.loadUser()
    .then(async (Users) => {
       config = {
        headers: {
          Authorization: `Bearer ${Users.token}`,
        }
      }

      await axios.post("/admin/seeUser", {},
        config
      ).then(response => {

        const {
          data
        } = response

        if (data.status === 'FAILED') {
          dispatch({
            type: USERS_SEEN_FAIL,
            payload: data.message
          })

        } else if (data.status === 'SUCCESS') {
          const {
            users
          } = data
          dispatch({
            type: USERS_SEEN_SUCCESS,
            payload: users
          })
        }
      })
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: USERS_SEEN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const userAccepteAction = (id, email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_ACCEPTE_REQUEST
    })

    const {
      session: {
        user
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    };

    await axios.post(`/admin/acceptUser/${id}`, {
        email
      },
      config
    ).then(response => {

      const {
        data
      } = response

      if (data.status === 'FAILED') {
        dispatch({
          type: USERS_ACCEPTE_FAIL,
          payload: data.message
        })

      } else if (data.status === 'SUCCESS') {
        dispatch({
          type: USERS_ACCEPTE_SUCCESS,
          payload: data
        })
      }
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: USERS_ACCEPTE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_DELETE_REQUEST
    })

    const {
      session: {
        user
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    };

    await axios.post(`/admin/deleteUser/${id}`, {},
      config
    ).then(response => {

      const {
        data
      } = response

      if (data.status === 'FAILED') {
        dispatch({
          type: USERS_DELETE_FAIL,
          payload: data.message
        })

      } else if (data.status === 'SUCCESS') {
        dispatch({
          type: USERS_DELETE_SUCCESS,
          payload: data
        })
      }
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: USERS_DELETE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

//Owner
export const addOwnerAction = (element) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REGISTER_OWNER_REQUEST
    })
    const {
      session: {
        user
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    };
    await axios.post("/admin/addOwner", element ,config)
      .then(response => {
      const {
        data
      } = response

      if (data.status === 'FAILED') {
        const {
          message
        } = data

        dispatch({
          type: USER_REGISTER_OWNER_FAIL,
          payload: message
        })
      } else if (data.status === 'SUCCESS') {
        dispatch({
          type: USER_REGISTER_OWNER_SUCCESS,
          payload: data
        })
      }
    })

  } catch (error) {
    dispatch({
      type: USER_REGISTER_OWNER_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

//Ville
export const villeDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VILLE_DELETE_REQUEST
    })

    const {
      session: {
        user
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    };

    await axios.post(`/admin/removeVille`, {
        id
      },
      config

    ).then(response => {
      const {
        data
      } = response

      if (data.status === 'FAILED') {
        dispatch({
          type: VILLE_DELETE_FAIL,
          payload: data.message
        })

      } else if (data.status === 'SUCCESS') {
        const {
          ville
        } = data
        dispatch({
          type: VILLE_DELETE_SUCCESS,
          payload: ville
        })
      }
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: VILLE_DELETE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const villeAddAction = (villeName) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VILLE_ADD_REQUEST
    })

    const {
      session: {
        user
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    };

    await axios.post(`/admin/addVille`, {
        villeName,
      },
      config

    ).then(response => {
      const {
        data
      } = response

      if (data.status === 'FAILED') {
        dispatch({
          type: VILLE_ADD_FAIL,
          payload: data.message
        })

      } else if (data.status === 'SUCCESS') {
        const {
          ville
        } = data
        dispatch({
          type: VILLE_ADD_SUCCESS,
          payload: ville
        })
      }
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: VILLE_ADD_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const contactMeesageSeenAction = () => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: CONTACT_MESSAGE_SEEN_REQUEST
    })
    sessionService.loadUser()
      .then(async (Users) => {
        config = {
          headers: {
            Authorization: `Bearer ${Users.token}`,
          }
        }

        await axios.post("/admin/messageContact", {},
            config
          )
          .then(response => {
            const {
              data
            } = response

            if (data.status === 'FAILED') {
              dispatch({
                type: CONTACT_MESSAGE_SEEN_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                messages
              } = data
              dispatch({
                type: CONTACT_MESSAGE_SEEN_SUCCESS,
                payload: messages
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: CONTACT_MESSAGE_SEEN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const contactMeesageDeleteAction = (MESSAGE_ID) => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: CONTACT_MESSAGE_DELETE_REQUEST
    })
    sessionService.loadUser()
      .then(async (Users) => {
        config = {
          headers: {
            Authorization: `Bearer ${Users.token}`,
          }
        }

        await axios.post("/admin/deletemessageContact", {
              MESSAGE_ID
            },
            config
          )
          .then(response => {
            const {
              data
            } = response

            if (data.status === 'FAILED') {
              dispatch({
                type: CONTACT_MESSAGE_DELETE_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              dispatch({
                type: CONTACT_MESSAGE_DELETE_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    console.log(error);
    dispatch({
      type: CONTACT_MESSAGE_DELETE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}