// Fig. 23.5: RunnableTester.java
// Impressão de múltiplas threads em diferentes intervalos.
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

public class RunnableTester
{
public static void main( String[] args )
{
// cria e nomeia cada executável
PrintTask task1 = new PrintTask( "thread1" );
PrintTask task2 = new PrintTask( "thread2" );
PrintTask task3 = new PrintTask( "thread3" );

System.out.println( "Starting threads" );

// cria ExecutorService para gerenciar threads
ExecutorService threadExecutor = Executors.newFixedThreadPool( 3 );

// inicia threads e coloca no estado executável
threadExecutor.execute( task1 ); // inicia task1
threadExecutor.execute( task2 ); // inicia task2
threadExecutor.execute( task3 ); // inicia task3

threadExecutor.shutdown(); // encerra as threads t
System.out.println( "Threads started, main ends\n" );
} // fim do main
} // fim da classe RunnableTester