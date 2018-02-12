package au.com.woolworths.portal.util;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

/**
 * @author xsvm1
 * 
 */

public class JsonTimeDeserializer extends JsonDeserializer<String> {

	@Override
	public String deserialize(JsonParser jsonparser, DeserializationContext arg1)
			throws IOException, JsonProcessingException {
        String strVal = jsonparser.getText();
        String newString = null;
        System.out.println("Inside Json strVal:" +strVal);
        if(strVal!=null && !strVal.equalsIgnoreCase("#")) {
        	try{
        	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		    Date parsedDate = dateFormat.parse(strVal);
		   // newString = new SimpleDateFormat("HH:mm").format(parsedDate);
		    newString = parsedDate.toString();
		    
        	}catch(Exception ex){
        		ex.printStackTrace();
        	}
        	return newString;
        }
        else {
        	strVal = "00:00:00";
        	return strVal;
        }
		
	}
}
