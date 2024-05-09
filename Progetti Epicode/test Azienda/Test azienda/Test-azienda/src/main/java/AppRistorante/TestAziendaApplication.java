package AppRistorante;

import RandomTestGeneration.DatiCasualiGenerator;
import gestioneOrdini.Ordine;
import gestioneTavoli.Tavolo;
import serviceOrdini.GestioneOrdineController;

public class TestAziendaApplication {

	public static void main(String[] args) {
// metodo scanner, inserisce manualmente i dati in input (decommentare per utilizzare in locale, il test di simulazione manuale)
//		GestioneOrdineController orderManager = new GestioneOrdineController();
//		orderManager.gestisciOrdine();

		// METODO CON IL FAKER PER CREARE TAVOLI ORDINI TIPOLOGIA DI CLIENTI TEST
		// Creazione del generatore casuale di dati
		DatiCasualiGenerator generator = new DatiCasualiGenerator();

		// Generazione di tavoli casuali con relativi ordini
		for (Tavolo tavolo : generator.generaTavoliCasuali()) {
			// Creazione di un gestore degli ordini
			GestioneOrdineController gestioneOrdineService = new GestioneOrdineController();

			// Creazione di un ordine per il tavolo
			Ordine ordine = gestioneOrdineService.creaOrdine(tavolo);

			// Stampa dei dettagli dell'ordine
			gestioneOrdineService.stampaDettagliOrdine(tavolo, ordine);

			// Aggiungi una linea vuota per separare gli ordini stampati
			System.out.println();
		}
	}

}
