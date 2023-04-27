import { Link} from "react-router-dom";

function Navbar() {

  return (
    <>
        {/* <!-- logo --> */}
        <div id="logo">TAKWIRETNA</div>

        {/* <!-- navbar --> */}
        <div id="navbar">
            <ul>
                <li><Link className="nav-link "  to='/' >Accueil</Link></li>
                <li><Link className="nav-link "  to='/contact' >Contact</Link></li>
                {/* <!-- login Button --> */}
                <li id="login">
                    <Link  to='/registerlogin' >Connexion</Link>
                </li>                  
            </ul>
        </div>
    </>
  )
}

export default Navbar