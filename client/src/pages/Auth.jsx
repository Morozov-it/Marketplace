import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/const';


const Auth = () => {
    //получение данных из текущего URL
    let location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    return (
        <Container className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 56 }}>
            <Card style={{width: '500px'}} className='p-4'>
                <h2 className='m-auto'>
                    {isLogin ? 'Log in' : 'Sign up'}
                </h2>
                <Form autoComplete="off" className='d-flex flex-column'>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="enter email" />
                        <Form.Text className="text-muted">
                            Error text
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" />
                        <Form.Text className="text-muted">
                            Error text
                        </Form.Text>
                    </Form.Group>
                    <Form.Group
                        className="mb-3 d-flex justify-content-between align-items-center">
                        {isLogin ?
                        <Form.Label>
                            <span>Have no account? </span>
                            <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
                        </Form.Label>
                        :
                        <Form.Label>
                            <span>Have account? </span>
                            <NavLink to={LOGIN_ROUTE}>Log in!</NavLink>
                        </Form.Label>
                        }
                        <Button
                            variant="outline-primary">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Card>
        </Container>
    )
}
export default React.memo(Auth);