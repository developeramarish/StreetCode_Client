/* eslint-disable class-methods-use-this */
import { jwtDecode, JwtPayload } from 'jwt-decode';

import AuthApi from '@/app/api/authentication/auth.api';
import { RefreshTokenRequest, UserRegisterRequest } from '@/models/user/user.model';

interface CustomJwtPayload extends JwtPayload {
    role: string;
}

export default class AuthService {
    private static accessTokenStorageName = 'AccessToken';

    private static refreshTokenStorageName = 'RefreshToken';

    public static getAccessToken(): string | null {
        return localStorage.getItem(this.accessTokenStorageName);
    }

    public static isLoggedIn(): boolean {
        const token = this.getAccessToken();
        if (!token || !this.isAccessTokenHasValidSignature(token) || this.isAccessTokenExpired(token)) {
            return false;
        }

        return true;
    }

    public static logout() {
        this.clearTokenData();
    }

    public static loginAsync(
        login: string,
        password: string,
        captchaToken: string | null | undefined,
    ) {
        return AuthApi.login({ login, password, captchaToken })
            .then((response) => {
                localStorage.setItem(this.accessTokenStorageName, response.accessToken);
                localStorage.setItem(this.refreshTokenStorageName, response.refreshToken);
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
    }

    public static async registerAsync(
        request: UserRegisterRequest,
    ) {
        try {
            await AuthApi.register(request);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    public static refreshTokenAsync = async () => {
        try {
            const oldAccesstoken = this.getAccessToken();
            if (!AuthService.isAccessTokenHasValidSignature(oldAccesstoken)) {
                const error = new Error('Invalid signature of access token');
                return Promise.reject(error);
            }

            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
                const error = new Error('Refresh token doesn`t exists');
                return Promise.reject(error);
            }

            const refreshTokenRequest: RefreshTokenRequest = {
                accessToken: oldAccesstoken || '',
                refreshToken,
            };

            const response = await AuthApi.refreshToken(refreshTokenRequest);
            localStorage.setItem(this.accessTokenStorageName, response.accessToken);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    };

    public static isAccessTokenExpired(token: string): boolean {
        const decodedToken = this.getDecodedAccessToken(token);
        const expirationTime = ((decodedToken && decodedToken?.exp) || 0) * 1000;
        const actualTime = new Date().getTime();

        return expirationTime <= actualTime;
    }

    private static isAccessTokenHasValidSignature(token: string | null) {
        return !!token && !!this.getDecodedAccessToken(token);
    }

    private static getDecodedAccessToken(token: string): CustomJwtPayload | null {
        let decodedToken: CustomJwtPayload | null = null;
        try {
            decodedToken = jwtDecode<CustomJwtPayload>(token);
        } catch (error) {
            return null;
        }

        return decodedToken;
    }

    private static getRefreshToken() {
        return localStorage.getItem(this.refreshTokenStorageName);
    }

    private static clearTokenData() {
        localStorage.removeItem(this.accessTokenStorageName);
        localStorage.removeItem(this.refreshTokenStorageName);
    }

    public static isAdmin(): boolean {
        const token = this.getAccessToken();
        if (!token) return false;

        const decodedToken = this.getDecodedAccessToken(token);
        if (!decodedToken || !decodedToken.role) return false;

        return decodedToken.role === 'Admin';
    }

    static async googleLoginAsync(idToken: string | undefined): Promise<void> {
        try {
            const response = await AuthApi.loginGoogle(idToken);
            const { accessToken, refreshToken } = response;

            localStorage.setItem(this.accessTokenStorageName, accessToken);
            localStorage.setItem(this.refreshTokenStorageName, refreshToken);

            console.log('Успішна авторизація через Google!');
        } catch (error) {
            console.error('Помилка авторизації через Google:', error);
            throw new Error('Не вдалося увійти через Google');
        }
    }
}
