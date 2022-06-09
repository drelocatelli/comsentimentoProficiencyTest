import { useSelector } from "react-redux";
import ContainerDashboard from "../../components/admin/dashboard/container";
import NavbarAdmin from "../../components/admin/dashboard/navbar";
import Options from "../../components/admin/dashboard/options";
import NoticesWidget from "../../components/admin/dashboard/noticesWidget";
import { allNotices } from "../../services/noticeServices";
import { NoticesWrapper } from "../../components/admin/dashboard/items";

export default function Notices() {
    const { user } = useSelector(state => state.userReducer);

    if (user != undefined)
        return (
            <>
                <NavbarAdmin />
                <ContainerDashboard title="Dashboard">
                    Bem vindo, {user.name}.
                    <NoticesWrapper>
                        <Options />
                        <NoticesWidget callback={allNotices} />
                    </NoticesWrapper>
                </ContainerDashboard>
            </>
        );

    return (<></>);
}