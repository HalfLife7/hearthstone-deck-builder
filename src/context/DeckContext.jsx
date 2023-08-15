import React, {useReducer} from "react";

export const DeckContext = React.createContext([]);

const deckReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            return [...state, action.value]
        }
        case 'REMOVE': {
            return state.filter((item) => item.cardId !== action.value.cardId)
        }
        case 'CLEAR': {
            return []
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`)
        }
    }
}
export const DeckProvider = (props) => {
    const [state, dispatch] = useReducer(deckReducer, [])
    // https://kentcdodds.com/blog/usememo-and-usecallback
    // useMemo is slower here since the calculation is not expensive (1 line)?
    // const value = React.useMemo(() => [state, dispatch], [state])

    return <DeckContext.Provider value={[state, dispatch]} {...props}/>
}
