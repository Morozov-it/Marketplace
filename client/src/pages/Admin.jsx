import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Admin = () => {
    return (
        <Container>
            <Card className='d-flex gap-2 p-2'
                style={{ maxWidth: '300px', margin: 'auto' }}>
                <Button onClick={() => { }}>Add type</Button>
                <Button onClick={() => { }}>Add brand</Button>
                <Button onClick={() => { }}>Add device</Button>
            </Card>
        </Container>
    )
}
export default React.memo(Admin);