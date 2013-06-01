package aula5;

public class DadoEmpresa {

	public static void main(String[] args) {
		
		//Funcionario f = new Funcionario();
		//classes abstratas não podem ser instanciadas
	Funcionario f = new Secretaria();
	   //Quem herdou implementou - por isso chamamos secretaria
	f.salario = 300;
	f.nome = "Ana Mourão";
	f.horaExtra = 2;
	f.aumentaSalario(500);
	f.incluirHoraExtra(2);
	f.mostraInfo();
	
	Funcionario g = new Gerente();
	g.salario = 500;
	g.nome = "Roberto";
	g.horaExtra = 2;
	g.aumentaSalario(300);
	g.incluirHoraExtra(3);
	g.mostraInfo();
	
	/*Funcionario h = new Diretor();
	h.salario = 500;
	h.nome = "Roberto";
	h.horaExtra = 2;
	h.aumentaSalario(300);
	h.incluirHoraExtra(3);
	h.mostraInfo();
	*/
	
	
	}
	
}
