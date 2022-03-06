import React from 'react';
import { useStore } from '../index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import basketIcon from '../assets/basket.svg'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';

import { Navbar as NavbarBootstrap, Container, Nav } from 'react-bootstrap';



const Navbar = observer(() => {
    let navigate = useNavigate();
    const { user, basket } = useStore()
    return (
        <NavbarBootstrap bg="primary" variant="dark">
            <Container className='justify-content-between flex-wrap'>
                <NavbarBootstrap.Brand
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(SHOP_ROUTE)}>Marketplace
                </NavbarBootstrap.Brand>
                <Nav className='justify-content-center flex-wrap'>
                    {user.user.role === "ADMIN" &&
                        <Nav.Link
                            onClick={() => navigate(ADMIN_ROUTE)}>EDIT SHOP
                        </Nav.Link>
                    }
                    <Nav.Link className='p-0 m-2'
                        onClick={() => navigate(BASKET_ROUTE)}>
                        <span className="position-relative top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {basket.amount}
                        </span>
                        <img className="position-relative"
                            src={basketIcon} alt="basketIcon" />
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            navigate(LOGIN_ROUTE)
                        }}>
                        {user.isAuth ?
                            <span >{user.user.email}</span>
                            : "Log in"}
                    </Nav.Link>
                </Nav>
            </Container>
        </NavbarBootstrap>
    )
})

export default React.memo(Navbar);