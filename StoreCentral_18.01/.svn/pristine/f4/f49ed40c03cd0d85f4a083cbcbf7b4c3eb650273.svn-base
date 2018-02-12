package au.com.woolworths.portal.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.InvoiceReconcilationModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InvoiceReconcilationParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.InvoiceReconcilationServiceImpl;

@Controller
@RequestMapping(value = "*/reconciliationReport")
@Scope("session")
public class ReconciliationController extends BaseController {

	@Autowired
	private InvoiceReconcilationServiceImpl invoiceReconcileServiceImpl;

	@Autowired
	private ArticleServiceImpl articleService;

	public InvoiceReconcilationServiceImpl getInvoiceReconcileServiceImpl() {
		return invoiceReconcileServiceImpl;
	}

	public void setInvoiceReconcileServiceImpl(
			InvoiceReconcilationServiceImpl invoiceReconcileServiceImpl) {
		this.invoiceReconcileServiceImpl = invoiceReconcileServiceImpl;
	}

	private ModelMap model;
	private InvoiceReconcilationParam param;

	List<Department> deptInfoList;

	private ArrayList<InvoiceReconcilationModel> reconciliationReport;

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		model = new ModelMap();
		param = new InvoiceReconcilationParam();
		param.setStore(((UserContext) request.getSession().getAttribute("user"))
				.getSiteNo()
				+ "-"
				+ ((UserContext) request.getSession().getAttribute("user"))
						.getSiteName());
		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		param.setInvFlag("off");
		param.setAdjFlag("off");
		param.setDiscrpAmt("20");
		model.addAttribute("noData", "");
		deptInfoList = new ArrayList<Department>();
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {

			String prod_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);
			model.addAttribute("param", param);
			model.addAttribute("deptInfoList", deptInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "No Department Data Found ");
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		ModelAndView modelAndView = new ModelAndView("reconciliationReport");
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// generateReconcilReport.htm
	@RequestMapping(value = "/generateReconcilReport.htm", method = RequestMethod.GET)
	public ModelAndView generateReconcilReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("generateReconcilReport");

		ModelAndView modelAndView = new ModelAndView("reconciliationReport");

		reconciliationReport = new ArrayList<InvoiceReconcilationModel>();

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		param.setOrderNo(request.getParameter("orderNo"));
		param.setDept(request.getParameter("department"));
		param.setDiscrpAmt(request.getParameter("discrpAmt"));
		param.setFromDateGrn(request.getParameter("grnFromDate"));
		param.setToDateGrn(request.getParameter("grnToDate"));

		if (param.getFromDateGrn().length() == 8) {
			// //System.out.println("4");
			param.setFromDateGrn(y2ToY4Converter(param.getFromDateGrn()));
		}
		if (param.getToDateGrn().length() == 8) {
			// //System.out.println("3");

			param.setToDateGrn(y2ToY4Converter(param.getToDateGrn()));
		}

		param.setStoreNo(request.getParameter("storeNo"));
		param.setInvFlag(request.getParameter("invoiceHidden"));
		param.setAdjFlag(request.getParameter("rangedHidden"));

		param.setPageNumber(1);

		model.addAttribute("noData", "");
		model.addAttribute("reconcileList",
				new ArrayList<InvoiceReconcilationModel>());
		param.setRecordCount(0);

		// set department text for print
		if (param.getDept() != null && param.getDept().trim().length() > 0) {
			param.setDepartmentText("ALL");
		} else {
			for (int i = 0; i < deptInfoList.size(); i++) {
				if (deptInfoList.get(i).equals(param.getDept())) {
					param.setDepartmentText(deptInfoList.get(i).getNode()
							+ " - " + deptInfoList.get(i).getNodeDesc());
				}
			}

		}

