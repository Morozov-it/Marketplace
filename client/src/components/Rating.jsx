import React from 'react';
import starFill from '../assets/star-fill.svg';
import starHalf from '../assets/star-half.svg';
import star from '../assets/star.svg';

const Rating = ({rating}) => {
    return (
        <div className='d-flex justify-content-end'>
            <div>{rating}</div>
            {rating === 5 && <img src={starFill} alt="fill"></img>}
            {rating >= 3 && rating < 5 && <img src={starHalf} alt="half"></img>}
            {rating < 3 && <img src={star} alt="empty"></img>}
        </div>
    )
}
export default Rating