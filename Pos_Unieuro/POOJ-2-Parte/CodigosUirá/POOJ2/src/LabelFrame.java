//Demonstrando a classe JLabel

import java.awt.FlowLayout;//especifica como os compornentes s�o organizados
import javax.swing.JFrame;//fornece recursos b�sicos de janela
import javax.swing.JLabel;//exibe textos e imagens
import javax.swing.SwingConstants;//constantes comuns utilizadas com Swing
import javax.swing.Icon;//interface utilizada para manipular imagens
import javax.swing.ImageIcon;//carrega imagens

public class LabelFrame extends JFrame{

private JLabel label1;//JLabel apenas com texto
private JLabel label2;//JLabel constru�do com texto e �cone
private JLabel label3;//JLabel com texto e �cone adicionados
	


	public LabelFrame() {
		super("Testando JLabel");
		
		setLayout(new FlowLayout()); //configura o layout do frame
		
	}



	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
