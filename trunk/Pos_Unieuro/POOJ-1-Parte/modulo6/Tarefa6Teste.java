

import java.util.Scanner;
public class Tarefa6Teste {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Scanner s = new Scanner(System.in);
		Tarefa6 t = new Tarefa6();
		
		
		System.out.println("Digite o valor da base: ");
		int base = s.nextInt();
		
		System.out.println("Digite o valor do expoente: ");
		int expoente = s.nextInt();
		
		System.out.println("O resultado é:" + t.integerPower(base, expoente));
		
		
	}

}
