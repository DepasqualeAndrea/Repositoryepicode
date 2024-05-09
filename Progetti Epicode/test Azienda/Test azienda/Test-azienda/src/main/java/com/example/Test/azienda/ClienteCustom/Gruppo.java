package com.example.Test.azienda.ClienteCustom;

public enum Gruppo {
	GRUPPO_15_20(0.20), // Sconto del 20% per gruppo da 15 a 20 persone
	GRUPPO_21_25(0.30), // Sconto del 30% per gruppo da 21 a 25 persone
	GRUPPO_OVER_25(0.50); // Sconto del 50% per gruppo con più di 25 persone

	private final double sconto;

	Gruppo(double sconto) {
		this.sconto = sconto;
	}

	public double getSconto() {
		return sconto;
	}

	public static Gruppo getGruppoByNumeroPersone(int numeroPersone) {
		switch (numeroPersone) {
		case 15:
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
			return GRUPPO_15_20;
		case 21:
		case 22:
		case 23:
		case 24:
		case 25:
			return GRUPPO_21_25;
		default:
			return GRUPPO_OVER_25;
		}
	}
}
