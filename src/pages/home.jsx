import logo from '../logo.svg'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const CryptoJS = require("crypto-js");

const circle = {
    background: 'linear-gradient(102deg, rgba(49,174,29,1) 0%, rgba(30,141,145,1) 100%)',
    height: '40px',
    width: '40px',
    fontSize: '24px'
}

const actives = {
    background: 'linear-gradient(102deg, rgba(49,174,29,1) 0%, rgba(30,141,145,1) 100%)',
}

const Home = () => {

    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({})

    const asal = async () => {
        const token = localStorage.getItem('token') ?? ''
        const user = localStorage.getItem('dataUser') ?? ''
        if (user !== '') {
            const bytes = CryptoJS.AES.decrypt(user, token)
            const decryptedData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            setDataUser(decryptedData)
        }
    }

    useEffect(() => {
        asal()
    }, [])

    useEffect(() => {
        const log = localStorage.getItem('login') ?? 'false';
        const token = localStorage.getItem('token') ?? ''
        if (log === 'false' && token === '') {
            navigate('/login', {replace: true})
        }
    })

    function logout() {
        localStorage.setItem('login', 'false')
        localStorage.setItem('token', '')
        localStorage.setItem('dataUser', '')
        navigate('/login', {replace: true})
    }

    return <>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <div className="mb-4 d-flex">
                            <div
                                className="rounded-circle text-white fw-bold align-items-center d-flex justify-content-center"
                                style={circle}>B
                            </div>
                            <h5 className="fw-bold m-1 p-1">B2b Portal</h5>
                        </div>
                        <p className="mb-4">Menu</p>
                        <ul className="nav w-100 flex-column"
                            id="menu">
                            <li className="nav-item w-100 mb-3">
                                <div className="p-2 rounded w-100" style={actives}>
                                    <i className="bi bi-columns-gap"/> <span
                                    className="ms-1 d-none d-sm-inline fw-bold">Dashboard</span>
                                </div>
                            </li>
                            <li className="nav-item w-100 mb-3">
                                <div className="p-2 rounded w-100">
                                    <i className="bi bi-people"/> <span
                                    className="ms-1 d-none d-sm-inline">Vendor/ Supplier</span>
                                </div>
                            </li>
                            <li className="nav-item w-100">
                                <div className="p-2 rounded w-100">
                                    <i className="bi bi-window"/> <span
                                    className="ms-1 d-none d-sm-inline">Customer/ Dealer</span>
                                </div>
                            </li>
                        </ul>
                        <hr/>
                        <div className="dropdown pb-4">

                        </div>
                    </div>
                </div>

                <div className="col">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <form className="d-flex" role="search">
                                <div className="input-group mb-3">
                                    <span className="input-group-text bi bi-search"/>
                                    <input className="form-control" type="search" placeholder="Search"
                                           aria-label="Search"/>

                                    <button className="btn btn-outline-primary" type="submit">Search</button>
                                </div>
                            </form>
                            <div className="d-flex collapse navbar-collapse justify-content-end align-items-start" id="navbarNavDarkDropdown">
                                <div className="d-flex text-dark text-decoration-none">
                                    <p className="d-flex d-sm-inline mx-4 justify-content-end text-end">
                                        <strong className='text-capitalize'>{dataUser.full_name}<br/>
                                        </strong>
                                        <small>{dataUser.email}</small>
                                    </p>
                                </div>
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <i
                                             className="rounded-circle bi bi-person-circle fs-2" style={{cursor:'pointer'}}  id="dropdownUser1"
                                             data-bs-toggle="dropdown" aria-expanded="false"/>

                                        <ul className="dropdown-menu translate-middle start-100 top-100">
                                            <li><span onClick={logout} className="dropdown-item">Logout</span></li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className="px-2">
                                    <button type="button" className="btn  position-relative">
                                        <span className="bi fs-4 bi-bell-fill"/>
                                        <span
                                            className="position-absolute translate-middle-x p-1 bg-danger rounded-circle"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="card">
                                <img src={logo} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={logo} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={logo} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text below as a
                                        natural lead-in to additional content.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={logo} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Home