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
		
		label1 =  new JLabel("Label com texto");
		label1.setToolTipText("Essa � a label1");
		add(label1); //adiciona a label1 a JFrame
		
		//contrutor JLabel com string, Icon e argumentos e alinhamentos
		Icon bug = new ImageIcon(getClass().getResource("http://cs.fit.edu/~mmahoney/cis5100/examples/ch11/fig11_06_07/bug1.GIF"));
		label2 = new JLabel("Label com texto e �cone", bug, SwingConstants.LEFT);
		label2.setToolTipText("Esse � a label 2");
		add(label2); //adiciona a label2 a JFrame
		
		label3 = new JLabel();
		label3.setText("Label com icone e texto em um bot�o.");
		label3.setIcon(bug);
		label3.setVerticalAlignment(SwingConstants.CENTER);
		label3.setHorizontalAlignment(SwingConstants.BOTTOM);
		add(label3);//adiciona a label3 a JFrame
	}//fim do contrutor JFrame



	public static void main(String[] args) {
		
		LabelFrame labelFrame = new LabelFrame(); // cria LabelFrame
		labelFrame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		labelFrame.setSize( 275, 180 ); // configura tamanho do frame
		labelFrame.setVisible( true ); // exibe frame

	}

}
