package br.inf.bluestar.bean;

import java.util.Date;
import java.util.Timer;

public class Ponto {

	private int idPonto;
	private int fkIdFuncionario;
	private Timer entrada1;
	private Timer saida1;
	private Timer entrada2;
	private Timer saida2;
	private String usuario;
	private Date data2;
	
	
	
	public int getIdPonto() {
		return this.idPonto;
	}
	public void setIdPonto(int idPonto) {
		this.idPonto = idPonto;
	}
	public int getFkIdFuncionario() {
		return this.fkIdFuncionario;
	}
	public void setFkIdFuncionario(int fkIdFuncionario) {
		this.fkIdFuncionario = fkIdFuncionario;
	}
	public Timer getEntrada1() {
		return this.entrada1;
	}
	public void setEntrada1(Timer entrada1) {
		this.entrada1 = entrada1;
	}
	public Timer getSaida1() {
		return this.saida1;
	}
	public void setSaida1(Timer saida1) {
		this.saida1 = saida1;
	}
	public Timer getEntrada2() {
		return this.entrada2;
	}
	public void setEntrada2(Timer entrada2) {
		this.entrada2 = entrada2;
	}
	public Timer getSaida2() {
		return this.saida2;
	}
	public void setSaida2(Timer saida2) {
		this.saida2 = saida2;
	}
	public String getUsuario() {
		return this.usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public Date getData2() {
		return this.data2;
	}
	public void setData2(Date data2) {
		this.data2 = data2;
	}
}
