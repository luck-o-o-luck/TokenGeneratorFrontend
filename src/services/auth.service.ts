import axios from "axios";

const API_URL = "https://localhost:7065/api/User/";

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "Login", {
                email: email,
                password: password
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email: string, password: string, confirmPassword: string) {
        return axios.post(API_URL + "Register", {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }

    refreshToken() {
        return axios.get(API_URL + "RefreshToken")
            .then(response => {
                return response.data.accessToken;
            });
    }
}

export default new AuthService();