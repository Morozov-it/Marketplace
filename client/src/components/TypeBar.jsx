import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';


const TypeBar = observer(() => {
    const { device } = useStore();

    return (
        <ListGroup as="ul" className='mt-2'>
            <ListGroup.Item
                style={{ cursor: "pointer" }}
                as="li"
                onClick={() => device.setSelectedType({})}>
                All
            </ListGroup.Item>
            {device.types.map((type) => 
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    key={type.id}
                    as="li"
                    onClick={()=> device.setSelectedType(type) }
                    active={device.selectedType.id === type.id}
                >{type.name}</ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default React.memo(TypeBar);