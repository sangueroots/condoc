

import java.util.Random;
public class Arrays {

	public Arrays() {
		// TODO Auto-generated constructor stub
	}
	/*
	 * @description Metodo de impressão de gráfico de barras
	 */
	public void BarChar(){
		
		int array[] = {0,0,0,0,0,1,2,4,2,1};
		
		System.out.println("Distribuição de gotas");
		
		//para cada elemento do array, gera saída duma barra de gráfico
		for (int counter = 0; counter < array.length; counter++) {
			if (counter == 10) {
				System.out.printf("%5d:",100);
			} else {
				System.out.printf("%02d-%02d:",counter * 10, counter * 10 + 9);

			}
			
			//imprimi a barra de asterisos
			for (int star = 0; star < array[counter]; star++) {
				System.out.print("*");
			}
			
			System.out.println();
			
		} //fim do for externo
		
	}//fim do metodo
	
	public void RollDie(){
		
		Random randomNumbers = new Random(); // gerador de número aleatório
		int frequency[] = new int[ 7 ]; // array de contadores de freqüência

		// lança o dados 6000 vezes; usa o valor do dado como índice de freqüência
		for ( int roll = 1; roll <= 6000; roll++ ) 
		   ++frequency[ 1 + randomNumbers.nextInt( 6 ) ];

		System.out.printf( "%s%10s\n", "Face", "Frequency" );

		// gera saída do valor de cada elemento do array
		for ( int face = 1; face < frequency.length; face++ )
		   System.out.printf( "%4d%10d\n", face, frequency[ face ] );

		
	}
	/*
	 *  40 alunos avaliam a qualidade da comida:
		• Escala de avaliação de 1-10 — 1 significa
		horrível, 10 significa excelente
		Coloque 40 respostas no array de inteiros.
		– Resuma os resultados da enquete.
	 * 
	 * */
	public void StudentPoll() {
		// array de respostas da pesquisa
		int responses[] = { 1, 2, 6, 4, 8, 5, 9, 7, 8, 10, 1, 6, 3, 8, 6, 10,
				3, 8, 2, 7, 6, 5, 7, 6, 8, 6, 7, 5, 6, 6, 5, 6, 7, 5, 6, 4, 8,
				6, 8, 10 };
		int frequency[] = new int[11]; // array de contadores de freqüência

		// para cada resposta, seleciona elemento de respostas e usa esse valor
		// como índice de freqüência para determinar elemento a incrementar
		for (int answer = 0; answer < responses.length; answer++)
			++frequency[responses[answer]];

		System.out.printf("%s%10s\n", "Rating", "Frequency");

		// gera saída do valor de cada elemento do array
		for (int rating = 1; rating < frequency.length; rating++)
			System.out.printf("%d%10d\n", rating, frequency[rating]);
	} // fim de StudentPoll
	

	/*
	 * – Novo recurso do J2SE 5.0.
		– Permite iterar por elementos de um array ou
		por uma coleção sem utilizar um contador.
		– Sintaxe:
		for ( parâmetro : nomeDoArray )
		instrução
	 * */
	public void EnhancedForTest() {

		int array[] = { 87, 68, 94, 100, 83, 78, 85, 91, 76, 87 };
		int total = 0;

		// adiciona o valor de cada elemento ao total
		for (int number : array)
			total += number;

		System.out.printf("Total of array elements: %d\n", total);

	} // fim da classe EnhancedForTest
	
	// gera saída de linhas e colunas de um array bidimensional
	public static void outputArray(int array[][]) {
		// faz um loop pelas linhas do array
		for (int row = 0; row < array.length; row++) {
			// faz um loop pelas colunas da linha atual
			for (int column = 0; column < array[row].length; column++)
				System.out.printf("%d ", array[row][column]);

			System.out.println(); // inicia nova linha de saída
		} // fim do for externo
	} // fim do método outputArray
	
	public void InitArray() {
		// cria e gera saída de arrays bidimensionais	
		
		int array1[][] = { { 1, 2, 3 }, { 4, 5, 6 } };
		int array2[][] = { { 1, 2 }, { 3 }, { 4, 5, 6 } };

		System.out.println("Values in array1 by row are");
		outputArray(array1); // exibe array1 por linha

		System.out.println("\nValues in array2 by row are");
		outputArray(array2); // exibe array2 por linha
	} // fim de main

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Arrays arr = new Arrays();
		
		arr.StudentPoll();
		
	}

}
