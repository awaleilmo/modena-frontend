import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {
    return (
        <Router>
                <Routes>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
        </Router>
    )
}

export default App;
