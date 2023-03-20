const Reducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_START":
      return {
        token: null,
        isadmin:false,
        isFetching: true,
        error: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        token: action.payload.token,
        isadmin:action.payload.admin,
        isFetching: false,
        error: false,
      };
    case "SIGNUP_FAIL":
      return {
        token: null,
        isadmin:false,
        isFetching: false,
        error: true,
      };
    case "LOGIN_SUCCESS":
      return {
        token: action.payload.token,
        isadmin:action.payload.admin,
        isFetching: false,
        error: false,
      };
    case "LOGIN_START":
      return {
        token: null,
        isadmin:false,
        isFetching: true,
        error: false,
      };
    case "LOGIN_FAIL":
      return {
        token: null,
        isadmin:false,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        token: null,
        isadmin:false,
        isFetching: false,
        error: false,
      };
    case "PRODUCT_ADD_START":
      return{
        ...state,
        isFetching:true,
      };
    case "PRODUCT_ADD_SUCCESS":
      return{
        ...state,
        isFetching:false,
      };
    case "PRODUCT_ADD_FAIL":
      return{
        ...state,
        error:true,
      }
    case "PRODUCT_UPDATE_START":
      return{
        ...state,
        isFetching:true,
      }
    case "PRODUCT_UPDATE_SUCCESS":
      return{
        ...state,
        isFetching:false,
      }
    case "PRODUCT_UPDATE_FAIL":
      return{
        ...state,
        error:true,
      }
    case "PRODUCT_DELETE_START":
      return{
        ...state,
        isFetching:true,
      }
    case "PRODUCT_DELETE_SUCCESS":
        return{
          ...state,
          isFetching:false,
        }
    case "PRODUCT_DELETE_FAIL":
      return{
        ...state,
        error:true,
      }
    case "ADD_CART_START":
      return{
        ...state,
        isFetching:true,
      }
    case "ADD_CART_SUCCESS":
      return{
        ...state,
        isFetching:false,
      }
    case "ADD_CART_FAIL":
      return{
        ...state,
        isFetching:false,
        error:true,
      }
    case "FETCH_USER_START":
      return{
        ...state,
        isFetching:true,
      }
    case "FETCH_USER_FAIL":
      return{
        ...state,
        isFetching:false,
        error:true,
      }
    case "FETCH_USER_SUCCESS":
      return{
        ...state,
        isFetching:false,
      }
    case "UPDATE_USER_START":
      return{
        ...state,
        isFetching:true,
      }
    case "UPDATE_USER_FAIL":
      return{
        ...state,
        isFetching:false,
        error:true,
      }
    case "UPDATE_USER_SUCCESS":
      return{
        ...state,
        isFetching:false,
      }
    case "UPDATE_QUANTITY_START":
      return{
        ...state,
        isFetching:true,
      }
    case "UPDATE_QUANTITY_FAIL":
      return{
        ...state,
        isFetching:false,
        error:true,
      }
    case "UPDATE_QUANTITY_SUCCESS":
      return{
        ...state,
        isFetching:false,
      }
    default:
      return state;
  }
};

export default Reducer;
