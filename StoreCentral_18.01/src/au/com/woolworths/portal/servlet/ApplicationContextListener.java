package au.com.woolworths.portal.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import au.com.woolworths.portal.util.CacheManagerUtil;

/**
 * 
 * @author xsvm1
 * @name Saravanakumar Venkatachalam
 *
 */

public class ApplicationContextListener implements ServletContextListener {

	private static final Logger LOGGER = Logger
	.getLogger(ApplicationContextListener.class.getName());
	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		LOGGER.info("Application Context Starting up!");
		CacheManagerUtil.initialize();
	}

	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		LOGGER.info("Application Context Shutting down!");
		CacheManagerUtil.getInstance().getManager().shutdown();
	}
}