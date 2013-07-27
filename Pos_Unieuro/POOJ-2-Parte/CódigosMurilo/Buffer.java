// Fig. 23.6: Buffer.java
// Interface Buffer especifica métodos chamados por Producer e Consumer.

public interface Buffer
{
public void set( int value ); // coloca o valor int no Buffer
public int get(); // retorna o valor int a partir do Buffer
} // fim da interface Buffer