/**************************************************************************
 * @autor Uir� Peixoto                                                     *
 * Tarefa 5 - Desenvolva um aplicativo em Java que                         * 
 * 1.determina o sal�rio bruto semanal de 3 funcion�rios.                  *
 * 2. Seu aplicativo deve ler:                                             *
 *       usu�rio                                                           *
 *       n�mero de horas trabalhadas na semana                             *
 *	     valor da hora de cada um dos funcion�rios.                        *
 * 3. A companhia paga o valor integral da hora para as primeiras 40 horas *
 * trabalhadas na semana para cada funcion�rio,                            *
 * e uma vez e meia por hora adicional.                                    *
 * 4. Ap�s o c�lculo dos sal�rios dos 3 funcion�rios, o programa deve      * 
 * imprimir na tela de comando esses valores.                              *
 *                                                                         *
 *                                                                         *
 * @version 1.00 2013/06/01                                                *
 *************************************************************************/


public class Tarefa5 {
	
	
	private String nome;
	private double horaTrabalhada;
	private double valorHora;
	private double salarioLiquido;
	
	public Tarefa5(String nome, double horaTrabalhada,
			double valorHora) {
		
		this.nome = nome;
		this.horaTrabalhada = horaTrabalhada;
		this.valorHora = valorHora;
		
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}

	public double getHoraTrabalhada() {
		return horaTrabalhada;
	}


	public void setHoraTrabalhada(double horaTrabalhada) {
		this.horaTrabalhada = horaTrabalhada;
	}


	public double getValorHora() {
		return valorHora;
	}


	public void setValorHora(double valorHora) {
		this.valorHora = valorHora;
	}


	
	
	public Tarefa5() {
		// TODO Auto-generated constructor stub
	}
	
	public double calculaSalario(double valorHora, double horasTrabalhada){
		
		double subTotal;
		double horaExtra;
		
		if(horaTrabalhada <= 40){
		
			salarioLiquido = horaTrabalhada * valorHora;
		
		}else{
			
			subTotal = 40 * valorHora;
			horaExtra = (horaTrabalhada - 40) * (1.5 * valorHora);
			salarioLiquido = subTotal + horaExtra;
		}
		
		return salarioLiquido;
		
	}

}
