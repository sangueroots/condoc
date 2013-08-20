package br.inf.bluestar.view;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import javax.swing.ButtonGroup;
import javax.swing.ButtonModel;
import javax.swing.ComboBoxModel;
import javax.swing.DefaultComboBoxModel;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;
import javax.swing.text.MaskFormatter;

import br.inf.bluestar.bean.Cargo;
import br.inf.bluestar.bean.Departamento;
import br.inf.bluestar.bean.Funcionario;
import br.inf.bluestar.dao.CargoDao;
import br.inf.bluestar.dao.DepartamentoDao;
import br.inf.bluestar.dao.FuncionarioDao;
import br.inf.bluestar.util.DataUtil;
import javax.swing.JRadioButtonMenuItem;
import java.awt.Button;

public class FrmFuncionario extends JFrame {

	// Declaração de JLabel
	JLabel lb_dtNascimento;
	JLabel lb_nome;
	JLabel lb_sexo;
	JLabel lb_departamento;
	JLabel lb_cargo;
	JLabel lb_tipo;
	// Declaração de TextField
	JFormattedTextField tf_dtNascimento;
	JTextField tf_nome;
	JTextField tf_tipo;
	//Declaração de Gruoup
	
	// Declaração de JRadioButton
	JRadioButton rb_masc;
	JRadioButton rb_fem;

	// Declaração de JComboBox
	JComboBox cb_departamento;
	JComboBox cb_cargo;
	JComboBox cb_tipo;

	// Declaração de JButton
	JButton bt_salvar;
	// Declaração de JButton
	JButton bt_pesquisar;
	// Declaração de JButton
	JButton bt_deletar;
	// Declaração de JButton
	JButton bt_atualizar;
	// Declaração de Tabelas
	JTable table;
	// Declaração de DefaultTableModel
	DefaultTableModel dtm;
	// Declaração de DefaulComboBoxModel
	DefaultComboBoxModel dcbm;
	// Declaração do ScrollPane
	JScrollPane scrollPane;
	// Identificador de Atualização
	int st = 0;
	

	// Aqui estou instanciando uma classe cargo

	Funcionario obj_Funcionario = new Funcionario();
	Departamento obj_Departamento = new Departamento();
	Cargo obj_Cargo = new Cargo();
	private Object lista;
	private DepartamentoDao departamentoDao;
	private CargoDao cargoDao;
	public FrmFuncionario() {
		setTitle("Cadastro de Funcionário");
		setSize(960, 460);
		setLocation(100, 100);

		// Define se a janela ficha o sistema ou apenas
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);

		try {
			departamentoDao = new DepartamentoDao();
			
		} catch (SQLException e2) {
	
			e2.printStackTrace();
		}
			try{
				cargoDao = new CargoDao();
			}catch (SQLException e3){
			e3.printStackTrace();
			
			}
		
		// inicializando os compenentes label
		lb_nome = new JLabel("Nome");
		lb_dtNascimento = new JLabel("Data de Nascimento");
		lb_sexo = new JLabel("Sexo:");
		lb_departamento = new JLabel("Departamento");
		lb_cargo = new JLabel("Cargo");
		lb_tipo = new JLabel("Tipo de Usuário");

		// inicializando os componentes de texto
		tf_nome = new JTextField();
		tf_dtNascimento = new JFormattedTextField(setMascara("##/##/####"));
		

		// inicializando os componentes de RadioButton
		rb_masc = new JRadioButton("Masculino");
		rb_masc.setSelected(true);
		rb_fem = new JRadioButton("Feminino");

		// inicializando os componentes JComboBox

		cb_departamento = new JComboBox();
		
		try {
			for(Departamento departamento: departamentoDao.listaDado()){
				cb_departamento.addItem(departamento);
			}
		} catch (SQLException e1) {
				e1.printStackTrace();
		}
		
		cb_cargo = new JComboBox();
		
		try {
			for(Cargo cargo: cargoDao.listaDado()){
				cb_cargo.addItem(cargo);
			}
		} catch (SQLException e2) {
				e2.printStackTrace();
		}
		cb_tipo = new JComboBox();
		cb_tipo.addItem("Usuário");
		cb_tipo.addItem("Administrador");
		

		// inicializando os componentes de botão
		bt_salvar = new JButton("Salvar");
		bt_salvar.setIcon(new ImageIcon(FrmFeriado.class
				.getResource("/imagem/16/salvar.png")));

