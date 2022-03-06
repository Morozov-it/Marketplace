import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import { fetchBasket, deleteFromBasket } from '../http/basketAPI';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const Basket = observer(() => {
    const { basket, global } = useStore()

    async function deleteItem(id) {
        try {
            global.setErrorBasket('');
            global.setLoading(true);
            await deleteFromBasket(id);
            
            const data = await fetchBasket();
            basket.setItems(data);
        } catch (e) {
            global.setErrorBasket(e.response.data.message)
        } finally {
            global.setLoading(false)
        }
    }

    return (
        <Container>
            {global.errorBasket && <div className='error'>
                {global.errorBasket}
            </div>}
            <div className='mt-2'>
                <ListGroup as="ol" numbered>
                    {basket.items.map((item) =>
                        <ListGroup.Item
                            key={item.id}
                            as="li">
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <div className='image' style={{maxWidth: '5vw'}}>
                                        <img
                                            src={process.env.REACT_APP_URL + item.device.img}
                                            alt="/" />
                                    </div>
                                    <div>{item.device.name}</div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h5 className='p-2'>
                                            <span>{item.device.price.toLocaleString()} ₽</span>
                                        </h5>
                                    </div>
                                    <Button 
                                        onClick={()=>deleteItem(item.id)}
                                        variant="outline-primary">
                                        delete
                                    </Button>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
            <div className='d-flex justify-content-end mt-2'>
                <h5 className='p-2'>
                    <span>Total: </span>
                    <span>{basket.summ.toLocaleString()} ₽</span>
                </h5>
                <Button 
                    onClick={() => { }}
                    style={{width: '10vw'}}
                    variant="outline-primary">
                    pay
                </Button>
            </div>
        </Container>
    )
})

export default React.memo(Basket);