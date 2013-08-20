package br.inf.bluestar.dao;

import br.inf.bluestar.bean.Cargo;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JOptionPane;

public class CargoDao {

	// Metodo de comunicação com o banco
	private Connection conexao;

	// Construtor da classe para conexão com o banco

	public CargoDao() throws SQLException {
		conexao = new Conexao().getConexao();
	}

	// incluir registro na Tabela
	public void incluir(Cargo dado) throws SQLException {
		String sql = "INSERT INTO cargo (idcargo, descricao) VALUES(null, ?)";
		PreparedStatement comando = conexao.prepareStatement(sql);
		comando.setString(1, dado.getDescricao());
		comando.executeUpdate();
		comando.close();
	}

	// Lista os dados da tabela
	public List<Cargo> listaDado() throws SQLException {
		List<Cargo> lista = new ArrayList<Cargo>();
		String sql = "SELECT * FROM CARGO ORDER BY idcargo";
		PreparedStatement comando = conexao.prepareStatement(sql);
		ResultSet rs = comando.executeQuery();

		while (rs.next()) {
			Cargo cargo = new Cargo();
			cargo.setIdcargo(rs.getInt("idcargo"));
			cargo.setDescricao(rs.getString("descricao"));
			lista.add(cargo);

		}
		rs.close();
		return lista;

	}

	// Deletar o Registro da Tabela
	public void deletar(int idcargo) throws SQLException {
		String sql = "DELETE FROM Cargo WHERE idcargo=?";
		PreparedStatement comando = conexao.prepareStatement(sql);
		comando.setInt(1, idcargo);
		comando.executeUpdate();
		comando.close();

	}
	//Atualizar registro na Tabela
	public void atualiza(Cargo dado) throws SQLException{
		String sql = "UPDATE cargo SET descricao=? WHERE idcargo=?";
		PreparedStatement comando = conexao.prepareStatement(sql);
		comando.setString(1, dado.getDescricao());
		comando.setInt(2, dado.getIdcargo());
		comando.executeUpdate();
		comando.close();
	}
}
