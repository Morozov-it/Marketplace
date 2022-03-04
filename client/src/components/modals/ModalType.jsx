import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../index'
import { createType } from '../../http/deviceAPI';

import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const ModalType = observer(({ show, onHide }) => {
    const [value, setValue] = useState('')

    //получение данных из store
    const { global } = useStore();

    async function addType() {
        try {
            global.setErrorCreateType('');
            global.setLoading(true);
            await createType({ name: value });
            onHide();
        } catch (e) {
            global.setErrorCreateType(e.response.data.message);
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
                    Creating new type
                </Modal.Title>
                <CloseButton onClick={onHide}/>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        placeholder='new type'
                    />
                </Form>
                {global.errorCreateType &&
                <div className="error">
                    {global.errorCreateType}
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addType}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default ModalType;