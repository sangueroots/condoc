/* @author Murilo Andrade 
 * 
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
import Poligonos.*;

public class PoligonoTeste {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		Quadrado quadrado = new Quadrado(10);
		TrianguloEquilatero trieq = new TrianguloEquilatero(20, 10);
		TrianguloEscaleno tries = new TrianguloEscaleno(50, 30, 20);
		Circulo circ = new Circulo(10);
		
		
		System.out.printf("Area do quadrado: %s\nPerimetro do quadrado é: %s\n",quadrado.calculaArea(),quadrado.calculaPerimetro());
		System.out.printf("Area do triangulo equilatero: %s\nPerimetro do triangulo equilateroé: %s\n",trieq.calculaArea(),trieq.calculaPerimetro());
		System.out.printf("Area do triangulo escaleno: %s\nPerimetro do triangulo escaleno é: %s\n",trieq.calculaArea(),trieq.calculaPerimetro());
		System.out.printf("Area do circulos: %.2f\n",circ.calculaArea());
	}

}
