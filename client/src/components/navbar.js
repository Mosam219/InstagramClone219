import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../App'
import './css/navbar.css'
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li><Link to="/myfollowerspost">My following Posts</Link></li>,
                <li>
                    <button className="btn waves-effect" onClick={() => {
                        localStorage.clear()
                        dispatch({ type: "CLEAR" })
                        history.push('/login')
                    }}>
                        Logout
                    </button>
                </li>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white" id="nav">
                <div>
                    <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link>
                </div>
                <div>
                    <ul id="nav-mobile" className="right">
                        {renderList()}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar