package aula5;

//CLASSE ABSTRATA - AULA 5

public abstract class Funcionario {

	public double salario;
	public String nome;
	public int horaExtra;
	
	public abstract void aumentaSalario(double valor);
	public abstract void incluirHoraExtra(int hora);
	
	public void mostraInfo(){
		System.out.println("Nome:" +this.nome);
		System.out.println("Salario:" +this.salario);
		System.out.println("Hora:" +this.horaExtra);
	
	}
	
	
	
}
