const operationReducer = ( state='', action ) => {
    switch (action.type) {
        case 'CHANGE_OPERATION':
            return action.payload
        default:
            return state
    }
};

export default operationReducer