import React, { useEffect, useState } from 'react';
import { useStore } from '../../index';
import { observer } from 'mobx-react-lite';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';

import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ModalDevice = observer(({ show, onHide }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    //получение данных из store
    const { device, global } = useStore();
    
    const addInfo = () => {
        setInfo([...info, {title:'', description:'', id: Date.now()}])
    }
    const deleteInfo = (id) => {
        setInfo(info.filter(i => i.id !== id));
    }

    const selectFile = (e) => {
        //получение объекта с файлом
        setFile(e.target.files[0])
    }

    //функция для обработки ввода в поля информации
    const changeInfo = (key, value, number) => {
        setInfo(info.map((i) => {
            if (i.id === number) {
                return {...i, [key]: value}
            }
            return i
        }))
    }

    //функция отправки итоговых данных на сервер
    const addDevice = async () => {
        try {
            global.setLoading(true);
            //создание объекта типа formdata
            const formData = new FormData();
            //добавление полей в новый объект
            formData.append('name', name)
            formData.append('price', `${price}`)//цифра как строка
            formData.append('img', file)
            formData.append('typeId', device.selectedType.id)
            formData.append('brandId', device.selectedBrand.id)
            formData.append('info', JSON.stringify(info))//массив только в JSON
            await createDevice(formData);
            onHide();
        } catch (e) {
            global.setErrorCreateDevice(e.response.data.message)
        } finally {
            global.setLoading(false);
        }
    }

    //функция сохранения данных от сервера в store
    async function fetchData() { 
        const types = await fetchTypes();
        device.setTypes(types);
        const brands = await fetchBrands();
        device.setBrands(brands);
    }

    //первая загрузка страницы
    useEffect(() => {
        fetchData()
        //сброс выделенных типов и брендов при willunmount
        return () => {
            device.setSelectedType({});
            device.setSelectedBrand({});
        }
    }, [])

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
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        type='text' />
                    <Form.Control
                        className='p-2 m-1'
                        placeholder='price'
                        value={price}
                        onChange={(e)=>setPrice(Number(e.target.value))}
                        type='number' />
                    <Form.Control
                        className='p-2 m-1'
                        placeholder='image'
                        onChange={selectFile}
                        type='file'/>
                    <div className='d-flex justify-content-end'>
                        <Dropdown className='m-1'>
                            <Dropdown.Toggle>
                                {device.selectedType.name || 'Select type'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.types.map((type) =>
                                    <Dropdown.Item
                                        onClick={()=>device.setSelectedType(type)}
                                        key={type.id}>
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className='m-1'>
                            <Dropdown.Toggle>
                                {device.selectedBrand.name || 'Select brand'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.brands.map((brand) =>
                                    <Dropdown.Item
                                        onClick={()=>device.setSelectedBrand(brand)}
                                        key={brand.id}>
                                        {brand.name}
                                    </Dropdown.Item>
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
                                    name='title'
                                    value={i.title}
                                    onChange={(e)=>changeInfo(e.target.name, e.target.value, i.id)}
                                    className='p-1 m-1'
                                    placeholder='title'
                                    type='text' />
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    name='description'
                                    value={i.description}
                                    onChange={(e)=>changeInfo(e.target.name, e.target.value, i.id)}
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
                {global.errorCreateDevice &&
                <div className="error">
                    {global.errorCreateDevice}
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default React.memo(ModalDevice);