import React from 'react';
import { Spinner as SpinnerBootstrap } from 'react-bootstrap'

const Spinner = () => {
    return (
        <div className="text-center p-1">
            <SpinnerBootstrap
                style={{width: '3rem', height: '3rem'}}
                animation="border"
                variant="primary"
                size="xxl" />
        </div>
    )
}
export default Spinner;