import CardSetDataList from "./CardSetDataList.jsx";
import Card from "./Card.jsx";
import React, {useContext, useState} from "react";
import {useQuery} from "react-query";
import DeckMenu from "./DeckMenu.jsx";
import ClassDataList from "./ClassDataList.jsx";
import {DeckContext} from "../context/DeckContext.jsx";

const fileNames = [
    "ashes_of_outland",
    "basic",
    "battlegrounds",
    "blackrock_mountain",
    "classic",
    "core",
    "credits",
    "debug",
    "demo",
    "demon_hunter_initiate",
    "descent_of_dragons",
    "festival_of_legends",
    "forged_in_the_barrens",
    "fractured_in_alterac_valley",
    "galakrond's_awakening",
    "goblins_vs_gnomes",
    "hall_of_fame",
    "hero_skins",
    "journey_to_un'goro",
    "knights_of_the_frozen_throne",
    "kobolds_&_catacombs",
    "legacy",
    "madness_at_the_darkmoon_faire",
    "march_of_the_lich_king",
    "mean_streets_of_gadgetzan",
    "mercenaries",
    "missions",
    "murder_at_castle_nathria",
    "naxxramas",
    "one_night_in_karazhan",
    "path_of_arthas",
    "promo",
    "rastakhan's_rumble",
    "rise_of_shadows",
    "saviors_of_uldum",
    "scholomance_academy",
    "system",
    "tavern_brawl",
    "taverns_of_time",
    "the_boomsday_project",
    "the_grand_tournament",
    "the_league_of_explorers",
    "the_witchwood",
    "titans",
    "united_in_stormwind",
    "unknown",
    "vanilla",
    "voyage_to_the_sunken_city",
    "wailing_caverns",
    "whispers_of_the_old_gods",
    "wild_event",
]

const CardList = () => {
    const [playerClass, setPlayerClass] = useState("")
    const [selectedCardSet, setSelectedCardSet] = useState("legacy")
    const {isLoading, error, data, refetch} = useQuery(['cardsData', selectedCardSet], () =>
        fetch(`/data/${selectedCardSet}.json`).then(res => res.json()),
    )
    const [deckState, deckDispatch] = useContext(DeckContext);

    const handleCardSetDataListOnChange = async (e) => {
        const cardSetInputValue = e.toLowerCase().replace(/ /g, "_")
        if (fileNames.includes(cardSetInputValue)) {
            setSelectedCardSet(cardSetInputValue)
            await refetch();
        }
    }

    const handleClassDataListOnChange = (e) => {
        setPlayerClass(e);
        deckDispatch({type: 'CLEAR'})
    }

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    if (!data) return null;

    return (
        <div className="flex flex-col">
            <div className="w-full bg-gray-300">
                <CardSetDataList items={fileNames} onChange={handleCardSetDataListOnChange}/>
                <ClassDataList onChange={handleClassDataListOnChange}/>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-wrap justify-center w-4/5">
                    {data[Object.keys(data)[0]].filter((card) => {
                        if (!card.img) {
                            return false
                        }

                        if (!playerClass) {
                            return true
                        }

                        return (card.playerClass === playerClass || card.playerClass === "Neutral");
                    }).map((card) => {
                        return <Card key={card.cardId} card={card}/>
                    })}
                </div>
                <DeckMenu/>
            </div>
        </div>
    )
}

export default CardList;
