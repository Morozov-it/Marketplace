import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import { fetchOneDevice } from '../http/deviceAPI';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Rating from '../components/Rating';


const DevicePage = observer(() => {
    //данные из URL строки
    let { id } = useParams();

    //подключение к Store
    const { device, global } = useStore();

    //состояние для страницы
    const [item, setItem] = useState({ info: [] })

    //функция получения данных от сервера
    async function fetchDevice() {
        try {
            global.setErrorDevice('')
            global.setLoading(true);
            const device = await fetchOneDevice(id);
            setItem(device);
        } catch (e) {
            global.setErrorDevice(e.response.data.message)
        } finally {
            global.setLoading(false)
        }
    }

    useEffect(() => {
        fetchDevice()

        //стадия willUnmount
        return () => {
            setItem({ info: [] })
        }
    }, [id])

    return (
        <Container>
            {global.errorDevice && <div className='error'>
                {global.errorDevice}
            </div>}
            <Row className='p-1'>
                <Col md={6}>
                    <div className='d-flex justify-content-start align-items-center gap-2'>
                        <div className='fw-bold'>{item.name}</div>
                        <Rating rating={item.rating} />
                    </div>
                </Col>
                <Col md={6}>
                    <div className='d-flex justify-content-between align-items-center gap-3'>
                        <div className='fw-bold'>{item.price} ₽</div>
                        <Button 
                            variant="outline-primary">
                            Add to basket
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className='p-1'>
                <Col md={6}>
                    <Card>
                        <div className='image'>
                            <img alt='img'
                                src={process.env.REACT_APP_URL + item.img} />
                        </div>
                    </Card>
                </Col>
                <Col md={6}>
                    <h4>Description</h4>
                    <Card className='d-flex flex-column p-1'>
                        {item.info.map((info, index) =>
                            <div
                                style={{
                                    background: index % 2 === 0 ? 'lightgray' : 'transparent',
                                    padding: '0.25rem'
                                }}
                                key={info.id}>
                                {info.title}: {info.description}
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
})

export default DevicePage;