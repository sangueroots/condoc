package Poligonos;
/*
 * 1) Crie uma classe chamada Retângulo que representa a forma geométrica.
 *    Essa classe deve ter os atributos altura e largura, 
 *    ambos com o valor padrão igual a 1.
 *    A classe deve ter também métodos para calcular o perímetro e a área do retângulo.
 *    Escreva também métodos get e set para ambos os atributos.
 *    Os métodos set devem verificar os valores (ponto flutuante) maiores que zero e menores ou iguais a 20.
 *    Escreva um programa para testar sua classe Retângulo.
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
