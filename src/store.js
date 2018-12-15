
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {responsiveStoreEnhancer} from 'redux-responsive';
import focusEnhancer from 'refocus/enhancer';
import {window} from './globals';
import reducers from './reducers';


function getReduxDevTools() {
  const {__REDUX_DEVTOOLS_EXTENSION__} = window;
  let enhancer = (arg)=> arg;

  /* istanbul ignore if */
  if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancer = __REDUX_DEVTOOLS_EXTENSION__();
  }
  return enhancer;
}


const initialState = {};

export const store = createStore(
  reducers,
  initialState,
  compose(
    responsiveStoreEnhancer,
    focusEnhancer,
    applyMiddleware(
      thunkMiddleware
      // TODO history middleware
    ),
    getReduxDevTools()
  )
);
