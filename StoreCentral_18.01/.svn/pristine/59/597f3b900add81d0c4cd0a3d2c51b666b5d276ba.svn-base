package au.com.woolworths.portal.util;

import java.io.IOException;
import java.util.Date;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

/**
 * @author xsvm1
 * 
 */

public class JsonMilliSecToDateDeserialiser extends JsonDeserializer<Date>  {
	private static final Logger LOGGER = Logger
	.getLogger(JsonMilliSecToDateDeserialiser.class.getName());
    @Override
    public Date deserialize(JsonParser jsonparser,
            DeserializationContext deserializationcontext) throws IOException, JsonProcessingException {

        String dateStr = jsonparser.getText();
        Date dt = null;
        try {
        	if(CommonUtils.isValidDateFrmService(dateStr)) { //&& !"#".equals(dateStr)
        		dt = new Date(Long.parseLong(dateStr.replaceAll("\\D+","")));
        	}
        } catch (NumberFormatException e) {
        	LOGGER.error("Unparsable date string hence using the null value for date : "+dateStr);
        }
        return dt;
    }
}
