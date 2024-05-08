package com.example.Test.azienda.Discounts;


import java.time.LocalTime;

import com.example.Test.azienda.ClienteCustom.Cliente;
import com.example.Test.azienda.Interfaces.ScontoStrategy;

public class ScontoPerOrario implements ScontoStrategy {
	private static final double PERCENTUALE_SCONTO = 0.10;
	private static final LocalTime ORARIO_LIMITE = LocalTime.of(20, 0);

    @Override
	public double applicaSconto(Cliente cliente) {
        LocalTime currentTime = LocalTime.now();
		boolean isBeforeEightPm = currentTime.isBefore(ORARIO_LIMITE);
		return isBeforeEightPm ? PERCENTUALE_SCONTO : 0;
    }
}
