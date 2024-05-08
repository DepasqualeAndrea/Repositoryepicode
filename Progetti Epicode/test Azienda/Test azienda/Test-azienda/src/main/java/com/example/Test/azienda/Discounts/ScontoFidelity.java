package com.example.Test.azienda.Discounts;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Interfaces.ScontoStrategy;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScontoFidelity implements ScontoStrategy {
	private static final double PERCENTUALE_SCONTO = 0.15;

	@Override
	public double applicaSconto(Cliente cliente) {
		return cliente.isHasFidelityCard() ? PERCENTUALE_SCONTO : 0;
	}
}
