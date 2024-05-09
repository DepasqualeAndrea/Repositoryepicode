package com.example.Test.azienda.Pizza;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pizza {
	private String nome;
	private double prezzo;
	private double scontoApplicato;

	public Pizza(String nome, double prezzo, double scontoApplicato) {
		this.nome = nome;
		this.prezzo = prezzo;
		this.scontoApplicato = scontoApplicato;
	}

	public double getPrezzoScontato() {
		return prezzo - scontoApplicato;
	}

	@Override
	public String toString() {
		return "Pizza{" + "nome='" + nome + '\'' + ", prezzo=" + prezzo + ", scontoApplicato=" + scontoApplicato + '}';
	}
}
