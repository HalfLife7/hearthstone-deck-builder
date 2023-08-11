import React, {useContext} from "react";
import DeckItem from "./DeckItem.jsx";
import {DeckContext} from "../context/DeckContext.jsx";

const DeckMenu = () => {
    const [ deckState, deckDispatch ] = useContext(DeckContext)

    return (
        <div className="w-1/5">
            {deckState.map((card, index) => {
                return <DeckItem key={`${card.cardId}-${index}`} card={card}/>
            })}
        </div>
    )
}


export default DeckMenu
