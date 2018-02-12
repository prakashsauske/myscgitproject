package au.com.woolworths.portal.servlet;

import java.util.Enumeration;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

public class MyServletListener implements ServletRequestListener {

	private static final Logger logg = Logger.getLogger(MyServletListener.class.getName());
	@Override
	public void requestDestroyed(ServletRequestEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void requestInitialized(ServletRequestEvent servletRequestEvent) {
        HttpServletRequest request = (HttpServletRequest) servletRequestEvent.getServletRequest();
        HttpSession session = request.getSession();
        Enumeration<Object> enames;
        enames = session.getAttributeNames();
        String url =  request.getRequestURI();
        logg.info("Url: " + url);
        logg.info("Session object : "+session.getId());
        while (enames.hasMoreElements()) {
            String name = (String) enames.nextElement();
            String value = "" + session.getAttribute(name);
            System.out.println(name+"---"+value);
        }
	}

}
