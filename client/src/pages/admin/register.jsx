import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/navbar";
import '../../components/admin/panel.css';
import Cookies from 'universal-cookie';
import { useEffect } from "react";
import { loginBroadcast } from "../../utils/broadcast";
import { RegisterUser } from "../../services/userService";

export default function Register() {

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

    async function register(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        
        const data = {
            name: form.get('name'),
            email: form.get('email'),
            password: form.get('password'),
        }

        const response = await RegisterUser(data);
        if(response.status == 201) {
            navigate('/admin');
        }
        
    }

    return (
        <>
            <Navbar />
            <div className="panel">
                <div className="login">
                <h1 style={{ textAlign: 'center', marginBottom: '5px' }}>Criar uma conta</h1>
                    <form onSubmit={e => register(e)}>
                        <table border='0' className="form" width='100%'>
                            <tr>
                                <td> <input type="email" name='email' placeholder="E-mail" /> </td>
                            </tr>
                            <tr>
                                <td><input type="text" name='name' placeholder="Nome" /></td>
                            </tr>
                            <tr>
                                <td> <input type="password" name='password' placeholder="*******" /> </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'right' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="submit">Registrar</button>
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