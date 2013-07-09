 
//Murilo Silva Andrade Souza

public  class Retangulo extends Poligonos{

	
	
	public Retangulo(int numeroLados, double base, double altura) {
		super(numeroLados, base, altura);

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
