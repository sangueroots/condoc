package br.inf.bluestar.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public final class DataUtil {
	
	public static Date getData(String ano, String mes, String dia){
		StringBuilder dtStr = new StringBuilder();
		dtStr.append(ano);
		dtStr.append("/");
		dtStr.append(mes);
		dtStr.append("/");
		dtStr.append(dia);
		Date dt = new Date (dtStr.toString());
		return dt;
	}
	
	public static Date getDate(String data){
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		try {
			return sdf.parse(data);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public static String getDataString(Date data){
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		
		return sdf.format(data).toString();
	}


}
