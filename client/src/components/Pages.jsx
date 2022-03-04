import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';

import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';



const Pages = observer(({ current, pages }) => {
    //получение данных из store
    const { device } = useStore();

    let items = [];
    for (let number = 1; number <= pages; number++) {
        items.push(number)
    }

    return (
        <Row>
            <Pagination className='mt-3'>
                {items.map((i) =>
                    <Pagination.Item
                        onClick={()=>device.setSelectedPage(i)}
                        key={i}
                        active={i === current}>
                        {i}
                    </Pagination.Item>,
                )}
            </Pagination>
        </Row>
    )
})

export default React.memo(Pages)