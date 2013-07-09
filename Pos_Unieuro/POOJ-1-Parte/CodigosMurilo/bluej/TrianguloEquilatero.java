 
//Murilo Silva Andrade Souza

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
