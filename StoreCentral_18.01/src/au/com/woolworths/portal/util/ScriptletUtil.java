package au.com.woolworths.portal.util;

import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.LinkedList;

import net.sf.jasperreports.engine.JRDefaultScriptlet;

import com.google.common.base.Strings;


/**
 * 
 * @author xsvm1
 *
 */
public class ScriptletUtil extends JRDefaultScriptlet {
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
	 * The below method to check case insensitive @param str contains @param searchStr
	 * 
	 * 
	 * @param str
	 * @param searchStr
	 * @return
	 */
	public boolean containsIgnoreCase(String str, String searchStr) {
		if (str == null || searchStr == null) {
			return false;
		}
		int len = searchStr.length();
		int max = str.length() - len;
		for (int i = 0; i <= max; i++) {
			if (str.regionMatches(true, i, searchStr, 0, len)) {
				return true;
			}
		}
		return false;
	}
	public boolean containsCaseInsensitive(String src, String searchStr) {
		return Strings.isNullOrEmpty(src) || containsIgnoreCase(src, searchStr);
	}
	
	/**
	 * assert the number string arguments passed to this method should be multiple of 2
	 * 
	 * assert the string in odd position are considered the source string and 
	 * the string in even position are considered searchStr
	 * 
	 * @param str
	 * @return
	 */
	public boolean containsCaseInsensitiveVarArgs(String... str) {
		if(str!=null && str.length > 0 && str.length%2==0) {
			LinkedList<String> ll = new LinkedList<String>(Arrays.asList(str));
			return containsCaseInsensitiveOnList(ll);
		}
		return false;
	}
	private boolean containsCaseInsensitiveOnList(LinkedList<String> ll) {
		if(ll.size()%2==0) {
			String src = ll.remove();
			String searchStr = ll.remove();
			if(ll.size()>0) {
				return (Strings.isNullOrEmpty(searchStr) || containsIgnoreCase(src, searchStr)) && containsCaseInsensitiveOnList(ll);
			}
			else if(ll.size()==0) {
				return (Strings.isNullOrEmpty(searchStr) || containsIgnoreCase(src, searchStr));
			}
		}
		return false;
	}
	public String getCurrencyFmtd(Double val) {
		DecimalFormat df = new DecimalFormat("###0.00");
		return val==null?"0.00":df.format(val);
	}
	public boolean isValidTimeFormat(String time) {
		return CommonUtils.isValidTime24hhmmmss(time);
	}
}