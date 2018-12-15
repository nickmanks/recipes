
import {createStore} from 'redux';
import reducers from '../reducers';

export const storyStore = (state)=> createStore(reducers, state);
