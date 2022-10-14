
export const ADD_USER = 'Add user';
export const SEND = 'send message';
export const USER = 'User'
export const REFRESH = 'Refresh';

export const Adding_User = ({ data, user }) => {
    return {
        type: ADD_USER, payload: data, user: user
    }
}


export const Sending_Msg = (msg) => {
    return {
        type: SEND, payload: msg
    }
}

export const User_Logging = (user) => {
    return {
        type: USER, payload: user
    }
}

export const Refreshing = () => {
    return {
        type: REFRESH
    }
}