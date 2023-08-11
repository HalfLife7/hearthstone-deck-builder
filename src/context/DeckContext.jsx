import React, {useContext, useReducer} from "react";

export const DeckContext = React.createContext([]);

const deckReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            return [...state, action.value]
        }
        case 'REMOVE': {
            return state.filter((item) => item.cardId !== action.value.cardId)
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`)
        }
    }
}
export const DeckProvider = (props) => {
    const [state, dispatch] = useReducer(deckReducer, [])
    const value = React.useMemo(() => [state, dispatch], [state])

    return <DeckContext.Provider value={value} {...props}/>
}