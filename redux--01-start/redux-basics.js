// Redux Tutorial - Udemy

// Initialize Redux
const redux = require('redux');
const createStore = redux.createStore;

// Initial State
const initialState = {
    counter: 0
};

// Reducer
const rootReducer = (state = initialState, action) => {
    if(action.type === 'INC_COUNTER'){
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if(action.type === 'ADD_COUNTER'){
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

// Store
const store = createStore(rootReducer);
console.log('Created Store: ', store.getState());

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Action (Dispatching)
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log('Added Actions: ', store.getState());
