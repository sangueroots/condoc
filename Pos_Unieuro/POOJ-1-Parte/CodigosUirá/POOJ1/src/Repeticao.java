

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
	
	public void para(){
		
		
		int result = 0;
		
		for (int cont = 0; cont < 10; cont++) {
			
			System.out.printf("%d    %d\n", cont, ++result);
		}
		
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Repeticao r = new Repeticao();
		
		System.out.println("Execu��o da instru��o While.\n");
		r.enquanto();
		System.out.println("\nExecu��o da instru��o For.\n");
		r.para();
		
	}

}
