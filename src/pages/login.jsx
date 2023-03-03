import logo from '../before_dawn.svg'
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';

const CryptoJS = require("crypto-js");

const baseURL = "http://localhost:8000";

const circle = {
    background: 'linear-gradient(102deg, rgba(49,174,29,1) 0%, rgba(30,141,145,1) 100%)',
    height: '40px',
    width: '40px',
    fontSize: '24px'
}

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const userRef = useRef()

    useEffect(() => {
        const log = localStorage.getItem('login') ?? 'false';
        const token = localStorage.getItem('token') ?? ''
        if (log === 'true' && token !== '') {
            navigate('/', {replace: true})
        }
    })

    function masuk() {
        setLoading(true);
        setTimeout(function () {
            axios
                .post(baseURL + '/api/login', {
                    email: email,
                    password: password
                })
                .then(async (response) => {
                    const data = response.data
                    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data['user']), data['access_token']).toString();
                    localStorage.setItem('token', data['access_token'])
                    localStorage.setItem('login', 'true');
                    localStorage.setItem('dataUser', ciphertext)
                    navigate('/', {replace: true})
                    setLoading(false)
                }).catch((e) => {
                let responses = e.response
                if(responses.status === 401){
                    let msg = e.response.data
                    setErr(true)
                    setErrMsg(msg['message'])
                }else{
                    let msg = e.response.data
                    let key = Object.keys(msg)[0]
                    setErr(true)
                    setErrMsg(msg[key][0])
                }
                setLoading(false)
            });
        }, 2000)
    }

    return (
        <div className="container-fluid bg-opacity-10 bg-info">
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="row align-items-center w-75 shadow-lg">
                    <div className={`alert alert-danger alert-dismissible ${err === true ? '' : 'd-none'}`}
                         role="alert">
                        {errMsg}
                        <button type="button" className="btn-close"
                                onClick={() =>
                                    setErr(false)
                                }/>
                    </div>
                    <div className="col p-0 bg-white border rounded-start overflow-auto" style={{height: '80vh'}}>
                        <div className="p-4">
                            <div className="mb-4 d-flex">
                                <div
                                    className="rounded-circle App text-white fw-bold align-items-center d-flex justify-content-center"
                                    style={circle}>B
                                </div>
                                <h5 className="fw-bold m-1 p-1">B2b Portal</h5>
                            </div>
                            <div className="mb-4">
                                <h4 className="fw-bold">Login to your account</h4>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i
                                        className="bi bi-person"/></span>
                                    <input type="text" className="form-control" placeholder="name@example.com"
                                           ref={userRef}
                                           onChange={(e) => setEmail(e.target.value)}
                                           value={email}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i
                                        className="bi bi-key"/></span>
                                    <input type="password" className="form-control" placeholder="password"
                                           onChange={(e) => setPassword(e.target.value)}
                                           value={password}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                               id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className="col d-flex justify-content-end">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a href="#" className="text-decoration-none" style={{color: '#28B76A'}}>Forgot
                                        Password?</a>
                                </div>
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <button className={`btn btn-primary ${!loading ? '' : 'd-none'}`}
                                        style={{backgroundColor: '#28B76A', border: '0'}}
                                        type="button" onClick={masuk}>Login
                                </button>
                                <button className={`btn btn-primary ${loading ? '' : 'd-none'}`} type="button" disabled
                                        style={{backgroundColor: '#28B76A', border: '0'}}>
                                    <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"/>
                                    Loading...
                                </button>
                            </div>

                            <div className="mb-3 row">
                                <div className="col">
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Don't have an account?
                                    </label>
                                    <a href="/register" className="text-decoration-none" style={{color: '#28B76A'}}> Get
                                        Started</a>
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

export default Login