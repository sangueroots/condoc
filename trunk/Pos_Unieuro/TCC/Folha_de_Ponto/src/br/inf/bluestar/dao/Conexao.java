package br.inf.bluestar.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {

	private static final String URL =("jdbc:oracle:thin:@localhost:1521:XE");
	private static final String USUARIO = "ponto";
	private static final String SENHA = "ponto";
	
	public Connection getConexao() throws SQLException{
		try{
			Class.forName("oracle.jdbc.driver.OracleDriver");
		}catch (ClassNotFoundException e){
			e.printStackTrace();
		}
		return DriverManager.getConnection(URL, USUARIO, SENHA);
	}	
	
}