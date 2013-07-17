
/******************************************************************************
 * 1) Modifique o programa da tarefa 1 para que as possiveis excecoes sejam   *
 * capturadas e tratadas, evitando a interrupcao na execucao da calculadora.  *
 *                                                                            * 
 * @author (Murilo Silva Andrade Souza)                                       *
 * @version (0, 10-07-2013)                                                   *
 ******************************************************************************/

import javax.swing.JOptionPane;

public class Calculadora2 {
    public static void main(String args []){
        int i = 1;
        while (i != 0) {
        String firstNumber = 
            JOptionPane.showInputDialog("Digite o primeiro numero:");
        String Operator = 
            JOptionPane.showInputDialog("1=Somar,2=Subtrair,3=Dividir, 4=Multiplicar:");
        String secondNumber = 
                JOptionPane.showInputDialog("Digite o segundo numero:");
        
        
        float num1 = Integer.parseInt(firstNumber);
        int operador = Integer.parseInt(Operator);
        float num2 = Integer.parseInt(secondNumber);
                       
        switch (operador){
        case 1:
        float sum = num1 + num2; 
         JOptionPane.showMessageDialog(null, "A soma dos valores : " + sum,
                "Soma de dois numeros", JOptionPane.PLAIN_MESSAGE);
        break;
        case 2:
        float sub = num1 - num2; 
         JOptionPane.showMessageDialog(null, "A subtracao dos valores e: " + sub,
                "Subtracao de dois numeros", JOptionPane.PLAIN_MESSAGE);
        break;
        case 3:
        float div = num1 / num2; 
         JOptionPane.showMessageDialog(null, "A divisao dos valores e: " + div,
                "Divisao de dois numeros", JOptionPane.PLAIN_MESSAGE);
        break;
        case 4:
        float mut = num1 * num2; 
         JOptionPane.showMessageDialog(null, "A multiplicacao dos valores e: " + mut,
                "Multiplicacao de dois numeros", JOptionPane.PLAIN_MESSAGE); 
        break;
        
        default:
        JOptionPane.showMessageDialog(null, "Digite 1 para somar, 2 para subtrair, 3 para dividir e/ou 4 para multiplicar"); 
           
    }
   i++;
}
}

}