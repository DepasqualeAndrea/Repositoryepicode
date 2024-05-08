package com.example.Test.azienda.Discounts;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Interfaces.ScontoStrategy;

public class ScontoDisabilita implements ScontoStrategy {
	private static final double PERCENTUALE_SCONTO = 0.90;

	@Override
	public double applicaSconto(Cliente cliente) {
		return cliente.isDisabled() ? PERCENTUALE_SCONTO : 0;
	}
}
