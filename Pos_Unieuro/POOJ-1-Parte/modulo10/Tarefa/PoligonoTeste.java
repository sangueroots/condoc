/* @author Murilo Andrade 
 * 
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
		
		
		System.out.printf("Area do quadrado: %s\nPerimetro do quadrado �: %s\n",quadrado.calculaArea(),quadrado.calculaPerimetro());
		System.out.printf("Area do triangulo equilatero: %s\nPerimetro do triangulo equilatero�: %s\n",trieq.calculaArea(),trieq.calculaPerimetro());
		System.out.printf("Area do triangulo escaleno: %s\nPerimetro do triangulo escaleno �: %s\n",trieq.calculaArea(),trieq.calculaPerimetro());
		System.out.printf("Area do circulos: %.2f\n",circ.calculaArea());
	}

}
