/**************************************************************************
 * @autor Murilo Andrade                                                   *
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
 * @version 1.00 2014/03/23                                                *
 *************************************************************************/

import java.util.Scanner;
public class Tarefa5 {
	
	
	private String nome;
	private double horaTrabalhada;
	private double valorHora;
	private double salarioLiquido;
	
	public Tarefa5() {
		// TODO Auto-generated constructor stub
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
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		String posicao[] = {"primeiro", "segundo","terceiro"};
		
		for (int i = 0; i < 3; i++) {
			Scanner scan = new Scanner(System.in);
			
			System.out.println("Digite o nome do "+posicao[i]+" funcion�rio: ");
			String nome = scan.next();
					
			System.out.println("Digite o valor da quantidade de horas trabalhadas: ");
			int qtdHoras = scan.nextInt();
			
			System.out.println("Digite o valor por hora: ");
			double vlrHoras = scan.nextDouble();
			
			Tarefa5 t = new Tarefa5();
			
			t.setNome(nome);
			t.setHoraTrabalhada(qtdHoras);
			t.setValorHora(vlrHoras);
			
			System.out.printf("Nome do "+posicao[i]+" funcion�rio: %s\n\n", t.getNome());
			System.out.printf("Valor a receber: %s\n\n\n", t.calculaSalario(t.getValorHora(), t.getHoraTrabalhada()));	
			
		}
		

	}
	

}
