// Fig. 11.9: TextFieldFrame.java
// Demonstrando a classe JTextField.
import java.awt.FlowLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.JPasswordField;
import javax.swing.JOptionPane;
import javax.swing.JFrame;

public class TextFieldFrame extends JFrame {
	private JTextField textField1; // campo de texto com tamanho configurado
	private JTextField textField2; // campo de texto constru�do com texto
	private JTextField textField3; // campo de texto com texto e tamanho
	private JPasswordField passwordField; // campo de senha com texto

	// Construtor TextFieldFrame adiciona JTextFields a JFrame
	public TextFieldFrame() {
		super("Testando JTextField and JPasswordField");
		setLayout(new FlowLayout()); // configura layout de frame

		// constr�i textfield com 10 colunas
		textField1 = new JTextField(10);
		add(textField1); // adiciona textField1 a JFrame
		// constr�i campo de texto com texto padr�o
		textField2 = new JTextField("Insira o texto aqui");
		add(textField2); // adiciona textField2 a JFrame

		// constr�i textfield com texto padr�o e 21 colunas
		textField3 = new JTextField("Campo de texto n�o edit�vel", 21);
		textField3.setEditable(false); // desativa a edi��o
		add(textField3); // adiciona textField3 ao JFrame

		// constr�i passwordfield com o texto padr�o
		passwordField = new JPasswordField("Texto oculto");
		add(passwordField); // adiciona passwordField a JFrame

		// registra handlers de evento
		TextFieldHandler handler = new TextFieldHandler();
		textField1.addActionListener(handler);
		textField2.addActionListener(handler);
		textField3.addActionListener(handler);
		passwordField.addActionListener(handler);
	} // fim do construtor TextFieldFrame

	// classe interna private para tratamento de evento
	private class TextFieldHandler implements ActionListener {
		// processa eventos de campo de texto
		public void actionPerformed(ActionEvent event) {

			String string = ""; // declara string a ser exibida
			// usu�rio pressionou Enter no JTextField textField1
			if (event.getSource() == textField1)
				string = String.format("Campo de texto 1: %s", event.getActionCommand());

			// usu�rio pressionou Enter no JTextField textField2
			else if (event.getSource() == textField2)
				string = String.format("Campo de texto 2: %s", event.getActionCommand());

			// usu�rio pressionou Enter no JTextField textField3
			else if (event.getSource() == textField3)
				string = String.format("Campo de texto 3: %s", event.getActionCommand());

			// usu�rio pressionou Enter no JTextField passwordField
			else if (event.getSource() == passwordField)
				string = String.format("passwordField: %s", new String(passwordField.getPassword()));

			// exibe conte�do do JTextField
			JOptionPane.showMessageDialog(null, string);
		} // fim do m�todo actionPerformed
	} // fim da classe TextFieldHandler interna private
} // fim da classe TextFieldFrame

