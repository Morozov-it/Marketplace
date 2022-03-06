import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import { fetchOneDevice } from '../http/deviceAPI';
import { addToBasket, fetchBasket } from '../http/basketAPI';

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
    const { basket, global } = useStore();

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
    }, [])

    async function toBasket() {
        try {
            global.setErrorAddToBasket('');
            global.setLoading(true);
            await addToBasket({ deviceId: item.id });
            const data = await fetchBasket();
            basket.setItems(data);
            alert(`Device added to basket`);
        } catch (e) {
            global.setErrorAddToBasket(e.response.data.message)
        } finally {
            global.setLoading(false)
        }
    }

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
            </Row>
            <Row className='p-1'>
                <Col md={6}>
                    <Card>
                        <div className='image'>
                            {item.img && <img alt='img'
                                src={process.env.REACT_APP_URL + item.img} />}
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
            <Row>
                <Col md={6}>
                    {global.errorAddToBasket &&
                    <div className="error">
                        {global.errorAddToBasket}
                    </div>}
                    <div>
                        <div className='fw-bold'>{item.price} ₽</div>
                        <Button 
                            onClick={toBasket}
                            variant="outline-primary">
                            Add to basket
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default DevicePage;