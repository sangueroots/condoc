 

//Fig. 14.17: AccountRecordSerializable.java
//Uma classe que representa um registro de informacoes.
//package com.deitel.jhtp6.ch14; // empacotada para reutiliza��o

import java.io.Serializable;

public class AccountRecordSerializable implements Serializable {
	private int account;
	private String firstName;
	private String lastName;
	private double balance;

	// construtor sem argumentos chama outro construtor com valores padr�o
	public AccountRecordSerializable() {
		this(0, "", "", 0.0);
	} // fim do construtor de AccountRecordSerializable com quatro argumentos

	// construtor com quatro argumentos inicializa um registro
	public AccountRecordSerializable(int acct, String first, String last,
			double bal) {
		setAccount(acct);
		setFirstName(first);
		setLastName(last);
		setBalance(bal);
	} // fim do construtor de AccountRecordSerializable com quatro argumentos
		// configura o n�mero de conta

	public void setAccount(int acct) {
		account = acct;
	} // fim do m�todo setAccount

	// obt�m n�mero da conta
	public int getAccount() {
		return account;
	} // fim do m�todo getAccount

	// configura o nome
	public void setFirstName(String first) {
		firstName = first;
	} // fim do m�todo setFirstName

	// obt�m o nome
	public String getFirstName() {
		return firstName;
	} // fim do m�todo getFirstName

	// configura o sobrenome
	public void setLastName(String last) {
		lastName = last;
	} // fim do m�todo setLastName
		// obt�m o nome

	public String getLastName() {
		return lastName;
	} // fim do m�todo getLastName

	// configura o saldo
	public void setBalance(double bal) {
		balance = bal;
	} // fim do m�todo setBalance

	// obt�m o saldo
	public double getBalance() {
		return balance;
	} // fim do m�todo getBalance
} // fim da classe AccountRecordSerializable