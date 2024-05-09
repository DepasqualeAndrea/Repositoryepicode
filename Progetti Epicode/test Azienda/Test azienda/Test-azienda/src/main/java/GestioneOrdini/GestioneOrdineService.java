package GestioneOrdini;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import com.example.Test.azienda.ClienteCustom.CategoriaEta;
import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.OrderExample.Ordine;
import com.example.Test.azienda.Pizza.Pizza;
import com.example.Test.azienda.Pizza.PizzaMenu;
import com.example.Test.azienda.Tavoli.Tavolo;

import GestioneSconti.ScontoManager;

public class GestioneOrdineService {

	private Scanner scanner;

	public GestioneOrdineService() {
        this.scanner = new Scanner(System.in);
    }

	public void gestisciOrdine() {
		// Creazione del tavolo e raccolta dei dati
		Tavolo tavolo = creaTavoloDaInput();

		// Creazione dell'ordine
		Ordine ordine = creaOrdine(tavolo);

		// Stampare i dettagli dell'ordine
		stampaDettagliOrdine(tavolo, ordine);

		// Chiudi lo scanner
		scanner.close();
	}

	private Tavolo creaTavoloDaInput() {
		System.out.println("Benvenuto! Creazione del tavolo...");

		System.out.print("Inserisci il numero del tavolo: ");
		String nomeTavolo = scanner.nextLine();

		System.out.print("Inserisci il numero di persone al tavolo: ");
		int numeroPersone = scanner.nextInt();
		scanner.nextLine(); // Consuma il newline dopo il numero di persone

		List<Cliente> clienti = raccogliInformazioniClienti(numeroPersone);

		return new Tavolo(nomeTavolo, clienti);
	}

	private List<Cliente> raccogliInformazioniClienti(int numeroPersone) {
		List<Cliente> clienti = new ArrayList<>();

		for (int i = 0; i < numeroPersone; i++) {
			System.out.println("\nInserimento informazioni per il Cliente " + (i + 1) + ":");

			// Richiedi il tipo di cliente
			CategoriaEta categoriaEta = scegliTipoCliente();

			// Richiedi se ha la fidelity card
			boolean haFidelity = richiediFidelity();

			// Chiedi al cliente di scegliere una pizza
			Pizza pizzaScelta = scegliPizzaDalMenu();

			// Crea il cliente con le informazioni raccolte
			clienti.add(new Cliente(categoriaEta, haFidelity, false, pizzaScelta));
		}

		return clienti;
	}

	private CategoriaEta scegliTipoCliente() {
		System.out.println("Seleziona il tipo di cliente:");
		System.out.println("1. Baby (0-3 anni)");
		System.out.println("2. Kid (4-12 anni)");
		System.out.println("3. Adulto (13-59 anni)");
		System.out.println("4. Anziano (60 anni e oltre)");
		System.out.println("5. Diversamente abile");
		System.out.print("Inserisci il numero corrispondente alla categoria: ");

		int scelta = scanner.nextInt();
		scanner.nextLine(); // Consuma il newline dopo la scelta

		switch (scelta) {
		case 1:
			return CategoriaEta.BABY;
		case 2:
			return CategoriaEta.KID;
		case 3:
			return CategoriaEta.ADULTO;
		case 4:
			return CategoriaEta.ANZIANO;
		case 5:
			return CategoriaEta.DIVERSAMENTE_ABILE;
		default:
			System.out.println("Scelta non valida. Default: Adulto.");
			return CategoriaEta.ADULTO;
		}
	}

	private boolean richiediFidelity() {
		System.out.print("Ha la fidelity card? (true/false): ");
		return scanner.nextBoolean();
	}