		try {
			/*
			 * reconciliationReport = (ArrayList<InvoiceReconcilationModel>)
			 * invoiceReconcileServiceImpl
			 * .getInvoiceReconcilationDetails(param);
			 */if (reconciliationReport != null
					&& reconciliationReport.size() > 0) {
				if (reconciliationReport.get(0).getPurchaseOrder() != null
						&& reconciliationReport.get(0).getPurchaseOrder()
								.trim().length() > 0) {
					if (reconciliationReport.get(0).getMsg().trim().length() > 0
							&& reconciliationReport.get(0).getMsg() != null) {
						param.setRecordCount(Integer
								.parseInt(reconciliationReport.get(0).getMsg()));
						model.addAttribute("reconcileList",
								reconciliationReport);
					}
					// model.addAttribute("reconcileList",
					// reconciliationReport);
				} else {
					model.addAttribute(
							"noData",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				}
				// //System.out.println(" po----->" +
				// reconciliationReport.get(0).getPurchaseOrder());

			} else {
				param.setRecordCount(0);
				model.addAttribute("reconcileList",
						new ArrayList<InvoiceReconcilationModel>());
				model.addAttribute(
						"noData",
						"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

		} catch (Exception e) {
			param.setRecordCount(0);
			model.addAttribute("reconcileList",
					new ArrayList<InvoiceReconcilationModel>());
			model.addAttribute(
					"noData",
					"We could not generate the report since there is no data for selected parameters. Please try different parameters.");

			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}

		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/requestSearchForPagination.htm", method = RequestMethod.POST)
	public ModelAndView requestSearchForPagination(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("requestSearchForPagination");
		model.addAttribute("noData", "");
		ModelAndView modelAndView = new ModelAndView("reconciliationReport");

		String pageNumber = request.getParameter("pageNumber");

		if (pageNumber != null && pageNumber.trim().length() > 0) {
			param.setPageNumber(Integer.parseInt(pageNumber) > 0 ? Integer
					.parseInt(pageNumber) : 1);
		} else {
			param.setPageNumber(1);
		}

		model.addAttribute("noData", "");
		// param.setPaginationCheck(true);

		reconciliationReport = new ArrayList<InvoiceReconcilationModel>();

		/*
		 * param.setSiteNo(((UserContext) request.getSession()
		 * .getAttribute("user")).getSiteNo());
		 */
		param.setRecordCount(0);
		try {
			/*
			 * reconciliationReport = (ArrayList<InvoiceReconcilationModel>)
			 * invoiceReconcileServiceImpl
			 * .getInvoiceReconcilationDetails(param);
			 */
			if (reconciliationReport != null && reconciliationReport.size() > 0) {
				if (reconciliationReport.get(0).getPurchaseOrder() != null
						&& reconciliationReport.get(0).getPurchaseOrder()
								.trim().length() > 0) {
					if (reconciliationReport.get(0).getMsg().trim().length() > 0
							&& reconciliationReport.get(0).getMsg() != null)
						param.setRecordCount(Integer
								.parseInt(reconciliationReport.get(0).getMsg()));
					model.addAttribute("reconcileList", reconciliationReport);
				}

			} else {
				param.setRecordCount(0);
				model.addAttribute("reconcileList",
						new ArrayList<InvoiceReconcilationModel>());
				model.addAttribute(
						"noData",
						"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

		} catch (Exception e) {
			param.setRecordCount(0);
			model.addAttribute("reconcileList",
					new ArrayList<InvoiceReconcilationModel>());
			model.addAttribute(
					"noData",
					"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}

		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	public String y2ToY4Converter(String textDate) {

		Date actualDate = null;

		SimpleDateFormat yyyy = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat yy = new SimpleDateFormat("dd/MM/yy");

		try {
			actualDate = yy.parse(textDate);
		} catch (Exception pe) {
			pe.printStackTrace();
		}

		// system.out.print( textDate + " enhanced:  " );
		// //System.out.println( yyyy.format( actualDate ) );
		return yyyy.format(actualDate);
	}

}
