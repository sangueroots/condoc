package br.inf.bluestar.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


import br.inf.bluestar.bean.Funcionario;
import br.inf.bluestar.util.DataUtil;

public class FuncionarioDao {

	// Metodo de comunicação com o banco
	private Connection conexao;

	// Construtor da classe para conexão com o banco

	public FuncionarioDao() throws SQLException {
		conexao = new Conexao().getConexao();
	}
	
	// incluir registro na Tabela
	public void incluir(Funcionario funcionario) throws SQLException {	
		String sql = "INSERT INTO funcionario(idDepartamento, idCargo, nome, sexo, tipo, dtNascimento) VALUES(?, ?, ?, ?, ?, ?)";
		PreparedStatement comando = conexao.prepareStatement(sql);
		//comando.setInt(1, funcionario.getIdFuncionario());
		comando.setInt(1, funcionario.getIdDepartamento());
		comando.setInt(2, funcionario.getIdCargo());
		comando.setString(3, funcionario.getNome());
		comando.setString(4, funcionario.getSexo());
		comando.setString(5, funcionario.getTipo());
		comando.setString(6, DataUtil.getDataString(funcionario.getDtNascimento()));
		
		comando.executeUpdate();
		comando.close();
	}
	//Deleta o Registro da Tabela
	public void deletar(int idfuncionario) throws SQLException{
		String sql = "DELETE FROM Funcionario WHERE idfuncionario = ?";
		PreparedStatement comando = conexao.prepareStatement(sql);
		comando.setInt(1, idfuncionario);
		comando.executeUpdate();
		comando.close();
	}
	//Lista os dados da tabela
	public List<Funcionario> listaDado() throws SQLException{
		List<Funcionario> lista=new ArrayList<Funcionario>();
		String sql = "SELECT f.*, d.descricao departamento, c.descricao cargo FROM FUNCIONARIO f JOIN DEPARTAMENTO d on d.idDepartamento=f.idDepartamento JOIN CARGO c on c.idCargo=f.idCargo ORDER BY idFuncionario";
		PreparedStatement comando = conexao.prepareStatement(sql);
		ResultSet rs = comando.executeQuery();
		
		while(rs.next()){
			
			Funcionario funcionario = new Funcionario();
			funcionario.setIdFuncionario(rs.getInt("idFuncionario"));
			funcionario.setNome(rs.getString("Nome"));
			funcionario.setDep_descricao(rs.getString("departamento"));
			funcionario.setCargo_descricao(rs.getString("cargo"));
			funcionario.setSexo(rs.getString("Sexo"));
			funcionario.setTipo(rs.getString("Tipo"));
			funcionario.setDtNascimento(rs.getDate("dtNascimento"));
			funcionario.setIdDepartamento(rs.getInt("idDepartamento"));
			funcionario.setIdCargo(rs.getInt("idCargo"));
			lista.add(funcionario);
			
		}
		rs.close();
		return lista;
	}
	//Atualizar registro na Tabela
	public void atualiza(Funcionario dado) throws SQLException{
		String sql = "UPDATE funcionario SET idDepartamento=?, idCargo=?, nome=?, sexo=?, tipo=?, dtNascimento=? WHERE idFuncionario=?";
		PreparedStatement comando = conexao.prepareStatement(sql);
		
		comando.setInt(1,dado.getIdDepartamento());
		comando.setInt(2,dado.getIdCargo());
		comando.setString(3,dado.getNome());
		comando.setString(4,dado.getSexo());
		comando.setString(6,DataUtil.getDataString(dado.getDtNascimento()));
		comando.setString(5,dado.getTipo());
		comando.setInt(7,dado.getIdFuncionario());
		comando.executeUpdate();
		comando.close();
	}
      
}
