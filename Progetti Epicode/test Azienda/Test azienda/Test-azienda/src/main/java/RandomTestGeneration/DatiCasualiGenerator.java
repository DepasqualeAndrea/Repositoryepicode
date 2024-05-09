package RandomTestGeneration;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.github.javafaker.Faker;

import gestinePizze.Pizza;
import gestinePizze.PizzaMenu;
import gestioneClienti.CategoriaEta;
import gestioneClienti.Cliente;
import gestioneTavoli.Tavolo;

public class DatiCasualiGenerator {
	private Faker faker;
	private static final Random random = new Random();

	public DatiCasualiGenerator() {
		this.faker = new Faker();
	}

	public List<Tavolo> generaTavoliCasuali() {
		List<Tavolo> tavoli = new ArrayList<>();

		// Genera tavoli con gruppi di persone di varie dimensioni
		tavoli.add(generaTavoloConGruppo(16));
		tavoli.add(generaTavoloConGruppo(23));
		tavoli.add(generaTavoloConGruppo(35));

		// Genera tavoli casuali con un numero casuale di persone (da 1 a 10 persone)
		for (int i = 0; i < 3; i++) {
			int numeroPersone = random.nextInt(10) + 1;
			tavoli.add(generaTavoloCasuale(numeroPersone));
		}

		return tavoli;
	}

	private Tavolo generaTavoloConGruppo(int numeroPersone) {
		String nomeTavolo = faker.lorem().word(); // Genera un nome casuale per il tavolo
		List<Cliente> clienti = generaClientiCasuali(numeroPersone);
		return new Tavolo(nomeTavolo, clienti);
	}

	public Tavolo generaTavoloCasuale(int numeroPersone) {
		String nomeTavolo = faker.lorem().word(); // Genera un nome casuale per il tavolo
		List<Cliente> clienti = generaClientiCasuali(numeroPersone);
		return new Tavolo(nomeTavolo, clienti);
	}

	private List<Cliente> generaClientiCasuali(int numeroClienti) {
		List<Cliente> clienti = new ArrayList<>();
		for (int i = 0; i < numeroClienti; i++) {
			CategoriaEta categoria = generaCategoriaCasuale();
			boolean haFidelity = faker.bool().bool(); // Genera un valore booleano casuale per la fidelity card
			Pizza pizzaScelta = generaPizzaCasuale();
			clienti.add(new Cliente(categoria, haFidelity, false, pizzaScelta));
		}
		return clienti;
	}

	private CategoriaEta generaCategoriaCasuale() {
		int categoriaIndex = faker.number().numberBetween(1, 6); // Genera un numero casuale tra 1 e 5
		switch (categoriaIndex) {
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
			return CategoriaEta.ADULTO; // Default a adulto se non corrisponde a nessuna categoria
		}
	}

	public Pizza generaPizzaCasuale() {
		Map<String, Double> menuPizze = PizzaMenu.getMenu();
		List<String> pizzaNames = new ArrayList<>(menuPizze.keySet());
		String randomPizzaName = pizzaNames.get(random.nextInt(pizzaNames.size()));
		double pizzaPrice = menuPizze.get(randomPizzaName);
		return new Pizza(randomPizzaName, pizzaPrice, 0.0);
	}
}
