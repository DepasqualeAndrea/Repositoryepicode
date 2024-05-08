package com.example.Test.azienda;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Discounts.ScontoBambini;
import com.example.Test.azienda.Discounts.ScontoDisabilita;
import com.example.Test.azienda.Discounts.ScontoFidelity;
import com.example.Test.azienda.Discounts.ScontoPerGruppi;
import com.example.Test.azienda.Discounts.ScontoPerOrario;
import com.example.Test.azienda.Interfaces.ScontoStrategy;
import com.example.Test.azienda.Pizza.Pizza;
import com.example.Test.azienda.Pizza.PizzaMenu;
import com.example.Test.azienda.Tavoli.Tavolo;
import com.github.javafaker.Faker;

public class TestAziendaApplication {

	public static void main(String[] args) {
		// TEST DI CREAZIONE TAVOLI CLIENTI PIZZE CON IL FAKER (da decommentare se si
		// vuole utilizzare questa metodologgia di testing)

//		Faker faker = new Faker();
//		List<Tavolo> tavoli = creaTavoli();
//		stampaInformazioniTavoli(tavoli);

		// METODI CON LO SCANNER MANUALE
		
	    Scanner scanner = new Scanner(System.in);
	    List<Tavolo> tavoliScanner = creaTavoli(scanner);
		stampaInformazioniTavoli(tavoliScanner);
	    scanner.close();

	}

// INIZIO METODI PER IL FAKER

	private static List<Tavolo> creaTavoli() {
		Faker faker = new Faker();
		List<Tavolo> tavoli = new ArrayList<>();

		for (int i = 1; i <= 10; i++) {
			Tavolo tavolo = new Tavolo(i);
			int numPersone = determinaNumeroPersoneTavolo(i, faker);

			for (int j = 0; j < numPersone; j++) {
				Cliente cliente = creaCliente(faker);
				aggiungiClienteAlTavolo(cliente, tavolo);
				gestisciSconti(cliente);
				istanziaPizzaOrdinata(cliente, faker);
			}

			tavoli.add(tavolo);
		}

		return tavoli;
	}

	// Metodo per determinare il numero di persone in base al numero del tavolo
	// (vale solo per il faker)
	private static int determinaNumeroPersoneTavolo(int numeroTavolo, Faker faker) {
		if (numeroTavolo == 1) {
			return 16;
		} else if (numeroTavolo == 2) {
			return 23;
		} else if (numeroTavolo == 3) {
			return 30;
		} else {
			return faker.number().numberBetween(1, 8);
		}
	}

	// Metodo per istanziare una pizza ordinata per il cliente (vale solo per il
	// faker)
	private static void istanziaPizzaOrdinata(Cliente cliente, Faker faker) {
		String nomePizza = faker.food().dish();
		double prezzoPizza = faker.number().randomDouble(2, (int) 7.0, (int) 14.0); // Prezzo tra 7 e 14 euro

		Pizza pizza = new Pizza(nomePizza, prezzoPizza);
		cliente.aggiungiPizza(pizza);
	}

	// Metodo per creare un cliente con dati casuali (vale solo per il faker)
	private static Cliente creaCliente(Faker faker) {
		boolean hasFidelityCard = faker.random().nextBoolean();
		boolean isDisabled = faker.random().nextBoolean();
		boolean isChild = faker.number().numberBetween(0, 100) < 20; // 20% di probabilità di essere un bambino

		return new Cliente(faker.name().firstName(), faker.number().numberBetween(18, 80), hasFidelityCard, isDisabled,
				isChild);
	}

	// Metodo per aggiungere un cliente a un tavolo (vale solo per il faker)
	private static void aggiungiClienteAlTavolo(Cliente cliente, Tavolo tavolo) {
		tavolo.aggiungiCliente(cliente);
	}


	// METODI DA UTILIZZARE NEL CASO IN CUI SI VOGLIA UTILIZZARE LO SCANNER PER
	// SETTARE TUTTO MANUALMENTE

	private static List<Tavolo> creaTavoli(Scanner scanner) {
	    List<Tavolo> tavoli = new ArrayList<>();
		int numeroTavolo = 1;

	    System.out.println("Inserisci i dettagli dei tavoli:");

		boolean continuaInserimento = true;

		while (continuaInserimento) {
			System.out.println("Tavolo " + numeroTavolo + ":");
			System.out.print("Numero di persone (oppure inserisci 0 per terminare): ");
	        int numPersone = scanner.nextInt();

			if (numPersone == 0) {
				break;
			}

			Tavolo tavolo = new Tavolo(numeroTavolo);

	        for (int j = 0; j < numPersone; j++) {
	            System.out.println("Dettagli persona " + (j + 1) + ":");
				System.out.print("Nome: ");
				String nome = scanner.next();

				int eta;
				do {
					System.out.print("Età: ");
					while (!scanner.hasNextInt()) {
						System.out.println("Inserisci un'età valida.");
						scanner.next();
					}
					eta = scanner.nextInt();
					scanner.nextLine();
				} while (eta <= 0 || eta > 120);

				boolean hasFidelityCard;
				boolean isDisabled;
				boolean isChild;

				// Gestisci l'input per la fidelity card
				while (true) {
					System.out.print("Ha una fidelity card? (true/false): ");
					String input = scanner.next().toLowerCase();
					if (input.equals("true") || input.equals("false")) {
						hasFidelityCard = Boolean.parseBoolean(input);
						break;
					} else {
						System.out.println("Input non valido. Inserisci true o false.");
					}
				}

				// Gestisci l'input per la disabilità
				while (true) {
					System.out.print("È disabile? (true/false): ");
					String input = scanner.next().toLowerCase();
					if (input.equals("true") || input.equals("false")) {
						isDisabled = Boolean.parseBoolean(input);
						break;
					} else {
						System.out.println("Input non valido. Inserisci true o false.");
					}
				}

				// Gestisci l'input per l'età
				while (true) {
					System.out.print("È un bambino? (true/false): ");
					String input = scanner.next().toLowerCase();
					if (input.equals("true") || input.equals("false")) {
						isChild = Boolean.parseBoolean(input);
						break;
					} else {
						System.out.println("Input non valido. Inserisci true o false.");
					}
				}

	            Cliente cliente = new Cliente(nome, eta, hasFidelityCard, isDisabled, isChild);
	            tavolo.aggiungiCliente(cliente);
				gestisciSconti(cliente);

				String nomePizza = scegliPizzaMenu(scanner);
				double prezzoPizza = PizzaMenu.getMenu().get(nomePizza);
				Pizza pizza = new Pizza(nomePizza, prezzoPizza);
				cliente.aggiungiPizza(pizza);
	        }

	        tavoli.add(tavolo);

			System.out.print("Vuoi inserire un altro tavolo? (true/false): ");
			continuaInserimento = scanner.nextBoolean();
			numeroTavolo++;
	    }

	    return tavoli;
	}


