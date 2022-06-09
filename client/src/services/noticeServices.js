import Cookies from "universal-cookie";
import { apiConfig } from "./apiConfig";
import { cookieToken } from "./userService";

export function myNotices(token) {

    const cookies = new Cookies();
    
    return apiConfig.get('/notice/my', {
        headers: {
            'Authorization': `Bearer ${cookies.get(cookieToken)}`
        }
    });
}

export function allNotices(token) {

    const cookies = new Cookies();
    
    return apiConfig.get('/notice/all', {
        headers: {
            'Authorization': `Bearer ${cookies.get(cookieToken)}`
        }
    });
}