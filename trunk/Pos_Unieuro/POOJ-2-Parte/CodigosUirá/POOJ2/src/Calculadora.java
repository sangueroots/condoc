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
import javax.swing.JTextField;
import javax.swing.BoxLayout;
import javax.swing.Box;
import java.awt.EventQueue;
import java.awt.BorderLayout;
import java.awt.Color;
import javax.swing.BorderFactory;
import javax.swing.border.Border;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.SwingConstants;
import java.awt.Container;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.io.FileWriter;
import java.io.IOException;


public class Calculadora extends JFrame implements ActionListener{

    static Box Janela;
    static JButton soma;
    static JButton subtrai;
    static JButton multiplica;
    static JButton divide;
    private String log;
      
    
    static JTextField num1;
    static JTextField num2;
    static JTextField result;
    static JTextField textField;
    float n1 = 0,n2 = 0,total = 0;
    
    public void actionPerformed (ActionEvent evento){
       
        try{
            n1 = Float.parseFloat(num1.getText());
            n2 = Float.parseFloat(num2.getText());
        }
        catch (NumberFormatException erro)
        {
            result.setText("Erro");
            return;
        }
        
        if(evento.getSource()== soma)
        total = n1 + n2;
        
        if(evento.getSource()== subtrai)
        total = n1 - n2;
        
        if(evento.getSource()== multiplica)
        total = n1 * n2;
        
        if(evento.getSource()== divide)
        total = n1 / n2;

        result.setText(""+total);
        
        log = "variavel: " + n1 + "\n";
        log += "valriavel: " + n2 + "\n";
        log += "Resultado: " + total;
        
        this.gravar(log);
        
    };
    
    public static void main (String[] args){
        
        Calculadora frame = new Calculadora("");
        
        
        
        frame.add(Janela);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(250,150);
        frame.setVisible(true);
        
        soma.setLocation(0,150);
        subtrai.setLocation(0,170);
        multiplica.setLocation(0,190);
        divide.setLocation(0,210);
        
        result.setLocation(0,0);
        result.setSize(100,40);
        result.setForeground(Color.white);
        result.setBackground(Color.black);
        result.setOpaque(true);
        result.setEditable(false);
        
        num1.setLocation(48,50);
        num1.setSize(100,40);
        num1.setForeground(Color.black);
        num1.setBackground(Color.white);
        num1.setOpaque(true);
        
    
        num2.setLocation(48,100);
        num2.setSize(100,40);
        num2.setForeground(Color.black);
        num2.setBackground(Color.white);
        num2.setOpaque(true);
       
    }
    
    public void gravar(String log2) {

		try {

			FileWriter fw = new FileWriter(
					"F:/Cursos/Pos_Unieuro/POOJ-2-Parte/CodigosUirá/tmp/Gravando.txt");
			fw.write(log2);
			fw.close();
		} catch (IOException e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
		System.out.println("gravado com sucesso!");
	}
    
    public Calculadora(String S){
        
        super (S);
            
                Janela = new Box(BoxLayout.Y_AXIS);
                
                              
                result = new JTextField("");
                num1 = new JTextField("");
                num2 = new JTextField("");
                textField = new JTextField("Calcule nas linhas abaixo");
                textField.setEditable(false);
               
                
                soma = new JButton("+");                
                subtrai = new JButton("-");
                multiplica = new JButton("x");
                divide = new JButton("/");
                              
                soma.addActionListener(this); 
                subtrai.addActionListener(this); 
                multiplica.addActionListener(this); 
                divide.addActionListener(this); 
                               
               
                Janela.add(textField);
                Janela.add(result);
                Janela.add(num1);
                Janela.add(num2);
                Janela.add(soma);
                Janela.add(subtrai);
                Janela.add(multiplica);
                Janela.add(divide);
                
                 
                
                               
        
        }
}


