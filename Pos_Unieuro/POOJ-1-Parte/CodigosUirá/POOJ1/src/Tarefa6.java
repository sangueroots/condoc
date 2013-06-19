import java.util.Scanner;


/**************************************************************************
 * @autor Uir� Peixoto                                                     *
 * Tarefa 6 - Escreva um m�todo chamado integerPower(base, expoente) que   * 
 * retorna o valor baseexpoente . Por exemplo, integerPower(3, 4) calcula  *
 * 34, ou seja, 3*3*3*3. Assuma que expoente � um n�mero inteiro maior     *
 * que zero e a base � um n�mero inteiro. O m�todo deve utilizar a         *
 * instru��o de repeti��o for ou while para repetir as multiplica��es.     *
 * N�o use bibliotecas matem�ticas. Incorpore esse m�todo em um aplicativo *
 * que l� dois valores inteiros, calcule a potencia��o e imprima o         *
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
			
			msg = "Valor inv�lido. Informe um valor maior que 0 (Zero)";
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
		
		System.out.println("O resultado �:" + t.integerPower(base, expoente));
		
		
	}

}
