import React from 'react';
import '../style/register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className='register'>
      <div className="registerWrapper">
        <form  className="registerForm">
          <span className="registerInfo"><strong>REGISTER</strong></span>
          <img className='registerPP' src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
          <label htmlFor="inputFile">
          <i className="registerPPUpload fa-solid fa-user-plus"></i>
          </label>
          <input type="file"  id="inputFile" className='registerInputFile' />
          <label >First Name:</label>
          <input type="text" placeholder='Pablo' className='registerInput'/>
          <label >Last Name:</label>
          <input type="text" placeholder='Escobar'className='registerInput'/>
          <label >Email</label>
          <input type="email" placeholder='pablo@email.com'className='registerInput'/>
          <label >Password</label>
          <input type="password" className='registerInput'/>
          <button className="registerBtn">Sign up</button>
        </form>
        <div className="registerLogin">
          <Link to='/login'>
          <button className="registerLoginBtn">Log In</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
