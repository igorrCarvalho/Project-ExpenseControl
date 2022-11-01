const walletInitState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
};

const wallet = (state = walletInitState, action) => {
  switch (action.type) {
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
