/*
 * 1) Crie uma classe chamada Ret�ngulo que representa a forma geom�trica.
 *    Essa classe deve ter os atributos altura e largura, 
 *    ambos com o valor padr�o igual a 1.
 *    A classe deve ter tamb�m m�todos para calcular o per�metro e a �rea do ret�ngulo.
 *    Escreva tamb�m m�todos get e set para ambos os atributos.
 *    Os m�todos set devem verificar os valores (ponto flutuante) maiores que zero e menores ou iguais a 20.
 *    Escreva um programa para testar sua classe Ret�ngulo.
 * */

import java.util.Scanner;

public class Retangulo {

	double altura = 1;
	double largura = 1;

	public double getAltura() {
		return altura;
	}

	public void setAltura(double altura) {

		if (altura >= 0 && altura <= 20) {
			this.altura = altura;
		} else {
			System.out.println("Verifique se valor est� entre 0 e 20.");
		}
	}

	public double getLargura() {
		return largura;
	}

	public void setLargura(double largura) {

		if (largura >= 0 && largura <= 20) {
			this.largura = largura;
		} else {
			System.out.println("Verifique se valor est� entre 0 e 20.");
		}
	}

	public Retangulo() {
		// TODO Auto-generated constructor stub

	}

	public double calculaPerimetro(double base, double altura) {

		double perimetro;

		base = largura;
		altura = this.altura;

		perimetro = 2 * (base + altura);

		return perimetro;

	}

	public double calculaArea(double base, double altura) {

		double area;
		base = largura;

		altura = this.altura;

		area = base * altura;

		return area;

	}
	

}
