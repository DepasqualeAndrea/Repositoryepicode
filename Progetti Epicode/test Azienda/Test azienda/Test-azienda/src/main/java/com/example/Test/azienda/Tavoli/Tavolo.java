package com.example.Test.azienda.Tavoli;

import java.util.ArrayList;
import java.util.List;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Pizza.Pizza;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Tavolo {
	private int numeroTavolo;
	private List<Cliente> clienti;

	public Tavolo(int numeroTavolo) {
		this.numeroTavolo = numeroTavolo;
		this.clienti = new ArrayList<>();
	}

	public void aggiungiCliente(Cliente cliente) {
		this.clienti.add(cliente);
		cliente.setTavolo(this);
	}

	public List<Cliente> getClienti() {
		return this.clienti;
	}

	public double calcolaCostoTotalePizze() {
		double costoTotale = 0.0;

		for (Cliente cliente : this.clienti) {
			List<Pizza> pizzeOrdinate = cliente.getPizze();

			for (Pizza pizza : pizzeOrdinate) {
				double prezzoScontato = cliente.getPrezzoScontato(pizza);
				costoTotale += prezzoScontato;
			}
		}

		return costoTotale;
	}
}
