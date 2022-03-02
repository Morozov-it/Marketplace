import React from 'react';
import { useParams } from "react-router-dom";
import { useStore } from '../index';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

import Rating from '../components/Rating';

const description = [
    { id: 1, title: 'Memory', description: '5 gb' },
    { id: 2, title: 'Camera', description: '120 px' },
    { id: 3, title: 'Proc', description: '7 core' },
    { id: 4, title: 'Accum', description: '4200 mA' },
]

const DevicePage = () => {
    let { id } = useParams();
    const { device } = useStore()
    const item = device.devices[0]
    console.log(id)

    return (
        <Container>
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
                        <Image src={item.img} />
                    </Card>
                </Col>
                <Col md={6}>
                    <h4>Description</h4>
                    <Card className='d-flex flex-column p-1'>
                        {description.map((info, index) =>
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
}
export default React.memo(DevicePage);