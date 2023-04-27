import { useParams, Link  } from 'react-router-dom'
import './emailSent.css'

function EmailSent() {
    const {userEmail, reset} = useParams()
  return (
        <div className="emailsent">
            <div className='card text-center' >
                {reset && userEmail && 
                    <>
                        <div className="card-body">
                        <h1 className='title'>Password Reset</h1> 
                        <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" className='iconImg  top-70 start-50 translate-middle' alt=''/>
                        </div>
                        <p className=''>
                            An email with a password reset link has been sent to your email : 
                            <strong>{userEmail}</strong> ✔
                        </p>
                        <p>
                            check your email and click on the link to proceed 
                        </p>
                        <Link to={`/registerlogin`}  className='btnconfirm top-70 start-50 translate-middle'>
                                Confirm Account
                        </Link>
                    </>
                }
                {!reset && userEmail && 
                    <>
                        <div className="card-body">
                        <h1 className='title'>Account Confirmation</h1> 
                        <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" className='iconImg  top-70 start-50 translate-middle' alt=''/>
                        </div>
                        <p className=''>
                            An email with your account confirmation link has been sent to your email : 
                            <strong>{userEmail}</strong> ✔
                        </p>
                        <p>
                            check your email and click on the link to proceed 
                        </p>
                        <Link to={`/registerlogin`}  className='btnconfirm top-70 start-50 translate-middle'>
                                Confirm Account
                        </Link>
                    </>
                }
                {!reset && !userEmail && 
                    <>
                        <div className="card-body">
                        <h1 className='title'>Password Reset</h1> 
                        <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" className='iconImg  top-70 start-50 translate-middle' alt=''/>
                        </div>
                        <p className=''>
                            Your Password has been Reset Successfuly ✔
                        </p>
                        <p>
                            You may now log in  
                        </p>
                        <Link to={`/registerlogin`}  className='btnconfirm top-70 start-50 translate-middle'>
                                Login
                        </Link>
                    </>
                }
            </div>
        </div>
  )
}

export default EmailSent