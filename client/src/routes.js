import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages';
import Admin from './pages/admin/login';
import Dashboard from './pages/admin/dashboard';
import Cookies from 'universal-cookie';
import { cookieToken } from './services/userService';
import PrivateRoute from './containers/privateRoute';
import Notices from './pages/admin/notices';
import Colaboradores from './pages/admin/colaboradores';
import Register from './pages/admin/register';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/admin" element={<Protected type={'GUEST'} element={<Admin />} />} />
                <Route path="/admin/dashboard" element={<Protected type={'LOGGED'} element={<Notices />} />} />
                <Route path="/admin/dashboard/editais" element={<Protected type={'LOGGED'} element={<Dashboard />} />} />
                <Route path="/admin/dashboard/colaboradores" element={<Protected type={'LOGGED'} element={<Colaboradores />} />} />
                <Route path="/admin/register" element={<Protected type={'GUEST'} element={<Register />} />} />
            </Routes>
        </BrowserRouter>
    );
}

function Protected({ element, type }) {
    const cookies = new Cookies();

    const isLoggedIn = (typeof cookies.get(cookieToken) != 'undefined') ? true : false;

    switch(type) {
        case 'GUEST':
            return (!isLoggedIn) ? element : <Navigate to="/admin/dashboard" />
        break;
        case 'LOGGED':
            return isLoggedIn ? <PrivateRoute element={element} /> : <Navigate to="/admin" />;
        break;
    }


}