import java.util.Scanner;

public class RetanguloTeste {

	public static void main(String[] args) {

		double perimetro;
		double area;

		Retangulo ret = new Retangulo();
		Scanner in = new Scanner(System.in);

		System.out.println("Informe o valor da base do retangulo.");
		ret.setLargura(in.nextDouble());

		System.out.println("Informe o valor da altura do retangulo.");
		ret.setAltura(in.nextDouble());

		perimetro = ret.calculaPerimetro(ret.getLargura(), ret.getAltura());
		area = ret.calculaArea(ret.getLargura(), ret.getAltura());

		System.out.printf("O perimetro do retangulo é : %s \n", perimetro);
		System.out.printf("A área do retangulo é : %s \n", area);

	}

}
