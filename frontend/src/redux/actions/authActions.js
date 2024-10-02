import { registerUser } from "../../api/authApi.js";
import { loginUser, loadUser } from "../../api/authApi.js";


export const register = (userData) => async (dispatch) => {
  try {
    const data = await registerUser(userData);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: {
        token: data.token,
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload: error,
    });
  }
};


export const login = (userData) => async (dispatch) => {
  try {
    const data = await loginUser(userData);
    console.log(data);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        token: data.token,
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error,
    });
  }
};


export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT_SUCCESS" });
};


export const load = (token) => async (dispatch) => {
  try {
  

    if (token) {
      const userData = await loadUser(token);

      dispatch({
        type: "USER_LOADED",
        payload: {
          token: userData.token,
          user: userData.user,
        },
      });
    } else {
      dispatch({ type: "AUTH_ERROR" });
    }
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};
