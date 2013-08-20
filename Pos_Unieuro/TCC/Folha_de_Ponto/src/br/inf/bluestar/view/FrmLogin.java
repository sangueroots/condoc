package br.inf.bluestar.view;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JProgressBar;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;
import javax.swing.plaf.ProgressBarUI;

import br.inf.bluestar.dao.FuncionarioDao;


import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.KeyEvent;
import java.awt.BorderLayout;
import java.awt.Font;
import java.awt.Dialog.ModalExclusionType;
import java.awt.Color;

public class FrmLogin extends JFrame {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//private static final String  = null;
	private JPanel contentPane;
	private JTextField txtLogin;
	private JPasswordField pwSenha;
    
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					FrmLogin frame = new FrmLogin();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public FrmLogin() {
		setResizable(false);
		setModalExclusionType(ModalExclusionType.APPLICATION_EXCLUDE);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		addWindowListener(new WindowAdapter() {
			@Override
			public void windowClosing(WindowEvent arg0) {
				setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			}
		});
		setTitle("Sistema de Ponto 1.0.0");
		setBounds(100, 100, 668, 442);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		setIconImage(getToolkit().createImage(getClass().getResource("/imagem/relogio.png"))); 
		
		
		JLabel lblLogin_1 = new JLabel("Sistema de Ponto");
		lblLogin_1.setForeground(new Color(255, 255, 255));
		lblLogin_1.setFont(new Font("Tahoma", Font.BOLD, 22));
		lblLogin_1.setBounds(10, 11, 207, 58);
		contentPane.add(lblLogin_1);
		JLabel cesar=new JLabel("Murilo Andrade");
		cesar.setForeground(new Color(255, 255, 255));
		cesar.setBounds(10, 39, 188, 58);
		contentPane.add(cesar);
		
		final JProgressBar progressBar_1 = new JProgressBar();
		progressBar_1.setStringPainted(true);
		progressBar_1.setBounds(10, 394, 642, 14);
		contentPane.add(progressBar_1);
		
		final JLabel lblNewLabel_1 = new JLabel();
		lblNewLabel_1.setForeground(new Color(255, 255, 255));
		lblNewLabel_1.setBounds(10, 93, 188, 14);
		contentPane.add(lblNewLabel_1);
		
		
		JLabel lblLogin = new JLabel("Usu\u00E1rio");
		lblLogin.setBounds(281, 356, 130, 14);
		contentPane.add(lblLogin);
		
		txtLogin = new JTextField();
		txtLogin.setBounds(281, 369, 139, 20);
		contentPane.add(txtLogin);
		txtLogin.setColumns(10);
		
		JLabel lblSenha = new JLabel("Senha");
		lblSenha.setBounds(431, 356, 46, 14);
		contentPane.add(lblSenha);
		
		pwSenha = new JPasswordField();
		pwSenha.setBounds(431, 369, 121, 20);
		contentPane.add(pwSenha);
		
		JButton btnEntrar = new JButton("Entrar");
		btnEntrar.setMnemonic(KeyEvent.VK_ENTER);
		
		getRootPane().setDefaultButton(btnEntrar); 
		btnEntrar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				 
			new Thread(){
					public void run(){
						for(int i=0;i<101;i++){
							try {
								sleep(60);
								progressBar_1.setValue(i);
								if(progressBar_1.getValue()<=40){
									lblNewLabel_1.setText("Carregando Banco de Dados ...");
								}else if(progressBar_1.getValue()<=70){
									lblNewLabel_1.setText("Carregando Tabelas ...");
								}else{
									lblNewLabel_1.setText("Carregando Sistema ...");
								}
								
							} catch (InterruptedException e) {
								e.printStackTrace();
							}
						}
						
						new FrmPonto().setVisible(true);
						setVisible(false);
					}
				}.start();
			
							
			}
		});
		btnEntrar.setBounds(563, 368, 89, 23);
		contentPane.add(btnEntrar);
		
		JLabel lblNewLabel = new JLabel();
		lblNewLabel.setIcon(new ImageIcon(SplaschScreen.class.getResource("/imagem/ponto.png")));
		lblNewLabel.setBounds(0, 3, 662, 416);
		contentPane.add(lblNewLabel);
		
		
		
	}
	

}
