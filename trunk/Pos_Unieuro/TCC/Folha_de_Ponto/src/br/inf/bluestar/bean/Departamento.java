package br.inf.bluestar.bean;


public class Departamento {

	private int idDepartamento;
	private String descricao;
	
	
	public Departamento() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Departamento(int idDepartamento) {
		super();
		this.idDepartamento = idDepartamento;
	}
	public int getIdDepartamento(){
		return this.idDepartamento;
	}
	public void setIdDepartamento(int idDepartamento){
		this.idDepartamento = idDepartamento;
	}
	public String getDescricao(){
		return this.descricao;
	}
	public void setDescricao(String descricao){
		this.descricao = descricao;
	}
	public String toString() {     
	      return this.getDescricao();
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + idDepartamento;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Departamento other = (Departamento) obj;
		if (idDepartamento != other.idDepartamento)
			return false;
		return true;
	}
	
	
	
}
