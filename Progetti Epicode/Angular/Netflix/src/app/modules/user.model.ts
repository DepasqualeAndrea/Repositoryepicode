export class User{



    constructor(
        public email:string,
        public id: string,
        private _token:string,
        private _expirationDate: Date,

    ){}

    get token(){
        if(!this._expirationDate || new Date() > this._expirationDate){
            alert("La tua sessione è scaduta! \nAccedi o registrati")
            return null;


        }
        return this._token
    }

}
