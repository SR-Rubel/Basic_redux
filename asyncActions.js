const redux = require('redux')
const thunkMiddlware=require('redux-thunk').default
const applyMiddleware=redux.applyMiddleware
const createStore=redux.createStore
const axios=require('axios')


const initialState={
    loading:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUEST='FETCH_USERQUEST'
const FETCH_USERS_SUCCESS='FETCH_USER_SUCCESS'
const FETCH_USERS_FAILURE='FETCH_USER_FAILURE'

const fetchUsersRequest=()=>{
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess=(users)=>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure=(error)=>{
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer =(state=initialState, action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading:true
            }

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                users:action.payload
            } 

        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading:false,
                users:[],
                error:action.payload
                
            }
    }
}

const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            const users=response.data
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error=>{
            dispatch(fetchUsersFailure(error))
        })
    }
}

const store= createStore(reducer,applyMiddleware(thunkMiddlware))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers()) 