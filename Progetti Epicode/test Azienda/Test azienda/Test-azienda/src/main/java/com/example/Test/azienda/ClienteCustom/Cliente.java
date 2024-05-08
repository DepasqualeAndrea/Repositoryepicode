package com.example.Test.azienda.ClienteCustom;

import java.util.ArrayList;
import java.util.List;

import com.example.Test.azienda.Interfaces.ScontoStrategy;
import com.example.Test.azienda.OrderExample.Ordine;
import com.example.Test.azienda.Pizza.Pizza;
import com.example.Test.azienda.Tavoli.Tavolo;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Cliente {
	private String nome;
	private int age;
	private boolean hasFidelityCard;
	private boolean isDisabled;
	private boolean isChild;
	private Tavolo tavolo;
	private Ordine ordine;
	private Pizza pizza;

	private List<ScontoStrategy> scontiApplicati;

	public Cliente(String nome, int age, boolean hasFidelityCard, boolean isDisabled, boolean isChild) {
		this.nome = nome;
		this.age = age;
		this.hasFidelityCard = hasFidelityCard;
		this.isDisabled = isDisabled;
		this.isChild = isChild;
		this.scontiApplicati = new ArrayList<>();
	}


	// Metodo per aggiungere una pizza all'ordine del cliente
	public void aggiungiPizza(Pizza pizza) {
		if (ordine != null) {
			ordine.aggiungiPizza(pizza);
		} else {
			ordine = new Ordine();
			ordine.addCliente(this);
			ordine.aggiungiPizza(pizza);
		}
	}


	public List<ScontoStrategy> getScontiApplicati() {
		return this.scontiApplicati;
	}

	public double getPrezzoScontato(Pizza pizza) {
		double prezzoScontato = pizza.getPrezzo();

		for (ScontoStrategy sconto : this.scontiApplicati) {
			prezzoScontato = prezzoScontato * (1 - sconto.applicaSconto(this));
		}

		if (prezzoScontato < 5.0) {
			prezzoScontato = 5.0;
		}

		return prezzoScontato;
	}


	public List<Pizza> getPizze() {
		if (ordine != null) {
			return ordine.getPizze();
		}
		return new ArrayList<>();
	}

	public int getGroupSize() {
		if (tavolo != null) {
			List<Cliente> clientiNelTavolo = tavolo.getClienti();
			return clientiNelTavolo.size();
		}
		return 0;
	}



}