import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContainerDashboard from "../../components/admin/dashboard/container";
import NavbarAdmin from "../../components/admin/dashboard/navbar";
import Options from "../../components/admin/dashboard/options";
import { ChangeUserPermission, GetUsers } from '../../services/userService';

export default function Colaboradores() {
    const { user } = useSelector(state => state.userReducer);

    if (user != undefined)
        return (
            <>
                <NavbarAdmin />
                <ContainerDashboard title="Colaboradores">
                    Bem vindo, {user.name}.
                    <div className="notices">
                        <Options />
                        <Users />
                    </div>
                </ContainerDashboard>
            </>
        );

    return (<></>);
}

function Users() {

    const [users, setUsers] = useState(undefined);
    const [editUser, setEditUser] = useState({ action: false, user: undefined });

    useEffect(() => {
        getUsers();
    }, [])

    async function getUsers(data = '') {
        try {
            const response = await GetUsers(data);
            setUsers(response.data.users)
        } catch (err) {
            setUsers('error');
        }
    }

    function selectOption(e) {
        const { value } = e.target;

        getUsers(value);
    }

    if (users == undefined)
        return (<> Carregando... </>);

    if (users == 'error')
        return (<>Ocorreu um erro.</>);

    return (
        <>
            <select style={{ fontWeight: 'bold' }} onChange={(e) => selectOption(e)}>
                <option value=''>Todos os usuários</option>
                <option value='inactive'>INATIVOS</option>
                <option value='active'>ATIVOS</option>
            </select>
            <br /><br />
            <table border='1' className='table'>
                <tr>
                    <th>E-mail</th>
                    <th>Nome</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
                {users.map(user => {
                    return (
                        <tr>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{(user.status == 'ACTIVE') ? 'ATIVO' : 'INATIVO'}</td>
                            <td><button type='button' onClick={() => setEditUser({ action: true, user })}>Editar</button></td>
                        </tr>
                    )
                })}

            </table>

            <br />
            <EditUser edit={editUser} />
        </>
    );

}

function EditUser({ edit }) {

    if (!edit.action)
        return (null);

    async function setUser(e) {
        e.preventDefault();

        const selected = Array.from(e.target.querySelectorAll('option')).find((e) => e.selected);

        try {
            const response = await ChangeUserPermission({userId: edit.user.id, status: selected.value});
            
            if(response.status == 201) return window.location.reload();

            throw response;
            
        } catch(err) {

        }

    }


    return (
        <div className="edit-user">
            <h3>Editar {edit.user.name} ({edit.user.id})</h3> <br />
            <form onSubmit={(e) => setUser(e)}>
                <select>
                    <option value='ACTIVE' selected={edit.user.status === 'ACTIVE'}>ATIVO</option>
                    <option value='INACTIVE' selected={edit.user.status === 'INACTIVE'}>INATIVO</option>
                </select>
                &nbsp;&nbsp;
                <button type="submit">Mudar permissões</button>
            </form>
        </div>
    );

}