		// inicializando os componentes de botão
		bt_pesquisar = new JButton("Pesquisar");
		bt_pesquisar.setIcon(new ImageIcon(FrmFeriado.class
				.getResource("/imagem/16/pesquisa.png")));

		// inicializando os componentes de botão
		bt_atualizar = new JButton("Atualizar");
		bt_atualizar.setIcon(new ImageIcon(FrmFeriado.class
				.getResource("/imagem/16/atual.png")));

		// inicializando os componentes de botão
		bt_deletar = new JButton("Deletar");
		bt_deletar.setIcon(new ImageIcon(FrmFeriado.class
				.getResource("/imagem/16/delete.png")));

		// inicializando os componentes de tabela
		table = new JTable(new DefaultTableModel(new String[][][][][][][][][] {},
				new String[] { "Código", "Nome", "Departamento", "Cargo",
						"Sexo", "Data de Nascimento", "Tipo", "IdDepartamento", "IdCargo" }));
		table.getColumnModel().getColumn(0).setPreferredWidth(2);
		table.getColumnModel().getColumn(1).setPreferredWidth(230);
		table.getColumnModel().getColumn(7).setMaxWidth(0);
		table.getColumnModel().getColumn(7).setMinWidth(0);
		table.getColumnModel().getColumn(7).setPreferredWidth(0);
		table.getColumnModel().getColumn(8).setMaxWidth(0);
		table.getColumnModel().getColumn(8).setMinWidth(0);
		table.getColumnModel().getColumn(8).setPreferredWidth(0);
		

		// inicializando barra de rolagem da tabela
		scrollPane = new JScrollPane(table);

		// inicializado Manipulador da tabela
		dtm = (DefaultTableModel) table.getModel();
	
		// Define o gerenciado de layout como null, ou seja,
		// voce pode colocar os componentes em qualquer lugar
		// do formulário
		getContentPane().setLayout(null);

		
		// Adicione os componentes ao layout

		getContentPane().add(lb_nome);
		getContentPane().add(tf_nome);
		getContentPane().add(lb_dtNascimento);
		getContentPane().add(tf_dtNascimento);
		getContentPane().add(lb_sexo);
		getContentPane().add(rb_masc);
		getContentPane().add(rb_fem);
		getContentPane().add(lb_departamento);
		getContentPane().add(cb_departamento);
		getContentPane().add(lb_cargo);
		getContentPane().add(cb_cargo);
		getContentPane().add(lb_tipo);
		getContentPane().add(cb_tipo);
		getContentPane().add(bt_salvar);
		getContentPane().add(bt_pesquisar);
		getContentPane().add(bt_deletar);
		getContentPane().add(bt_atualizar);
		getContentPane().add(scrollPane);

		// Define o posicionamento dos componentes da tabela
		// posiçãoda coluna, posição da linha, comprimento da

		lb_nome.setBounds(10, 10, 100, 15);
		tf_nome.setBounds(10, 25, 331, 25);
		lb_dtNascimento.setBounds(351, 10, 120, 15);
		tf_dtNascimento.setBounds(351, 25, 120, 25);
		lb_departamento.setBounds(480, 10, 100, 15);
		cb_departamento.setBounds(480, 25, 100, 25);
		lb_cargo.setBounds(590, 10, 100, 15);
		cb_cargo.setBounds(590, 25, 100, 25);
		lb_sexo.setBounds(10, 61, 36, 15);
		rb_masc.setBounds(43, 61, 84, 15);
		rb_fem.setBounds(129, 61, 77, 15);
		lb_tipo.setBounds(700, 10, 100, 15);
		cb_tipo.setBounds(700, 25, 100, 25);
		bt_salvar.setBounds(814, 381, 120, 30);
		bt_pesquisar.setBounds(554, 381, 120, 30);
		bt_deletar.setBounds(421, 381, 120, 30);
		bt_atualizar.setBounds(684, 381, 120, 30);
		scrollPane.setLocation(10, 87);
		scrollPane.setSize(924, 283);
		
		
		// Evento de RadioButtom
	
		ButtonGroup rb_sexo = new ButtonGroup();
		
		rb_sexo.add(rb_masc);
		rb_sexo.add(rb_fem);
		
