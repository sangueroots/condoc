import java.util.Scanner;

public class Tarefa5Teste {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Scanner scan = new Scanner(System.in);
		
		System.out.println("Digite o nome do funcionário: ");
		String nome = scan.next();
				
		System.out.println("Digite o valor da quantidade de horas trabalhadas: ");
		int qtdHoras = scan.nextInt();
		
		System.out.println("Digite o valor por hora: ");
		double vlrHoras = scan.nextDouble();
		
		
		Tarefa5 t = new Tarefa5();
		
		t.setNome(nome);
		t.setHoraTrabalhada(qtdHoras);
		t.setValorHora(vlrHoras);
		
		
		System.out.printf("Nome do funcionário: %s\n\n", t.getNome());
		System.out.printf("Valor a receber: %s\n", t.calculaSalario(t.getValorHora(), t.getHoraTrabalhada()));

	}

}
