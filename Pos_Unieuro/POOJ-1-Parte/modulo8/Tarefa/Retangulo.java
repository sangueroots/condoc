/*
 * 1) Crie uma classe chamada Retângulo que representa a forma geométrica.
 *    Essa classe deve ter os atributos altura e largura, 
 *    ambos com o valor padrão igual a 1.
 *    A classe deve ter também métodos para calcular o perímetro e a área do retângulo.
 *    Escreva também métodos get e set para ambos os atributos.
 *    Os métodos set devem verificar os valores (ponto flutuante) maiores que zero e menores ou iguais a 20.
 *    Escreva um programa para testar sua classe Retângulo.
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
			System.out.println("Verifique se valor está entre 0 e 20.");
		}
	}

	public double getLargura() {
		return largura;
	}

	public void setLargura(double largura) {

		if (largura >= 0 && largura <= 20) {
			this.largura = largura;
		} else {
			System.out.println("Verifique se valor está entre 0 e 20.");
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
