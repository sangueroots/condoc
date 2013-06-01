/**
 * @author Uira
 * 
 */
public class GradeBook {
	
	private String courseName;
	private String teacherName;

	
	public GradeBook(String name, String teacher) {
		courseName = name;
		teacherName = teacher;
	

	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String name) {
		courseName = name;
	}
	
	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacher) {
		teacherName = teacher;
	}


	public void displayMessage() {
		
		System.out.printf("Welcome to the grade book for \n%s!\n",
				getCourseName());
		
		System.out.printf("Este curso � apresentado por : %s\n", getTeacherName()) ;
	}
	
}