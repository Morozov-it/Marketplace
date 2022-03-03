import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/const';
import { registration } from '../http/userAPI';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from '../components/Spinner';


const Auth = observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState('')

    const submit = async () => {
        try {
            setLoading(true);
            const { decodeUser } = await registration(email, password);
            setIsError('');
            alert(`User ${decodeUser.email} was created, you can: 
            1) log in and go to shop
            2) create a new user`);
        } catch (e) {
            setIsError(e.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Spinner />
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

                    {isError && <div className="error">
                        {isError}
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

export default React.memo(Auth);