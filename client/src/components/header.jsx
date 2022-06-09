import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '../assets/images/comsentimento_horizontal-01.png';
import logoImgMedium from '../assets/images/comsentimento_simbolo-01.png';
import { Navbar, Nav, NavDropdown } from 'dressa-ui';

export default function Header({ children, menuChildren }) {

    const navigate = useNavigate();

    return (
        <Navbar style={{ background: '#fff', boxShadow: '0px 2px 12px #0000001A', fontFamily: 'Open Sans' }}>
            <Logo onClick={() => navigate('/')} />
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    <Menu>
                        <Nav.Link href='#'>Inicio</Nav.Link>
                        <Nav.Link href='#'>Sobre</Nav.Link>
                        <NavDropdown id='dp-1' title='Painel'>
                            <NavDropdown.Item href='/admin'>Administração</NavDropdown.Item>                        
                        </NavDropdown>
                        {menuChildren}
                    </Menu>
                    {children}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mediumScreen = '768px';

const Logo = styled.picture`
    display: block;
    cursor: pointer;
    background: url('${logoImg}') no-repeat;
    background-size: 100% 100%;
    
    @media screen and (min-width: ${mediumScreen}) {
        zoom: 13%;
        width: 2251px;
        height: 618px;

    }

    @media screen and (max-width: ${mediumScreen}) {
        background: url('${logoImgMedium}') no-repeat;
        width: 2251px;
        height: 2251px;
        zoom: 6%;
    }

`;

const Menu = styled.nav`
    li {
        a {
            color: #333;
            border-bottom: 3px solid transparent;
            transition: color .2s, border-bottom .2s;
            
            &:hover {
                color: #604fff;
                border-bottom: 3px solid #604fff;
            }
        }
    }
`;
