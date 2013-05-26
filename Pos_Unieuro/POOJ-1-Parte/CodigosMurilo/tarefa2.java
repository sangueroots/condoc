
/**************************************************************************
 * @(#)murilo.java                                                        *
 * Tarefa 2 - Programação da Disciplina Programação Orientada a Objetos   *
 * com Java                                                               *
 *                                                                        *
 * @author                                                                *
 * @version 1.00 2013/5/20                                                *
 *************************************************************************/
import java.util.Scanner;

public class tarefa2 {

    public static void main (String[] args) {

	Scanner scan = new Scanner(System.in);
			System.out.println("Digite o primeiro número: ");
		int num1 = scan.nextInt();
			System.out.println("Digite o segundo numero: ");
		int num2 = scan.nextInt();
		
		int soma = num1+num2;
		int divisao = num1/num2;
		int subtracao = num1-num2;
		int multiplicacao = num1*num2;
		
			System.out.println("A soma dos valores e: "+soma);
			System.out.println("A divisao dos valores e: "+divisao);
			System.out.println("A subtracao dos valores e: "+subtracao);
			System.out.println("A multiplicacao dos valores e: "+multiplicacao);


		}
	
	}