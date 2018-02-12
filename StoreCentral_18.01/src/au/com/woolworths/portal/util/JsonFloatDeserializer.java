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

public class JsonFloatDeserializer extends JsonDeserializer<Float> {

	@Override
	public Float deserialize(JsonParser jsonparser, DeserializationContext arg1)
			throws IOException, JsonProcessingException {
		Float flt = null;
        String dblStr = jsonparser.getText();
        if(CommonUtils.isNumeric(dblStr)) {
        	flt = Float.parseFloat(dblStr);
        }
		return flt;
	}
}