		private static String scegliPizzaMenu(Scanner scanner) {
			System.out.println("Scegli una pizza dal menu:");

			// Mostra il menu delle pizze disponibili
			Map<String, Double> menu = PizzaMenu.getMenu();
			int index = 1;

			for (String pizza : menu.keySet()) {
				System.out.println(index + ". " + pizza + " - €" + menu.get(pizza));
				index++;
			}

			int scelta;
			do {
				System.out.print("Inserisci il numero corrispondente alla pizza desiderata: ");
				while (!scanner.hasNextInt()) {
					System.out.println("Inserisci un numero valido.");
					scanner.next();
				}
				scelta = scanner.nextInt();
			} while (scelta < 1 || scelta > menu.size());
			String nomePizza = (String) menu.keySet().toArray()[scelta - 1];

			return nomePizza;
		}


		// Metodo per gestire le scontistiche applicate al cliente
		private static void gestisciSconti(Cliente cliente) {
			List<ScontoStrategy> scontiApplicati = new ArrayList<>();

			// Aggiungi le strategie di sconto in base alle condizioni del cliente
			scontiApplicati.add(new ScontoFidelity());
			scontiApplicati.add(new ScontoDisabilita());
			scontiApplicati.add(new ScontoBambini());
			scontiApplicati.add(new ScontoPerGruppi());
			scontiApplicati.add(new ScontoPerOrario());

			cliente.setScontiApplicati(scontiApplicati);
		}

		// Metodo per stampare le informazioni dei tavoli
		private static void stampaInformazioniTavoli(List<Tavolo> tavoli) {
			DecimalFormat df = new DecimalFormat("#.##"); // Formattatore per arrotondare a due decimali

			for (Tavolo tavolo : tavoli) {
				System.out.println("Numero del tavolo: " + tavolo.getNumeroTavolo());
				System.out.println("Numero di persone nel tavolo: " + tavolo.getClienti().size());
				System.out.println("Quanti bambini nel tavolo: " + countChildren(tavolo.getClienti()));
				System.out.println("Persone diversamente abili nel tavolo: " + countDisabled(tavolo.getClienti()));
				System.out.println("Ha fidelity nel tavolo: " + hasFidelity(tavolo.getClienti()));

				System.out.println("Pizze ordinate:");
				for (Cliente cliente : tavolo.getClienti()) {
					List<Pizza> pizzeOrdinate = cliente.getPizze(); // Ottieni la lista delle pizze ordinate

					for (Pizza pizza : pizzeOrdinate) { // Itera su ciascuna pizza ordinata
						double prezzoScontato = cliente.getPrezzoScontato(pizza);
						double scontoPercentuale = calculateDiscountPercentage(pizza.getPrezzo(), prezzoScontato);

						// Arrotonda la percentuale di sconto a due decimali
						String scontoPercentualeFormatted = df.format(scontoPercentuale);

						System.out.println("Pizza: " + pizza.getNome() + ", Prezzo: €" + pizza.getPrezzo()
								+ ", Sconto applicato (%): " + scontoPercentualeFormatted + " , Prezzo finale pizza: €"
								+ df.format(prezzoScontato));
					}
				}

				double costoTotalePizze = tavolo.calcolaCostoTotalePizze();
				System.out.println("Costo totale delle pizze ordinate: €" + df.format(costoTotalePizze));
				System.out.println("Grazie di essere stati con noi, tornate a trovarci");

				System.out.println();
			}
		}

		// Metodo per contare il numero di bambini nel tavolo
		private static long countChildren(List<Cliente> clienti) {
			return clienti.stream().filter(Cliente::isChild).count();
		}

		// Metodo per contare il numero di persone diversamente abili nel tavolo
		private static long countDisabled(List<Cliente> clienti) {
			return clienti.stream().filter(Cliente::isDisabled).count();
		}

		// Metodo per verificare se almeno un cliente nel tavolo ha una fidelity card
		private static boolean hasFidelity(List<Cliente> clienti) {
			return clienti.stream().anyMatch(Cliente::isHasFidelityCard);
		}

		// Metodo per calcolare la percentuale di sconto applicata
		private static double calculateDiscountPercentage(double prezzoBase, double prezzoScontato) {
			return ((prezzoBase - prezzoScontato) / prezzoBase) * 100.0;
		}

}
