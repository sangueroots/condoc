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
import br.inf.bluestar.bean.Cargo;
import br.inf.bluestar.dao.CargoDao;

public class FrmCargo extends JFrame {

	//Declaração de JLabel
	JLabel lb_descricao;
	//Declaração de TextField
	JTextField tf_descricao;
	//Declaração de JButton
	JButton bt_salvar;
	//Declaração de JButton
	JButton bt_pesquisar;
	//Declaração de JButton
	JButton bt_deletar;
	//Declaração de JButton
	JButton bt_atualizar;
	//Declaração de Tabelas
	JTable table;
	//Declaração de DefaultTableModel
	DefaultTableModel dtm;
	//Declaração do ScrollPane
	JScrollPane scrollPane;
	//Identificador de Atualização
	int st=0;
	
	//Aqui estou instanciando uma classe cargo
	
	Cargo obj_Cargo=new Cargo();
	
	public FrmCargo(){
		setTitle("Cadastro de Cargo");
		setSize(560, 360);
		setLocation(300,200);
		
		//Define se a janela ficha o sistema ou apenas
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		
		//inicializando os compenentes label
		lb_descricao = new JLabel ("Descrição");
		
		//inicializando os componentes de texto
		tf_descricao = new JTextField("");
		
		//inicializando os componentes de botão
		bt_salvar = new JButton("Salvar");
		bt_salvar.setIcon(new ImageIcon(FrmCargo.class.getResource("/imagem/16/salvar.png")));
		 
		//inicializando os componentes de botão
		bt_pesquisar = new JButton("Pesquisar");
		bt_pesquisar.setIcon(new ImageIcon(FrmCargo.class.getResource("/imagem/16/pesquisa.png")));
		
		//inicializando os componentes de botão
		bt_atualizar = new JButton("Atualizar");
		bt_atualizar.setIcon(new ImageIcon(FrmCargo.class.getResource("/imagem/16/atual.png")));
		
		//inicializando os componentes de botão
		bt_deletar = new JButton("Deletar");
		bt_deletar.setIcon(new ImageIcon(FrmCargo.class.getResource("/imagem/16/delete.png")));
		
		//inicializando os componentes de tabela
		table = new JTable(new DefaultTableModel(new String [][]{}, new String[]{"Código","Descrição"}));
		
		//inicializando barra de rolagem da tabela
		scrollPane = new JScrollPane(table);
		
		//inicializado Manipulador da tabela
		dtm = (DefaultTableModel) table.getModel();
		
		//Define o gerenciado de layout como null, ou seja, 
		//voce pode colocar os componentes em qualquer lugar
		//do formulário
		getContentPane().setLayout(null);
		
		//Adicione os componentes ao layout
		
		getContentPane().add(lb_descricao);
		getContentPane().add(tf_descricao);
		getContentPane().add(bt_salvar);
		getContentPane().add(bt_pesquisar);
		getContentPane().add(bt_deletar);
		getContentPane().add(bt_atualizar);
		getContentPane().add(scrollPane);
		
		//Define o posicionamento dos componentes da tabela
		//posiçãoda coluna, posição da linha, comprimento da 
		

		lb_descricao.setBounds(25, 20, 100, 15);
		tf_descricao.setBounds(25, 40, 360, 25);
		bt_salvar.setBounds(400, 39, 120, 30);
		bt_pesquisar.setBounds(400, 80, 120, 30);
		bt_deletar.setBounds(400, 120, 120, 30);
		bt_atualizar.setBounds(400, 160, 120, 30);
		scrollPane.setLocation(25, 80);
		scrollPane.setSize(360, 180);
		
		//Comportamento do botao inserir/salvar
		bt_salvar.addActionListener(new ActionListener(){
		public void actionPerformed(ActionEvent arg0){
			obj_Cargo.setDescricao((tf_descricao.getText()));
			try {
				CargoDao c = new CargoDao();
				if (st==1) {
					c.atualiza(obj_Cargo);
					st=0;
					}
				else{
					c.incluir(obj_Cargo);
					}
				tf_descricao.setText("");
				carregaTable();
				
			} catch ( Exception e) {
			JOptionPane.showMessageDialog(null, "Falha na comunicação");
			
			}
			
			}
		});
		
		//Comportamento do botao pesquisar
		bt_pesquisar.addActionListener(new ActionListener(){
		public void actionPerformed(ActionEvent argO){
			try {
				carregaTable();
			} catch ( Exception e) {
				JOptionPane.showMessageDialog(null, "Falha na comunicação");
			
			}
			
			}
		});
		
		//Comportamento do botão deletar
			bt_deletar.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent argO){
				try{
					deletar();
				}catch (Exception e){
					JOptionPane.showMessageDialog(null, "Falha na comunicação");
				}
			}
		});
		
		//Comportamento do botão Atualizar
			bt_atualizar.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent arg0) {
					try{
						tf_descricao.setText((String) dtm.getValueAt(table.getSelectedRow(), 1));
						obj_Cargo.setDescricao(tf_descricao.getText());
						obj_Cargo.setIdcargo((Integer) dtm.getValueAt(table.getSelectedRow(),0));
						
						st=1;
					}catch (Exception e){
						JOptionPane.showMessageDialog(null, "Falha de Comunicação");
					}
					
				}
			});
			
						
	}
	
	//Deletar Registro
	private void deletar(){
		//captura o id da linha que o usuario clicou
		
		Integer id = (Integer) dtm.getValueAt(table.getSelectedRow(), 0);
		try{
			new CargoDao().deletar(id);
		}catch (SQLException e){
			
		}
		//Remove a Linha da JTable
		dtm.removeRow(table.getSelectedRow());
	}
	
	private void carregaTable(){
		//Carrega todos os dados em uma lista
		List<Cargo> lista = null;
		try {
			lista = new CargoDao().listaDado();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//Linha a ser populada
		dtm.setRowCount(0);
		//inseri os dados na tabela
		
		for (Cargo cargo:lista){
			Object []obj=new Object[2];
			obj[0] = cargo.getIdcargo();
			obj[1] = cargo.getDescricao();
			dtm.addRow(obj);
		}
		table.setModel(dtm);
	}
		
}
		
			
			