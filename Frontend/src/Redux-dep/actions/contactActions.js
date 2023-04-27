import {
  CONTACT_SEND_REQUEST,
  CONTACT_SEND_SUCCESS,
  CONTACT_SEND_FAIL,
} from './../constant/contactConstant';
import axios from 'axios';


export const contactAction = (variableContact, navigate) => async (dispatch, getState) => {
  const [
    name,
    email,
    phone,
    messageContact
  ] = variableContact

  try {

    dispatch({
      type: CONTACT_SEND_REQUEST
    })

    const {
      session: {
        user
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.post(
      "/sendmessage", {
        name,
        email,
        phone,
        messageContact
      },
      config
    ).then(response => {
      const {
        data
      } = response

      if (data.status === 'FAILED') {
        const {
          message
        } = data

        dispatch({
          type: CONTACT_SEND_FAIL,
          payload: message
        })
      } else if (data.status === 'SUCCESS') {
        dispatch({
          type: CONTACT_SEND_SUCCESS,
          payload: data
        })
        navigate('/')
      }
    })

  } catch (error) {
    console.log(error);
    dispatch({
      type: CONTACT_SEND_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.message,
    })
  }
}