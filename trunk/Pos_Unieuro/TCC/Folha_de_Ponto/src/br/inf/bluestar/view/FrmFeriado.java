package br.inf.bluestar.view;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.util.List;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;
import javax.swing.text.MaskFormatter;

import br.inf.bluestar.bean.Feriado;
import br.inf.bluestar.dao.FeriadoDao;
import br.inf.bluestar.util.DataUtil;;


public class FrmFeriado extends JFrame {
	

	//Declara��o de JLabel
	JLabel lb_data;
	//Declara��o de TextField
	JFormattedTextField tf_data;
	//Declara��o de JButton
	JButton bt_salvar;
	//Declara��o de JButton
	JButton bt_pesquisar;
	//Declara��o de JButton
	JButton bt_deletar;
	//Declara��o de JButton
	JButton bt_atualizar;
	//Declara��o de Tabelas
	JTable table;
	//Declara��o de DefaultTableModel
	DefaultTableModel dtm;
	//Declara��o do ScrollPane
	JScrollPane scrollPane;
	//Identificador de Atualiza��o
	int st=0;
	
	//Aqui estou instanciando uma classe cargo
	
	Feriado obj_Feriado=new Feriado();
	
	public FrmFeriado(){
		setTitle("Cadastro de Feriado");
		setSize(560, 360);
		setLocation(300,200);
		
		//Define se a janela ficha o sistema ou apenas
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		
		//inicializando os compenentes label
		lb_data = new JLabel ("Informe a Data");
		
		//inicializando os componentes de texto
		tf_data = new JFormattedTextField(setMascara("##/##/####"));
		
		//inicializando os componentes de bot�o
		bt_salvar = new JButton("Salvar");
		bt_salvar.setIcon(new ImageIcon(FrmFeriado.class.getResource("/imagem/16/salvar.png")));
		
		//inicializando os componentes de bot�o
		bt_pesquisar = new JButton("Pesquisar");
		bt_pesquisar.setIcon(new ImageIcon(FrmFeriado.class.getResource("/imagem/16/pesquisa.png")));
		
		//inicializando os componentes de bot�o
		bt_atualizar = new JButton("Atualizar");
		bt_atualizar.setIcon(new ImageIcon(FrmFeriado.class.getResource("/imagem/16/atual.png")));
		
		//inicializando os componentes de bot�o
		bt_deletar = new JButton("Deletar");
		bt_deletar.setIcon(new ImageIcon(FrmFeriado.class.getResource("/imagem/16/delete.png")));
		
		//inicializando os componentes de tabela
		table = new JTable(new DefaultTableModel(new String [][]{}, new String[]{"C�digo","Data"}));
		
		//inicializando barra de rolagem da tabela
		scrollPane = new JScrollPane(table);
		
		//inicializado Manipulador da tabela
		dtm = (DefaultTableModel) table.getModel();
		
		//Define o gerenciado de layout como null, ou seja, 
		//voce pode colocar os componentes em qualquer lugar
		//do formul�rio
		getContentPane().setLayout(null);
		
		//Adicione os componentes ao layout
		
		getContentPane().add(lb_data);
		getContentPane().add(tf_data);
		getContentPane().add(bt_salvar);
		getContentPane().add(bt_pesquisar);
		getContentPane().add(bt_deletar);
		getContentPane().add(bt_atualizar);
		getContentPane().add(scrollPane);
		
		//Define o posicionamento dos componentes da tabela
		//posi��oda coluna, posi��o da linha, comprimento da 
		

		lb_data.setBounds(25, 20, 100, 15);
		tf_data.setBounds(25, 40, 360, 25);
		bt_salvar.setBounds(400, 39, 120, 30);
		bt_pesquisar.setBounds(400, 80, 120, 30);
		bt_deletar.setBounds(400, 120, 120, 30);
		bt_atualizar.setBounds(400, 160, 120, 30);
		scrollPane.setLocation(25, 80);
		scrollPane.setSize(360, 180);
		
		//Comportamento do botao inserir/salvar
		bt_salvar.addActionListener(new ActionListener(){
		public void actionPerformed(ActionEvent arg0){
			obj_Feriado.setData(DataUtil.getDate((tf_data.getText())));
			
			try {
				FeriadoDao c = new FeriadoDao();
				c.incluir(obj_Feriado);
				tf_data.setText("");
				carregaTable();
				
			} catch ( Exception e) {
			JOptionPane.showMessageDialog(null, "Falha na comunica��o");
			
			}
			
			}
		});
		//Comportamento do botao pesquisar
		bt_pesquisar.addActionListener(new ActionListener(){
		public void actionPerformed(ActionEvent arg0){
			try {
				carregaTable();
			} catch (Exception e) {
				JOptionPane.showMessageDialog(null, "Falha na comunica��o");
			
			}
			
			}
		});
		
		//Comportamento do bot�o deletar
		bt_deletar.addActionListener(new ActionListener(){
		public void actionPerformed(ActionEvent argO){
			try{
				deletar();
			}catch (Exception e){
				JOptionPane.showMessageDialog(null, "Falha na comunica��o");
			}
		}
	});
		
		/*//Comportamento do bot�o Atualizar
		bt_atualizar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				try{
					tf_data.setText((String) dtm.getValueAt(table.getSelectedRow(), 1));
					obj_Feriado.setDataUtil(tf_data.getText());
					obj_Feriado.setIdFeriado((Integer) dtm.getValueAt(table.getSelectedRow(),0));
					
					st=1;
				}catch (Exception e){
					JOptionPane.showMessageDialog(null, "Falha de Comunica��o");
				}
				
			}
		});
				
		*/
		
	}
	private void carregaTable(){
		//Carrega todos os dados em uma lista
		List<Feriado> lista = null;
		try {
			lista = new FeriadoDao().listaDado();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		//Linha a ser populada
		dtm.setRowCount(0);
		//inseri os dados na tabela
		
		for (Feriado feriado:lista){
			Object []obj=new Object[2];
			obj[0] = feriado.getIdFeriado();
			obj[1] = DataUtil.getDataString(feriado.getData());
			dtm.addRow(obj);
		}
		table.setModel(dtm);
	}
	
	//Deletar Registro
	private void deletar(){
		//captura o id da linha que o usuario clicou
		
		Integer obj = (Integer) dtm.getValueAt(table.getSelectedRow(), 0);
		try{
			new FeriadoDao().deletar(obj);
		}catch (SQLException e){
			
		}
		//Remove a Linha da JTable
		dtm.removeRow(table.getSelectedRow());
	}
	
	private MaskFormatter setMascara(String mascara){
		MaskFormatter mask = null;
		try{
			mask=new MaskFormatter(mascara);
		}catch (java.text.ParseException ex){}
			return mask;
		}
	}


