package br.inf.bluestar.view;

import javax.swing.JFrame;
import javax.swing.JProgressBar;
import java.awt.BorderLayout;
import java.util.logging.Level;

import javax.swing.JLabel;
import javax.swing.ImageIcon;

public class SplaschScreen extends JFrame{
	
	
	public SplaschScreen(){
		final JLabel lb_Carga = new JLabel();
		getContentPane().add(lb_Carga, BorderLayout.NORTH);
		
		final JProgressBar progressBar = new JProgressBar();
		progressBar.setStringPainted(true);
		getContentPane().add(progressBar, BorderLayout.SOUTH);
		
		JLabel lblNewLabel = new JLabel();
		lblNewLabel.setIcon(new ImageIcon(SplaschScreen.class.getResource("/imagem/ponto.png")));
		getContentPane().add(lblNewLabel, BorderLayout.EAST);
		
		setSize(707, 509);
		setLocation(300,200);
	
	
		//Define se a janela fechará o sistema ou apenas ela mesma
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		
				
		
		countComponents();
		
		new Thread(){
			public void run(){
				for(int i=0;i<101;i++){
					try {
						sleep(60);
						progressBar.setValue(i);
						if(progressBar.getValue()<=40){
							lb_Carga.setText("Carregando Banco de Dados");
						}else if(progressBar.getValue()<=70){
							lb_Carga.setText("Carregando Tabelas");
						}else{
							lb_Carga.setText("Carregando Sistema");
						}
						
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}.start();
	
	}

public static void main(String args[]){
		
		SplaschScreen barra = new SplaschScreen();
		barra.setVisible(true);
}
}
