package au.com.woolworths.portal.reports;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Locale;

import au.com.woolworths.portal.util.CommonUtils;
import net.sf.jasperreports.engine.util.DefaultFormatFactory;

/**
 * 
 * @author xsvm1
 * @name Saravanakumar Venkatachalam
 *
 */

public class CustomNumberFormatFactory extends DefaultFormatFactory {
	@Override
	public NumberFormat createNumberFormat(String pattern, Locale locale) {
		NumberFormat format = null;
		if (CommonUtils.isNotNullNotEmptyNotWhiteSpace(pattern)) {
			if (locale == null) {
				format = NumberFormat.getNumberInstance();
			} else {
				format = NumberFormat.getNumberInstance(locale);
			}

			if (format instanceof DecimalFormat) {
				((DecimalFormat) format).applyPattern(pattern);
			}
			format.setRoundingMode(RoundingMode.HALF_UP);
		}
		return format;
	}
}
