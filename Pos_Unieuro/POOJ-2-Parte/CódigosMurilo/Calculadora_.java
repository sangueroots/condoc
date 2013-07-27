/******************************************************************************
 * 1) Desenvolva um aplicativo em Java que implemente uma calculadora simples,*
 * onde o usuário insere por meio de uma interface gráfica dois valores reais *
 * (com parte fracionária) e escolhe a operação aritmética a ser realizada. As*
 * operações devem ser: soma, subtração, multiplicação e divisão. O layout da *
 * interface gráfica e a forma de visualização do resultado são de escolha do *
 * aluno.                                                                     * 
 * @author (Murilo Silva Andrade Souza)                                       *
 * @version (0, 09-07-2013)                                                   *
 ******************************************************************************/

import javax.swing.JOptionPane;

public class Calculadora {
    public static void main(String args []){
       
        String firstNumber = 
            JOptionPane.showInputDialog("Digite o primeiro número:");
        String Operator = 
            JOptionPane.showInputDialog("1=Somar,2=Subtrair,3=Dividir, 4=Multiplicar:");
        String secondNumber = 
                JOptionPane.showInputDialog("Digite o segundo número:");
        
        
        float num1 = Integer.parseInt(firstNumber);
        int operador = Integer.parseInt(Operator);
        float num2 = Integer.parseInt(secondNumber);
                       
        switch (operador){
        case 1:
        float sum = num1 + num2; 
         JOptionPane.showMessageDialog(null, "A soma dos valores é: " + sum,
                "Soma de dois números", JOptionPane.PLAIN_MESSAGE);
        break;
        case 2:
        float sub = num1 - num2; 
         JOptionPane.showMessageDialog(null, "A subtração dos valores é: " + sub,
                "Subtração de dois números", JOptionPane.PLAIN_MESSAGE);
        break;
        case 3:
        float div = num1 / num2; 
         JOptionPane.showMessageDialog(null, "A divisão dos valores é: " + div,
                "Divisão de dois números", JOptionPane.PLAIN_MESSAGE);
        break;
        case 4:
        float mut = num1 * num2; 
         JOptionPane.showMessageDialog(null, "A multiplicação dos valores é: " + mut,
                "Multiplicação de dois números", JOptionPane.PLAIN_MESSAGE); 
        break;
        
        default:
        JOptionPane.showMessageDialog(null, "Digite 1 para somar, 2 para subtrair, 3 para dividir e/ou 4 para multiplicar"); 
           
    }
   

}

}
