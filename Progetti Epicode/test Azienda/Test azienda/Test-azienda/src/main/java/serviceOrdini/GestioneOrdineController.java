package serviceOrdini;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import gestinePizze.Pizza;
import gestinePizze.PizzaMenu;
import gestioneClienti.CategoriaEta;
import gestioneClienti.Cliente;
import gestioneOrdini.Ordine;
import gestioneTavoli.Tavolo;
import serviceSconti.ScontoManager;

public class GestioneOrdineController {

	private Scanner scanner;

	public GestioneOrdineController() {
        this.scanner = new Scanner(System.in);
    }

	public void gestisciOrdine() {

		Tavolo tavolo = creaTavoloDaInput();


		Ordine ordine = creaOrdine(tavolo);


		stampaDettagliOrdine(tavolo, ordine);


		scanner.close();
	}

	private Tavolo creaTavoloDaInput() {
		System.out.println("Benvenuto! Creazione del tavolo...");

		System.out.print("Inserisci il numero del tavolo: ");
		String nomeTavolo = scanner.nextLine();

		System.out.print("Inserisci il numero di persone al tavolo: ");
		int numeroPersone = leggiInteroDaInput();

		List<Cliente> clienti = raccogliInformazioniClienti(numeroPersone);

		return new Tavolo(nomeTavolo, clienti);
	}

	private List<Cliente> raccogliInformazioniClienti(int numeroPersone) {
		List<Cliente> clienti = new ArrayList<>();

		for (int i = 0; i < numeroPersone; i++) {
			System.out.println("\nInserimento informazioni per il Cliente " + (i + 1) + ":");


			CategoriaEta categoriaEta = scegliTipoCliente();

			Pizza pizzaScelta = scegliPizzaDalMenu();

			boolean haFidelity = richiediFidelity();


			clienti.add(new Cliente(categoriaEta, haFidelity, false, pizzaScelta));
		}

		return clienti;
	}

	private CategoriaEta scegliTipoCliente() {
		while (true) {
			try {
				System.out.println("Seleziona il tipo di cliente:");
				System.out.println("1. Baby (0-3 anni)");
				System.out.println("2. Kid (4-12 anni)");
				System.out.println("3. Adulto (13-59 anni)");
				System.out.println("4. Anziano (60 anni e oltre)");
				System.out.println("5. Diversamente abile");
				System.out.print("Inserisci il numero corrispondente alla categoria: ");

				int scelta = leggiInteroDaInput();

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
					System.out.println("Scelta non valida. Riprova.");
				}
			} catch (InputMismatchException e) {
				System.out.println("Input non valido. Inserisci un numero valido.");
			}
		}
	}

	private boolean richiediFidelity() {
		while (true) {
			System.out.print("Ha la fidelity card? (true/false): ");
			String input = scanner.nextLine().toLowerCase();

			if (input.equals("true") || input.equals("false")) {
				return Boolean.parseBoolean(input);
			} else {
				System.out.println("Input non valido. Inserisci 'true' o 'false'.");
			}
		}
	}


	private Pizza scegliPizzaDalMenu() {
		System.out.println("Menu pizze disponibili:");
		Map<String, Double> menuPizze = PizzaMenu.getMenu();


		int pizzaCount = 1;
		for (String pizzaNome : menuPizze.keySet()) {
			System.out.println(pizzaCount + ". " + pizzaNome + " - Prezzo: " + menuPizze.get(pizzaNome));
			pizzaCount++;
		}


		int pizzaIndex;
		while (true) {
			System.out.print("Inserisci il numero corrispondente alla pizza desiderata: ");
			try {
				pizzaIndex = scanner.nextInt();
				scanner.nextLine();
				if (pizzaIndex < 1 || pizzaIndex > menuPizze.size()) {
					System.out.println("Inserisci un numero valido tra 1 e " + menuPizze.size());
					continue;
				}
				break; 
			} catch (InputMismatchException e) {
				System.out.println("Inserisci un numero valido.");
				scanner.nextLine();
			}
		}


		List<String> pizzaNames = new ArrayList<>(menuPizze.keySet());
		String selectedPizzaName = pizzaNames.get(pizzaIndex - 1);

		double selectedPizzaPrice = menuPizze.get(selectedPizzaName);

		return new Pizza(selectedPizzaName, selectedPizzaPrice, 0.0);
	}

	public Ordine creaOrdine(Tavolo tavolo) {
		Ordine ordine = new Ordine();

		for (Cliente cliente : tavolo.getClienti()) {
			Pizza pizzaScelta = cliente.getPizzaScelta();
			double scontoApplicato = ScontoManager.calcolaSconto(cliente, tavolo.getClienti());
			pizzaScelta.setScontoApplicato(scontoApplicato); // Applica lo sconto alla pizza scelta
			ordine.aggiungiPizza(cliente, pizzaScelta);
		}

		return ordine;
	}

	public void stampaDettagliOrdine(Tavolo tavolo, Ordine ordine) {
		System.out.println("\nDettagli ordine:");
		System.out.println("Nome tavolo: " + tavolo.getNome());
		System.out.println("Numero di persone: " + tavolo.getClienti().size());

		
		long numeroFidelity = tavolo.getClienti().stream().filter(Cliente::isHaFidelityCard).count();
		System.out.println("Numero di clienti con fidelity card: " + numeroFidelity);

		System.out.println("Lista delle pizze ordinate:");

		DecimalFormat df = new DecimalFormat("#.##"); // Utilizzato per formattare i numeri a due decimali


		@SuppressWarnings("unused")
		double totaleScontato = 0.0;
		double totaleTavolo = 0.0;

		for (Cliente cliente : tavolo.getClienti()) {
			Pizza pizzaOrdinata = ordine.getPizzaOrdinata(cliente);
			double prezzoPizza = pizzaOrdinata.getPrezzo();
			double scontoApplicato = pizzaOrdinata.getScontoApplicato();
			double prezzoScontato = prezzoPizza * (1 - scontoApplicato);

			// Applica il prezzo minimo se il prezzo scontato è inferiore a €5
			if (prezzoScontato < 5.0) {
				prezzoScontato = 5.0;
				scontoApplicato = (prezzoPizza - prezzoScontato) / prezzoPizza;
			}

			totaleScontato += prezzoScontato;
			totaleTavolo += prezzoScontato;

			String clienteTipo = cliente.getTipoCliente().toUpperCase();
			double percentualeScontoEffettiva = scontoApplicato * 100;

			LocalDateTime now = LocalDateTime.now();
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
	        String oraOrdine = now.format(formatter);

	        // Formatta l'output con informazioni aggiuntive
	        System.out.println("Cliente: " + clienteTipo + ", Pizza: " + pizzaOrdinata.getNome()
	                + ", Prezzo originale: " + df.format(prezzoPizza) + "€"
	                + ", Sconto applicato: " + df.format(percentualeScontoEffettiva) + "%"
	                + ", Prezzo scontato: " + df.format(prezzoScontato) + "€"
					+ ", Fidelity: " + (cliente.isHaFidelityCard() ? "Sì" : "No"));
	    }

	    System.out.println("Ordine Inviato con Successo all'ora: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
	    System.out.println("Totale tavolo: " + df.format(totaleTavolo) + "€");
	}


	private int leggiInteroDaInput() {
		int input = 0;
		boolean inputValido = false;

		while (!inputValido) {
			try {
				input = scanner.nextInt();
				scanner.nextLine();
				inputValido = true;
			} catch (InputMismatchException e) {
				System.out.println("Input non valido. Inserisci un numero intero valido.");
				scanner.nextLine();
			}
		}

		return input;
	}

}
