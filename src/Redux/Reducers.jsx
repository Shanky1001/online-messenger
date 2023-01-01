import { ADD_USER, REFRESH, SEND, USER } from "./Actions";


const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || [], messages: JSON.parse(localStorage.getItem('messages')) || [], user: sessionStorage.getItem('user') || ''
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            sessionStorage.setItem('user', action.user);
            localStorage.setItem('users', JSON.stringify([...state.users, action.payload]))
            return { ...state, users: [...state.users, action.payload], user: action.user }

        case SEND:
            localStorage.setItem('messages', JSON.stringify([...state.messages, action.payload]))
            return { ...state, messages: [...state.messages, action.payload] }

        case USER:
            sessionStorage.setItem('user', action.payload)
            return { ...state, user: action.payload }

        case REFRESH:
            return state 

        default:
            return state
    }
}
