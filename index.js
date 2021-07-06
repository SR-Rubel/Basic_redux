// importing redux from nodemoudles

const redux=require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combiner=redux.combineReducers
const applyMiddlewire= redux.applyMiddleware
const logger= reduxLogger.createLogger()
// defining action constant
const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM='BUY_ICECREAM'

 /*making action creator....(action is an object ... the function
 which return action object is called action creator)*/

function buyCake(){
    return {
        type: BUY_CAKE,
        info:'fist redux action'
    }

}

function buyIcecream(){
    return {
        type: BUY_ICECREAM,
        info:'fist redux action'
    }

}

// defining state object

// const initialstate={
//     numberofCakes:10,
//     numberofIcecream:5
// }

const initialCakeState={
    numberofCakes:10
}
const initialIcecreamState={
    numberofIcecream:5
}

// making reducer which is responsible for changing state object

// const reducer=(state=initialstate,action)=>{
//     switch(action.type){
//         case BUY_CAKE: return {
//             ...state,
//             numberofCakes: state.numberofCakes-1
//         }
//         case BUY_ICECREAM: return {
//             ...state,
//             numberofIcecream: state.numberofIcecream-1
//         }
        
//         default: return state
//     }
// }
const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numberofCakes: state.numberofCakes-1
        }
        
        default: return state
    }
}
const icecreamReducer=(state=initialIcecreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM: return {
            ...state,
            numberofIcecream: state.numberofIcecream-1
        }
        
        default: return state
    }
}

// creating redux store
const rootReducer = combiner(
    {
        cake: cakeReducer,
        iceCream: icecreamReducer
    }
)

const store=createStore(rootReducer,applyMiddlewire(logger))
console.log('Initial State',store.getState())
// rendering state after update everytime
// store.subscribe(()=>console.log('updated state',store.getState()))
store.subscribe(()=>{})
// dispatch action or making change in state 
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

