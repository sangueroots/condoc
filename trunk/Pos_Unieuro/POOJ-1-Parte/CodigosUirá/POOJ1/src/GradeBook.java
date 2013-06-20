/**
 * @author Uira – Representa um boletim de notas que armazena e analisa notas. –
 *         Não mantém valores de notas individuais. – A repetição dos cálculos
 *         exige a reinserção das mesmas notas. • Isso pode ser resolvido
 *         armazenando notas em um array.
 */
public class GradeBook {

	private String courseName; // nome do curso que essa GradeBook representa
	private int grades[]; // array de notas de aluno

	// construtor de dois argumentos inicializa courseName e array de notas
	public GradeBook(String name, int gradesArray[]) {
		courseName = name; // inicializa courseName
		grades = gradesArray; // armazena notas
	} // construtor de dois argumentos inicializa courseName e array de notas

	// método para configura o nome do curso
	public void setCourseName(String name) {
		courseName = name; // armazena o nome do curso
	} // fim do método setCourseName

	// método para recuperar o nome do curso
	public String getCourseName() {
		return courseName;
	} // fim do método getCourseName

	// exibe uma mensagem de boas-vindas para o usuário GradeBook
	public void displayMessage() {
		// getCourseName obtém o nome do curso
		System.out.printf("Welcome to the grade book for\n%s!\n\n",
				getCourseName());
	} // fim do método displayMessage

	// realiza várias operações nos dados
	public void processGrades() {
		// gera saída de array de notas
		outputGrades();

		// chama método getAverage para calcular a média
		System.out.printf("\nClass average is %.2f\n", getAverage());

		// chama métodos getMinimum e getMaximum
		System.out.printf("Lowest grade is %d\nHighest grade is %d\n\n",
				getMinimum(), getMaximum());

		// chama outputBarChart para imprimir gráfico de distribuição de nota
		outputBarChart();
	} // fim do método processGrades

	// encontra nota mínima
	public int getMinimum() {
		int lowGrade = grades[0]; // assume que grades[ 0 ] é a menor nota

		// faz um loop pelo array de notas
		for (int grade : grades) {
			// se nota for mais baixa que lowGrade, atribui-a a lowGrade
			if (grade < lowGrade)
				lowGrade = grade; // nova nota mais baixa
		} // for final

		return lowGrade; // retorna a menor nota
	} // fim do método getMinimum

	// localiza nota máxima
	public int getMaximum() {
		int highGrade = grades[0]; // assume que grades[ 0 ] é a maior nota

		// faz um loop pelo array de notas
		for (int grade : grades) {
			// se a nota for maior que highGrade, atribui essa nota a highGrade
			if (grade > highGrade)
				highGrade = grade; // nova nota mais alta
		} // for final

		return highGrade; // retornaa nota mais alta
	} // fim do método getMaximum

	// determina média para o teste
	public double getAverage() {
		int total = 0; // inicializa o total

		// soma notas de um aluno
		for (int grade : grades)
			total += grade;

		// retorna a média de notas
		return (double) total / grades.length;
	} // fim do método getAverage

	// gera a saída do gráfico de barras exibindo distribuição de notas
	public void outputBarChart() {
		System.out.println("Grade distribution:");

		// armazena freqüência de notas em cada intervalo de 10 notas
		int frequency[] = new int[11];

		// para cada nota, incrementa a freqüência apropriada
		for (int grade : grades)
			++frequency[grade / 10];

		// para cada freqüência de nota, imprime barra no gráfico
		for (int count = 0; count < frequency.length; count++) {
			// gera saída do rótulo de barra ( "00-09: ", ..., "90-99: ",
			// "100: " )
			if (count == 10)
				System.out.printf("%5d: ", 100);
			else
				System.out.printf("%02d-%02d: ", count * 10, count * 10 + 9);

			// imprime a barra de asteriscos
			for (int stars = 0; stars < frequency[count]; stars++)
				System.out.print("*");

			System.out.println(); // inicia uma nova linha de saída
		} // fim do for externo
	} // fim do método outputBarChart

	// gera a saída do conteúdo do array de notas
	public void outputGrades() {
		System.out.println("The grades are:\n");

		// gera a saída da nota de cada aluno
		for (int student = 0; student < grades.length; student++)
			System.out.printf("Student %2d: %3d\n", student + 1,
					grades[student]);
	} // fim do método outputGrades
	
	public static void main(String args[]) {
		// array de notas de aluno
		int gradesArray[] = { 87, 68, 94, 100, 83, 78, 85, 91, 76, 87 };

		GradeBook myGradeBook = new GradeBook(
				"CS101 Introduction to Java Programming", gradesArray);
		myGradeBook.displayMessage();
		myGradeBook.processGrades();
	} // fim de main
	
	

}// fim da classe GradeBook