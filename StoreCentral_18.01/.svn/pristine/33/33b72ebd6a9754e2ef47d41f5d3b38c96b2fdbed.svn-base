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

public class JsonDoubleDeserializer extends JsonDeserializer<Double> {

	@Override
	public Double deserialize(JsonParser jsonparser, DeserializationContext arg1)
			throws IOException, JsonProcessingException {
		Double dbl = null;
        String dblStr = jsonparser.getText();
        if(CommonUtils.isNumeric(dblStr)) {
        	dbl = Double.parseDouble(dblStr);
        }
		return dbl;
	}

}
