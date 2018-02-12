package au.com.woolworths.portal.pos.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import au.com.woolworths.portal.pos.param.ForceJasperCompileParam;
import au.com.woolworths.portal.reports.JasperReportUtil;

@Controller
@RequestMapping(value = "*/forceJasperCompile")
@Scope("session")
public class ForceJasperCompileController extends BaseController {
	private static final Logger LOGGER = Logger
			.getLogger(ForceJasperCompileController.class.getName());

	@Value("${jaspCompUser}")
	private String jaspUser;

	@Value("${jaspCompPwd}")
	private String jaspPwd;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public Object onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		LOGGER.info("Force Jasper Reports Compile");
		return redirectToView(request, "1POS/forceJasperCompile");
	}

	@RequestMapping(value = "/compile.htm", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseBody
	public String compile(
			@ModelAttribute("forceJasperCompile") ForceJasperCompileParam param,
			HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("Compiling the reports...");
		String msg = null;
		if (param.getJaspUser() != null && param.getJaspPwd() != null
				&& param.getJaspUser().equals(jaspUser)
				&& param.getJaspPwd().equals(jaspPwd)) {
			String tmp = JasperReportUtil.getInstance().forceCompileReport(
					jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request));
			msg = "Compilation Results :: " + tmp;
		} else {
			msg = "Invalid  privilege to compile the reports";
		}
		return msg;
	}
}
