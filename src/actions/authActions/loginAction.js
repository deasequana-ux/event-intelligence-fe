import {createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../../services/auth-service";
import jwtDecode from "jwt-decode";

export const loginAction = createAsyncThunk(
    "auth/login",
    async (loginFormObject) => {
        const response = await authService.login(loginFormObject);
        if (response.status === 201) {
            localStorage.setItem("token", response.data.token);
            let decodedToken = jwtDecode(response.data.token);
            return {
                isAuth: true,
                name: decodedToken.name,
                surname: decodedToken.surname,
                roleInfo: decodedToken.roleInfo,
            };
        }
        return {
            isAuth: false,
            name: "",
            roleInfo: "",
            surname: ""
        };
    }
);