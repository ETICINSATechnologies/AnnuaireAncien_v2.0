class Auth {
    static connect(jwt: string, isAdmin: boolean) {
        sessionStorage.setItem('token', jwt);
        if(isAdmin){
            sessionStorage.setItem('admin', 'yes');
        }
    }

    static disconnect(): void {
        sessionStorage.removeItem('token')
    }

    static isConnected(): boolean {
        return !!sessionStorage.getItem('token');
    }

    static isAdmin(): boolean{
        return !!sessionStorage.getItem('admin');
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
