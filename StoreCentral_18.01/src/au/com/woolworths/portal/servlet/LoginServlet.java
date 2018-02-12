package au.com.woolworths.portal.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import au.com.woolworths.portal.util.PortalUtil;

public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		//System.out.println("getRequestURI " + request.getRequestURI());
		String URL = request.getRequestURI();
		String a[] = URL.split("/");

		for (int i = 0; i < a.length; i++) {
			//System.out.println("a" + i + "=" + a[i]);
		}
		if (a[2].equalsIgnoreCase(PortalUtil.SM_SALES_ORG_NM)) {
			request.setAttribute("img", "woolworths");

		} else if (a[2].equalsIgnoreCase(PortalUtil.PETROL_SALES_ORG_NM)) {
			request.setAttribute("img", "petrol");

		} else if (a[2].equalsIgnoreCase(PortalUtil.BWS_SALES_ORG_NM)) {
			request.setAttribute("img", "bws");

		} else if (a[2].equalsIgnoreCase(PortalUtil.DM_SALES_ORG_NM)) {
			request.setAttribute("img", "danmurphy");

		} else if (a[2].equalsIgnoreCase(PortalUtil.THMSDUX_SALES_ORG_NM)) {
			request.setAttribute("img", "thomasdux");

		} else if (a[2].equalsIgnoreCase(PortalUtil.BIGW_SALES_ORG_NM)) {
			request.setAttribute("img", "bigw");
		}else if (a[2].equalsIgnoreCase(PortalUtil.SFS_SALES_ORG_NM)) {
			request.setAttribute("img", "metro");
		} 
		else if (a[2].equalsIgnoreCase(PortalUtil.CNTDWN_SALES_ORG_NM)) {
			request.setAttribute("img", "countdown");
		} else {
			request.setAttribute("img", "woolworths");
		}

		RequestDispatcher rd = request.getRequestDispatcher("/login.jsp");
		rd.forward(request, response);

		// response.sendRedirect( request.getContextPath() + "/login.jsp" );
	}
}
