class Auth {
    static connect(jwt: string) {
        sessionStorage.setItem('token', jwt);
    }

    static disconnect(): void {
        sessionStorage.removeItem('token')
    }

    static isConnected(): boolean {
        return !!sessionStorage.getItem('token');
    }

    static getToken(): string {
        return sessionStorage.getItem('token') as string;
    }

    static addCorrectButton(buttons: Array<string>) {
        if (this.isConnected())
            buttons.push("disconnection");
        else
            buttons.push("connection");
        return buttons;
    }
}

export default Auth;
