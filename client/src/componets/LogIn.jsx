import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/auth.context'
import { Link, useNavigate } from 'react-router-dom'
import { LoaderContext } from '../contexts/loader.context'

export const LogIn = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const { logIn, loadUser } = useContext(AuthContext)
    const { setIsLoading } = useContext(LoaderContext)
    const navigate = useNavigate()

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await logIn(user) //
            if (!res.ok) { //if request got rejected
                const jsonRes = await res.json()
                alert(jsonRes.message)
            } else {
                const jsonRes = await res.json() //convert response to json
                localStorage.setItem('token', jsonRes.token)
                loadUser() //load user data after login
                navigate("/")
            }
        } catch (error) {
            alert("Internal server error")
        }
        setIsLoading(false)
    }

    //handle change in input fields
    const handleChange = (event) => {
        const name = event.target.name
        setUser({ ...user, [name]: event.target.value })
    }
    
    return (
        <div className="form-container">
            <h3>Log In into your account</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                    <span>
                        <label htmlFor="Email">Email</label>
                    </span>
                    <input type="email" id='email' name='email' placeholder='Enter your email' onChange={(e) => handleChange(e)} />
                </div>
                <div className="input-container">
                    <span>
                        <label htmlFor="password">Password</label>
                    </span>
                    <input type="password" id='password' name='password' placeholder='Enter your password' onChange={(e) => handleChange(e)} />
                </div>
                <button type='submit' className='btn submit-btn'>Log In</button>
            </form>
            <Link to={"/signup"}>Create New Account</Link>
        </div>
    )
}
