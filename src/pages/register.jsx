import logo from '../before_dawn.svg'
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const baseURL = "http://localhost:8000";

const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordc, setPasswordc] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        const log = localStorage.getItem('login') ?? 'false'
        const token = localStorage.getItem('token') ?? ''
        if (log === 'true' && token !== '') {
            navigate('/', {replace: true})
        }
    })

    function daftar() {
        setLoading(true);
        setTimeout(function () {
            axios
                .post(baseURL + '/api/register', {
                    full_name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordc,
                    phone: '0'+phone
                })
                .then(() => {
                    navigate('/login', {replace: true})
                    setLoading(false)
                })
                .catch((e) => {
                    let msg = JSON.parse(e.response.data)
                    let key = Object.keys(msg)[0]
                    setErr(true)
                    setErrMsg(msg[key][0])
                    setLoading(false)
                });
        }, 2000)
    }

    return (
        <div className="container-fluid bg-opacity-10 bg-info">
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="row align-items-center w-75 shadow-lg">
                    <div className={`alert alert-danger alert-dismissible ${ err === true ? '':'d-none'}` } role="alert">
                        {errMsg}
                        <button type="button" className="btn-close" onClick={() =>
                            setErr(false)
                        }/>
                    </div>
                    <div className="col p-0 bg-white border rounded-start overflow-auto" style={{height: '80vh'}}>
                        <div className="p-4">
                            <div className="mb-4 d-flex justify-content-center">
                                <h6 className="fw-bold m-1 p-1">Registration</h6>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                                <input type="text" className="form-control" placeholder="Full name"
                                       onChange={(e) => {
                                           setName(e.target.value)
                                       }}
                                       value={name}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="name@example.com"
                                       onChange={(e) => {
                                           setEmail(e.target.value)
                                       }}
                                       value={email}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                                <input type="password" className="form-control" placeholder="password"
                                       onChange={(e) => {
                                           setPassword(e.target.value)
                                       }}
                                       value={password}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Confirmation
                                    Password</label>
                                <input type="password" className="form-control" placeholder="Confirm password"
                                       onChange={(e) => {
                                           setPasswordc(e.target.value)
                                       }}
                                       value={passwordc}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Mobile Number</label>
                                <div className="input-group mb-5">
                                    <span className="input-group-text" id="basic-addon1">+62</span>
                                    <input type="number" className="form-control"
                                           placeholder="Type your mobile number..."
                                           onChange={(e) => {
                                               setPhone(e.target.value)
                                           }}
                                           value={phone}
                                    />
                                </div>
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <button className={`btn btn-primary ${!loading ? '' : 'd-none'}`}
                                        style={{backgroundColor: '#28B76A', border: '0'}}
                                        type="button" onClick={daftar}>Register
                                </button>
                                <button className={`btn btn-primary ${loading ? '' : 'd-none'}`} type="button" disabled
                                        style={{backgroundColor: '#28B76A', border: '0'}}>
                                    <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"/>
                                    Loading...
                                </button>
                            </div>
                            <div className="mb-3 row">
                                <div className="col d-flex justify-content-center">
                                    <a href="/" className="text-decoration-none" style={{color: '#28B76A'}}>Back</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col d-none d-sm-none d-md-block d-lg-block">
                        <div className="">
                            <div className="rounded-end d-flex row justify-content-center" style={{
                                background: 'linear-gradient(102deg, rgba(49,174,29,1) 0%, rgba(30,141,145,1) 100%)',
                                height: '80vh'
                            }}>
                                <div className="row p-3 justify-content-center text-center text-white">
                                    <img src={logo} className="img-fluid w-75" alt={'...'}/>
                                    <p>
                                        <strong>Empowering your business wit h the tools to succeed </strong><br/>
                                        <small style={{fontSize: 'x-small'}}>Such as easy-to-use collaboration
                                            tools, advanced
                                            data analytics, and streamlined communication channels.</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register