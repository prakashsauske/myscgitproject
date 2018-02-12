package au.com.woolworths.portal.util;

import java.io.IOException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import au.com.woolworths.portal.reports.ReportGlobalVariables;

import com.google.common.base.Strings;
import com.rits.cloning.Cloner;

public class CommonUtils {

	public static String convertObjectTojson(Object javaObj) {
		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, javaObj);

		} catch (JsonGenerationException e1) {
			e1.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}*/

		return "{\"data\":" + Constants.convertToJsonString(javaObj)+ "}";
	}
	public static Object convertJsonToObject(String jsonStr) {
		Object obj = new Object();
		ObjectMapper mapper = null;
		try {
			mapper = new ObjectMapper();
			obj=mapper.readValue(jsonStr, Object.class);
			System.out.println(Constants.convertToJsonString(obj));
		} catch (JsonGenerationException e1) {
			e1.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return obj;
	}
	/**
	 * Demonstrate checking for String that is not null, not empty, and not
	 * white space only using Guava.
	 * 
	 * @param string
	 *            String to be checked for not null, not empty, and not white
	 *            space only.
	 * @return {@code true} if provided String is not null, is not empty, and
	 *         has at least one character that is not considered white space.
	 */
	public static boolean isNotNullNotEmptyNotWhiteSpace(final String string) {
		return !Strings.isNullOrEmpty(string) && !string.trim().isEmpty();
	}
	/**
	 * Demonstrate checking for String that is not null and not empty
	 * only using Guava.
	 * 
	 * @param string
	 *            String to be checked for not null, not empty only.
	 * @return {@code true} if provided String is not null, is not empty, 
	 *         that is not considered white space.
	 */
	public static boolean isNotNullNotEmpty(final String string) {
		return !Strings.isNullOrEmpty(string);
	}
	/**
	 * Demonstrate checking for String that is null or empty or white space
	 * only using Guava.
	 * 
	 * @param string
	 *            String to be checked for  null or empty or white space
	 * @return {@code true} if provided String is not null, is not empty, and
	 *         has at least one character that is not considered white space.
	 */
	public static boolean isNullEmptyWhiteSpace(final String string) {
		return Strings.isNullOrEmpty(string) || string.trim().isEmpty();
	}
	/**
	 * Demonstrate checking for String that is null or empty
	 * only using Guava.
	 * 
	 * @param string
	 *            String to be checked for null, empty
	 * @return {@code true} if provided String is null or is empty, and
	 *         has at least one character that is not considered white space.
	 */
	public static boolean isNullEmpty(final String string) {
		return Strings.isNullOrEmpty(string);
	}
	/**
	 * This method is to get the duplicate copy of a bean list
	 * @param list
	 * @return
	 */
	public static <T> List<T> getCopyOfBeanList(
			List<T> list) {
		List<T> copy = new ArrayList<T>();
		Cloner cloner = new Cloner();
		for (T t : list) {
			copy.add(cloner.deepClone(t));
		}
		return copy;
	}
	public static String timeDifference(Date dateObj1, Date dateObj2) {
		long rtnString = 0;
		long duration=dateObj2.getTime()-dateObj1.getTime();
		rtnString=TimeUnit.MILLISECONDS.toSeconds(duration);
		
       // return String.valueOf("sec="+rtnString+",milli sec="+duration);
		 return String.valueOf("seconds="+rtnString);
    }
	
	/**
	 * 
	 * check weather a string is numeric
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNumeric(String str)	{
	  return str!=null?str.matches("-?\\d+(\\.\\d+)?"):false;  //match a number with optional '-' and decimal.
	}
	/**
	 * 
	 * This methods return double type value for the string representation, 
	 * if the string is not a valid number or null, will return 0.0
	 * 
	 * @param str
	 * @return
	 */
	public static double getNumericVal(String str) {
		if(CommonUtils.isNumeric(str)) {
			return Double.parseDouble(str);
		}
		else return 0.0;
	}
	public static boolean isValidTime24hhmmmss(String time) {
		return time!=null?time.matches("([01]\\d|2[0-3]):?([0-5]\\d)(:?([0-5]\\d))?"):false;
	}
	public static boolean isValidNegTime24hhmmmss(String time) {
		return time!=null?time.matches("-?([01]\\d|2[0-3]):?([0-5]\\d)(:?([0-5]\\d))?"):false;
	}
	public static boolean isValidNegTimemmmss(String time) {
		return time!=null?time.matches("-?(\\d+):?([0-5]\\d)(:?([0-5]\\d))?"):false;
	}
	public static boolean isValidDateFrmService(String str) {
		return str!=null?str.matches("/[Dd][Aa][Tt][Ee]\\(\\d+\\)/"):false;
	}	
	public static boolean isEmpty(String inputString){
		boolean rtnFlag = false;
		if(null == inputString || inputString.isEmpty()){
			rtnFlag = true;
		}		
		return rtnFlag;
	}
	public static String formatTo3DecimalPlaces(String inputString){
		NumberFormat threeDecimalformatter = new DecimalFormat("#0.000");  
		if(!CommonUtils.isEmpty(inputString)){
			return threeDecimalformatter.format(Double.parseDouble(inputString));
		}
		return "";
	}
	public static String formatTo2DecimalPlaces(String inputString){
		NumberFormat threeDecimalformatter = new DecimalFormat("#0.00");  
		if(!CommonUtils.isEmpty(inputString)){
			return threeDecimalformatter.format(Double.parseDouble(inputString));
		}
		return "";
	}
	public static Date addDays(Date date,int amountDays){
		Calendar cal = null;
		try {
			cal = Calendar.getInstance();
			cal.setTime(date);
			cal.add(Calendar.DATE, amountDays); //minus number would decrement the days
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		return cal.getTime();
	}
	public static String convertDateToDefaultFormat(String inputDateString){
		String formattedDateString = "";
		Date inputDate = new Date();
		try {
			if(!isEmpty(inputDateString)){
				if(inputDateString.indexOf("-") > -1){
					if(inputDateString.length() == 10){//assume yyyy-MM-dd format
						inputDate = ReportGlobalVariables.DEFAULT_DATE_FORMAT_SQL.parse(inputDateString);//converting string to date
						formattedDateString = ReportGlobalVariables.DEFAULT_DATE_FORMAT_BW.format(inputDate);
					}else if(inputDateString .length() == 19){//assume yyyy-MM-dd hh:mm:ss format
						inputDate = ReportGlobalVariables.DEFAULT_DATE_TIME_FORMAT_SQL.parse(inputDateString);//converting string to date
						formattedDateString = ReportGlobalVariables.DEFAULT_DATE_FORMAT_BW.format(inputDate);
					}					
				}
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return formattedDateString;
		
	}
}
