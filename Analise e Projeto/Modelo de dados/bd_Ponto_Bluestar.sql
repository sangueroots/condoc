CREATE TABLE  "CARGO" 
   (	"IDCARGO" NUMBER, 
	"DESCRICAO" VARCHAR2(30)
   )
/


CREATE OR REPLACE TRIGGER  "TR_CARGO" 
before insert on cargo
for each row
begin

  select seqcargo.nextval into :NEW.idcargo from dual;

end;

/
ALTER TRIGGER  "TR_CARGO" ENABLE
/



CREATE TABLE  "DEPARTAMENTO" 
   (	"IDDEPARTAMENTO" NUMBER, 
	"DESCRICAO" VARCHAR2(40)
   )
/


CREATE OR REPLACE TRIGGER  "TR_DEPARTAMENTO" 
before insert on departamento
for each row
begin

  select seqdepartamento.nextval into :NEW.iddepartamento from dual;

end;

/
ALTER TRIGGER  "TR_DEPARTAMENTO" ENABLE
/


		
CREATE TABLE  "FERIADO" 
   (	"IDFERIADO" NUMBER, 
	"DATA" DATE, 
	 PRIMARY KEY ("IDFERIADO") ENABLE
   )
/


CREATE OR REPLACE TRIGGER  "TR_FERIADO" 
before insert on feriado
for each row
begin

  select seqferiado.nextval into :NEW.idferiado from dual;

end;

/
ALTER TRIGGER  "TR_FERIADO" ENABLE
/
