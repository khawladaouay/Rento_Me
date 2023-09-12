import { createContext, useReducer } from "react";
const INTTAL_STATE = {
    city: undefined,
    dates: [],
    option: {
        adult: undefined,
        children: undefined,
        room: undefined,
    },
};

export const SearchContext = createContext(INTTAL_STATE)

const SearchReducer = (state,action) =>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INTTAL_STATE;
        default:
            return state;

    }
};

export const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, INTTAL_STATE);

    return (
        <SearchContext.Provider
            value={{ city: state.city,
                dates: state.dates,
                options: state.options,
            dispatch,
        }}
            >
                {children}
            </SearchContext.Provider>
    );
};