/**
 * @(#)murilo.java
 * Tarefa 2 - Programação da Disciplina Programação Orientada a Objetos com Java 
 *
 * @author 
 * @version 1.00 2013/5/20
 */


public class tarefa2 {

    public static void main (String[] args) {

	Scanner scan = new Scanner(System.in);
			System.out.println("Digite o primeiro número: ");
		float num1 = scan.nextFloat();
			System.out.println("Digite o segundo numero: ");
		float num2 = scan.nextFloat();
		
		float soma = num1+num2;
		float divisao = num1/num2;
		float subtracao = num1-num2;
		float multiplicacao = num1*num2;
		
			System.out.println("A soma dos valores e: "+soma);
			System.out.println("A divisao dos valores e: "+divisao);
			System.out.println("A subtracao dos valores e: "+subtracao);
			System.out.println("A multiplicacao dos valores e: "+multiplicacao);


		}
	
	}