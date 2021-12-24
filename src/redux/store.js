import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { AllArticleReducer, UserReducer, ArticleReducer } from './reducers/index';
import UIReducer from './reducers/ui.reducer';

const rootReducer = combineReducers({
  allArticles: AllArticleReducer,
  articleReducer: ArticleReducer,
  user: UserReducer,
  ui: UIReducer
});

export const makeStore = (initialState, options) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};
