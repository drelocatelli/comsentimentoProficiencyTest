import Cookies from "universal-cookie";
import { apiConfig } from "./apiConfig";

export const cookieToken = "consentimento.admin.token";

const cookies = new Cookies();

export function Login(data) {
    return apiConfig.post('/users/login', data);
}

export function RegisterUser(data) {
    return apiConfig.post('/users/register', data);
}

export function ChangeUserPermission({ userId, status }) {

    const token = cookies.get(cookieToken);
    
    return apiConfig.post('/users/permissions', {
        userId,
        status
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export function RevalidateToken() {

    const token = cookies.get(cookieToken);

    return apiConfig.get('/users/revalidate',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}

export function GetUsers(data = '') {
    const token = cookies.get(cookieToken);

    return apiConfig.get(`/users/all/${data}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}