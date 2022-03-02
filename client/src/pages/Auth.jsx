import React, { useState } from 'react';
import { useStore } from '../index';
import { observer } from 'mobx-react-lite';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/const';
import { login, registration } from '../http/userAPI';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Auth = observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //подключение к userStore
    const { user } = useStore()
    
    //получение данных из текущего URL
    let location = useLocation();

    //проверка текущего маршрута
    const isLogin = location.pathname === LOGIN_ROUTE;

    const submit = async () => {
        if (isLogin) {
            const response = await login(email, password)
            if (response.status === 200) {
                user.setIsAuth(true)
            }
            console.log(response)
        } else {
            const response = await registration(email, password)
            if (response.status === 200) {
                user.setIsAuth(true)
            }
            console.log(response)
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 56 }}>

            {user.isAuth
            ?<Card style={{ width: '500px' }} className='p-4'>
                <h2 className='m-auto'>
                    Woult you want to leave your account? 
                </h2>
                <Button
                    onClick={()=>user.setIsAuth(false)}
                    variant="secondary">
                    Exit
                </Button>
            </Card>

            :<Card style={{width: '500px'}} className='p-4'>
                <h2 className='m-auto'>
                    {isLogin ? 'Log in' : 'Sign up'}
                </h2>
                <Form autoComplete="off" className='d-flex flex-column'>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            placeholder="enter email" />
                        <Form.Text className="text-muted">
                            Error text
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            placeholder="password" />
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

export default React.memo(Auth);