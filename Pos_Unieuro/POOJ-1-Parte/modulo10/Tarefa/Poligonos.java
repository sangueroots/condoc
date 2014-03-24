/*
 * Utilizando a mesma estrutura da tarefa anterior, crie as classes 
 * Quadrado, 
 * Retângulo, 
 * Trapézio, 
 * TrianguloEquilatero, 
 * TrianguloEscaleno e 
 * Circulo, 
 * representando tais formas geométricas. 
 * Todas as classes devem ter métodos para retornar a área e o perímetro da figura. 
 * No caso da classe Circulo, o método de cálculo do perímetro deve retornar o comprimento do círculo,
 * no entanto mantenha o mesmo nome das demais classes para esse método. Para garantir maior reaproveitamento de código,
 * e a possibilidade de inclusão de outras classes no mesmo contexto, organize essas classes em uma hierarquia, utilizando 
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
			System.out.println("Verifique se valor está entre 0 e 20.");
		}
		
	}

	public double getAltura() {
		return altura;
	}

	public void setAltura(double altura) {
		
		if (altura >= 0 && altura <= 20) {
			this.altura = altura;
		} else {
			System.out.println("Verifique se valor está entre 0 e 20.");
		}
	}

	
	public abstract double calculaArea( double base, double altura);
	
	
}
