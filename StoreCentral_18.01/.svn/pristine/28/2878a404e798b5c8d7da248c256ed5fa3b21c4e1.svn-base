package au.com.woolworths.portal.util;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class JsonTimeSerializer extends JsonSerializer<String> {
	@Override
	public void serialize(String time, JsonGenerator jGen,
			SerializerProvider arg2) throws IOException,
			JsonProcessingException {
		jGen.writeString(time==null?time:time.substring(0, 5));
	}
}