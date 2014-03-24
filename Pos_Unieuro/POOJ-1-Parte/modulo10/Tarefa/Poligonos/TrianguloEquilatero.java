package Poligonos;
/*
 * 1) Crie uma classe chamada Ret�ngulo que representa a forma geom�trica.
 *    Essa classe deve ter os atributos altura e largura, 
 *    ambos com o valor padr�o igual a 1.
 *    A classe deve ter tamb�m m�todos para calcular o per�metro e a �rea do ret�ngulo.
 *    Escreva tamb�m m�todos get e set para ambos os atributos.
 *    Os m�todos set devem verificar os valores (ponto flutuante) maiores que zero e menores ou iguais a 20.
 *    Escreva um programa para testar sua classe Ret�ngulo.
 * */

public  class TrianguloEquilatero{

	double base;
	double altura;
	
	
	public double getBase() {
		return base;
	}


	public void setBase(double base) {
		this.base = base;
	}


	public double getAltura() {
		return altura;
	}


	public void setAltura(double altura) {
		this.altura = altura;
	}


	public TrianguloEquilatero(double base, double altura) {
		super();
		this.base = base;
		this.altura = altura;
	}


	public double calculaPerimetro() {

		double perimetro;

		perimetro = 3 * this.base;

		return perimetro;

	}

	
	public double calculaArea() {
		
		double area;
		
		area = (this.base * this.altura)/2;

		return area;
	}
	



	

}
