package gestinePizze;

import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PizzaMenu {
	private static final Map<String, Double> menu = new HashMap<>();

	static {
		menu.put("Quattro Stagioni", 11.00);
		menu.put("Pepe Nero", 9.00);
		menu.put("Capricciosa", 12.00);
		menu.put("Diavola", 8.00);
		menu.put("Chilly ", 9.50);
		menu.put("Margherita", 7.00);
		menu.put("Bufalina", 8.50);
		menu.put("Prosciutto & funghi", 10.00);
		menu.put("Rucola & grana", 8.50);
		menu.put("Norcina", 15.00);
	}


	public static Map<String, Double> getMenu() {
		return menu;
	}
}
