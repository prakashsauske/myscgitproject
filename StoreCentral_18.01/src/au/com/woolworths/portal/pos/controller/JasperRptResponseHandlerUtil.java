package au.com.woolworths.portal.pos.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.util.CommonUtils;

public class JasperRptResponseHandlerUtil {

	@Value("#{properties['srcPath']}")
	private String srcPath = null;

	@Value("#{properties['binPath']}")
	private String binPath = null;

	public static boolean isReportCacheEnabled(ServletContext ctx) {
		Set<String> rptSessionCaheOnVals = new HashSet<String>();
		rptSessionCaheOnVals.add("on");
		rptSessionCaheOnVals.add("true");
		rptSessionCaheOnVals.add("yes");
		rptSessionCaheOnVals.add("1");
		if (rptSessionCaheOnVals.contains(getReportCacheEnabled(ctx).trim().toLowerCase())) {
			return true;
		} else {
			return false;
		}
	}
	public static String getReportCacheEnabled(ServletContext ctx) {
		String tmp = ctx.getInitParameter("REPORT_CACHE_ENABLED");
		return CommonUtils.isNullEmptyWhiteSpace(tmp)?"on":tmp;
	}
	public static String getReportCacheSource(ServletContext ctx) {
		String tmp = ctx.getInitParameter("REPORT_CACHE_SOURCE");
		return CommonUtils.isNullEmptyWhiteSpace(tmp)?"SESSION":tmp;
	}

	public String getReportRealPath(HttpServletRequest request) {
		return request.getSession().getServletContext().getRealPath("");
	}
	
	public String getReportSourcePath(HttpServletRequest request) {
		return getReportRealPath(request)+srcPath;
	}
	
	public String getReportBinPath(HttpServletRequest request) {
		return getReportRealPath(request)+binPath;
	}

	public void handleJasperResponse(String reportName,
			ByteArrayOutputStream byos, String printReportFormat,
			HttpServletResponse response) throws IOException {
		if ("pdf".equalsIgnoreCase(printReportFormat)) {

			response.setContentType("application/pdf");
			// response.setHeader("Content-Disposition","attachment;filename=\""
			// + "mandateOut.pdf" + "\"");
			//included for Naming the Report
			if(reportName.equalsIgnoreCase("PlannerBakeryDoughDailyReport") || reportName.equalsIgnoreCase("PlannerChickenDailyReport") || 
					reportName.equalsIgnoreCase("PlannerMinceDailyReport") || reportName.equalsIgnoreCase("PlannerSeafoodDailyReport") || reportName.equalsIgnoreCase("PlannerThawDailyReport")
					|| reportName.equalsIgnoreCase("PlannerProprietaryBakeryDailyReport") || reportName.equalsIgnoreCase("PlannerMeatDailyReport") || reportName.equalsIgnoreCase("PlannerMeatWeeklyReport")
					 || reportName.equalsIgnoreCase("PlannerProprietaryBakeryWeeklyReport") || reportName.equalsIgnoreCase("PlannerProprietaryBakeryWeeklyReportNZ") || reportName.equalsIgnoreCase("PlannerMeatWeeklyRepNewZealReport"))
			{
				response.setHeader("Content-Disposition", "inline; filename="
						+ reportName + ".pdf");
			}
			
		} else if ("xls".equalsIgnoreCase(printReportFormat)) {

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "inline; filename="
					+ reportName + ".xls");
		} else if ("xlsx".equalsIgnoreCase(printReportFormat)) {

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "inline; filename="
					+ reportName + ".xlsx");
		}

		response.setContentLength(byos.size());
		response.getOutputStream().write(byos.toByteArray());

	}
}
