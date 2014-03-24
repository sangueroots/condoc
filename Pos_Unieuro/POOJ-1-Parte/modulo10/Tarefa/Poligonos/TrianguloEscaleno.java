	

package Poligonos;
/*
 *  Crie uma classe chamada Ret�ngulo que representa a forma geom�trica.
 *    Essa classe deve ter os atributos altura e largura, 
 *    ambos com o valor padr�o igual a 1.
 *    A classe deve ter tamb�m m�todos para calcular o per�metro e a �rea do ret�ngulo.
 *    Escreva tamb�m m�todos get e set para ambos os atributos.
 *    Os m�todos set devem verificar os valores (ponto flutuante) maiores que zero e menores ou iguais a 20.
 *    Escreva um programa para testar sua classe Ret�ngulo.
 * */

public  class TrianguloEscaleno{

	
	double ladoA;
	double ladoB;
	double ladoC;
	

	public TrianguloEscaleno(double ladoA, double ladoB, double ladoC) {
		super();
		this.ladoA = ladoA;
		this.ladoB = ladoB;
		this.ladoC = ladoC;
	}

	
	
	public double getLadoA() {
		return ladoA;
	}



	public void setLadoA(double ladoA) {
		this.ladoA = ladoA;
	}



	public double getLadoB() {
		return ladoB;
	}



	public void setLadoB(double ladoB) {
		this.ladoB = ladoB;
	}



	public double getLadoC() {
		return ladoC;
	}




	public void setLadoC(double ladoC) {
		this.ladoC = ladoC;
	}



	public double calculaPerimetro() {
		
		double perimetro;	
		
		
		perimetro = this.ladoA + this.ladoB + this.ladoC;

		return perimetro;

	}

	/*
	 * 	Use Formula de Heron para calcular a Area:
		Area = raiz( p x (p - a) x (p - b) x (p - c))
		(a), (b), (c) s�o os lados desse triangulo.
		p = (a + b + c) / 2
	 * */
	public double calculaArea() {
		
		double area;
		double p;
		p = this.calculaPerimetro();
		
		area = Math.sqrt(p * (p - this.ladoA) * (p - this.ladoB) * (p - this.ladoC));

		return area;
	}

	

}
