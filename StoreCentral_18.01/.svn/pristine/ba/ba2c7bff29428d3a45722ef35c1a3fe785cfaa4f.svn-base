package au.com.woolworths.portal.util;

import java.io.IOException;
import java.util.Set;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class JsonSetSerializer extends JsonSerializer<Set<String>> {
	@Override
	public void serialize(Set<String> set, JsonGenerator jGen,
			SerializerProvider arg2) throws IOException,
			JsonProcessingException {
		jGen.writeString(set==null?"0":set.size()+"");
	}
 
}