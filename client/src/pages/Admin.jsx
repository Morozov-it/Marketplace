import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ModalType from '../components/modals/ModalType';
import ModalBrand from '../components/modals/ModalBrand';
import ModalDevice from '../components/modals/ModalDevice';

const Admin = () => {
    const [modalType, setModalType] = useState(false);
    const [modalBrand, setModalBrand] = useState(false);
    const [modalDevice, setModalDevice] = useState(false);


    return (
        <Container>
            <Card className='d-flex gap-2 p-2'
                style={{ width: '400px', margin: '50px auto' }}>
                <Button onClick={() =>setModalType(true)}>Add type</Button>
                <Button onClick={() =>setModalBrand(true)}>Add brand</Button>
                <Button onClick={() =>setModalDevice(true)}>Add device</Button>
            </Card>
            <ModalType show={modalType} onHide={()=>setModalType(false)}/>
            <ModalBrand show={modalBrand} onHide={()=>setModalBrand(false)}/>
            <ModalDevice show={modalDevice} onHide={()=>setModalDevice(false)}/>
        </Container>
    )
}
export default React.memo(Admin);