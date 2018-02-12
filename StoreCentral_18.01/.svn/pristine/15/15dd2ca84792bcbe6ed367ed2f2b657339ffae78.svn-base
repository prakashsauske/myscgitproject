package au.com.woolworths.portal.util;

import java.text.DecimalFormat;
import java.text.NumberFormat;

public class TimeAcumm {
    private long timeInMilliSecond = 0;
	public TimeAcumm() {
	}
    public TimeAcumm(String time) {
    	timeInMilliSecond = getTimeInMillis(time);
	}
    
    public long getTimeInMilliSecond() {
		return timeInMilliSecond;
	}
	public void setTimeInMilliSecond(long timeInMilliSecond) {
		this.timeInMilliSecond = timeInMilliSecond;
	}
	private long getTimeInMillis(String time) {
		long milliSec = 0;
    	if(isValidNegTimemmmss(time)==true) {
    		int neg = 1;
    		if("-".equals(time.substring(0, 1))) {
    			time = time.substring(1);
    			neg = -1;
    		}
            final String[] parts = time.split(":");
            milliSec = (Integer.parseInt(parts[0])*3600+Integer.parseInt(parts[1])*60+Integer.parseInt(parts[2])*1) * neg;
    	}
    	return milliSec;
	}

    public TimeAcumm incrementFromFormattedString(final String time) {
    	this.timeInMilliSecond = this.timeInMilliSecond + getTimeInMillis(time);
        return this;
    }

    public void divideBy(int num) {
    	if(num!=0) {
	    	this.timeInMilliSecond = Math.round((double)timeInMilliSecond / (double)num);
    	}
	}

    public void divideBy(long lng) {
    	if(lng!=0) {
	    	this.timeInMilliSecond = Math.round((double)timeInMilliSecond / (double)lng);
    	}
	}

    @Override
    public String toString() {
    	String neg = "";
    	if(timeInMilliSecond<0){
    		neg = "-";
    	}
    	long tmpMilliSec = Math.abs(timeInMilliSecond);
    	long hours = (long) Math.floor(tmpMilliSec/3600);
    	long mins = (long) Math.floor((tmpMilliSec - (hours * 3600))/60);
    	long secs = tmpMilliSec - (hours * 3600) - (mins * 60);
    	NumberFormat nf = new DecimalFormat("00");
        final String s = neg + nf.format(hours) + ":" + nf.format(mins) + ":" + nf.format(secs);
        return s;
    }
	public static boolean isValidNegTime24hhmmmss(String time) {
		return time!=null?time.matches("-?([01]\\d|2[0-3]):?([0-5]\\d)(:?([0-5]\\d))?"):false;
	}
	public static boolean isValidNegTimemmmss(String time) {
		return time!=null?time.matches("-?(\\d+):?([0-5]\\d)(:?([0-5]\\d))?"):false;
	}
}