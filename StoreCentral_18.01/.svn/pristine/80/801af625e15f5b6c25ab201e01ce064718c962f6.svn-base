package au.com.woolworths.portal.util;

import java.io.IOException;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

/**
 * @author xsvm1
 * 
 */


public class JsonAbsStringDeserializer extends JsonDeserializer<String> {
    @Override
    public String deserialize(JsonParser jsonparser,
            DeserializationContext deserializationcontext) throws IOException, JsonProcessingException {

        String str = jsonparser.getText();
        String retStr = "0.0";
    	if(CommonUtils.isNumeric(str)) { 
        	double dbl = Math.abs(Double.parseDouble(str));
        	retStr = String.valueOf(dbl);
    	}
        return retStr;
    }
}