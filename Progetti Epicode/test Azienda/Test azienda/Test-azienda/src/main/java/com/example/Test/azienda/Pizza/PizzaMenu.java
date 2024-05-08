package com.example.Test.azienda.Pizza;

import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PizzaMenu {
	private static final Map<String, Double> menu = new HashMap<>();

	static {
		menu.put("Luffy", 11.00);
		menu.put("Zoro", 9.00);
		menu.put("Nami", 12.00);
		menu.put("Usopp", 8.00);
		menu.put("Sanji", 9.50);
		menu.put("Chopper", 7.00);
		menu.put("Robin", 8.50);
		menu.put("Franky", 10.00);
		menu.put("Brook", 8.50);
		menu.put("Jinbe", 15.00);
	}

	// Metodo per ottenere il menu delle pizze
	public static Map<String, Double> getMenu() {
		return menu;
	}
}
