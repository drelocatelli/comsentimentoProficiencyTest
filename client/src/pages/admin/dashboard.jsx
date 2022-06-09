import ContainerDashboard from "../../components/admin/dashboard/container";
import NavbarAdmin from "../../components/admin/dashboard/navbar";
import { useSelector } from 'react-redux';
import Options from "../../components/admin/dashboard/options";
import { myNotices } from "../../services/noticeServices";
import Notices from "../../components/admin/dashboard/noticesWidget";
import { NoticesWrapper } from "../../components/admin/dashboard/items";

export default function Dashboard() {

    const { user } = useSelector(state => state.userReducer);


    if (user != undefined)
        return (
            <>
                <NavbarAdmin />
                <ContainerDashboard title="Dashboard">
                    Bem vindo, {user.name}.
                    <NoticesWrapper>
                    <Options />
                        <Notices callback={myNotices} />
                    </NoticesWrapper>
                </ContainerDashboard>
            </>
        );

    return (<></>);

}