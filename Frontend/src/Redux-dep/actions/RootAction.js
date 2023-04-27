import { sessionService } from "redux-react-session"
import axios from "axios"
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
} from "../constant/rootConstant"

//Ville
export const villeSeenAction = () => async (dispatch) => {
    try {
      let config = {}
      dispatch({
        type: VILLE_SEEN_REQUEST
      })
      sessionService.loadUser()
        .then(async (User) => {
          config = {
            headers: {
              Authorization: `Bearer ${User.token}`,
            }
          }
  
          await axios.get("/root/getVille", {},
              config
            )
            .then(response => {
              const {
                data
              } = response
  
              if (data.status === 'FAILED') {
                dispatch({
                  type: VILLE_SEEN_FAIL,
                  payload: data.message
                })
  
              } else if (data.status === 'SUCCESS') {
                const {
                  ville
                } = data
                dispatch({
                  type: VILLE_SEEN_SUCCESS,
                  payload: ville
                })
              }
            })
        })
  
    } catch (error) {
      dispatch({
        type: VILLE_SEEN_FAIL,
        payload: error.response && error.response.data.message ?
          error.response.data.message :
          error.message,
      })
    }
}

//Stade
export const MystadeSeenAction = () => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: MY_STADE_SEEN_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post("/root/getMystade", {}, config)
          .then(response => {
            const {
              data
            } = response

            if (data.status === 'FAILED') {
              dispatch({
                type: MY_STADE_SEEN_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                stade
              } = data
              
              dispatch({
                type: MY_STADE_SEEN_SUCCESS,
                payload: stade
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: MY_STADE_SEEN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const StadeSeenAction = (Ville) => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: STADE_SEEN_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post("/root/getStade", {
              Ville
            },
            config
          )
          .then(response => {
            const {
              data
            } = response

            if (data.status === 'FAILED') {
              dispatch({
                type: STADE_SEEN_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                stade
              } = data
              dispatch({
                type: STADE_SEEN_SUCCESS,
                payload: stade
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: STADE_SEEN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const stadeAddAction = (VilleID, Nom, Photo, OpenTime, Description, Tel) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STADE_ADD_REQUEST
    })
    const {
      session: {
        user
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    await axios.post(`/root/addStade`, {
        VilleID,
        Nom,
        Photo,
        OpenTime,
        Description,
        Tel
      },
      config

    ).then(response => {
      const {
        data
      } = response

      if (data.status === 'FAILED') {
        dispatch({
          type: STADE_ADD_FAIL,
          payload: data.message
        })

      } else if (data.status === 'SUCCESS') {
        dispatch({
          type: STADE_ADD_SUCCESS,
          payload: true
        })
      }
    })

  } catch (error) {
    dispatch({
      type: STADE_ADD_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const stadeDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STADE_DELETE_REQUEST
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

    await axios.post(`/root/removeStade`, {
        id
      },
      config

    ).then(response => {
      const {
        data
      } = response

      if (data.status === 'FAILED') {
        dispatch({
          type: STADE_DELETE_FAIL,
          payload: data.message
        })

      } else if (data.status === 'SUCCESS') {
        const {
          ville
        } = data
        dispatch({
          type: STADE_DELETE_SUCCESS,
          payload: ville
        })
      }
    })

  } catch (error) {
    dispatch({
      type: STADE_DELETE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

//reservation
export const getEventAction = () => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: EVENT_SEEN_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post('/root/getEvent', {}, config).then(response => {
          const {
            data
          } = response
          if (data.status === 'FAILED') {
            dispatch({
              type: EVENT_SEEN_FAIL,
              payload: data.message
            })

          } else if (data.status === 'SUCCESS') {
            const {
              Reservations
            } = data

            dispatch({
              type: EVENT_SEEN_SUCCESS,
              payload: Reservations
            })
          }
        })
      })

  } catch (error) {
    dispatch({
      type: EVENT_SEEN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const AddEventAction = (StadeId, Prix, Start, End, NbjMax) => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: EVENT_ADD_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post('/root/createEvent', {
              StadeId,
              Prix,
              Start,
              End,
              NbjMax
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: EVENT_ADD_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {

              dispatch({
                type: EVENT_ADD_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: EVENT_ADD_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const DeleteEventAction = (id) => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: DELETE_EVENT_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post(`/root/removeReservation`, {
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
                type: DELETE_EVENT_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              dispatch({
                type: DELETE_EVENT_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

//User
export const profileSeenAction = () => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: PROFILE_SEEN_REQUEST
    })
    sessionService.loadUser()
      .then(async (Users) => {
        config = {
          headers: {
            Authorization: `Bearer ${Users.token}`,
          }
        }

        await axios.post("/root/profile", {},
            config
          )
          .then(response => {
            const {
              data
            } = response

            if (data.status === 'FAILED') {
              dispatch({
                type: PROFILE_SEEN_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                User
              } = data
              dispatch({
                type: PROFILE_SEEN_SUCCESS,
                payload: User[0]
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: PROFILE_SEEN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const updatePicAction = (pic) => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: UPDATE_PIC_REQUEST
    })
    sessionService.loadUser()
      .then(async (Users) => {
        config = {
          headers: {
            Authorization: `Bearer ${Users.token}`,
          }
        }

        await axios.post("/root/updatepic", {pic},
            config
          )
          .then(response => {
            const {
              data
            } = response

            if (data.status === 'FAILED') {
              dispatch({
                type: UPDATE_PIC_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              dispatch({
                type: UPDATE_PIC_SUCCESS,
                payload: true
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: UPDATE_PIC_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const updateUserProfile = (element) => async dispatch => {
  try {
    let config = {}
    dispatch({
      type: USER_UPDATE_REQUEST
    })

    sessionService.loadUser()
      .then(async (Users) => {
        config = {
          headers: {
            Authorization: `Bearer ${Users.token}`,
          }
        }
        await axios.post("/root/updateprofile", element ,config)
        .then(response => {
          const {
            data
          } = response

          if (data.status === 'FAILED') {
            const {
              message
            } = data

            dispatch({
              type: USER_UPDATE_FAIL,
              payload: message
            })
          } else if (data.status === 'SUCCESS') {
            dispatch({
              type: USER_UPDATE_SUCCESS,
              payload: true
            })
          }
        })
      })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const playerSearchAction = (Poste, playerName, ville) => async (dispatch) => {
  try {

    let config = {}
    dispatch({
      type: PLAYER_SEARCH_REQUEST
    })
    sessionService.loadUser()
      .then(async (User) => {
        config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          }
        }

        await axios.post('/root/search', {
              Poste,
              playerName,
              ville,
            },
            config
          )
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: PLAYER_SEARCH_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                Users
              } = data

              dispatch({
                type: PLAYER_SEARCH_SUCCESS,
                payload: Users
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: PLAYER_SEARCH_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const findUserByIDAction = (id) => async (dispatch) => {
  try {
    let config = {}
    dispatch({
      type: USER_FINDBYID_REQUEST
    })
    sessionService.loadUser()
      .then(async (Users) => {
        config = {
          headers: {
            Authorization: `Bearer ${Users.token}`,
          }
        }

        await axios.get(`/user/equipe/${id}`, config)
          .then(response => {
            const {
              data
            } = response
            if (data.status === 'FAILED') {
              dispatch({
                type: USER_FINDBYID_FAIL,
                payload: data.message
              })

            } else if (data.status === 'SUCCESS') {
              const {
                User
              } = data
              dispatch({
                type: USER_FINDBYID_SUCCESS,
                payload: User[0]
              })
            }
          })
      })

  } catch (error) {
    dispatch({
      type: USER_FINDBYID_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}