package br.inf.bluestar.view;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;

import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JSeparator;
import javax.swing.KeyStroke;
import javax.swing.plaf.basic.BasicInternalFrameTitlePane.CloseAction;
import javax.swing.ImageIcon;

public class FrmPonto extends JFrame{
	
	public FrmPonto(){
		
		setTitle("Point of System");
		//setSize (400, 400);
		//setLocation(500, 300);
		
		//Definindo o imagen de icone
		setIconImage(getToolkit().createImage(getClass().getResource("/imagem/relogio.png"))); 
		
		
		//Define se a janela fechará o sistema ou apenas ela mesma
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		
		//Abre o formulário Maximizar
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		
		//Define o gerenciador de layout como null, ou seja, 
		//Você pode colocar os componentes em qualquer lugar do formulário
		getContentPane().setLayout(null);
		
		//Barra de Menu
		JMenuBar barraMenu = new JMenuBar();
		
		//Novo Menu
		JMenu menu1 = new JMenu("Cadastrar");
		menu1.setIcon(new ImageIcon(FrmPonto.class.getResource("/imagem/tree_document.gif")));
	
		JMenu menu2 = new JMenu("Editar");
		menu2.setIcon(new ImageIcon(FrmPonto.class.getResource("/imagem/16/iconedit.png")));
		
		JMenu menu3 = new JMenu("Folha de Ponto");
		menu3.setIcon(new ImageIcon(FrmPonto.class.getResource("/imagem/16/folha.png")));
		
		//Item de Menu
		JMenuItem Item1=new JMenuItem("Cadastro de Cargo");
		JMenuItem Item2=new JMenuItem("Cadastro de Departamento");
		JMenuItem Item3=new JMenuItem("Cadastro de Feriado");
		JMenuItem Item4=new JMenuItem("Cadastro de Funcionário");
		JMenuItem Item5=new JMenuItem("Sair do Sistema");
		//=======Menu2==============
		JMenuItem Item6=new JMenuItem("Editar Cargo");
		JMenuItem Item7=new JMenuItem("Alterar Departamento");
		JMenuItem Item8=new JMenuItem("Alterar Feriado");
		JMenuItem Item9=new JMenuItem("Editar Usuário");
		//=======Menu3==============
		JMenuItem Item10=new JMenuItem("Abrir");
		//JMenuItem Item10=new JMenuItem("Cadastrar");
		//JMenuItem Item11=new JMenuItem("Alterar");
		//final JMenuItem Item12=new JMenuItem("Excluir");
		
		//Adicionar os Itens de Menu
		menu1.add(Item1);
		menu1.add(Item2);
		menu1.add(Item3);
		menu1.add(Item4);
		menu1.add(Item5);
		//=====Itens de Menu2======
		
		menu2.add(Item6);
		menu2.add(Item7);
		menu2.add(Item8);
		//=====Itens de Menu3======
	//	menu3.add(Item9);
		//menu3.add(Item10);
		//menu3.add(Item11);
		//menu3.add(Item12);
		
		//Adiciona o Menu a Barra
		barraMenu.add(menu1);
		barraMenu.add(menu2);
		barraMenu.add(menu3);
		
		//Adiciona a Barra ao Formulario
		super.setJMenuBar(barraMenu);
		
		
		//Metodo do Menu 1
		Item1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e){
				new FrmCargo().setVisible(true);
			}
			});
			
		//Metodo do Menu 1
			Item2.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e){
					new FrmDepartamento().setVisible(true);
				}
				
				});
			//Metodo do Menu 1
			Item3.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e){
					new FrmFeriado().setVisible(true);
				}
				
				});
			//Metodo do Menu 1
			Item4.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					new FrmFuncionario().setVisible(true);
					
				}
			});
			
			//Metodo do Menu 3
			Item5.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent arg0){
					System.exit(0);
				}
				
				});
			JSeparator separator_1 = new JSeparator();
			Item5.add(separator_1);
			Item5.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_S,
					InputEvent.CTRL_MASK));
			menu1.add(Item5);

	}

	
}
