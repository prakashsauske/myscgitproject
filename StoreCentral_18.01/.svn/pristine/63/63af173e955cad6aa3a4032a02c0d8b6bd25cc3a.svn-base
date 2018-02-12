package au.com.woolworths.portal.aspect;

import java.io.IOException;
//import java.net.InetAddress;
//import java.net.UnknownHostException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//import org.apache.log4j.Logger;
import org.slf4j.MDC;

import au.com.woolworths.portal.model.UserContext;
//import au.com.woolworths.portal.service.LoginServiceImpl;

public class LogSessionIdFilter implements Filter {
	
	//private static final Logger LOGGER = Logger.getLogger(LogSessionIdFilter.class
		//	.getName());
	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		try {
			HttpSession session = httpRequest.getSession(false);
			if (session != null) {
				UserContext user = ((UserContext) session.getAttribute("user"));
				String username = (user) != null ? user.getUserId() : "";
				MDC.put("USER_NAME", username);
				MDC.put("SESSION_ID", session.getId());
				MDC.put("sessionID", session.getId());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		chain.doFilter(request, response);
		//updateSessionLog(httpRequest);
	}
	
	/*private void updateSessionLog(HttpServletRequest request){
		
		String session_seq = request.getParameter("session_seq");
		if(request.getMethod().equalsIgnoreCase("GET") && session_seq!=null && !session_seq.isEmpty()){
			String login_session_id = request.getParameter("user_session");
			String login_remote_ip = request.getParameter("remote_ip");
			String remote_ip = request.getRemoteAddr();
			String session_id = request.getRequestedSessionId();
			String is_active = "N";
			String is_kick_out = "N";*/
			
			/*if((session_id!=null && login_session_id!=null && !session_id.equals(login_session_id)) || (remote_ip!=null && login_remote_ip!=null && !remote_ip.equals(login_remote_ip))){
				is_kick_out = "Y";
			}*/
			/*if(session_id!=null && login_session_id!=null && session_id.equals(login_session_id)){
				is_active = "Y";
			}
			if((session_id!=null && login_session_id!=null && !session_id.equals(login_session_id)) || (remote_ip!=null && login_remote_ip!=null && !remote_ip.equals(login_remote_ip))){
				try {
					LoginServiceImpl.logSessionId(request.getParameter("session_seq"),
							"", "", "", "", request.getParameter("c_user_id"),
							session_id, (String)request.getRemoteAddr(),
							InetAddress.getLocalHost().getHostName(), "Y", is_active, false);
				} catch (UnknownHostException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}*/

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}
}
