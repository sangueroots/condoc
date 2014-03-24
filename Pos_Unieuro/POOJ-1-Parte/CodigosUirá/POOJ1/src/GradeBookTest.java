/**
 * @author Murilo
 * 
 */
public class GradeBookTest {

	/**
	 *
	 *
	 * @param args
	 */
	public static void main(String[] args) {
	

		GradeBook gradeBook1 = new GradeBook("CS101 Introduction to JAVA Programming","Paulo");		
		
		GradeBook gradeBook2 = new GradeBook("CS102 Data Structures in JAVA", "Joao");
		
				
		gradeBook1.displayMessage();		
		
		
		System.out.printf("gradeBook1 course name is: %s\n",
				gradeBook1.getCourseName());
		
		System.out.printf("gradeBook2 course name is: %s\n",
				gradeBook2.getCourseName());
			

	}

}
