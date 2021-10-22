const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFatching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFatching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFatching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
