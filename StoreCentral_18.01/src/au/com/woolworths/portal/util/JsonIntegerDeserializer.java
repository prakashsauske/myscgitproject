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

public class JsonIntegerDeserializer extends JsonDeserializer<Integer> {

	@Override
	public Integer deserialize(JsonParser jsonparser, DeserializationContext arg1)
			throws IOException, JsonProcessingException {
		Integer intgr = null;
        String dblStr = jsonparser.getText();
        if(CommonUtils.isNumeric(dblStr)) {
        	intgr = Integer.parseInt(dblStr);
        }
		return intgr;
	}
}
