const walletInitState = {
  currencies: [],
  expenses: [],
  total: 0,
  editor: false,
  idToEdit: 0,
  isFetching: false,
};

const wallet = (state = walletInitState, action) => {
  switch (action.type) {
  case 'SAVE_EXPENSE':
    return ({
      ...state,
      expenses: action.payload.data,
      total: action.payload.value,
    });
  case 'REQUEST_STARTED':
    return ({
      ...state,
      isFetching: true,
    });
  case 'REQUEST_SUCCEED':
    return ({
      ...state,
      currencies: action.payload,
    });
  case 'REQUEST_ENDED':
    return ({
      ...state,
      isFetching: false,
    });
  default:
    return state;
  }
};

export default wallet;
