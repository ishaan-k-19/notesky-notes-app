import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'



const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5100/api/auth/createuser", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);

        //redirect
        if(json.success) {
            //redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            props.showAlert("Account Created Successfully", "success")
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
            <h1 className='pb-3 text-center bold'>Signup with Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label bold">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label bold">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label bold">Password</label>
                    <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="cpassword" className="form-label bold">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <div class="d-grid gap-2">
                        <button type="submit" className="btn btn-primary bold my-2 py-2">Signup</button>
                    </div>
            </form>
            </div>
        </div>
    )
}

export default Signup
