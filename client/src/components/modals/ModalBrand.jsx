import React from 'react';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalBrand = ({show, onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title>
                    Creating new brand
                </Modal.Title>
                <CloseButton onClick={onHide}/>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder='new brand'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{}}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalBrand;