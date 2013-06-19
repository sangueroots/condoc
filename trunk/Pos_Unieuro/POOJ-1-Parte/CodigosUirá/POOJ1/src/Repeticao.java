

/**
 * @author Uira
 *
 */
public class Repeticao {

	/**
	 * @param args
	 */
	
	
	public void enquanto(){
		
		int result = 0;
		int cont = 0;
		
		while (cont < 10){
			
			System.out.printf("%d    %d\n", cont++, ++result);
			
		}	
	}
	
	public void forCounter(){
		
		int total = 0;
		
		for ( int number = 2; number <= 20; total += number, number += 2 );	
		System.out.println(total);
	}
	
	public void Interest(){
		
		double montante;
		double principal = 1000.0;
		double taxa = 0.07;
		 
		System.out.printf( "%s%20s\n", "Ano    -  ", "montante depositado." );
		
		for (int ano = 0; ano <=10; ano++) {
			
//			Calcula a nova quantidade durante o ano especificado
			montante = principal * Math.pow(1.0 + taxa, ano);
			
//			Exibe o ano e a quantidade
			System.out.printf( "%4d%,20.2f\n", ano, montante);
			
		}//fim do for
		
	}//fim do metodo interest
	
	public void para(){
		
		int result = 0;
		
		for (int cont = 0; cont < 10; cont++) {
			
			System.out.printf("%d    %d\n", cont, ++result);
			
		}
		
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Repeticao r = new Repeticao();
		
//		System.out.println("Execução da instrução While.\n");
//		r.enquanto();
//		System.out.println("\nExecução da instrução For.\n");
//		r.para();
//		System.out.println("\nExecução da instrução ForCount.\n");
//		r.forCounter();
		System.out.println("\nExecução da instrução interest.\n");
		r.Interest();
		
	}

}
