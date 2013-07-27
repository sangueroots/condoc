// Fig. 23.4: PrintTask.java
// Classe PrintTask dorme por um tempo aleatório de 0 a 5 segundos
import java.util.Random;

class PrintTask implements Runnable
{
private int sleepTime; // tempo de adormecimento aleatório para a thread
private String threadName; // nome da thread
private static Random generator = new Random();

// atribui nome à thread
public PrintTask( String name )
{
threadName = name; // configura nome da thread

// seleciona tempo de adormecimento aleatório entre 0 e 5 segundos
sleepTime = generator.nextInt( 5000 );
} // fim do construtor PrintTask
// método run é o código a ser executado pela nova thread
public void run()
{
try // coloca a thread para dormir a pela quantidade de tempo sleepTime
{
System.out.printf( "%s going to sleep for %d milliseconds.\n",
threadName, sleepTime );

Thread.sleep( sleepTime ); // coloca a thread para dormir
} // fim do try
// se a thread foi interrompida enquanto dormia, imprime o rastreamento de pilha
catch ( InterruptedException exception )
{
exception.printStackTrace();
} // fim do catch

// imprime o nome da thread
System.out.printf( "%s done sleeping\n", threadName );
} // fim do método run
} // fim da classe PrintTask