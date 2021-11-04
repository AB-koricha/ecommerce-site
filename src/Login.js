import React, { useState } from 'react'
import "./Login.css"
import { Link,useHistory} from 'react-router-dom'
import {auth} from "./firebase"


function Login() {
    const history=useHistory()//this allow as to programatically change the url
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    const signIn=e=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then(auth=>{
            history.push('/')
        }).catch(error=>console.log(error.message))
    }
    const register=e=>{
        e.preventDefault()
         auth.createUserWithEmailAndPassword(email,password)
         .then((auth)=>{
             if(auth){
                 history.push('/')//ni kurudisha user to the home page after ameregister
             }
         }).catch(error=>alert(error.message))
    }
    return (
        <div className="login">
            <Link to="/">
            <img className="login__logo"
            src='https://vectr.com/koricha/b2Rqg7cQ5.svg?width=640&height=640&select=b2Rqg7cQ5page0&quality=1' />
            </Link>
            <div className="login__container">
                <h1>Sign-In</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button type="submit"  onClick={signIn}
                     className="login__signInButton">Sign In</button>
                </form>

                <p> By signing-in you have agreed to Koko Terms & Conditions.</p>

                <button onClick={register}  
                className="login__registerButton">Create your Koko Account</button>
            </div>
        </div>
    )
}

export default Login
