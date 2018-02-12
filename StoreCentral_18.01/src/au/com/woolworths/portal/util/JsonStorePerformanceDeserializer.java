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

public class JsonStorePerformanceDeserializer extends JsonDeserializer<String> {

	@Override
	public String deserialize(JsonParser jsonparser,
			DeserializationContext deserializationcontext) throws IOException,
			JsonProcessingException {

		String inputStr = jsonparser.getText();
		if (CommonUtils.isNotNullNotEmptyNotWhiteSpace(inputStr)
				&& "99".equalsIgnoreCase(inputStr.trim())) { // &&
																// !"#".equals(dateStr)
			return "0";
		}
		else {
			return inputStr;
		}
	}
}