		// Comportamento do botao inserir/salvar
		bt_salvar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				
				
				try {
					obj_Funcionario.setNome(tf_nome.getText());
					obj_Funcionario.setSexo(rb_masc.isSelected()?"Masculino":"Feminino");
					obj_Funcionario.setDtNascimento(DataUtil.getDate(tf_dtNascimento.getText()));
					obj_Funcionario.setTipo(cb_tipo.getSelectedItem().toString());
					
					obj_Funcionario.setIdDepartamento(((Departamento)cb_departamento.getSelectedItem()).getIdDepartamento());
					obj_Funcionario.setIdCargo(((Cargo)cb_cargo.getSelectedItem()).getIdcargo());
					
					FuncionarioDao f = new FuncionarioDao();
					if (st==1){
						f.atualiza(obj_Funcionario);
						st=0;
					}else {
					f.incluir(obj_Funcionario);
					}
					tf_nome.setText("");
					tf_dtNascimento.setText("");
					
					carregaTable();

				} catch (Exception e) {
					JOptionPane.showMessageDialog(null, "Falha na comunicação :"+e.getMessage());
				
				}

			}
		});
		// Comportamento do botao pesquisar
		bt_pesquisar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				try {
					carregaTable();
				} catch (Exception e) {
					JOptionPane.showMessageDialog(null, "Falha na comunicação");

				}

			}
		});

		// Comportamento do botão deletar
		bt_deletar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent argO) {
				try {
					deletar();
				} catch (Exception e) {
					JOptionPane.showMessageDialog(null, "Falha na comunicação");
				}
			}
		});

		// Comportamento do botão Atualizar
		bt_atualizar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				try {
					tf_nome.setText((String) dtm.getValueAt(
							table.getSelectedRow(), 1));
					tf_dtNascimento.setText((String) dtm.getValueAt(
							table.getSelectedRow(), 5));
					cb_tipo.setSelectedItem((String) dtm.getValueAt(
							table.getSelectedRow(), 6));
					obj_Funcionario.setNome(tf_nome.getName());
					obj_Funcionario.setDtNascimento(DataUtil
							.getDate((tf_dtNascimento.getText())));
					
					obj_Funcionario.setIdFuncionario((Integer) dtm.getValueAt(
							table.getSelectedRow(), 0));
                    cb_departamento.setSelectedItem(new Departamento((Integer)dtm.getValueAt(
							table.getSelectedRow(), 7)));
                    cb_cargo.setSelectedItem(new Cargo((Integer)dtm.getValueAt(table.getSelectedRow(), 8)));
                    
					st = 1;
				} catch (Exception e) {
					JOptionPane.showMessageDialog(null, "Falha de Comunicação");
				}

			}
		});

		// Comportamento de comboBox

	}


	private void carregaTable() {
		// Carrega todos os dados em uma lista
		List<Funcionario> lista = null;
		try {
			lista = new FuncionarioDao().listaDado();

		} catch (SQLException e) {
			e.printStackTrace();
		}

		// Linha a ser populada
		dtm.setRowCount(0);
		// inseri os dados na tabela

		for (Funcionario funcionario : lista) {
			Object[] obj = new Object[9];
			obj[0] = funcionario.getIdFuncionario();
			obj[1] = funcionario.getNome();
			obj[2] = funcionario.getDep_descricao();
			obj[3] = funcionario.getCargo_descricao();
			obj[4] = funcionario.getSexo();
			obj[5] = DataUtil.getDataString(funcionario.getDtNascimento());
			obj[6] = funcionario.getTipo();			
			obj[7] = funcionario.getIdDepartamento();
			obj[8] = funcionario.getIdCargo();
			dtm.addRow(obj);
		}
		table.setModel(dtm);
	}

	// Deletar Registro
	private void deletar() {
		// captura o id da linha que o usuario clicou

		Integer obj = (Integer) dtm.getValueAt(table.getSelectedRow(), 0);
		try {
			new FuncionarioDao().deletar(obj);
		} catch (SQLException e) {

		}
		// Remove a Linha da JTable
		dtm.removeRow(table.getSelectedRow());
	}

	private MaskFormatter setMascara(String mascara) {
		MaskFormatter mask = null;
		try {
			mask = new MaskFormatter(mascara);
		} catch (java.text.ParseException ex) {
		}
		return mask;
	}
}
