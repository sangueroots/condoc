package Poligonos;
/**
 * 1) Crie uma classe chamada Retângulo que representa a forma geométrica.
 *    Essa classe deve ter os atributos altura e largura, 
 *    ambos com o valor padrão igual a 1.
 *    A classe deve ter também métodos para calcular o perímetro e a área do retângulo.
 *    Escreva também métodos get e set para ambos os atributos.
 *    Os métodos set devem verificar os valores (ponto flutuante) maiores que zero e menores ou iguais a 20.
 *    Escreva um programa para testar sua classe Retângulo.
 * */

public  class Retangulo{

	private double Base;
	private double Altura;
	
	public double getBase() {
		return Base;
	}


	public void setBase(double base) {
		Base = base;
	}


	public double getAltura() {
		return Altura;
	}


	public void setAltura(double altura) {
		Altura = altura;
	}


	public Retangulo(double base, double altura) {
		// TODO Auto-generated constructor stub
	}

	
	public double calculaPerimetro(double base, double altura) {

		double perimetro;

		base = this.getBase();
		altura = this.getAltura();

		perimetro = 2 * (base + altura);

		return perimetro;

	}

	
	public double calculaArea( double base, double altura) {
		
		double area;
		
		base = this.getBase();
		altura = this.getAltura();
		area = base * altura;

		return area;
	}
	public Boolean validaRetangulo(){
		
	Boolean valida = false;
	
		if(this.getBase() < 0 && this.getBase() >= 20){
			System.out.println("Valor inválido para base!");
			valida = false;
		}else{
			valida = true;
		}
		
		if(this.getAltura() < 0 && this.getAltura() <= 20){
			System.out.println("Valor inválido para altura!");
			valida = false;
		}else{
			valida = true;
		}
		
		return valida;
	}
	
	public static void main(String[] args)
	{
		
		
		Retangulo ret = new Retangulo(10,10);
		
		ret.setBase(10);
		ret.setAltura(5);
		try {
			if(ret.validaRetangulo()){
				System.out.println("Area: " + ret.calculaArea(ret.getBase(), ret.getAltura()));
				System.out.println("Perimetro: " + ret.calculaPerimetro(ret.getBase(), ret.getAltura()));
				
			}
		} catch (Exception e) {
			// TODO: handle exception
			throw e;
		}
		

	}

}


