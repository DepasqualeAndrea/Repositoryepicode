export interface AuthDATA {
    accessToken: string;
    user:{
        id: number;
        email: string;
        nome: string;
        cognome: string;
    }
}
