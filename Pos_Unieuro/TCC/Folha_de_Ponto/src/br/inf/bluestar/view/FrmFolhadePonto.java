package br.inf.bluestar.view;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.util.List;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;
import br.inf.bluestar.bean.Departamento;
import br.inf.bluestar.dao.CargoDao;
import br.inf.bluestar.dao.DepartamentoDao;
import javax.swing.JTabbedPane;
import java.awt.BorderLayout;
import com.jgoodies.forms.factories.DefaultComponentFactory;

public class FrmFolhadePonto extends JFrame {

	JLabel lb_pesquisa;
	JLabel lb_nome;
	JLabel lb_matutino;
	JLabel lb_vespertino;
	JButton bt_pesquisar;
	JTextField tf_pesquisa;
	JTable table;
	//Declaração de DefaultTableModel
	DefaultTableModel dtm;
	//Declaração do ScrollPane
	JScrollPane scrollPane;
	//Identificador de Atualização
	int st=0;
	
	
	public FrmFolhadePonto(){
		
		setTitle("Folha de Ponto");
		setSize(560, 460);
		setLocation(300,200);
	
		//Define se a janela ficha o sistema ou apenas
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		
		//inicializando os compenentes label
		lb_pesquisa = new JLabel ("Pesquisa");
		lb_nome = new JLabel("Nome:");
		lb_matutino = new JLabel("Turno da Manhã");
		lb_vespertino = new JLabel("Turno da Tarde");
		bt_pesquisar = new JButton("Pesquisar");
		bt_pesquisar.setIcon(new ImageIcon(FrmDepartamento.class.getResource("/imagem/16/pesquisa.png")));

		tf_pesquisa = new JTextField("");
		table = new JTable(new DefaultTableModel(new String [][][][]{}, new String[]{"Data","Entrada","Saida", "Entrada", "Saida"}));
		
		//inicializando barra de rolagem da tabela
		scrollPane = new JScrollPane(table);
		
		//inicializado Manipulador da tabela
		dtm = (DefaultTableModel) table.getModel();
		
		//Define o gerenciado de layout como null, ou seja, 
		//voce pode colocar os componentes em qualquer lugar
		//do formulário
		getContentPane().setLayout(null);
		
		//Adicione os componentes ao layout
		getContentPane().add(lb_pesquisa);
		getContentPane().add(tf_pesquisa);
		getContentPane().add(bt_pesquisar);
		getContentPane().add(lb_nome);
		getContentPane().add(lb_matutino);
		getContentPane().add(lb_vespertino);
		getContentPane().add(scrollPane);
		
		//Define o posicionamento dos componentes da tabela
		//posiçãoda coluna, posição da linha, comprimento da 
		
		lb_pesquisa.setBounds(10, 11, 100, 15);
		tf_pesquisa.setBounds(10, 25, 360, 25);
		bt_pesquisar.setBounds(380, 25, 120, 25);
		lb_nome.setBounds(10, 61, 46, 14);
		lb_matutino.setBounds(177, 87, 100, 25);
		lb_vespertino.setBounds(385, 87, 100, 25);
		scrollPane.setLocation(10, 105);
		scrollPane.setSize(524, 280);
		
		
		
		

				
	}
}
