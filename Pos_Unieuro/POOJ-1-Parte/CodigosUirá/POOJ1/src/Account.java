
/**
 * @author Uira
 *
 */

import java.io.ObjectInputStream.GetField;
import java.util.Scanner;

public class Account {

	private double balance;
	
//	contrutor
	public Account(double initialBalance) {
		
		if (initialBalance > 0.0) 
			balance = initialBalance;
		
	}
	
//	credita um valor a conta
	public void credit(double amount){
		balance = balance + amount;
	}
	
//  retorna o saldo da conta
	public double getBalance(){
		return balance;
	}
	/**
	 * @param args
	 * @return void
	 * @descripton Manipula a classe account
	 */
	public static void main(String[] args) {
		
		double deposito; //quantidade de deposito feita pelo usuario.
		
		Scanner s = new Scanner(System.in);
		
		Account conta1 = new Account(50.0);
		Account conta2 = new Account(-7.53);
		
		System.out.printf("Conta1 balanço: R$%.2f\n", conta1.getBalance());
		System.out.printf("Conta2 balanço: R$%.2f\n", conta2.getBalance());
		
		
		System.out.println("Informe o valor do depósito da conta1:");
		deposito = s.nextDouble();
		conta1.credit(deposito);
		
		
		System.out.println("Informe o valor do depósito da conta2:");
		deposito = s.nextDouble();
		conta2.credit(deposito);
		
//		mostra o saldo
		System.out.printf("O saldo da conta1 é: R$%.2f\n", conta1.getBalance());
		System.out.printf("O saldo da conta2 é: R$%.2f\n", conta2.getBalance());
		

	}

}
