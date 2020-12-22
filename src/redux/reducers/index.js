import rankingReducer from './rankingReducer';
import summaryReducer from './summaryReducer';
import operationReducer from './operationReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    operation: operationReducer,
    ranking: rankingReducer,
    summary: summaryReducer
})

export default allReducers;