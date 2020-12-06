import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import study from './modules/studyReducer'
import music from './modules/music'

const rootReducer=combineReducers({
    study,
    music
})

const store =createStore(rootReducer,applyMiddleware(thunk))

export default store