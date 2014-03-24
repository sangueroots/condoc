/*
 * Utilizando a mesma estrutura da tarefa anterior, crie as classes 
 * Quadrado, 
 * Ret�ngulo, 
 * Trap�zio, 
 * TrianguloEquilatero, 
 * TrianguloEscaleno e 
 * Circulo, 
 * representando tais formas geom�tricas. 
 * Todas as classes devem ter m�todos para retornar a �rea e o per�metro da figura. 
 * No caso da classe Circulo, o m�todo de c�lculo do per�metro deve retornar o comprimento do c�rculo,
 * no entanto mantenha o mesmo nome das demais classes para esse m�todo. Para garantir maior reaproveitamento de c�digo,
 * e a possibilidade de inclus�o de outras classes no mesmo contexto, organize essas classes em uma hierarquia, utilizando 
 * classes abstratas e polimorfismo. Ao final, desenvolva um aplicativo para testar as classes dessa hierarquia.
 * 
 * */

public abstract class Poligonos {

	private int numeroLados;
	private double base;
	private double altura;
	
	public Poligonos(int numeroLados, double base, double altura) {
		super();
		this.numeroLados = numeroLados;
		this.base = base;
		this.altura = altura;
	}

	public int getNumeroLados() {
		return numeroLados;
	}

	public void setNumeroLados(int numeroLados) {
		this.numeroLados = numeroLados;
	}

	public double getBase() {
		return base;
	}

	public void setBase(double base) {
		
		if (base >= 0 && base <= 20) {
			this.base = base;
		} else {
			System.out.println("Verifique se valor est� entre 0 e 20.");
		}
		
	}

	public double getAltura() {
		return altura;
	}

	public void setAltura(double altura) {
		
		if (altura >= 0 && altura <= 20) {
			this.altura = altura;
		} else {
			System.out.println("Verifique se valor est� entre 0 e 20.");
		}
	}

	
	public abstract double calculaArea( double base, double altura);
	
	
}
