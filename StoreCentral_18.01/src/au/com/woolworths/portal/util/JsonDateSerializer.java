package au.com.woolworths.portal.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * @author xsvm1
 * 
 */

public class JsonDateSerializer extends JsonSerializer<Date> {
    private static SimpleDateFormat formatter = 
      new SimpleDateFormat("dd/MM/yyyy");
 
	@Override
	public void serialize(Date value, JsonGenerator jGen, SerializerProvider serPrvd)
			throws IOException, JsonProcessingException {
		jGen.writeString(formatter.format(value));
		
	}
}