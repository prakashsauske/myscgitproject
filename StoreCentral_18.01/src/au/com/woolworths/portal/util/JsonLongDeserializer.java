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

public class JsonLongDeserializer extends JsonDeserializer<Long> {

	@Override
	public Long deserialize(JsonParser jsonparser, DeserializationContext arg1)
			throws IOException, JsonProcessingException {
		Long lng = null;
        String dblStr = jsonparser.getText();
        if(CommonUtils.isNumeric(dblStr)) {
        	lng = Long.parseLong(dblStr);
        }
		return lng;
	}
}
