import javax.swing.JFrame;

//Fig. 11.10: TextFieldTest.java
//Testando TextFieldFrame.
public class TextFieldTest {
	
	public static void main(String args[]) {
		TextFieldFrame textFieldFrame = new TextFieldFrame();
		textFieldFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		textFieldFrame.setSize(325, 200); // configura tamanho do frame
		textFieldFrame.setVisible(true); // exibe o frame
	} // fim de main
	
} // fim da classe TextFieldTest