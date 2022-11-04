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
  case 'END_EDIT':
    return ({
      ...state,
      expenses: action.edited,
      total: action.total,
      editor: false,
      idToEdit: 0,
    });
  case 'START_EDIT':
    return ({
      ...state,
      editor: true,
      idToEdit: action.payload,
    });
  case 'HANDLE_DELETE':
    return ({
      ...state,
      expenses: state.expenses.filter((obj) => obj.id !== action.payload.id),
      total: Number((
        state.total - (action.payload.value * action.payload.ask)
      ).toFixed(2)),
    });
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
