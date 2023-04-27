import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_EMAIL_VERIFICATION_SEND_REQUEST,
  USER_EMAIL_VERIFICATION_SEND_FAIL,
  USER_RESET_PASSWORD_SEND_REQUEST,
  USER_RESET_PASSWORD_SEND_SUCCESS,
  USER_RESET_PASSWORD_SEND_FAIL,
} from '../constant/authConstant';
import axios from 'axios';
import {
  sessionService
} from 'redux-react-session';

export const login = (email, password, navigate) => async (dispatch) => {

  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    await axios.post(
      "/api/login", {
        email,
        password,
      },
      config).then(response => {
      const {
        data
      } = response
      if (data.status === 'FAILED') {
        const {
          message
        } = data

        dispatch({
          type: USER_LOGIN_FAIL,
          payload: message
        })
      } else if (data.status === 'SUCCESS') {
        const userDATA = data.data[0]
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: userDATA
        })

        const token = data.token
        sessionService.saveSession(token).then(() => {

          sessionService.saveUser(data).then(() => {
            navigate('/')
          })

        })

      }
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const logout = (navigate) => async (dispatch) => {
  sessionService.deleteSession()
  sessionService.deleteUser()
  navigate('/registerlogin')
  dispatch({
    type: USER_LOGOUT
  });
};

export const register = (element, navigate) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    await axios.post(
      "/api/register", element,config)
      .then(response => {
      const {
        data
      } = response
      console.log(data);

      if (data.status === 'FAILED') {
        const {
          message
        } = data

        dispatch({
          type: USER_REGISTER_FAIL,
          payload: message
        })
      } else if (data.status === 'PENDING') {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data
        })
        navigate(`/emailsent/${element.email}`)
      }
    })

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const forgetPassword = (email, navigate) => async (dispatch) => {
  const redirectUrl = 'http://localhost:3000/registerlogin/resetpassworddone'

  try {
    dispatch({
      type: USER_EMAIL_VERIFICATION_SEND_REQUEST
    })

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    await axios.post(
      "/api/reqPasswordReset", {
        email,
        redirectUrl
      },
      config).then(response => {
      const {
        data
      } = response

      if (data.status === 'FAILED') {
        const {
          message
        } = data

        dispatch({
          type: USER_EMAIL_VERIFICATION_SEND_FAIL,
          error: message
        })
      } else if (data.status === 'PENDING') {
        navigate(`/emailsent/${email}/${true}`)
      }
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_EMAIL_VERIFICATION_SEND_FAIL,
      error: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}

export const ResetPassword = (userId, resetString, newPassword, navigate) => async (dispatch) => {

  try {
    dispatch({
      type: USER_RESET_PASSWORD_SEND_REQUEST
    })

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    await axios.post(
      "/api/PasswordResetDone", {
        userId,
        resetString,
        newPassword
      },
      config).then((result) => {
      const {
        data
      } = result

      if (data.status === 'FAILED') {
        const {
          message
        } = data

        dispatch({
          type: USER_RESET_PASSWORD_SEND_FAIL,
          error: message
        })
      } else if (data.status === 'SUCCESS') {
        dispatch({
          type: USER_RESET_PASSWORD_SEND_SUCCESS,
          payload: data.message
        })
        navigate('/emailsent')
      }
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_RESET_PASSWORD_SEND_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
  }
}