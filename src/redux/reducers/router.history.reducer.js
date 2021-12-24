export const getAllArticlesBegin = (route) => ({
  type: 'STORE_ROUTE',
  payload: route,
});

const initialState = {
  history: [],
  previous: '',
};

export const RouterHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_ROUTE':
      return action.payload !== state.previous
        ? {
            ...state,
            history: [...state.history, action.payload],
            previous: action.payload,
          }
        : state;
    default:
      return state;
  }
};
