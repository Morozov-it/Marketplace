import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';

const Shop = observer(() => {
    //получение данных из store
    const { device } = useStore();

    //функция сохранения данных от сервера в store
    async function fetchData() { 
        try {
            const types = await fetchTypes();
            device.setTypes(types);
            const brands = await fetchBrands();
            device.setBrands(brands);
            const {count, rows} = await fetchDevices();
            device.setDevices(rows);
        } catch (e) {
            device.setIsError(e.response.data.message)
        }
    }

    //первая загрузка страницы
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                </Col>
            </Row>
        </Container>
    )
})

export default React.memo(Shop);