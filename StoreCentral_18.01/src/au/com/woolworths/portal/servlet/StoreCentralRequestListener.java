package au.com.woolworths.portal.servlet;

//import java.util.Enumeration;

import java.util.Enumeration;

import javax.servlet.ServletRequestEvent;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextListener;

import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.util.CacheManagerUtil;

public class StoreCentralRequestListener extends RequestContextListener {

	//private static final Logger logg = Logger
	//		.getLogger(StoreCentralRequestListener.class.getName());
	//@Value("#{jasperRprProps['reportSessionCacheEnabled']}")
	//private String reportSessionCacheEnabled;

	@Override
	public void requestDestroyed(ServletRequestEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void requestInitialized(ServletRequestEvent servletRequestEvent) {
		//long start = System.currentTimeMillis();
		if (JasperRptResponseHandlerUtil.isReportCacheEnabled(servletRequestEvent.getServletContext())) {
			HttpServletRequest request = (HttpServletRequest) servletRequestEvent
					.getServletRequest();
			HttpSession session = request.getSession();
			String url = request.getRequestURI().toUpperCase();
			//logg.info("url : "+url);
			if (url.endsWith(".HTM")||url.endsWith(".HTML")) {
				if("EHCACHE".equalsIgnoreCase(JasperRptResponseHandlerUtil.getReportCacheSource(session.getServletContext()))) {
					CacheManagerUtil.getInstance().remove(session.getId());
				} else {
					@SuppressWarnings("unchecked")
					Enumeration<Object> enames = session.getAttributeNames();
					while (enames.hasMoreElements()) {
						String name = (String)enames.nextElement();
						if (name.contains(session.getId())
								&& session.getAttribute(name) != null) {
							session.removeAttribute(name);
						}
					}
				}
			}
		}
		//long end = System.currentTimeMillis();
		//logg.info("Total request listener execution time : " + (end - start));
	}

}
