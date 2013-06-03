/**************************************************************************
 * @autor Uirá Peixoto                                                     *
 * Tarefa 2- Desenvolva um aplicativo em Java que solicite dois números    *
 * inteiros ao usuário, obtenha-os pelo teclado e imprima na tela a soma,  *
 * a subtração, a multiplicação e a divisão deles                          *
 *                                                                         *
 * @version 1.00 2013/06/01                                                *
 *************************************************************************/

import java.util.Scanner;

public class Tarefa2 {

	public static void main(String[] args) {

		Scanner s = new Scanner(System.in);
		System.out.println("Informe um valor: ");
		int num1 = s.nextInt();
		System.out.println("Informe outro valor: ");
		int num2 = s.nextInt();

		int soma = num1 + num2;
		int divisao = num1 / num2;
		int subtracao = num1 - num2;
		int multiplicacao = num1 * num2;
		
		System.out.println("Resultado:\n");
		System.out.println("Soma: " + soma);
		System.out.println("Divisao: " + divisao);
		System.out.println("Subtracao: " + subtracao);
		System.out.println("Multiplicacao: " + multiplicacao);

	}

}
