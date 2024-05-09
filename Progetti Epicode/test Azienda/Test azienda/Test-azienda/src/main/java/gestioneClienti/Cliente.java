package gestioneClienti;

import gestinePizze.Pizza;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Cliente {
	private CategoriaEta categoriaEta;
	private boolean haFidelityCard;
	private boolean diversamenteAbile;
	private Pizza pizzaScelta;

	public Cliente(CategoriaEta categoriaEta, boolean haFidelityCard, boolean diversamenteAbile, Pizza pizzaScelta) {
		this.categoriaEta = categoriaEta;
		this.haFidelityCard = haFidelityCard;
		this.diversamenteAbile = diversamenteAbile;
		this.pizzaScelta = pizzaScelta; // Imposta la pizza scelta dal cliente
	}

	public int getEtaCliente() {
		switch (categoriaEta) {
		case BABY:
			return 2; // Esempio: età compresa tra 0 e 3 anni per la categoria BABY
		case KID:
			return 8; // Esempio: età compresa tra 4 e 12 anni per la categoria KID
		case ADULTO:
			return 30; // Esempio: età compresa tra 13 e 59 anni per la categoria ADULTO
		case ANZIANO:
			return 70; // Esempio: età di 70 anni e oltre per la categoria ANZIANO
		case DIVERSAMENTE_ABILE:
			return 100; // Esempio: età di una persona diversamente abile
		default:
			return 0; // Valore di default per età non specificata
		}
	}

	public String getTipoCliente() {
		switch (categoriaEta) {
		case BABY:
			return "Baby";
		case KID:
			return "Kid";
		case ADULTO:
			return "Adulto";
		case ANZIANO:
			return "Anziano";
		case DIVERSAMENTE_ABILE:
			return "Diversamente Abile";
		default:
			return "Non specificato";
		}
	}

}