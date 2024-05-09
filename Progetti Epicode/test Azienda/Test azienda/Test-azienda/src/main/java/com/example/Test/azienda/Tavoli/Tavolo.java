package com.example.Test.azienda.Tavoli;

import java.util.List;

import com.example.Test.azienda.ClienteCustom.Cliente;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Tavolo {
	private String nome;
	private List<Cliente> clienti;

	public Tavolo(String nome, List<Cliente> clienti) {
		this.nome = nome;
		this.clienti = clienti;
	}

	public int getNumeroPersone() {
		return clienti.size();
	}

}