	private Pizza scegliPizzaDalMenu() {
		System.out.println("Menu pizze disponibili:");
		Map<String, Double> menuPizze = PizzaMenu.getMenu();

		// Mostra il menu delle pizze disponibili
		int pizzaCount = 1;
		for (String pizzaNome : menuPizze.keySet()) {
			System.out.println(pizzaCount + ". " + pizzaNome + " - Prezzo: " + menuPizze.get(pizzaNome));
			pizzaCount++;
		}

		// Chiedi all'utente di selezionare una pizza
		int pizzaIndex;
		while (true) {
			System.out.print("Inserisci il numero corrispondente alla pizza desiderata: ");
			try {
				pizzaIndex = scanner.nextInt();
				scanner.nextLine(); // Consuma il carattere di nuova linea nel buffer
				if (pizzaIndex < 1 || pizzaIndex > menuPizze.size()) {
					System.out.println("Inserisci un numero valido tra 1 e " + menuPizze.size());
					continue;
				}
				break; // Esci dal ciclo se l'input è valido
			} catch (InputMismatchException e) {
				System.out.println("Inserisci un numero valido.");
				scanner.nextLine(); // Consuma l'input non valido
			}
		}

		// Ottieni il nome della pizza selezionata
		List<String> pizzaNames = new ArrayList<>(menuPizze.keySet());
		String selectedPizzaName = pizzaNames.get(pizzaIndex - 1);

		// Ottieni il prezzo della pizza selezionata
		double selectedPizzaPrice = menuPizze.get(selectedPizzaName);

		// Crea e restituisci l'oggetto Pizza selezionato
		return new Pizza(selectedPizzaName, selectedPizzaPrice, 0.0);
	}

	private Ordine creaOrdine(Tavolo tavolo) {
		Ordine ordine = new Ordine();

		for (Cliente cliente : tavolo.getClienti()) {
			Pizza pizzaScelta = cliente.getPizzaScelta();
			double scontoApplicato = ScontoManager.calcolaSconto(cliente, tavolo.getClienti());
			pizzaScelta.setScontoApplicato(scontoApplicato); // Applica lo sconto alla pizza scelta
			ordine.aggiungiPizza(cliente, pizzaScelta);
		}

		return ordine;
	}

	private void stampaDettagliOrdine(Tavolo tavolo, Ordine ordine) {
		System.out.println("\nDettagli ordine:");
		System.out.println("Nome tavolo: " + tavolo.getNome());
		System.out.println("Numero di persone: " + tavolo.getClienti().size());

		// Calcola il numero di clienti con fidelity card
		long numeroFidelity = tavolo.getClienti().stream().filter(Cliente::isHaFidelityCard).count();
		System.out.println("Numero di clienti con fidelity card: " + numeroFidelity);

		System.out.println("Lista delle pizze ordinate:");

		DecimalFormat df = new DecimalFormat("#.##"); // Utilizzato per formattare i numeri a due decimali

		double totaleScontato = 0.0;
		double totaleTavolo = 0.0;

		for (Cliente cliente : tavolo.getClienti()) {
			Pizza pizzaOrdinata = ordine.getPizzaOrdinata(cliente);
			double prezzoPizza = pizzaOrdinata.getPrezzo();
			double scontoApplicato = pizzaOrdinata.getScontoApplicato();
			double prezzoScontato = prezzoPizza * (1 - scontoApplicato);

			totaleScontato += prezzoScontato;
			if (totaleScontato < 5.0) {
				totaleScontato = 5.0;
				scontoApplicato = calculateDiscountPercentage(prezzoPizza, totaleScontato);
			}
			totaleTavolo += totaleScontato;
			int clienteTipo = cliente.getEtaCliente();

			// Formatta l'output con percentuale e prezzo scontato
			System.out.println("Cliente: " + clienteTipo + ", Pizza: " + pizzaOrdinata.getNome()
					+ ", Prezzo originale: " + df.format(prezzoPizza) + "€" + ", Sconto applicato: "
					+ scontoApplicato * 100 + "%" + ", Prezzo scontato: " + df.format(totaleScontato) + "€");
		}

		System.out.println("Ordine Inviato con Successo!");
		System.out.println("Totale tavolo: " + df.format(totaleTavolo) + "€");
	}

	private static double calculateDiscountPercentage(double prezzoBase, double prezzoScontato) {
		return ((prezzoBase - prezzoScontato) / prezzoBase);
	}
}
