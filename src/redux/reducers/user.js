const initialUserData = {
  email: '',
};

const user = (state = initialUserData, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
