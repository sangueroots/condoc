import java.util.Scanner;


/**************************************************************************
 * @autor Uirá Peixoto                                                     *
 * Tarefa 6 - Escreva um método chamado integerPower(base, expoente) que   * 
 * retorna o valor baseexpoente . Por exemplo, integerPower(3, 4) calcula  *
 * 34, ou seja, 3*3*3*3. Assuma que expoente é um número inteiro maior     *
 * que zero e a base é um número inteiro. O método deve utilizar a         *
 * instrução de repetição for ou while para repetir as multiplicações.     *
 * Não use bibliotecas matemáticas. Incorpore esse método em um aplicativo *
 * que lê dois valores inteiros, calcule a potenciação e imprima o         *
 * resultado.                                                              *
 *                                                                         *
 * @version 1.00 2013/06/01                                                *
 *************************************************************************/
import java.util.Scanner;

public class Tarefa6 {

	public String integerPower(int base, int expoente) {

		int result = 1;
		String msg = "";
		
		if (expoente >= 0) {
			for (int i = 0; i < expoente; i++) {

				result *= base;

			}
			
			msg = ""+result;
		} else {
			
			msg = "Valor inválido. Informe um valor maior que 0 (Zero)";
		}
		
		
		
		return msg;
	}
	
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
