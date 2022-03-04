import React, { useState } from 'react';
import { useStore } from '../index';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/const';
import { login } from '../http/userAPI';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Login = observer(() => {
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //подключение к store
    const { user, global } = useStore()

    const submit = async () => {
        try {
            global.setLoading(true);
            global.setErrorLogin('');
            const { decodeUser } = await login(email, password);
            user.setUser(decodeUser);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            global.setErrorLogin(e.response.data.message);
        } finally {
            global.setLoading(false);
        }
    }

    const logOut = () => {
        global.setErrorLogin('');
        user.setIsAuth(false)
        user.setUser({})
        localStorage.removeItem('token')
    }

    return (
        <Container className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 56 }}>

            {user.isAuth
            ?<Card style={{ width: '500px' }} className='p-4'>
                <h2 className='m-auto text-center'>
                    Woult you want to leave your account? 
                </h2>
                <Button
                    onClick={logOut}
                    variant="secondary">
                    Exit
                </Button>
            </Card>

            :<Card style={{width: '500px'}} className='p-4'>
                <h2 className='m-auto'>Log in</h2>
                <Form autoComplete="off" className='d-flex flex-column'>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            placeholder="enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            placeholder="password" />
                    </Form.Group>

                    {global.errorLogin && <div className="error">
                        {global.errorLogin}
                    </div>}

                    <Form.Group
                        className="mb-3 d-flex justify-content-between align-items-center">
                        <Form.Label>
                            <span>Have no account? </span>
                            <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
                        </Form.Label>
                        <Button
                            onClick={submit}
                            variant="outline-primary">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Card>
            }
        </Container>
    )
})

export default React.memo(Login);