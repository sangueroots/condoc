
/******************************************************************************
 * 1) Modifique o programa da tarefa 1 para que as possiveis excecoes sejam   *
 * capturadas e tratadas, evitando a interrupcao na execucao da calculadora.  *
 *                                                                            * 
 * @author (Murilo Silva Andrade Souza)                                       *
 * @version (0, 10-07-2013)                                                   *
 ******************************************************************************/

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import javax.swing.JOptionPane;

public class Calculadora2 {
	
	public void GravarResultado(String in){
			
			try {  
	            // Gravando no arquivo  
	            File arquivo;  
	            arquivo = new File("G:/pós graduação/Pos_Unieuro/POOJ-2-Parte/CodigosUirá/POOJ2/tmp/Gravando.txt");
	            
	            boolean exists = (arquivo.exists());  
	    	    if (exists) {  
	    	        
	    	        FileOutputStream fos = new FileOutputStream(arquivo); 
		            fos.write(in.getBytes());  
		            fos.close(); 
	    	    } else {  
	    	    	try {
	    	    		arquivo = new File("G:/pós graduação/Pos_Unieuro/POOJ-2-Parte/CodigosUirá/POOJ2/tmp/Gravando.txt");  
	    	    		FileReader reader = new FileReader("G:/pós graduação/Pos_Unieuro/POOJ-2-Parte/CodigosUirá/POOJ2/tmp/Gravando.txt");
	    	            //leitor do arquivo
	    	            BufferedReader leitor = new BufferedReader(reader);
	    	            while(true){
	    	              linha=leitor.readLine();
	    	              if(linha==null)
	    	                break;
	    	              mostra+=linha+"\n";
	    	            }
	    	          }
	    			} catch (IOException e) {
	    				// TODO: handle exception
	    				System.out.println(e.getMessage());
	    			}
	    	    }  
	            
	        }  
	        catch (Exception ee) {  
	            ee.printStackTrace();  
	        } 
		
		System.out.println("Gravado");
	}
	
	public void LerAquivo(File arquivo){
        // Lendo do arquivo  
		
		try {
	        
	        FileInputStream fis;
			fis = new FileInputStream(arquivo);
			int ln;  
	        while ( (ln = fis.read()) != -1 ) {  
	            System.out.print( (char)ln );  
	        }  
		    fis.close(); 
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  

	}
	
	
    public static void main(String args []){
        int i = 1;
        float res = 0;
        String operacao = "";
        Calculadora2 cal = new Calculadora2();
        
        int operador = 1;
        
		while (i < 3) {
        res = 0;
        
        String Operator = 
                JOptionPane.showInputDialog("1=Somar,2=Subtrair,3=Dividir, 4=Multiplicar, 0=Sair:");
        String firstNumber = 
            JOptionPane.showInputDialog("Digite o primeiro numero:");
        String secondNumber = 
                JOptionPane.showInputDialog("Digite o segundo numero:");
        
        
        float num1 = Integer.parseInt(firstNumber);
        operador = Integer.parseInt(Operator);
        float num2 = Integer.parseInt(secondNumber);
                       
        switch (operador){
        case 1:
         res = num1 + num2;
         operacao = "Adição\n";
         JOptionPane.showMessageDialog(null, "A soma dos valores : " + res,
                "Soma de dois numeros", JOptionPane.PLAIN_MESSAGE);
        break;
        case 2:
         res = num1 - num2; 
         operacao = "Subtração\n";
         JOptionPane.showMessageDialog(null, "A subtracao dos valores e: " + res,
                "Subtracao de dois numeros", JOptionPane.PLAIN_MESSAGE);
        break;
        case 3:
         res = num1 / num2; 
         operacao = "Divisão\n";
         JOptionPane.showMessageDialog(null, "A divisao dos valores e: " + res,
                "Divisao de dois numeros", JOptionPane.PLAIN_MESSAGE);
        break;
        case 4:
         res = num1 * num2; 
         operacao = "Multiplicação\n";
         JOptionPane.showMessageDialog(null, "A multiplicacao dos valores e: " + res,
                "Multiplicacao de dois numeros", JOptionPane.PLAIN_MESSAGE); 
        break;
        
        default:
        JOptionPane.showMessageDialog(null, "Digite 1 para somar, 2 para subtrair, 3 para dividir e/ou 4 para multiplicar"); 
       

        
    }
   i++;
   
   String in = "Operacao: " + operacao;
   in += "Primeiro número:" + firstNumber + '\n' + "Segundo número: " + secondNumber + '\n' + "Resultado: " + res;
   cal.GravarResultado(in);

   
}
       
}

}