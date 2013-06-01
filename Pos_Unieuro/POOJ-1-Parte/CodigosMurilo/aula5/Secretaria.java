package aula5;

public class Secretaria extends Funcionario{

	@Override
	public void aumentaSalario(double valor) {
		this.salario = valor + (valor * 0.3);
		
	}

	@Override
	public void incluirHoraExtra(int hora) {
		this.horaExtra += hora + 1;
		
	}

	
	
	
}
