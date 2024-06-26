package serviceSconti;

import java.time.LocalDateTime;
import java.util.List;

import gestioneClienti.CategoriaEta;
import gestioneClienti.Cliente;
import gestioneClienti.Gruppo;

public class ScontoManager {

	public static double calcolaSconto(Cliente cliente, List<Cliente> clienti) {
		double scontoTotale = 0.0;

		// Verifico l'applicabilità degli sconti in base al cliente

		if (cliente.isHaFidelityCard()) {
			scontoTotale += 0.15;
		}
		if (isDiversamenteAbile(cliente)) {
			scontoTotale += 0.90;
		}
		if (isGruppoNumeroso(clienti.size())) {
			scontoTotale += calcolaScontoGruppo(clienti.size());
		}
		if (isScontoOrario(cliente)) {
			scontoTotale += 0.10;
		}
		if (isScontoAnziani(cliente)) {
			scontoTotale += 0.70;
		}
		if (isScontoBambino(cliente) && clienti.size() <= 15) {
			scontoTotale += calcolaScontoBambino(cliente);
		}

		// Assicura che lo sconto totale non superi il 100%
		if (scontoTotale > 1.0) {
			scontoTotale = 1.0;
		}

		return scontoTotale;
	}

	private static boolean isGruppoNumeroso(int numeroPersone) {
		return numeroPersone >= 15;
	}

	private static double calcolaScontoGruppo(int numeroPersone) {
		Gruppo gruppo = Gruppo.getGruppoByNumeroPersone(numeroPersone);
		return gruppo.getSconto();
	}

	private static boolean isScontoOrario(Cliente cliente) {
		LocalDateTime now = LocalDateTime.now();
		boolean isWeekend = now.getDayOfWeek().getValue() >= 6; // Sabato (6) e Domenica (7)
		boolean isBefore8PM = now.getHour() < 20;
		return isBefore8PM || isWeekend;
	}

	private static boolean isScontoAnziani(Cliente cliente) {
		return cliente.getCategoriaEta() == CategoriaEta.ANZIANO;
	}

	private static boolean isDiversamenteAbile(Cliente cliente) {
		return cliente.getCategoriaEta() == CategoriaEta.DIVERSAMENTE_ABILE;
	}

	private static boolean isScontoBambino(Cliente cliente) {
		CategoriaEta tipoCliente = cliente.getCategoriaEta();
		return tipoCliente == CategoriaEta.BABY || tipoCliente == CategoriaEta.KID;
	}

	private static double calcolaScontoBambino(Cliente cliente) {
		CategoriaEta categoriaCliente = cliente.getCategoriaEta();

		switch (categoriaCliente) {
		case BABY:
			return CategoriaEta.BABY.getSconto();
		case KID:
			return CategoriaEta.KID.getSconto();

		default:
			return 0.0;
		}
	}
}
