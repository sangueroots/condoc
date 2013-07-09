	
//Murilo Silva Andrade Souza

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

	
	public double calculaArea() {
		
		double area;
		double p;
		p = this.calculaPerimetro();
		
		area = Math.sqrt(p * (p - this.ladoA) * (p - this.ladoB) * (p - this.ladoC));

		return area;
	}

	

}
