package br.inf.bluestar.dao;

import br.inf.bluestar.bean.Ponto;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.inf.bluestar.bean.Cargo;

public class PontoDao {


	// Metodo de comunicação com o banco
	private Connection conexao;

	// Construtor da classe para conexão com o banco

	public PontoDao() throws SQLException {
		conexao = new Conexao().getConexao();
		
		// Lista os dados da tabela
	//	public List<Ponto> listaDado() throws SQLException {
			List<Ponto> lista = new ArrayList<Ponto>();
			String sql = "SELECT * FROM PONTO ORDER BY idponto";
			PreparedStatement comando = conexao.prepareStatement(sql);
			ResultSet rs = comando.executeQuery();

			while (rs.next()) {
				Ponto ponto = new Ponto();
				ponto.setData2(rs.getDate("data2"));
	//			ponto.setEntrada1(rs.getTimestamp("entrada1"));
	//			ponto.setSaida1(rs.getTimestamp("saida1"));
	//			ponto.setEntrada2(rs.getTimestamp("entrada2"));
	//			ponto.setSaida2(rs.getTimestamp("saida2"));
				lista.add(ponto);

			}
			rs.close();
	//		return lista;

		}

	
	}

