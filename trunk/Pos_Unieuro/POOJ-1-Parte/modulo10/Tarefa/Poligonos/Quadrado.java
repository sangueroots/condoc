package Poligonos;

public class Quadrado {

	private double lado;
	
	public Quadrado(double lado) {
		
		this.lado = lado;
	}

	public double getLado() {
		return lado;
	}

	public void setLado() {
		this.lado = lado;
	}
	
	public double calculaArea(){
		
		double area;
		
		return this.lado * this.lado;
	}
	
	public double calculaPerimetro(){
		double perimetro;
		
		return this.lado * 4;
	}

	
}
