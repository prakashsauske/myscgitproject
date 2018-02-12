package au.com.woolworths.portal.servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 
 * @author xsvm1
 * @name Saravanakumar Venkatachalam
 *
 */

public class RequestProcessingTimeInterceptor extends HandlerInterceptorAdapter {
 
    private static final Logger logger = Logger
            .getLogger(RequestProcessingTimeInterceptor.class.getName());
 
    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
        long startTime = System.currentTimeMillis();
        logger.info("Push - Request URL::" + request.getRequestURL().toString()
                + ":: Start Time=" + startTime);
        request.setAttribute("startTime", startTime);
        //if returned false, we need to make sure 'response' is sent
        return true;
    }
 
    @Override
    public void postHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
    	logger.debug("Request URL::" + request.getRequestURL().toString()
                + " Sent to Handler :: Current Time=" + System.currentTimeMillis());
        //we can add attributes in the modelAndView and use that in the view page
    }
 
    @Override
    public void afterCompletion(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        long startTime = (Long) request.getAttribute("startTime");
        logger.debug("Request URL::" + request.getRequestURL().toString()
                + ":: End Time=" + System.currentTimeMillis());
        logger.info("Pop - Request URL::" + request.getRequestURL().toString()
                + ":: Elapsed Time to process in Milli Seconds = " + (System.currentTimeMillis() - startTime));
    }
 
}