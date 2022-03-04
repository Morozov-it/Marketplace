import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';



const BrandBar = observer(() => {
    const { device } = useStore();

    return (
        <Row className='mt-2 d-flex flex-row'>
            {device.brands.map((brand) => 
                <Card
                    style={{
                        cursor: "pointer",
                        width: 'auto',
                        borderColor: device.selectedBrand.id === brand.id
                        ? '#0d6efd' : 'rgba(0,0,0,.125)'
                    }}
                    key={brand.id}
                    onClick={()=> device.setSelectedBrand(brand) }
                >{brand.name}</Card>
            )}
        </Row>
    )
})

export default React.memo(BrandBar);