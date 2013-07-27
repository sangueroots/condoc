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
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JFrame;
import javax.swing.BoxLayout;
import javax.swing.Box;
import java.awt.event.*; 
import java.awt.Color; 



public class Calculadora extends JFrame implements ActionListener{

    static Box Janela;
    static JButton soma;
    static JButton subtrai;
    static JButton multiplica;
    static JButton divide;
    static JButton buttons[];
    static final String names[] = {"+", "-","*", "/"};
    static BorderLayout layout;
    
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
        result.setForeground(Color.black);
        result.setBackground(Color.white);
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
    
    public Calculadora(String S){
        
        super (S);
            
                Janela = new Box(BoxLayout.Y_AXIS);
                
                setLayout( layout );   
                
                result = new JTextField("");
                num1 = new JTextField("");
                num2 = new JTextField("");
                textField = new JTextField("Calcule nas linhas abaixo");
                textField.setEditable(false);
                buttons = new JButton[ names.length ];
                
                soma = new JButton("+");                
                subtrai = new JButton("-");
                multiplica = new JButton("x");
                divide = new JButton("/");
                              
                soma.addActionListener(this); 
                subtrai.addActionListener(this); 
                multiplica.addActionListener(this); 
                divide.addActionListener(this); 
                               
               
                Janela.add(textField);
                Janela.add(num1);
                Janela.add(num2);
                Janela.add(result);
                Janela.add(soma);
                Janela.add(subtrai);
                Janela.add(multiplica);
                Janela.add(divide);
                
                for ( int count = 0; count < names.length; count++ )
                {
                    buttons[ count ] = new JButton( names[ count ] );
                    buttons[ count ].addActionListener( this );
                } 
                
                add( buttons[ 0 ], BorderLayout.NORTH ); // adiciona botão para o norte
                add( buttons[ 1 ], BorderLayout.SOUTH ); // adiciona botão para o sul
                add( buttons[ 2 ], BorderLayout.EAST ); // adiciona botão para o leste
                add( buttons[ 3 ], BorderLayout.WEST ); // adiciona botão para o oeste
                
        
        }
}


