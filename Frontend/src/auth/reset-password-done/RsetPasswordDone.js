import Form from 'react-bootstrap/Form'
import '../loginregister/loginregister.css'
import  Button  from 'react-bootstrap/Button';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword } from '../../Redux-dep/actions/authActions';
import { useState } from 'react';
import AlertCompnenet from '../../Components/Alert/AlertCompnenet';

function ResetPasswordDone() {
  const {userId, resetString} = useParams()
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authResetPassword = useSelector((state) => state.authResetPassword);
    const err = authResetPassword.error;

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(password !== confirmPassword){
      setErrorMessage("Password are not matched !")
    }else {
      setErrorMessage("")
      dispatch(ResetPassword(userId, resetString ,password, navigate))
    }
  }
  return (
    <div className="containerr sign-up-mode">
      <div className="forms-container">
        <div className="signin-signup">
          <Form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Reset Password?</h2>
            {err && <AlertCompnenet error={err}/>}
            {ErrorMessage && <AlertCompnenet error={ErrorMessage}/>}
            <Form.Group className=" mb-3 pass"   controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    required  
                    className="input-field"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group >
            <Form.Group className=" mb-3 confirmepass"   controlId="confirmPassword">
                <Form.Label>Confirme Password</Form.Label>
                <Form.Control required  
                    className="input-field"
                    type="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)  }
                />
            </Form.Group >
            <Button type="submit"  className="btn solid" >
              click here
            </Button>
          </Form>

        </div>
        <div className="panels-container">
          <div className="panel left-panel"></div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Attention here!!!</h3>
                <p>
                  Once you have submitted the request to reset your password, you will receive an email.  Follow the instructions in the email and your password will be reset.
                </p>
                <Button className="btn transparent" id="sign-up-btn" >
                  Don't Worry
                </Button>
              </div>
              <img src={require("../../assets/forgotpassword.png")} className="image" alt="" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordDone