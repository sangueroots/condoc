// Fig 23.10: SharedBufferTest.java
// Aplicativo mostra duas threads que manipulam um buffer não-sincronizado.
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SharedBufferTest
{
public static void main( String[] args )
{
// cria novo pool de threads com duas threads
ExecutorService application = Executors.newFixedThreadPool( 2 );

// cria UnsynchronizedBuffer para armazenar ints
Buffer sharedLocation = new UnsynchronizedBuffer();
System.out.println( "Action\t\tValue\tProduced\tConsumed" );
System.out.println( "------\t\t-----\t--------\t--------\n" );

// tenta iniciar as threads produtora e consumidora fornecendo acesso a cada uma
// para sharedLocation
try
{
application.execute( new Producer( sharedLocation ) );
application.execute( new Consumer( sharedLocation ) );
} // fim do try
catch ( Exception exception )
{
exception.printStackTrace();
} // fim do catch

application.shutdown(); // termina aplicativo quando as threads terminam
} // fim do main
} // fim da classe SharedBufferTest