package com.example.Test.azienda.Discounts;

import java.util.List;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Interfaces.ScontoStrategy;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScontoBambini implements ScontoStrategy {
	@Override
	public double applicaSconto(Cliente cliente) {
		double sconto = 0;
		int age = cliente.getAge();

		if (age < 4) {
			sconto = 0.50;
		} else if (age < 12) {
			if (!isGroupDiscountApplied(cliente)) {
				sconto = 0.20;
			}
		}

		return sconto;
	}

	private boolean isGroupDiscountApplied(Cliente cliente) {
		// Supponiamo di avere una lista di sconti applicati al cliente
		List<ScontoStrategy> scontiApplicati = cliente.getScontiApplicati();

		// Cerchiamo nella lista degli sconti applicati se c'è uno sconto di gruppo
		for (ScontoStrategy sconto : scontiApplicati) {
			if (sconto instanceof ScontoPerGruppi) {
				return true; // se sconto di gruppo è stato applicato
			}
		}

		return false; // se sconto di gruppo non è stato applicato
	}

}
