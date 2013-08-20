package br.inf.bluestar.bean;

import java.util.Date;

public class Funcionario {

	private int idFuncionario;
	private int idDepartamento;
	private String dep_descricao;
	private int idCargo;
	private String cargo_descricao;
	private String nome;
	private String sexo;
	private String tipo;
	private Date dtNascimento;
	
	
		
	public int getIdFuncionario() {
		return this.idFuncionario;
	}
	public void setIdFuncionario(int idFuncionario) {
		this.idFuncionario = idFuncionario;
	}
	public int getIdDepartamento() {
		return this.idDepartamento;
	}
	public void setIdDepartamento(int idDepartamento) {
		this.idDepartamento = idDepartamento;
	}
	public int getIdCargo() {
		return this.idCargo;
	}
	public void setIdCargo(int idCargo) {
		this.idCargo = idCargo;
	}
	public String getNome() {
		return this.nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSexo() {
		return this.sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getTipo() {
		return this.tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public Date getDtNascimento() {
		return this.dtNascimento;
	}
	public void setDtNascimento(Date dtNascimento) {
		this.dtNascimento = dtNascimento;
	}
	public String getDep_descricao() {
		return dep_descricao;
	}
	public void setDep_descricao(String dep_descricao) {
		this.dep_descricao = dep_descricao;
	}
	public String getCargo_descricao() {
		return cargo_descricao;
	}
	public void setCargo_descricao(String cargo_descricao) {
		this.cargo_descricao = cargo_descricao;
	}
	
}
