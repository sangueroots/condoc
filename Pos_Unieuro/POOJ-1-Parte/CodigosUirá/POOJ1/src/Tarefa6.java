
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

public class Tarefa6 {

	public int integerPower(int base, int expoente) {

		int result = 1;

			for (int i = 0; i < expoente; i++) {

				result *= base;

			}			
		
		
		return result;
	}

}
