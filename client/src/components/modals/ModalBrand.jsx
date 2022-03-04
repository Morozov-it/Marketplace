import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../index'
import { createBrand } from '../../http/deviceAPI';

import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalBrand = observer(({ show, onHide }) => {
    const [value, setValue] = useState('')

    //получение данных из store
    const { global } = useStore();

    async function addBrand() {
        try {
            global.setErrorCreateBrand('');
            global.setLoading(true);
            await createBrand({ name: value });
            onHide();
        } catch (e) {
            global.setErrorCreateBrand(e.response.data.message);
        } finally {
            global.setLoading(false);
        }
    }

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
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        placeholder='new brand'
                    />
                </Form>
                {global.errorCreateBrand &&
                <div className="error">
                    {global.errorCreateBrand}
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addBrand}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default ModalBrand;