/*
 * 1) Crie uma classe chamada Retângulo que representa a forma geométrica.
 *    Essa classe deve ter os atributos altura e largura, 
 *    ambos com o valor padrão igual a 1.
 *    A classe deve ter também métodos para calcular o perímetro e a área do retângulo.
 *    Escreva também métodos get e set para ambos os atributos.
 *    Os métodos set devem verificar os valores (ponto flutuante) maiores que zero e menores ou iguais a 20.
 *    Escreva um programa para testar sua classe Retângulo.
 * */

public  class TrianguloEsoceles extends Poligonos{

	
	
	public TrianguloEsoceles(int numeroLados, double base, double altura) {
		super(numeroLados, base, altura);
		// TODO Auto-generated constructor stub
	}

	
	public double calculaPerimetro(double base, double altura) {

		double perimetro;

		base = super.getBase();
		altura = super.getAltura();

		perimetro = 2 * (base + altura);

		return perimetro;

	}

	
	public double calculaArea( double base, double altura) {
		
		double area;
		
		base = super.getBase();
		altura = super.getAltura();
		area = base * altura;

		return area;
	}


	

}
