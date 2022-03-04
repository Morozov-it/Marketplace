import React from 'react';
import { Spinner as SpinnerBootstrap } from 'react-bootstrap'

const Spinner = () => {
    return (
        <div className="spiner">
            <SpinnerBootstrap
                style={{width: '5rem', height: '5rem'}}
                animation="border"
                variant="primary"
                size="xxl" />
        </div>
    )
}
export default Spinner;