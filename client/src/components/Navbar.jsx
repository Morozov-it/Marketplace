import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navbar as NavbarBootstrap, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../index';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';


const Navbar = observer(() => {
    let navigate = useNavigate();
    const { user } = useStore()
    return (
        <NavbarBootstrap bg="primary" variant="dark">
            <Container>
                <NavbarBootstrap.Brand
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(SHOP_ROUTE)}>Marketplace
                </NavbarBootstrap.Brand>
                <Nav className="ml-auto">
                    <Nav.Link
                        onClick={() => navigate(ADMIN_ROUTE)}>Admin
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            navigate(LOGIN_ROUTE)
                        }}>
                        {user.isAuth ? "Log out" : "Log in"}
                    </Nav.Link>
                </Nav>
            </Container>
        </NavbarBootstrap>
    )
})

export default React.memo(Navbar);