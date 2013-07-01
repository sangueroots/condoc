//Programa de adição que utiliza JOptionPane para entrada e saída
import javax.swing.JOptionPane;
public class Adicao {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		//Obtem a entrade de usuário a aprtir dos diálogos de entrada JOptionPane
		String primeiroNumero = JOptionPane.showInputDialog("Entre com o primeiro número inteiro:");
		String segundoNumero = JOptionPane.showInputDialog("Entre com o segundo número inteiro:");
		
		//Converte a String para valores int para o cálculo.
		int numero1 = Integer.parseInt(primeiroNumero);
		int numero2 = Integer.parseInt(segundoNumero);
		
		int soma = numero1 + numero2;//adiciona os numeros
		
		//Exibe o resultado em um dialogo de mensagem JOptionPane
		JOptionPane.showMessageDialog(null, "A soma é " + soma, "Soma dos dois numeros", JOptionPane.PLAIN_MESSAGE);
		
	}//fim do metodo main

}//fim do classe adicao
