import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import Row from 'react-bootstrap/Row';
import DeviceItem from './DeviceItem';


const DeviceList = observer(() => {
    const { device } = useStore();

    return (
        <Row>
            {device.devices.map((device) =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </Row>
    )
})

export default React.memo(DeviceList)