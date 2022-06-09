import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { cookieToken } from "../../../services/userService";
import { store } from "../../../store/storeConfig";
import { delUser } from "../../../store/user/userAction";
import { logoutBroadcast } from "../../../utils/broadcast";
import Navbar from "../navbar";

export default function NavbarAdmin() {

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        checkLogout();
    }, [])

    function checkLogout() {
        // * check logout in other tab
        logoutBroadcast.onmessage = (e) => {
            if (e.data) {
                navigate('/admin');
            }
        };
    }

    function singOut(e) {
        e.preventDefault();

        cookies.remove(cookieToken, { path: '/' });

        store.dispatch(delUser());

        logoutBroadcast.postMessage(true);

        navigate('/admin');

    }

    return (
        <Navbar>
            <li><a href="javascript:void(0);" onClick={(e) => singOut(e)}>Sair</a></li>
        </Navbar>
    );
}