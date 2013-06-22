package Poligonos;


public class Trapezio {

	private double baseMaior = 10;
	private double baseMenor = 6;
	private double ladoNaoParaleloC = 3;
	private double ladoNaoParaleloD = 5;

	private double efetuarCalculoAltura(double bMa, double bMe, double lnpc,
			double lnpd) {
		double x = -bMa + bMe + lnpc + lnpd;
		double y = bMa - bMe + lnpc + lnpd;
		double z = bMa - bMe - lnpc + lnpd;
		double w = bMa - bMe + lnpc - lnpd;
		double s = 2 * Math.abs(bMa - bMe);

		return Math.sqrt(x * y * z * w) / s;
	}

	private boolean validarLados(double bMa, double bMe, double lnpc,
			double lnpd) {
		double h = efetuarCalculoAltura(bMa, bMe, lnpc, lnpd);

		return (h * h) > 0;
	}

	public double calcularAltura() {
		return efetuarCalculoAltura(baseMaior, baseMenor, ladoNaoParaleloC,
				ladoNaoParaleloD);
	}

	public double calcularMediana() {
		return (baseMaior + baseMenor) / 2;
	}

	public double calcularArea() {
		return calcularMediana() * calcularAltura();
	}

	public double calcularPerimetro() {
		return baseMaior + baseMenor + ladoNaoParaleloC + ladoNaoParaleloD;
	}

	public void setBaseMaior(double bMa) {
		if (validarLados(bMa, baseMenor, ladoNaoParaleloC, ladoNaoParaleloD)) {
			baseMaior = bMa;
		}
	}

	public void setBaseMenor(double bMe) {
		if (validarLados(baseMaior, bMe, ladoNaoParaleloC, ladoNaoParaleloD)) {
			baseMenor = bMe;
		}
	}

	public void setLadoNaoParaleloC(double lnpc) {
		if (validarLados(baseMaior, baseMenor, lnpc, ladoNaoParaleloD)) {
			ladoNaoParaleloC = lnpc;
		}
	}

	public void setLadoNaoParaleloD(double lnpd) {
		if (validarLados(baseMaior, baseMenor, ladoNaoParaleloC, lnpd)) {
			ladoNaoParaleloD = lnpd;
		}
	}

	public double getBaseMaior() {
		return baseMaior;
	}

	public double getBaseMenor() {
		return baseMenor;
	}

	public double getLadoNaoParaleloC() {
		return ladoNaoParaleloC;
	}

	public double getLadoNaoParaleloD() {
		return ladoNaoParaleloD;
	}
}