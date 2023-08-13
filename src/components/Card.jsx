import React, {useContext} from 'react';
import {DeckContext} from "../context/DeckContext.jsx";

const Card = ({card}) => {
    const [_, deckDispatch] = useContext(DeckContext)
    const handleCardOnClick = (card) => {
        console.log('clicked', card.name);
        deckDispatch({type: 'ADD', value: card})
    }

    return (
        <div className="w-64">
            <img src={card.img} alt={card.name} onClick={() => handleCardOnClick(card)}/>
        </div>
    )
}

export default Card;