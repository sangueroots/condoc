package br.inf.bluestar.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.inf.bluestar.bean.Feriado;
import br.inf.bluestar.util.DataUtil;

public class FeriadoDao {

	//Metodo de comunicação com o banco
	private Connection conexao;
	
	//Construtor da classe para conexão com o banco
	
	public FeriadoDao()throws SQLException {
		conexao = new Conexao().getConexao();
	}
	
	//incluir registro na Tabela
	public void incluir(Feriado feriado) throws SQLException{
		String sql = "INSERT INTO feriado (idferiado, data) VALUES(?,?)";
		PreparedStatement comando = conexao.prepareStatement(sql);
		comando.setInt(1, feriado.getIdFeriado());
		comando.setString(2, DataUtil.getDataString(feriado.getData()));
		comando.executeUpdate();
		comando.close();
	}
	
	//Deleta o Registro da Tabela
	public void deletar(int idferiado) throws SQLException{
		String sql = "DELETE FROM Feriado WHERE idferiado = ?";
		PreparedStatement comando = conexao.prepareStatement(sql);
		comando.setInt(1, idferiado);
		comando.executeUpdate();
		comando.close();
	}
	
	
	//Lista os dados da tabela
	public List<Feriado> listaDado() throws SQLException{
		List<Feriado> lista=new ArrayList<Feriado>();
		String sql = "SELECT * FROM FERIADO ORDER BY data";
		PreparedStatement comando = conexao.prepareStatement(sql);
		ResultSet rs = comando.executeQuery();
		
		while(rs.next()){
			Feriado feriado = new Feriado();
			feriado.setIdFeriado(rs.getInt("idferiado"));
			feriado.setData(rs.getDate("data"));
			lista.add(feriado);
			
		}
		rs.close();
		return lista;
	}
	
		
	
}
