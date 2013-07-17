

/******************************************************************************
 * 1) Modifique o programa da tarefa 1 para que as possiveis excecoes sejam   *
 * capturadas e tratadas, evitando a interrupcao na execucaoo da calculadora  *
 *                                                                            * 
 * @author (Murilo Silva Andrade Souza)                                       *
 * @version (0, 10-07-2013)                                                   *
 ******************************************************************************/

import java.util.InputMismatchException;
import javax.swing.JOptionPane;


public class Calc_Exception {
	// demonstra lan�amento de uma exece��o quando ocorre uma divis�o por zero
	public static int quotient(int numerator, int denominator)
			throws ArithmeticException {
		return numerator / denominator; // poss�vel divis�o por zero
	} // fim do m�todo quotient

	public static void main(String args[]) {
		
		boolean continueLoop = true; // determina se mais entradas s�o
										// necess�rias

		do {
			try // l� dois n�meros e calcula o quociente
			{
				 String firstNumber = 
				            JOptionPane.showInputDialog("Por favor digite um n�mero inteiro para o numerador: ");
				
				 String secondNumber = 
				            JOptionPane.showInputDialog("Por favor digite um n�mero inteiro para o denominador: ");
				
				int numerator = Integer.parseInt(firstNumber);
		        int denominator = Integer.parseInt(secondNumber);
		        int result = quotient(numerator, denominator);
						        
		        JOptionPane.showMessageDialog(null, "Resultado: " +result);
				
				continueLoop = false; // entrada bem-sucedida; fim de loop
			} // fim de try
			catch (InputMismatchException inputMismatchException) {
				JOptionPane.showMessageDialog(null, "ERRO");
				
				JOptionPane.showMessageDialog(null, "Entre com n�meros inteiros. Por favor tente novamente.");
			} // fim de catch
			catch (ArithmeticException arithmeticException) {
				JOptionPane.showMessageDialog(null, "ERRO");
				JOptionPane.showMessageDialog(null, "Zero � um denominador inv�lido. Por favor tente novamente.");
			} // fim de catch
		} while (continueLoop); // fim de do...while
	} // fim de main
} // fim da classe DivideByZeroWithException