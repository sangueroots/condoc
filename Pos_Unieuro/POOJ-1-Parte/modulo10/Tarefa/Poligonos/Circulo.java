package Poligonos;
/**
 * @description Calcula a area e o perimetro do circulo
 * @author Murilo Andrade
 */

import java.lang.Math;
public class Circulo {

	private double raio;

	public Circulo(double raio) {
		super();
		this.raio = raio;
	}

	public double getRaio() {
		return raio;
	}

	public void setRaio(double raio) {
		this.raio = raio;
	}

	public double calculaArea() {

		double area = 2 * Math.PI * Math.pow(raio, 2.0);

		return area;
	}

}