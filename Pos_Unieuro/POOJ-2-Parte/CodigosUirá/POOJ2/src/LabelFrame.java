// Fig. 11.6: LabelFrame.java
// Demonstrando a classe JLabel.
import java.awt.FlowLayout; // especifica como os componentes s�o organizados
import javax.swing.JFrame; // fornece recursos b�sicos de janela
import javax.swing.JLabel; // exibe texto e imagens
import javax.swing.SwingConstants; // constantes comuns utilizadas com Swing
import javax.swing.Icon; // interface utilizada para manipular imagens
import javax.swing.ImageIcon; // carrega imagens

public class LabelFrame extends JFrame {
	private JLabel label1; // JLabel apenas com texto
	private JLabel label2; // JLabel constru�do com texto e �cone
	private JLabel label3; // JLabel com texto e �cone adicionados

	// Construtor LabelFrame adiciona JLabels a JFrame
	public LabelFrame() {
		super("Testing JLabel");
		setLayout(new FlowLayout()); // configura o layout de frame

		// Construtor JLabel com um argumento de string
		label1 = new JLabel("Label with text");
		label1.setToolTipText("This is label1");
		add(label1); // adiciona label1 a JFrame

		// construtor JLabel com string, Icon e argumentos de alinhamento
		Icon bug = new ImageIcon(getClass().getResource("bug1.gif"));
		label2 = new JLabel("Label with text and icon", bug,
				SwingConstants.LEFT);
		label2.setToolTipText("This is label2");
		add(label2); // adiciona label2 a JFrame

		label3 = new JLabel(); // construtor JLabel sem argumentos
		label3.setText("Label with icon and text at bottom");
		label3.setIcon(bug); // adiciona �cone a JLabel
		label3.setHorizontalTextPosition(SwingConstants.CENTER);
		label3.setVerticalTextPosition(SwingConstants.BOTTOM);
		label3.setToolTipText("This is label3");
		add(label3); // adiciona label3 a JFrame
	} // fim do construtor LabelFrame

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		LabelFrame labelFrame = new LabelFrame(); // cria LabelFrame
		labelFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		labelFrame.setSize(275, 180); // configura tamanho do frame
		labelFrame.setVisible(true); // exibe frame

	}
} // fim da classe LabelFrame