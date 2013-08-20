package br.inf.bluestar.bean;

public class Cargo {

	private int idcargo;
	private String descricao;
	private boolean status;
	
	public Cargo(){
		super();
	}
	public Cargo (int idcargo){
		super();
		this.idcargo = idcargo;
	}
	
	
	public boolean isStatus (){
		return this.status;
	}
	
	public void setStatus(boolean status){
		this.status = status;
	}
		
	public int getIdcargo() {
		return this.idcargo;
	}
	public void setIdcargo(int idcargo) {
		this.idcargo = idcargo;
	}
	public String getDescricao() {
		return this.descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String toString() {     
	      return this.getDescricao();
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + idcargo;
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
		Cargo other = (Cargo) obj;
		if (idcargo != other.idcargo)
			return false;
		return true;
	}
	
}
