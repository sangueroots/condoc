// Fig. 23.11: SynchronizedBuffer.java
// SynchronizedBuffer sincroniza acesso a um único inteiro compartilhado.
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;

public class SynchronizedBuffer implements Buffer
{
// Bloqueio para controlar sincronização com esse buffer
private Lock accessLock = new ReentrantLock();

// condições para controlar leitura e gravação
private Condition canWrite = accessLock.newCondition();
private Condition canRead = accessLock.newCondition();

private int buffer = -1; // compartilhado pelas threads producer e consumer
private boolean occupied = false; // se o buffer estiver ocupado

// coloca o valor int no buffer
public void set( int value )
{
accessLock.lock(); // bloqueia esse objeto
// envia informações de thread e de buffer para a saída, então espera
try
{
// enquanto o buffer não estiver vazio, coloca thread no estado de espera
while ( occupied )
{
System.out.println( "Producer tries to write." );
displayState( "Buffer full. Producer waits." );
canWrite.await(); // espera até que o buffer esteja vazio
} // end while

buffer = value; // configura novo valor de buffer

// indica que a produtora não pode armazenar outro valor
// até a consumidora recuperar valor atual de buffer
occupied = true;
displayState( "Producer writes " + buffer );

// sinaliza a thread que está esperando para ler a partir do buffer
canRead.signal();
} // fim do try
catch ( InterruptedException exception )
{
exception.printStackTrace();
} // fim do catch
finally
{
accessLock.unlock(); // desbloqueia esse objeto
} // fim do finally
} // fim do método set

// retorna valor do buffer
public int get()
{
int readValue = 0; // inicializa de valor lido a partir do buffer
accessLock.lock(); // bloqueia esse objeto
// envia informações de thread e de buffer para a saída, então espera
try
{
// enquanto os dados não são lidos, coloca thread em estado de espera
while ( !occupied )
{
System.out.println( "Consumer tries to read." );
displayState( "Buffer empty. Consumer waits." );
canRead.await(); // espera até o buffer tornar-se cheio
} // fim do while

// indica que a produtora pode armazenar outro valor
// porque a consumidora acabou de recuperar o valor do buffer
occupied = false;

readValue = buffer; // recupera o valor do buffer
displayState( "Consumer reads " + readValue );
// sinaliza a thread que está esperando o buffer tornar-se vazio
canWrite.signal();
} // fim do try
// se a thread na espera tiver sido interrompida, imprime o rastreamento de pilha
catch ( InterruptedException exception )
{
exception.printStackTrace();
} // fim do catch
finally
{
accessLock.unlock(); // desbloqueia esse objeto
} // fim do finally

return readValue;
} // fim do método get

// exibe a operação atual e o estado de buffer
public void displayState( String operation )
{
System.out.printf( "%-40s%d\t\t%b\n\n", operation, buffer,
occupied );
} // fim do método displayState
} // fim da classe SynchronizedBuffer