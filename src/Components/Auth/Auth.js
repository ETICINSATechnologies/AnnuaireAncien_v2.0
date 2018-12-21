class Auth {
    static connect(jwt){
        sessionStorage.setItem('token', jwt);
    }

    static disconnect(){
        sessionStorage.removeItem('token')
    }

    static isConnected(){
        return !!sessionStorage.getItem('token');
    }

    static getToken() {
        return sessionStorage.getItem('token')
    }

    static getPayload(){
        return sessionStorage.getItem('token');
    }

    static addCorrectButton(buttons){
        if (this.isConnected())
            buttons.push("disconnection");
        else
            buttons.push("connection");
        return buttons;
    }
}

export default Auth;
