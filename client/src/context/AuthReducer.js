const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFatching: true,
        error: false,
      };
    case "LOG_OUT":
      return {
        user: null,
        isFatching: false,
        error: false,
      };
    case "LOGIN_SUCCESS":
      console.log(action.payload);
      return {
        user: action.payload,
        isFatching: false,
        error: false,
      };
    case "REGISTER":
      console.log(action.payload.res);
      return {
        user: action.payload.res,
        isFatching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      console.log(action.payload);
      return {
        user: null,
        isFatching: false,
        error: action.payload,
      };
    case "GET_USER":
      console.log(action.payload);
      return { user: action.payload, isFatching: false, error: false };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (item) => item !== action.payload
          ),
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
