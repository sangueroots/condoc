package aula5;

public class Gerente extends Funcionario implements FuncionarioControle, FinanceiroControle{

	@Override
	public void aumentaSalario(double valor) {
		
		this.salario = valor + (valor * 0.1);
		
	}

	@Override
	public void incluirHoraExtra(int hora) {
		this.horaExtra += hora;
		
	}

	@Override
	public void validaUsuario(String login, String senha) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void CadastraUsuario(Object dado) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deletaUsuario(Object dado) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void descontosSalario() {
		// TODO Auto-generated method stub
		
	}

	
	
	
	
}
