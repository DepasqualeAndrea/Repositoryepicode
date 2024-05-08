package com.example.Test.azienda.OrderExample;

import java.util.ArrayList;
import java.util.List;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Pizza.Pizza;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Ordine {
	private List<Cliente> clienti;
	private List<Pizza> pizze;

	public Ordine() {
        this.clienti = new ArrayList<>();
		this.pizze = new ArrayList<>();
    }

	public void addCliente(Cliente cliente) {
		this.clienti.add(cliente);
	}

	public void aggiungiPizza(Pizza pizza) {
		this.pizze.add(pizza);
	}
}
