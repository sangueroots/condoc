
/**
 * Write a description of class TestFieldFrame here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */

import java.awt.FlowLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.JPasswordField;
import javax.swing.JOptionPane;

public class TextFieldFrame extends JFrame
 
{
    private JTextField textField1;//campo de texto com tamnaho configurado
    private JTextField textField2;//campo de texto construido com texto
    private JTextField textField3;//campo de texto com texto e tamanho
    private JPasswordField passwordField;//campo de senha com texto
    
   //Construtor TextFieldFrame adiciona JTextFields a JFrame
   public TextFieldFrame()    
    {
   super( "Testing JTextField and JPasswordField" );
   setLayout( new FlowLayout() );//configura layout de frame
   
   //constrói textField com 10 colunas
   textField1 = new JTextField( 10 );
   add( textField1 ); //adiciona textField1 a JFrame
   
   //ocnstrói campo de texto com texto padrão 
   textField2 = new JTextField( "Enter text here" );
   add( textField2 ); //adiciona textField2 a JFrame
   
   //constrói textField com texto padrão e 21 colunas
   textField3 = new JTextField( "uneditable tex field", 21);
   textField3.setEditable(false);//desativa a edição
   add(textField3);//adiciona textField3 ap JFrame
   
   //constróis passwordfield com o texto padrão
   passwordField = new JPasswordField("hidden text");
   add(passwordField);//adiciona passwordField a JFrame
   
   //registra handlers de evento
   TextFieldHandler handler = new TextFieldHandler();
   textField1.addActionListener(handler);
   textField2.addActionListener(handler);
   textField3.addActionListener(handler);
   passwordField.addActionListener(handler);
   
}//fim do construtor TextFieldFrame

//classe interna private para tratamento de evento
private class TextFieldHandler implements ActionListener
{
//processa eventos de campo de texto
public void actionPerformed(ActionEvent event)
{
String string = "";//declara string a ser exibida

//usuário pressionou Enter no JTextField textField1

if(event.getSource() == textField1)
string = string.format("textField1: %s", event.getActionCommand());

//usuário pressionou Enter no JTextField texField2
else if (event.getSource() == textField2)
string = string.format("textField2: %s", event.getActionCommand());

//usuário pressionou Enter no JTextField textField3
else if(event.getSource() == textField3)
string = String.format("textField3: %s", event.getActionCommand());

//usuário pressionou Enter no JTextField textField passwordField

else if (event.getSource() == passwordField)
string = String.format("passwordField:%s", new String(passwordField.getPassword()));

//exibe conteúdo do JTextField
JOptionPane.showMessageDialog(null, string);
}//fim do método actionPerformed
}//fim da classe TextFieldHandler insterna private
}//fim da classe TextFieldFrame

   
   
   
   