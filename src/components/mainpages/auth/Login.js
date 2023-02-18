import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_URL_API}/user/login`, {...user})

            localStorage.setItem('firstLogin', true)

            swal({
                title: `Welcome to, K A O N`,
                text: "Your place to find what you crave",
                icon: "success",
            });

            window.setTimeout(function() {
                window.location.href = '/';
            }, 2000);

        } catch (err) {
            // alert()
            swal({
                title: err.response.data.msg,
                text: "Please, Check your user credential",
                icon: "error",
            });
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
