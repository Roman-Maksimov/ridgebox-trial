import { USER_FB_INITIALIZED, USER_SET } from 'src/actions';

const initialState = {
  isFBInitialized: false,
  profile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_FB_INITIALIZED:
      return { ...state, isFBInitialized: true };

    case USER_SET:
      return { ...state, profile: action.payload };

    default:
      return state;
  }
};
