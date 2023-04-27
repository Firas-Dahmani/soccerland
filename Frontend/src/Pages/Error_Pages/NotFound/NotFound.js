import { Link } from 'react-router-dom'
import NotFoundp from './NotFound.module.css'

function NotFound() {
  return (
  <>
    <div className={NotFoundp.notfound}>
      <div className={NotFoundp.contwrap}>
        <h2>Oops! Page not found.</h2>
        <h1>4 <img src={require('../../../assets/ball.png')} className={NotFoundp.ball} alt="" /> 4</h1>
        <p>We can't find the page you're looking for.</p>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  </>
  )
}

export default NotFound