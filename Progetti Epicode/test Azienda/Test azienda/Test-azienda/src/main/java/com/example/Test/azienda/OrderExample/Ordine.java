package com.example.Test.azienda.OrderExample;

import java.util.HashMap;
import java.util.Map;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Pizza.Pizza;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Ordine {
	private Map<Cliente, Pizza> mappaOrdini;

	public Ordine() {
		this.mappaOrdini = new HashMap<>();
	}

	public void aggiungiPizza(Cliente cliente, Pizza pizza) {
		mappaOrdini.put(cliente, pizza);
	}

	public Pizza getPizzaOrdinata(Cliente cliente) {
		return mappaOrdini.get(cliente);
	}

	public double getTotaleOrdineScontato() {
		double totaleScontato = 0.0;
		for (Pizza pizza : mappaOrdini.values()) {
			totaleScontato += (pizza.getPrezzo() - pizza.getScontoApplicato());
		}
		return totaleScontato;
	}
}
