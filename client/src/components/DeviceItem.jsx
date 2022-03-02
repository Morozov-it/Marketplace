import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/const';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

import starFill from '../assets/star-fill.svg';
import starHalf from '../assets/star-half.svg';
import star from '../assets/star.svg';

const DeviceItem = ({ device }) => {
    let navigate = useNavigate();

    return (
        <Col md={3} className='p-1'>
            <Card
                onClick={()=> navigate(DEVICE_ROUTE + '/' + device.id)}
                className='p-1'
                style={{ cursor: 'pointer' }}>
                <Image src={device.img} />
                <div className='d-flex justify-content-between align-items-center'>
                    <div>{device.name}</div>
                    <div className='d-flex justify-content-end'>
                        <div>{device.rating}</div>
                        {device.rating === 5 && <img src={starFill} alt=""></img>}
                        {device.rating >= 3 && device.rating < 5 && <img src={starHalf} alt=""></img>}
                        {device.rating < 3 && <img src={star} alt=""></img>}
                    </div>
                </div>
                <div className='fw-bold'>{device.price} ₽</div>
            </Card>
        </Col>
    )
}

export default React.memo(DeviceItem);