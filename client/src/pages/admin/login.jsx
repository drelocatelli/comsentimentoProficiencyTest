import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/navbar";
import '../../components/admin/panel.css';
import { cookieToken, Login } from "../../services/userService";
import { store } from "../../store/storeConfig";
import { setUser } from "../../store/user/userAction";
import Cookies from 'universal-cookie';
import { useEffect } from "react";
import { loginBroadcast } from "../../utils/broadcast";
import { useSelector } from "react-redux";

export default function Admin() {

    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        checkLogin();
    }, [])

    function checkLogin() {

        const goToDashBoard = () => { navigate('/admin/dashboard') };

        //* do login in other tab
        loginBroadcast.onmessage = (e) => {
            if (e.data) {
                goToDashBoard();
            }
        }
    }


    async function doLogin(e) {
        e.preventDefault();

        const formInput = document.querySelectorAll('input');
        const email = Array.from(formInput).find(e => e.getAttribute('type') == 'email');
        const password = Array.from(formInput).find(e => e.getAttribute('type') == 'password');

        if (email.value !== '' && password.value !== '') {
            try {
                const request = await Login({
                    email: email.value,
                    password: password.value
                })
                const response = request.data;

                store.dispatch(setUser({ user: response.user }));

                cookies.set(cookieToken, response.user.token, { path: '/', sameSite: true });

                loginBroadcast.postMessage(true);

                navigate('/admin/dashboard');

            } catch (err) {
                const errorMsgEl = document.querySelector('.errorMsg')
                errorMsgEl.innerHTML = err.response.data.msg;

                setTimeout(() => {
                    errorMsgEl.innerHTML = ''
                }, 2000)
            }
        }

    }

    return (
        <>
            <Navbar />
            <div className="panel">
                <div className="login" onSubmit={(e) => doLogin(e)}>
                    <h1 style={{ textAlign: 'center', marginBottom: '5px' }}>Administração</h1>
                    Faça o login pra continuar.
                    <br />
                    <form>
                        <table border='0' className="form" width='100%'>
                            <tr>
                                <td> <input type="email" placeholder="E-mail" /> </td>
                            </tr>
                            <tr>
                                <td> <input type="password" placeholder="*******" /> </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'right' }}>
                                    <a href="/admin/register">Criar uma conta</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="submit">Login</button>
                                </td>
                            </tr>
                            <tr>
                                <td><span className="errorMsg"></span></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}