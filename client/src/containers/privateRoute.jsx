import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { cookieToken, RevalidateToken } from "../services/userService";
import { store } from "../store/storeConfig";
import { setUser } from "../store/user/userAction";

export default function PrivateRoute({ element }) {

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        revalidateLogin();
    }, [])

    async function revalidateLogin() {
        try {
            const response = await RevalidateToken();

            store.dispatch(setUser(response.data));

        } catch (err) {
            cookies.remove(cookieToken, { path: '/' });
            navigate('/admin');
        }
    }

    return (<>{element}</>);

}