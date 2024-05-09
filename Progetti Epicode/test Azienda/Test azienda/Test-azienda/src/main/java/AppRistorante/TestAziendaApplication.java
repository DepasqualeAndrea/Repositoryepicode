package AppRistorante;

import RandomTestGeneration.DatiCasualiGenerator;
import gestioneOrdini.Ordine;
import gestioneTavoli.Tavolo;
import serviceOrdini.GestioneOrdineController;

public class TestAziendaApplication {

	public static void main(String[] args) {
		// METODO SCANNER MANUALE, inserisce manualmente i dati in input (decommentare
		// per utilizzare in locale, il test di simulazione manuale)

//		GestioneOrdineController orderManager = new GestioneOrdineController();
//		orderManager.gestisciOrdine();

		// METODO CON IL FAKER PER CREARE TAVOLI ORDINI TIPOLOGIA DI CLIENTI TEST
		// (decommentare ed avviare il terminale per vedere l'output)

		DatiCasualiGenerator generator = new DatiCasualiGenerator();

		for (Tavolo tavolo : generator.generaTavoliCasuali()) {
			GestioneOrdineController gestioneOrdineService = new GestioneOrdineController();

			Ordine ordine = gestioneOrdineService.creaOrdine(tavolo);

			gestioneOrdineService.stampaDettagliOrdine(tavolo, ordine);

			System.out.println();
		}
	}

}
