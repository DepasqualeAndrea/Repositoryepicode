package com.example.Test.azienda.Pizza;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pizza {
	private String nome;
	private double prezzo;

	public Pizza(String nome, double prezzo) {
		this.nome = nome;
		this.prezzo = prezzo;
	}


}
