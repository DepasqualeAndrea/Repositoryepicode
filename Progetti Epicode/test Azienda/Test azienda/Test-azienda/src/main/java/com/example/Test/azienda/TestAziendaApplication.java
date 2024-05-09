package com.example.Test.azienda;

import GestioneOrdini.GestioneOrdineService;

public class TestAziendaApplication {

	public static void main(String[] args) {
		GestioneOrdineService orderManager = new GestioneOrdineService();
		orderManager.gestisciOrdine();
	}

}
