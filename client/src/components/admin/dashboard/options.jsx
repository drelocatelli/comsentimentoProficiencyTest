import { Link } from "react-router-dom";

export default function Options() {
    return (
        <>
            <div className="menu">
                <li><Link to="/admin/dashboard">Todos editais</Link></li>
                <li><Link to="/admin/dashboard/editais">Meus editais</Link></li>
                <li><Link to="/admin/dashboard/colaboradores">Colaboradores</Link></li>
            </div>
            <div style={{clear: 'both'}}></div>
        </>
    );
}