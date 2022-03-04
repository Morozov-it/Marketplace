import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/const';
import { registration } from '../http/userAPI';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Registration = observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //получение данных из store
    const { global } = useStore();

    const submit = async () => {
        try {
            global.setErrorRegistration('');
            global.setLoading(true);
            const { decodeUser } = await registration(email, password);
            alert(`User ${decodeUser.email} was created, you can: 
            1) log in and go to shop
            2) create a new user`);
        } catch (e) {
            global.setErrorRegistration(e.response.data.message);
        } finally {
            global.setLoading(false);
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 56 }}>
            <Card style={{width: '500px'}} className='p-4'>
                <h2 className='m-auto'>Sign up</h2>
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

                    {global.errorRegistration && <div className="error">
                        {global.errorRegistration}
                    </div>}

                    <Form.Group
                        className="mb-3 d-flex justify-content-between align-items-center">
                        <Form.Label>
                            <span>Have account? </span>
                            <NavLink to={LOGIN_ROUTE}>Log in!</NavLink>
                        </Form.Label>
                        <Button
                            onClick={submit}
                            variant="outline-primary">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Card>
        </Container>
    )
})

export default React.memo(Registration);