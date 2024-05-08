package com.example.Test.azienda.Discounts;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Interfaces.ScontoStrategy;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScontoPerGruppi implements ScontoStrategy {
	private static final int MIN_PERSONE = 15;
	private static final int MAX_PERSONE_1 = 20;
	private static final int MAX_PERSONE_2 = 25;

	@Override
	public double applicaSconto(Cliente cliente) {
		int numeroPersone = cliente.getGroupSize();
		double sconto = 0.0;

		if (numeroPersone >= MIN_PERSONE && numeroPersone <= MAX_PERSONE_1) {
			sconto = 0.20;
		} else if (numeroPersone > MAX_PERSONE_1 && numeroPersone <= MAX_PERSONE_2) {
			sconto = 0.30;
		} else if (numeroPersone > MAX_PERSONE_2) {
			sconto = 0.50;
		}

		return sconto;
	}
}
