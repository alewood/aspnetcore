import { Utente } from "../models/utente";
import { Strumento } from "../models/strumento";

export interface Prenotazione{
    id: number;
    utente: Utente;
    dataInizio: Date;
    dataFine: Date;
    strumento: Strumento;
}