import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5100/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In successfully ", "success")
            navigate("/");

        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='d-flex justify-content-center align-items-center my-5 flex-column'>
            <div className='login bg-dark w-md-50 p-5 rounded-3 d-flex flex-column justify-content-center w-sm-100'>
                <h1 className='pb-3 text-center bold'>Login To Continue</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label bold">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="passsword" className="form-labe bold">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" className="btn btn-primary bold my-2 py-2">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
