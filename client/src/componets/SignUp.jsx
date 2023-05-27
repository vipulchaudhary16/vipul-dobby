import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/auth.context'
import { Link, useNavigate } from 'react-router-dom'
import { LoaderContext } from '../contexts/loader.context'

export const SignUp = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { signUp } = useContext(AuthContext)
    const { setIsLoading } = useContext(LoaderContext)
    const navigate = useNavigate()

    //handle submit 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await signUp(user)
            if (res.ok) { //if request got accepted
                navigate("/login")
            } else { //if request got rejected
                const jsonRes = await res.json()
                alert(jsonRes.message)
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
            <h3>Create new account</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                    <span>
                        <label htmlFor="name">Name</label>
                    </span>
                    <input type="text" id='name' name='name' placeholder='Enter your name' onChange={(e) => handleChange(e)} required />
                </div>
                <div className="input-container">
                    <span>
                        <label htmlFor="email">Email</label>
                    </span>
                    <input type="email" id='email' name='email' placeholder='Enter your email' onChange={(e) => handleChange(e)} required />
                </div>
                <div className="input-container">
                    <span>
                        <label htmlFor="password">Password</label>
                    </span>
                    <input type="password" id='password' name='password' placeholder='Enter your password' onChange={(e) => handleChange(e)} required />
                </div>
                <button type='submit' className='btn submit-btn'>Sign up</button>
            </form>
            <Link to={"/login"}>Already have an Account?</Link>
        </div>
    )
}
