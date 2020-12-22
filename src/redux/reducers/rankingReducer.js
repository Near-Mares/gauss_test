const rankingReducer = ( state=[], action ) => {
    switch (action.type) {
        case 'CHANGE_RANKING':
            return action.payload
        default:
            return state
    }
};

export default rankingReducer