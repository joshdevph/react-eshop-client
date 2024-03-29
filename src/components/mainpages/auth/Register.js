import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            var res = await axios.post(`${process.env.REACT_APP_URL_API}/user/register`, {...user})

            localStorage.setItem('firstLogin', true)
            localStorage.setItem('refreshtoken', res.data.refreshtoken)
            swal({
                title: `Welcome to, K A O N`,
                text: "You have successfully registered",
                icon: "success",
            });

            window.setTimeout(function() {
                window.location.href = '/';
            }, 2000);
        } catch (err) {
            swal({
                title: err.response.data.msg,
                icon: "error",
            })
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register