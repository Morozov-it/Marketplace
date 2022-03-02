import React, { useState } from 'react';
import { useStore } from '../../index';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ModalDevice = ({ show, onHide }) => {
    const [info, setInfo] = useState([]);

    const { device } = useStore();
    
    const addInfo = () => {
        setInfo([...info, {title:'', description:'', id: Date.now()}])
    }
    const deleteInfo = (id) => {
        setInfo(info.filter(i => i.id !== id));
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title>
                    Creating new device
                </Modal.Title>
                <CloseButton onClick={onHide}/>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className='p-2 m-1'
                        placeholder='name'
                        type='text' />
                    <Form.Control
                        className='p-2 m-1'
                        placeholder='price'
                        type='number' />
                    <Form.Control
                        className='p-2 m-1'
                        placeholder='image'
                        type='file'/>
                    <div className='d-flex justify-content-end'>
                        <Dropdown className='m-1'>
                            <Dropdown.Toggle>
                                Select type
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.types.map((type) =>
                                    <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className='m-1'>
                            <Dropdown.Toggle>
                                Select brand
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.brands.map((brand) =>
                                    <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Button
                        className='m-1'
                        variant="outline-primary"
                        onClick={() => addInfo()}>Add info</Button>
                    {info.map((i) =>
                        <Row key={i.id}>
                            <Col md={5}>
                                <Form.Control
                                    className='p-1 m-1'
                                    placeholder='title'
                                    type='text' />
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    className='p-1 m-1'
                                    placeholder='description'
                                    type='text' />
                            </Col>
                            <Col md={2}>
                            <Button style={{width:'100%'}}
                                className='m-1'
                                variant="outline-primary"
                                onClick={() => deleteInfo(i.id)}>delete</Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{}}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default React.memo(ModalDevice);