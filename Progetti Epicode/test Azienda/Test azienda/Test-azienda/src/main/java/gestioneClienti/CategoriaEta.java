package gestioneClienti;

public enum CategoriaEta {
	BABY(0, 3, 0.50), // 50% di sconto per bambini sotto i 4 anni
	KID(4, 12, 0.20), // 20% di sconto per bambini tra 4 e 12 anni
	ADULTO(13, 59, 0.0), // Nessuno sconto per adulti tra 13 e 59 anni
	ANZIANO(60, Integer.MAX_VALUE, 0.70), // 70% di sconto per anziani di 60 anni e oltre
	DIVERSAMENTE_ABILE(100, Integer.MAX_VALUE, 0.90); // 90% di sconto per diversamente abili

	private final int etaMinima;
	private final int etaMassima;
	private final double sconto;

	CategoriaEta(int etaMinima, int etaMassima, double sconto) {
		this.etaMinima = etaMinima;
		this.etaMassima = etaMassima;
		this.sconto = sconto;
	}

	public boolean includeEtà(int età) {
		return età >= etaMinima && età < etaMassima;
	}

	public double getSconto() {
		return sconto;
	}
}
