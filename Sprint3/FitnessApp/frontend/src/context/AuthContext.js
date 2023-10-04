import { createContext, useReducer } from "react";

export const AuthContext = createContext(); // component that we create which has a Provider on it written below

// taking previous state and action
export const authReducer = (state, action) => {
    switch (action.type) {  // action has a type property that describes the action
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null })

    console.log('AuthContext state: ', state);  // logging state to the console to keep track of current state

    return (
        <AuthContext.Provider value ={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}