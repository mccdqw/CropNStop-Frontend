import React, { useState, useContext } from 'react'
import { registerUser } from '../lib/auth'
import { StateContext } from '../context/StateContext'

const initialState = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Register = () => {
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const context = useContext(StateContext);

    const handleChange = () => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
      <div className="auth__form-container">
          <div className="auth__form-container_fields">
              <div className="auth__form-container_fields-content">
                  <p>Sign Up</p>
                  <form>
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="fullName">Full Name</label>
                        <input 
                            name="fullName" 
                            type="text"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="username">Username</label>
                            <input 
                                name="username" 
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                    </div>
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input 
                            name="phoneNumber" 
                            type="text"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            required
                        />
                    </div>
                      <div className="auth__form-container_fields-content_input">
                        <label htmlFor="password">Password</label>
                        <input 
                            name="password" 
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            name="confirmPassword" 
                            type="password"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="auth__form-container_fields-content_button">
                        <button type='button'>Sign Up</button>
                    </div>
                  </form>
              </div> 
          </div>
      </div>
    )
}
export default Register;