import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import study from './modules/studyReducer'
import music from './modules/music'
import good from './modules/good'

const rootReducer=combineReducers({
    study,
    music,
    good
})

const store =createStore(rootReducer,applyMiddleware(thunk))

export default store