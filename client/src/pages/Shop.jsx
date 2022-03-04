import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';

const Shop = observer(() => {
    //получение данных из store
    const { device, global } = useStore();

    //функция сохранения данных от сервера в store
    async function fetchData() { 
        try {
            global.setLoading(true);
            const types = await fetchTypes();
            device.setTypes(types);
            const brands = await fetchBrands();
            device.setBrands(brands);
            const { count, rows } = await fetchDevices();
            device.setTotalCount(count)
            device.setDevices(rows);
        } catch (e) {
            global.setErrorShop(e.response.data.message)
        } finally {
            global.setLoading(false);
        }
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

    //обновление при изменении сортировки и пагинации
    useEffect(() => {
        fetchDevices(device.selectedBrand.id, device.selectedType.id, device.limit, device.selectedPage).then((data) => {
            global.setLoading(true);
            device.setTotalCount(data.count);
            device.setDevices(data.rows)
        }).catch((e) => {
            global.setErrorShop(e.response.data.message)
        }).finally(() => {
            global.setLoading(false)
        })
    }, [device.selectedBrand.id, device.selectedType.id, device.selectedPage])

    return (
        <Container>
            {global.errorShop && <div className='error'>{global.errorShop}</div>}
            <Row>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages
                        current={device.selectedPage}
                        pages={device.pages}/>
                </Col>
            </Row>
        </Container>
    )
})

export default React.memo(Shop);