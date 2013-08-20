package br.inf.bluestar.dao;

import br.inf.bluestar.bean.Departamento;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;




public class DepartamentoDao {

		//Metodo de comunicação com o banco
		private Connection conexao;
		
		//Construtor da classe para conexão com o banco
		
		public DepartamentoDao()throws SQLException {
			conexao = new Conexao().getConexao();
		}
		
		//incluir registro na Tabela
		public void incluir(Departamento dado) throws SQLException{
			String sql = "INSERT INTO departamento(idDepartamento, descricao) VALUES(null, ?)";
			PreparedStatement comando = conexao.prepareStatement(sql);
			comando.setString(1,dado.getDescricao());
			comando.executeUpdate();
			comando.close();
		}
		//Lista os dados da tabela
		public  List<Departamento> listaDado() throws SQLException{
			List<Departamento> lista = new ArrayList<Departamento>();
			String sql = "SELECT * FROM DEPARTAMENTO ORDER BY idDepartamento";
			PreparedStatement comando = conexao.prepareStatement(sql);
			ResultSet rs = comando.executeQuery();
			
			while(rs.next()){
				Departamento departamento = new Departamento();
				departamento.setIdDepartamento(rs.getInt("idDepartamento"));
				departamento.setDescricao(rs.getString("descricao"));
				lista.add(departamento);
				
			}
			rs.close();
			return lista;
		}
		
		// Deletar o Registro da Tabela
		public void deletar(int idDepartamento) throws SQLException {
			String sql = "DELETE FROM Departamento WHERE iddepartamento=?";
			PreparedStatement comando = conexao.prepareStatement(sql);
			comando.setInt(1, idDepartamento);
			comando.executeUpdate();
			comando.close();

		}
		
		//Atualizar registro na Tabela
		public void atualiza(Departamento dado) throws SQLException{
			String sql = "UPDATE departamento SET descricao=? WHERE idDepartamento=?";
			PreparedStatement comando = conexao.prepareStatement(sql);
			comando.setString(1, dado.getDescricao());
			comando.setInt(2, dado.getIdDepartamento());
			comando.executeUpdate();
			comando.close();
		}

	}

	

