package AppRistorante;

import serviceOrdini.GestioneOrdineController;

public class TestAziendaApplication {

	public static void main(String[] args) {
// metodo scanner, inserisce manualmente i dati in input (decommentare per utilizzare in locale, il test di simulazione manuale)
		GestioneOrdineController orderManager = new GestioneOrdineController();
		orderManager.gestisciOrdine();

		// METODO CON IL FAKER PER CREARE TAVOLI ORDINI TIPOLOGIA DI CLIENTI TEST
//		DatiCasualiGenerator generator = new DatiCasualiGenerator();
//		
//		for (Tavolo tavolo : generator.generaTavoliCasuali()) {
//			GestioneOrdineController gestioneOrdineService = new GestioneOrdineController();
//
//			Ordine ordine = gestioneOrdineService.creaOrdine(tavolo);
//
//			gestioneOrdineService.stampaDettagliOrdine(tavolo, ordine);
//
//			
//			System.out.println();
//		}
	}

}
