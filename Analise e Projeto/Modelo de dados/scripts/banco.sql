CREATE TABLE  "TB_PROJETO" 
   (	"ID" NUMBER, 
	"DS_PROJETOS" VARCHAR2(4000), 
	 CONSTRAINT "TB_PROJETO_PK" PRIMARY KEY ("ID") ENABLE
   )
/


CREATE OR REPLACE TRIGGER  "BI_TB_PROJETO" 
  before insert on "TB_PROJETO"               
  for each row  
begin   
    select "TB_PROJETO_SEQ".nextval into :NEW.ID from dual; 
end; 

/
ALTER TRIGGER  "BI_TB_PROJETO" ENABLE
/


