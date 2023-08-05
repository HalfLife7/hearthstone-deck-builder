import React from 'react';
const Card = ({card}) => {
    return (
        <div className="w-64">
            <img src={card.img} alt={card.name}/>
        </div>
    )
}

export default Card;