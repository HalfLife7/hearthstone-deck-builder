import React from "react";
const DeckItem = ({card}) => {
    return (
        <div className="flex flex-row bg-gray-600">
            <div className="relative w-12 h-12 mb-2">
                <img className="w-full h-full" src="/images/mana-crystal.png" alt={`Mana: ${card.cost}`} aria-label="Mana Cost" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black text-2xl font-bold">{card.cost}</span>
                </div>

            </div>
            <div className="flex items-center ml-2 pb-2">
                <span className="text-white tracking-wider">
                    {card.name}
                </span>
            </div>
        </div>
    )
}

export default DeckItem