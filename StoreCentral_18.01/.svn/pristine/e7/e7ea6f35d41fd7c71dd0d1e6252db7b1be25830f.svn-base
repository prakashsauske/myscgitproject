package au.com.woolworths.portal.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.PPArticleSearchResults;
import au.com.woolworths.portal.model.PPCategoryResults;
import au.com.woolworths.portal.model.PlannerBakeryDoughDailyReport;
import au.com.woolworths.portal.model.PlannerChickenDailyReport;
import au.com.woolworths.portal.model.PlannerMeatDailyReport;
import au.com.woolworths.portal.model.PlannerMeatWeeklyReport;
import au.com.woolworths.portal.model.PlannerMinceDailyReport;
import au.com.woolworths.portal.model.PlannerPropBakeryDailyReport;
import au.com.woolworths.portal.model.PlannerPropBakeryWeeklyReport;
import au.com.woolworths.portal.model.PlannerSeafoodDailyReport;
import au.com.woolworths.portal.model.PlannerThawDailyReport;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.ZeroMPLReport;
import au.com.woolworths.portal.param.ManualOrderParam;
import au.com.woolworths.portal.param.PPlanerParam;
import au.com.woolworths.portal.param.PPlannerDateParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pplanner.create.ResponseData;
import au.com.woolworths.portal.pplanner.create.ServiceFault_Exception;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.PPArticleServiceImpl;
import au.com.woolworths.portal.service.ZeroMPLReportServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/plannerReport")
@Scope("session")
public class PlannerReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ProdutionPlanner']}")
	private String screenCode;

	private static final Logger LOGGER = Logger
			.getLogger(PlannerReportController.class.getName());

	public PlannerReportController() {
		this.param = new PPlanerParam();
	}

	private ModelMap model;
	private UserContext userDetail;
	// private ZeroMPLReportParam paramForPagination;
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";
	ArrayList<ZeroMPLReport> zeroMPLReportList = null;
	private int REC_COUNT = 20;
	private Integer TOTAL_RECORDS;
	private PPlanerParam param;

	@Value("#{properties['plannerBakeryDoughDailyReport']}")
	private String bakeryDoughDailyReportName;

	@Value("#{properties['plannerChickenDailyReport']}")
	private String chickenDailyReportName;

	@Value("#{properties['plannerMinceDailyReport']}")
	private String minceDailyReportName;

	@Value("#{properties['plannerThawDailyReport']}")
	private String thawDailyReportName;

	@Value("#{properties['plannerSeafoodDailyReport']}")
	private String seafoodDailyReportName;

	@Value("#{properties['plannerProprietaryBakeryDailyReport']}")
	private String propBakeryDailyReportName;
	@Value("#{properties['plannerMeatDailyReport']}")
	private String meatDailyReportName;

	@Value("#{properties['plannerMeatWeeklyReport']}")
	private String meatWeeklyReportName;

	@Value("#{properties['plannerPropBakeryWeeklyReport']}")
	private String propBakeryWeeklyReportName;

	@Value("#{properties['plannerMeatWeeklyNewZealandReport']}")
	private String meatWeeklyNewReportName;

	@Value("#{properties['plannerPropBakeryWeeklyReportNZ']}")
	private String propBakeryWeeklyReportNameNZ;

	@Autowired
	private JasperReportUtil jasper;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	public PPlanerParam getParam() {
		return param;
	}

	public void setParam(PPlanerParam param) {
		this.param = param;
	}

	@Autowired
	private PPArticleServiceImpl productionPlannerService;

	@Autowired
	private ZeroMPLReportServiceImpl zeroMPLReportService;

	private List<PPArticleSearchResults> ppArticleSearchResults = new ArrayList<PPArticleSearchResults>();

	Map<String, ArrayList<PPArticleSearchResults>> bakeryArticleSet = new HashMap<String, ArrayList<PPArticleSearchResults>>();

	public Map<String, ArrayList<PPArticleSearchResults>> getBakeryArticleSet() {
		return bakeryArticleSet;
	}

	public void setBakeryArticleSet(
			Map<String, ArrayList<PPArticleSearchResults>> bakeryArticleSet) {
		this.bakeryArticleSet = bakeryArticleSet;
	}

	public List<PPArticleSearchResults> getPpArticleSearchResults() {
		return ppArticleSearchResults;
	}

	public void setPpArticleSearchResults(
			List<PPArticleSearchResults> ppArticleSearchResults) {
		this.ppArticleSearchResults = ppArticleSearchResults;
	}

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		setWeekDates();
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("plannerReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/fetchDetailsData.htm", method = RequestMethod.POST)
	@ResponseBody
	public String fetchDetailsData(@ModelAttribute("orderBook") PPlanerParam paramFromjsp,HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		System.out.println("entered fetchDetailsData");
		Date dt1 = new Date();
		Date dt2 = null;
		Date dt3 = null;
		Date dtn = null;
		Date dt4 = null;
		Date dt5 = null;
				
		String article = null;
		String option = null;
		String schedule = null;
		String department = null;
		// String dateFrom = request.getParameter("dateFrom");
		String siteNo = null;
		String week = null;
		String pageNumber = null;
		String district = null;
		String requiredQty = null;
		/*
		 * System.out.println("VAlue of the REquired QUantity"
		 * +request.getParameterValues("requiredQty"));
		 */
		String inputBakeryDay = null;

		String updateFlag = null;
		String[] category = null;

		article = request.getParameter("article");
		option = request.getParameter("searchByOptions");
		schedule = request.getParameter("schedule");
		department = request.getParameter("department");
		// String dateFrom = request.getParameter("dateFrom");
		siteNo = request.getParameter("siteNo");
		week = request.getParameter("inputWeek");
		pageNumber = request.getParameter("pageNumber");
		district = request.getParameter("siteDistrict");
		requiredQty = request.getParameter("requiredQty");
		/*
		 * System.out.println("VAlue of the REquired QUantity"
		 * +request.getParameterValues("requiredQty"));
		 */
		inputBakeryDay = request.getParameter("inputBakeryDay");

		updateFlag = request.getParameter("updateFlag");
		category = paramFromjsp.getCategoryList();
		/*
		 * LOGGER.info("PP Planner Type: "+department);
		 * LOGGER.info("PP Site No: "+siteNo);
		 */
		String msg = "";
		int count = 0;
		if ("UNI".equalsIgnoreCase(district)
				|| "LNI".equalsIgnoreCase(district)
				|| "SI".equalsIgnoreCase(district)) { // UNI LNI SI
			setWeekDatesForNZStores();
		} else {
			setWeekDates();
		}
		if (week.equalsIgnoreCase("NEXT")) {
			Calendar c1 = Calendar.getInstance();
			String fromDate = param.getFromDate();
			String toDate = param.getToDate();
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			Date convertedCurrentDate = null;
			try {
				convertedCurrentDate = sdf.parse(fromDate);
				c1.setTime(convertedCurrentDate);
				c1.add(Calendar.DATE, 7);
				param.setFromDate(sdf.format(c1.getTime()));
				convertedCurrentDate = sdf.parse(toDate);
				c1.setTime(convertedCurrentDate);
				c1.add(Calendar.DATE, 7);
				param.setToDate(sdf.format(c1.getTime()));
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			sdf.applyPattern("yyyyMMdd");
			String date = sdf.format(convertedCurrentDate);

		}
		ModelAndView modelAndView = null;
		try {
			model.remove("noData");
			ppArticleSearchResults = new ArrayList<PPArticleSearchResults>();
			bakeryArticleSet = new HashMap<String, ArrayList<PPArticleSearchResults>>();
			param.setValue(article);
			param.setOption(option);
			param.setValues(option, article);
			param.setDepartment(department);
			param.setSchedule(schedule);
			param.setSiteNo(siteNo);
			param.setWeek(week);
			param.setPageNumber(pageNumber);
			param.setRequiredQty(requiredQty);
			param.setUpdateFlag(updateFlag);
			if (!pageNumber.equalsIgnoreCase("0")) {
				param.setPaginationCheck(true);
			} else {
				param.setPaginationCheck(false);
			}
			if (param.getDepartment().equalsIgnoreCase("BAKERY DOUGH")) {
				String[] tokens = inputBakeryDay.split("-");
				if (tokens != null && tokens.length == 2) {
					param.setDay(tokens[0]);
					param.setCurrentDate(tokens[1]);
				}
				param.setCategoryList(category);
			}
			else
			{
				param.setCategoryList(null);
			}
			// param.setDateFrom(dateFrom);
			model.addAttribute("param", param);
			// service call
			ArrayList<PPArticleSearchResults> bakerySupplierArticle = new ArrayList<PPArticleSearchResults>();
			dt2 = new Date();
			ppArticleSearchResults = productionPlannerService
					.getPPArticleDetails(param,userDetail);
			dt3 = new Date();
			if (ppArticleSearchResults != null
					&& ppArticleSearchResults.size() > 0) {
				param.setRecordCount(ppArticleSearchResults.get(0).getMsg());
				dtn = new Date();
				List<ResponseData> rcSalesData = productionPlannerService
						.getRCPlannerData(ppArticleSearchResults, param);
				dt4 = new Date();

				// calling the SAP Webservice
				if (ppArticleSearchResults == null
						&& ppArticleSearchResults.size() <= 0
						&& param.getDepartment().equalsIgnoreCase(
								"BAKERY DOUGH")) {
					article = request.getParameter("article");
					option = request.getParameter("searchByOptions");
					schedule = request.getParameter("schedule");
					department = request.getParameter("department");
					// String dateFrom = request.getParameter("dateFrom");
					siteNo = request.getParameter("siteNo");
					week = request.getParameter("inputWeek");
					pageNumber = request.getParameter("pageNumber");
					district = request.getParameter("siteDistrict");
					requiredQty = request.getParameter("requiredQty");
					/*
					 * System.out.println("VAlue of the REquired QUantity"
					 * +request.getParameterValues("requiredQty"));
					 */
					inputBakeryDay = request.getParameter("inputBakeryDay");

					updateFlag = request.getParameter("updateFlag");

					if ("UNI".equalsIgnoreCase(district)
							|| "LNI".equalsIgnoreCase(district)
							|| "SI".equalsIgnoreCase(district)) { // UNI LNI SI
						setWeekDatesForNZStores();
					} else {
						setWeekDates();
					}
					if (week.equalsIgnoreCase("NEXT")) {
						Calendar c1 = Calendar.getInstance();
						String fromDate = param.getFromDate();
						String toDate = param.getToDate();
						SimpleDateFormat sdf = new SimpleDateFormat(
								"dd/MM/yyyy");
						Date convertedCurrentDate = null;
						try {
							convertedCurrentDate = sdf.parse(fromDate);
							c1.setTime(convertedCurrentDate);
							c1.add(Calendar.DATE, 7);
							param.setFromDate(sdf.format(c1.getTime()));
							convertedCurrentDate = sdf.parse(toDate);
							c1.setTime(convertedCurrentDate);
							c1.add(Calendar.DATE, 7);
							param.setToDate(sdf.format(c1.getTime()));
						} catch (ParseException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						}
						sdf.applyPattern("yyyyMMdd");
						String date = sdf.format(convertedCurrentDate);

					}

					model.remove("noData");
					ppArticleSearchResults = new ArrayList<PPArticleSearchResults>();
					bakeryArticleSet = new HashMap<String, ArrayList<PPArticleSearchResults>>();
					param.setValue(article);
					param.setOption(option);
					param.setValues(option, article);
					param.setDepartment(department);
					param.setSchedule(schedule);
					param.setSiteNo(siteNo);
					param.setWeek(week);
					param.setPageNumber(pageNumber);
					param.setRequiredQty(requiredQty);
					param.setUpdateFlag(updateFlag);
					if (!pageNumber.equalsIgnoreCase("0")) {
						param.setPaginationCheck(true);
					} else {
						param.setPaginationCheck(false);
					}
					if (param.getDepartment().equalsIgnoreCase("BAKERY DOUGH")) {
						String[] tokens = inputBakeryDay.split("-");
						if (tokens != null && tokens.length == 2) {
							param.setDay(tokens[0]);
							param.setCurrentDate(tokens[1]);
						}

					}
					// param.setDateFrom(dateFrom);
					model.addAttribute("param", param);

					ppArticleSearchResults = productionPlannerService
							.getPPArticleDetails(param,userDetail);
				}

				if (param.getSchedule().equalsIgnoreCase("daily")) {
					for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
						/*
						 * System.out.println("Its coming inside>>>>>>>>");
						 * System
						 * .out.println("value of Required Quantity>>>>>>>>" +
						 * articleResultSet.getRequired_qty());
						 * System.out.println("Value of the Department Param is"
						 * +param.getDepartment());
						 */
						String articleNo = articleResultSet.getArticle();
						articleNo = articleNo.replaceFirst("^0+(?!$)", "");
						articleResultSet.setArticle(articleNo);

						for (ResponseData rcDataSet : rcSalesData) {
							// System.out.println(articleResultSet.getArticle());
							// System.out.println(rcDataSet.getArticle());
							/*
							 * if(!articleResultSet.getArticle().equalsIgnoreCase
							 * (rcDataSet.getArticle())) {
							 * articleResultSet.setRequired_qty(""); }
							 */
							/*
							 * if(rcDataSet.getRequiredQty().equalsIgnoreCase("")
							 * ||
							 * rcDataSet.getRequiredQty().equalsIgnoreCase("null"
							 * )|| rcDataSet.getRequiredQty() == null) {
							 * if(!rcDataSet.getDemand().equalsIgnoreCase("") &&
							 * rcDataSet.getDemand()!= null) {
							 * articleResultSet.setRequired_qty
							 * (rcDataSet.getDemand()); } else {
							 * articleResultSet.setRequired_qty(""); } }
							 */
							if (param.getDepartment().equalsIgnoreCase(
									"BAKERY DOUGH")) {
								if (rcDataSet.getRequiredQty() != null) {
									if (rcDataSet.getRequiredQty()
											.equalsIgnoreCase("Search")) {
										articleResultSet.setRequired_qty("0.0");
									} else {

										articleResultSet
												.setRequired_qty(String
														.valueOf(
																rcDataSet
																		.getRequiredQty())
														.split("\\.")[0]);
									}
								}
								if (rcDataSet.getRequiredQty() == null
										|| rcDataSet.getRequiredQty()
												.equalsIgnoreCase("0.0")
										|| rcDataSet.getRequiredQty()
												.equalsIgnoreCase("0")) {
									articleResultSet.setRequired_qty(rcDataSet
											.getDemand());
								}
							}
							if (articleResultSet.getArticle().equalsIgnoreCase(
									rcDataSet.getArticle())) {
								articleResultSet.setPromoInd(rcDataSet
										.getPromoInd());
								articleResultSet.setPlannedQty(rcDataSet
										.getDemand());
								if (param.getDepartment().equalsIgnoreCase(
										"BAKERY DOUGH")) {

									articleResultSet
											.setTot_ForeCast_Req(rcDataSet
													.getDemand());
									Double totalArticleReq = 0.0;
									Double totalCuts = 0.0;
									Double totalDoughWt = 0.0;
									if (articleResultSet.getZzmaster_size() > 100) {
										articleResultSet
												.setArticlesPerPack(convertIntToString(1));
									} else {
										articleResultSet
												.setArticlesPerPack(String.valueOf((int) Math.ceil(articleResultSet
														.getZzmaster_size())));
									}
									if ( rcDataSet.getRequiredQty() == null 
											|| rcDataSet.getRequiredQty()
											.equalsIgnoreCase("")// for defect 14710
											|| rcDataSet.getDemand() == rcDataSet
													.getRequiredQty()
											) {
										totalArticleReq = convertStringToDouble(articleResultSet
												.getTot_ForeCast_Req())
												* convertStringToDouble(articleResultSet
														.getArticlesPerPack());

									} else {
										totalArticleReq = convertStringToDouble(rcDataSet
												.getRequiredQty())
												* convertStringToDouble(articleResultSet
														.getArticlesPerPack());
									}
									articleResultSet.setTotal_art_req(String
											.valueOf((int) Math
													.ceil(totalArticleReq)));
									if (articleResultSet.getZzitempc() != 0.0
											&& articleResultSet.getZzitempc() != 0)

									{
										totalCuts = totalArticleReq
												/ articleResultSet
														.getZzitempc();
										totalDoughWt = totalCuts
												* articleResultSet
														.getZzdowtpc();
										articleResultSet
												.setTotal_art_req(String.valueOf((int) Math
														.ceil(totalArticleReq)));

										articleResultSet.setTotal_cuts(String
												.valueOf(round(totalCuts, 1)));
										articleResultSet
												.setTot_dough_weight(String
														.valueOf(round(
																totalDoughWt, 1)));
									} else {
										articleResultSet.setTotal_cuts("");
										articleResultSet
												.setTot_dough_weight("");
									}
								}
								if (param.getDepartment().equalsIgnoreCase(
										"CHICKEN")) {
									articleResultSet
											.setOn_show_8Am(String.valueOf((int) Math
													.ceil(convertStringToDouble(rcDataSet
															.getFirstSlotPct()))));
									articleResultSet
											.setOn_show_10Am(String.valueOf((int) Math
													.ceil(convertStringToDouble(rcDataSet
															.getSecSlotPct()))));
									articleResultSet
											.setOn_show_12Pm(String.valueOf((int) Math
													.ceil(convertStringToDouble(rcDataSet
															.getThirdSlotPct()))));
									articleResultSet
											.setOn_show_2Pm(String.valueOf((int) Math
													.ceil(convertStringToDouble(rcDataSet
															.getFourthSlotPct()))));
									articleResultSet
											.setOn_show_4Pm(String.valueOf((int) Math
													.ceil(convertStringToDouble(rcDataSet
															.getFifthSlotPct()))));
									articleResultSet
											.setOn_show_6Pm(String.valueOf((int) Math
													.ceil(convertStringToDouble(rcDataSet
															.getSixthSlotPct()))));
									articleResultSet
											.setOn_show_8Pm(String.valueOf((int) Math
													.ceil(convertStringToDouble(rcDataSet
															.getSeventhSlotPct()))));

									Double totalForcastReq = 0.0;
									totalForcastReq = convertStringToDouble(articleResultSet
											.getOn_show_8Am())
											+ convertStringToDouble(articleResultSet
													.getOn_show_10Am())
											+ convertStringToDouble(articleResultSet
													.getOn_show_12Pm())
											+ convertStringToDouble(articleResultSet
													.getOn_show_2Pm())
											+ convertStringToDouble(articleResultSet
													.getOn_show_4Pm())
											+ convertStringToDouble(articleResultSet
													.getOn_show_6Pm())
											+ convertStringToDouble(articleResultSet
													.getOn_show_8Pm());

									articleResultSet.setTot_ForeCast_Req(String
											.valueOf((int) Math
													.ceil(totalForcastReq)));

								}
								if (param.getDepartment().equalsIgnoreCase(
										"MINCE")) {
									articleResultSet
											.setMince_eve_data(rcDataSet
													.getMinceEvenSlotPct());
									articleResultSet
											.setMince_mrng_data(rcDataSet
													.getMinceMornSlotPct());

									Double totalForcastReq = 0.0;
									totalForcastReq = convertStringToDouble(articleResultSet
											.getMince_eve_data())
											+ convertStringToDouble(articleResultSet
													.getMince_mrng_data());

									articleResultSet.setTot_ForeCast_Req(String
											.valueOf((int) Math
													.ceil(totalForcastReq)));

								}
								if (param.getDepartment().equalsIgnoreCase(
										"BAKERY THAW")) {

									articleResultSet
											.setTot_ForeCast_Req(rcDataSet
													.getDemand());
								}
								if (param.getDepartment().equalsIgnoreCase(
										"SEAFOOD")) {
									articleResultSet
											.setTot_ForeCast_Req(rcDataSet
													.getDemand());
								}
								break;
							}
						}
						// Need to form different set if it is properitery
						// bakery
						if (param.getDepartment().equalsIgnoreCase("bakery")) {
								String supplierNo = articleResultSet
										.getSupplier_no();
								bakerySupplierArticle = new ArrayList<PPArticleSearchResults>();
								if (bakeryArticleSet.containsKey(supplierNo)) {
									bakerySupplierArticle = bakeryArticleSet
											.get(supplierNo);
									bakerySupplierArticle.add(articleResultSet);
									bakeryArticleSet.remove(supplierNo);
									bakeryArticleSet.put(supplierNo,
											bakerySupplierArticle);
								} else {
									bakerySupplierArticle.add(articleResultSet);
									bakeryArticleSet.put(supplierNo,
											bakerySupplierArticle);
								}

						}
					}
				}
				Double totalDemand = 0.0;
				Double thisTotSales = 0.0;
				Double lastTotSales = 0.0;
				Double thisTotRTC = 0.0;
				Double lastTotRTC = 0.0;
				Double thisTotDump = 0.0;
				Double lastTotDump = 0.0;

				if (param.getSchedule().equalsIgnoreCase("weekly")) {
					for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
						count = 0;
						String articleNo = articleResultSet.getArticle();
						articleNo = articleNo.replaceFirst("^0+(?!$)", "");
						articleResultSet.setArticle(articleNo);
						for (ResponseData rcDataSet : rcSalesData) {
							if (articleResultSet.getArticle().equalsIgnoreCase(
									rcDataSet.getArticle())) {
								count = 1;
								articleResultSet.setPlannedQty(rcDataSet
										.getDemand());
								articleResultSet.setRcResponse(rcDataSet);
								thisTotSales = Double.parseDouble(rcDataSet
										.getFriSale())
										+ Double.parseDouble(rcDataSet
												.getThuSale())
										+ Double.parseDouble(rcDataSet
												.getWedSale())
										+ Double.parseDouble(rcDataSet
												.getTueSale())
										+ Double.parseDouble(rcDataSet
												.getMonSale())
										+ Double.parseDouble(rcDataSet
												.getSunSale())
										+ Double.parseDouble(rcDataSet
												.getSatSale());

								lastTotSales = Double.parseDouble(rcDataSet
										.getLastFriSale())
										+ Double.parseDouble(rcDataSet
												.getLastThuSale())
										+ Double.parseDouble(rcDataSet
												.getLastWedSale())
										+ Double.parseDouble(rcDataSet
												.getLastTueSale())
										+ Double.parseDouble(rcDataSet
												.getLastMonSale())
										+ Double.parseDouble(rcDataSet
												.getLastSunSale())
										+ Double.parseDouble(rcDataSet
												.getLastSatSale());

								thisTotRTC = Double.parseDouble(rcDataSet
										.getFriRTC())
										+ Double.parseDouble(rcDataSet
												.getThuRTC())
										+ Double.parseDouble(rcDataSet
												.getWedRTC())
										+ Double.parseDouble(rcDataSet
												.getTueRTC())
										+ Double.parseDouble(rcDataSet
												.getMonRTC())
										+ Double.parseDouble(rcDataSet
												.getSunRTC())
										+ Double.parseDouble(rcDataSet
												.getSatRTC());
								lastTotRTC = Double.parseDouble(rcDataSet
										.getLastFriRTC())
										+ Double.parseDouble(rcDataSet
												.getLastThuRTC())
										+ Double.parseDouble(rcDataSet
												.getLastWedRTC())
										+ Double.parseDouble(rcDataSet
												.getLastTueRTC())
										+ Double.parseDouble(rcDataSet
												.getLastMonRTC())
										+ Double.parseDouble(rcDataSet
												.getLastSunRTC())
										+ Double.parseDouble(rcDataSet
												.getLastSatRTC());
								totalDemand = Double.parseDouble(rcDataSet
										.getFriDemand())
										+ Double.parseDouble(rcDataSet
												.getThuDemand())
										+ Double.parseDouble(rcDataSet
												.getWedDemand())
										+ Double.parseDouble(rcDataSet
												.getTueDemand())
										+ Double.parseDouble(rcDataSet
												.getMonDemand())
										+ Double.parseDouble(rcDataSet
												.getSunDemand())
										+ Double.parseDouble(rcDataSet
												.getSatDemand());
								articleResultSet.setLastTotRTC(String
										.valueOf((int) Math.ceil(lastTotRTC)));
								articleResultSet.setThisTotRTC(String
										.valueOf((int) Math.ceil(thisTotRTC)));
								articleResultSet.setLastTotSales(String
										.valueOf((int) Math.ceil(lastTotSales)));
								articleResultSet.setThisTotSales(String
										.valueOf((int) Math.ceil(thisTotSales)));
								articleResultSet.setTotalDemand(String
										.valueOf((int) Math.ceil(totalDemand)));
								articleResultSet.setRcResponse(rcDataSet);
								break;
							}

						}
						if (count == 0) {
							articleResultSet.setRcResponse(new ResponseData());
						}
						thisTotDump = Double.parseDouble(articleResultSet
								.getFri_this())
								+ Double.parseDouble(articleResultSet
										.getThu_this())
								+ Double.parseDouble(articleResultSet
										.getWed_this())
								+ Double.parseDouble(articleResultSet
										.getTue_this())
								+ Double.parseDouble(articleResultSet
										.getMon_this())
								+ Double.parseDouble(articleResultSet
										.getSun_this())
								+ Double.parseDouble(articleResultSet
										.getSat_this());
						lastTotDump = Double.parseDouble(articleResultSet
								.getFri_last())
								+ Double.parseDouble(articleResultSet
										.getThu_last())
								+ Double.parseDouble(articleResultSet
										.getWed_last())
								+ Double.parseDouble(articleResultSet
										.getTue_last())
								+ Double.parseDouble(articleResultSet
										.getMon_last())
								+ Double.parseDouble(articleResultSet
										.getSun_last())
								+ Double.parseDouble(articleResultSet
										.getSat_last());

						articleResultSet.setSun_last(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getSun_last()))));
						articleResultSet.setMon_last(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getMon_last()))));
						articleResultSet.setTue_last(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getTue_last()))));
						articleResultSet.setWed_last(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getWed_last()))));
						articleResultSet.setThu_last(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getThu_last()))));
						articleResultSet.setFri_last(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getFri_last()))));
						articleResultSet.setSat_last(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getSat_last()))));

						articleResultSet.setSun_this(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getSun_this()))));
						articleResultSet.setMon_this(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getMon_this()))));
						articleResultSet.setTue_this(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getTue_this()))));
						articleResultSet.setWed_this(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getWed_this()))));
						articleResultSet.setThu_this(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getThu_this()))));
						articleResultSet.setFri_this(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getFri_this()))));
						articleResultSet.setSat_this(String.valueOf((int) Math
								.ceil(convertStringToDouble(articleResultSet
										.getSat_this()))));

						articleResultSet.setLastTotDump(String
								.valueOf((int) Math.ceil(lastTotDump)));
						articleResultSet.setThisTotDump(String
								.valueOf((int) Math.ceil(thisTotDump)));
						
						//Setting blank to dumps
						if (param.getDepartment().equalsIgnoreCase("meat")) {
							setBlankToDumps(articleResultSet);
						}

						// Need to form different set if it is properitery
						// bakery
						if (param.getDepartment().equalsIgnoreCase("bakery")) {
							String supplierNo = articleResultSet
									.getSupplier_no();
							bakerySupplierArticle = new ArrayList<PPArticleSearchResults>();
							if (bakeryArticleSet.containsKey(supplierNo)) {
								bakerySupplierArticle = bakeryArticleSet
										.get(supplierNo);
								bakerySupplierArticle.add(articleResultSet);
								bakeryArticleSet.remove(supplierNo);
								bakeryArticleSet.put(supplierNo,
										bakerySupplierArticle);
							} else {
								bakerySupplierArticle.add(articleResultSet);
								bakeryArticleSet.put(supplierNo,
										bakerySupplierArticle);
							}
						}

					}
				}

				if (!param.isPaginationCheck()) {
					if (param.getSchedule().equalsIgnoreCase("daily")) {
						buildDailyJasperReports(request, response);
					} else if (param.getSchedule().equalsIgnoreCase("weekly")) {

						buildWeeklyJasperReports(request, response);
					}
					dt5 = new Date();
					LOGGER.info(dt3.getTime()+",PP,"+siteNo+","+department+","+schedule+",SAP Print Response Time : "+CommonUtils.timeDifference(dt2, dt3));
					LOGGER.info(dt4.getTime()+",PP,"+siteNo+","+department+","+schedule+",RC Print Response Time : "+CommonUtils.timeDifference(dtn, dt4));
					LOGGER.info(dt5.getTime()+",PP,"+siteNo+","+department+","+schedule+",TOtal Print Response Time : "+CommonUtils.timeDifference(dt1, dt5));
					return null;
				}
				modelAndView = new ModelAndView("plannerReport", "param", param);

				model.addAttribute("ppArticleSearchResults",
						ppArticleSearchResults);

				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);

			} else {
				if (!param.isPaginationCheck())
				{
					response.setContentType("text/html");
					PrintWriter pw = response.getWriter();
					pw.println("<html>");
					pw.println("<head><title>No records available</title></title>");
					pw.println("<body>");
					pw.println("<h1>No records available to generate Planner report. </h1>");// defect 7102
					pw.println("</body></html>");
					return null;
				}
				else
				{
				model.remove("ppArticleSearchResults");
				modelAndView = new ModelAndView("plannerReport", "param", param);
				model.addAttribute("noData",
						"Sorry no results returned for your search criteria. Please try again");
				msg = "Sorry no results returned for your search criteria. Please try again";
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				dt5 = new Date();
				LOGGER.info(dt5.getTime()+",PP,"+siteNo+","+department+","+schedule+",TOtal Error Response Time : "+CommonUtils.timeDifference(dt1, dt5));
				return convertArticleSearchResultListTojson(
						ppArticleSearchResults, msg);
				}
			}
		}

		catch (MalformedURLException e) {
			if (!param.isPaginationCheck())
			{
				response.setContentType("text/html");
				PrintWriter pw = response.getWriter();
				pw.println("<html>");
				pw.println("<head><title>Report Error Page</title></title>");
				pw.println("<body>");
				pw.println("<h1>Some technical issues occured while generating the Planner report ."+e.getMessage()+" </h1>");
				pw.println("</body></html>");
				return null;
			}else
			{
			model.remove("ppArticleSearchResults");
			LOGGER.error(
					"Production Planner Exception Occured" + e.getMessage(), e);
			if (null != e.getMessage() && e.getMessage().indexOf("401") != -1)
				model.addAttribute("noData", "Sorry, not authorised to Lookup");
			else
				model.addAttribute("noData",
						"Exception occured. Please try again later");
			msg = "Exception occured. Please try again later";
			modelAndView = new ModelAndView("plannerReport", "param", param);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			dt5 = new Date();
			LOGGER.info(dt5.getTime()+",PP,"+siteNo+","+department+","+schedule+",TOtal Error Response Time : "+CommonUtils.timeDifference(dt1, dt5));
			return convertArticleSearchResultListTojson(ppArticleSearchResults,
					msg);
			}
		} catch (ServiceFault_Exception e) {
			if (!param.isPaginationCheck())
			{
				response.setContentType("text/html");
				PrintWriter pw = response.getWriter();
				pw.println("<html>");
				pw.println("<head><title>Report Error Page</title></title>");
				pw.println("<body>");
				pw.println("<h1>Some technical issues occured while generating the Planner report ."+e.getMessage()+" </h1>");
				pw.println("</body></html>");
				return null;
			}else
			{
			model.remove("ppArticleSearchResults");
			LOGGER.error(
					"Production Planner Exception Occured" + e.getMessage(), e);
			if (null != e.getMessage() && e.getMessage().indexOf("401") != -1)
				model.addAttribute("noData", "Sorry, not authorised to Lookup");
			else
				model.addAttribute("noData",
						"Exception occured. Please try again later");

			msg = "Exception occured. Please try again later";
			modelAndView = new ModelAndView("plannerReport", "param", param);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			dt5 = new Date();
			LOGGER.info(dt5.getTime()+",PP,"+siteNo+","+department+","+schedule+",TOtal Error Response Time : "+CommonUtils.timeDifference(dt1, dt5));
			return convertArticleSearchResultListTojson(ppArticleSearchResults,
					msg);
			}
		} catch (Exception e) {
			if (!param.isPaginationCheck())
			{
				response.setContentType("text/html");
				PrintWriter pw = response.getWriter();
				pw.println("<html>");
				pw.println("<head><title>Report Error Page</title></title>");
				pw.println("<body>");
				pw.println("<h1>Some technical issues occured while generating the Planner report ."+e.getMessage()+" </h1>");
				pw.println("</body></html>");
				return null;
			}else
			{
			model.remove("ppArticleSearchResults");
			LOGGER.error(
					"Production Planner Exception Occured" + e.getMessage(), e);
			if (null != e.getMessage() && e.getMessage().indexOf("401") != -1)
				model.addAttribute("noData", "Sorry, not authorised to Lookup");
			else
				model.addAttribute(
						"noData",
						"Exception occured. Please try again later"
								+ e.getMessage());
			msg = "Exception occured. Please try again later";
			modelAndView = new ModelAndView("plannerReport", "param", param);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			dt5 = new Date();
			LOGGER.info(dt5.getTime()+",PP,"+siteNo+","+department+","+schedule+",TOtal Error Response Time : "+CommonUtils.timeDifference(dt1, dt5));
			return convertArticleSearchResultListTojson(ppArticleSearchResults,
					msg);
			}
		}
		if (param.getDepartment().equalsIgnoreCase("bakery")) {
			dt5 = new Date();
			LOGGER.info(dt3.getTime()+",PP,"+siteNo+","+department+","+schedule+",SAP Response Time : "+CommonUtils.timeDifference(dt2, dt3));
			LOGGER.info(dt4.getTime()+",PP,"+siteNo+","+department+","+schedule+",RC Response Time : "+CommonUtils.timeDifference(dtn, dt4));
			LOGGER.info(dt5.getTime()+",PP,"+siteNo+","+department+","+schedule+",TOtal Response Time : "+CommonUtils.timeDifference(dt1, dt5));
			return convertArticleSearchResultListTojson(bakeryArticleSet, msg);
		}
		dt5 = new Date();
		LOGGER.info(dt3.getTime()+",PP,"+siteNo+","+department+","+schedule+",SAP Response Time : "+CommonUtils.timeDifference(dt2, dt3));
		LOGGER.info(dt4.getTime()+",PP,"+siteNo+","+department+","+schedule+",RC Response Time : "+CommonUtils.timeDifference(dtn, dt4));
		LOGGER.info(dt5.getTime()+",PP,"+siteNo+","+department+","+schedule+",TOtal Response Time : "+CommonUtils.timeDifference(dt1, dt5));
		return convertArticleSearchResultListTojson(ppArticleSearchResults, msg);
	}

	private void setBlankToDumps(PPArticleSearchResults articleResultSet) {
		articleResultSet.setSun_last("");
		articleResultSet.setMon_last("");
		articleResultSet.setTue_last("");
		articleResultSet.setWed_last("");
		articleResultSet.setThu_last("");
		articleResultSet.setFri_last("");
		articleResultSet.setSat_last("");

		articleResultSet.setSun_this("");
		articleResultSet.setMon_this("");
		articleResultSet.setTue_this("");
		articleResultSet.setWed_this("");
		articleResultSet.setThu_this("");
		articleResultSet.setFri_this("");
		articleResultSet.setSat_this("");

		articleResultSet.setLastTotDump("");
		articleResultSet.setThisTotDump("");
	}

	private void buildDailyJasperReports(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		if ("MINCE".equalsIgnoreCase(param.getDepartment())) {
			buildMinceDailyReport(request, response);
		} else if ("SEAFOOD".equalsIgnoreCase(param.getDepartment())) {
			buildSeafoodDailyREport(request, response);
		} else if ("BAKERY THAW".equalsIgnoreCase(param.getDepartment())) {
			buildThawDailyReport(request, response);
		} else if ("CHICKEN".equalsIgnoreCase(param.getDepartment())) {
			buildChickenDailyReport(request, response);
		} else if ("BAKERY DOUGH".equalsIgnoreCase(param.getDepartment())) {
			buildBakeryDoughDailyReport(request, response);
		} else if ("BAKERY".equalsIgnoreCase(param.getDepartment())) {
			buildPropBakeryDailyReport(request, response);
		} else if ("MEAT".equalsIgnoreCase(param.getDepartment())) {
			buildMeatDailyReport(request, response);
		}
	}

	private void buildMeatDailyReport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		List<PlannerMeatDailyReport> meatDailyReports = new ArrayList<PlannerMeatDailyReport>();
		PlannerMeatDailyReport plannerMeatDailyReport = null;
		for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
			plannerMeatDailyReport = new PlannerMeatDailyReport();

			plannerMeatDailyReport.setPlu(articleResultSet.getPlu());
			plannerMeatDailyReport.setArticle(checkPromoInd(articleResultSet.getPromoInd(), articleResultSet.getArticle()));
			plannerMeatDailyReport.setDescription(articleResultSet
					.getArticle_desc().replaceAll("\\s+", " "));

			plannerMeatDailyReport.setTray(articleResultSet.getTray_desc()
					.replaceAll("\\s+", " "));

			plannerMeatDailyReport.setSoh("");
			plannerMeatDailyReport.setPromo(articleResultSet.getPromo_price());
			plannerMeatDailyReport.setQwin("");
			plannerMeatDailyReport.setMpl(articleResultSet.getDefault_mpl());

			plannerMeatDailyReport.setCut3("");

			plannerMeatDailyReport.setCut2("");

			plannerMeatDailyReport.setpReq("");

			plannerMeatDailyReport.setOpCut("");

			plannerMeatDailyReport
					.setPlannReq(articleResultSet.getPlannedQty());

			meatDailyReports.add(plannerMeatDailyReport);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				meatDailyReports);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("rHeading",
				"Daily Production Schedule for " + param.getCurrentDate()
						+ ", " + param.getDay());

		tempMap.put("storeNo", param.getSiteNo());
		ByteArrayOutputStream byos = jasper.printReport(meatDailyReportName,
				"pdf", beanDS, tempMap,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request));
		jasperRptResponseHandler.handleJasperResponse(meatDailyReportName,
				byos, "pdf", response);
	}

	private void buildPropBakeryDailyReport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		ArrayList<PlannerPropBakeryDailyReport> propBakeryDailyReport = new ArrayList<PlannerPropBakeryDailyReport>();
		ArrayList<PPArticleSearchResults> bakerySupplierArticle = new ArrayList<PPArticleSearchResults>();
		PlannerPropBakeryDailyReport propBakeryDailyReports = null;
		for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
			String supplierNo = articleResultSet
					.getSupplier_no();
			bakerySupplierArticle = new ArrayList<PPArticleSearchResults>();
			if (bakeryArticleSet.containsKey(supplierNo)) {
				bakerySupplierArticle = bakeryArticleSet
						.get(supplierNo);
				bakerySupplierArticle.add(articleResultSet);
				bakeryArticleSet.remove(supplierNo);
				bakeryArticleSet.put(supplierNo,
						bakerySupplierArticle);
			} else {
				bakerySupplierArticle.add(articleResultSet);
				bakeryArticleSet.put(supplierNo,
						bakerySupplierArticle);
				}
		}
		Set Keys = bakeryArticleSet.keySet();
		Iterator iterator = Keys.iterator();
		while(iterator.hasNext()){
			String key = ((String) iterator.next()).trim();
			ArrayList<PPArticleSearchResults> resultset = bakeryArticleSet.get(key);
			List<String> myList = new ArrayList<String>();
			for(PPArticleSearchResults articleResultSet : resultset){
				if(!(myList.contains(articleResultSet.getArticle().toString()))){
			propBakeryDailyReports = new PlannerPropBakeryDailyReport();
			propBakeryDailyReports.setSupplierNo(articleResultSet
					.getSupplier_no().trim());
			propBakeryDailyReports.setSupplierName(articleResultSet
					.getSupplier_name());
			propBakeryDailyReports.setDepartment(param.getDepartment());
			propBakeryDailyReports.setArticle(checkPromoInd(articleResultSet.getPromoInd(), articleResultSet.getArticle()));
			propBakeryDailyReports.setDescription(articleResultSet
					.getArticle_desc().replaceAll("\\s+", " "));
			propBakeryDailyReports.setPromoPrice(articleResultSet
					.getPromo_price());
			propBakeryDailyReports.setMpl(articleResultSet.getDefault_mpl());
			propBakeryDailyReports.setPlannedReq(articleResultSet
					.getPlannedQty());
			propBakeryDailyReport.add(propBakeryDailyReports);
			String article = articleResultSet.getArticle().toString();
			myList.add(article);
					}
			}
			myList.clear();

		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				propBakeryDailyReport);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("storeNo", param.getSiteNo());
		ByteArrayOutputStream byos = jasper.printReport(
				propBakeryDailyReportName, "pdf", beanDS, tempMap,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request));
		jasperRptResponseHandler.handleJasperResponse(
				propBakeryDailyReportName, byos, "pdf", response);
	}

	private void buildBakeryDoughDailyReport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		List<PlannerBakeryDoughDailyReport> bakeryDoughDailyReports = new ArrayList<PlannerBakeryDoughDailyReport>();
		PlannerBakeryDoughDailyReport bakeryDoughDailyReport = null;
		String oldPremixType="";
		Double totalNoOfBagsPerPremix=0.0;
		if(ppArticleSearchResults!=null && ppArticleSearchResults.size()>0){
			oldPremixType=ppArticleSearchResults.get(0).getPremix_desc();
		}
		for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
			bakeryDoughDailyReport = new PlannerBakeryDoughDailyReport();
			
			bakeryDoughDailyReport.setArticle(checkPromoInd(articleResultSet.getPromoInd(), articleResultSet.getArticle()));
			bakeryDoughDailyReport.setDescription(articleResultSet
					.getArticle_desc().replaceAll("\\s+", " "));
			bakeryDoughDailyReport.setForecast(articleResultSet
					.getTot_ForeCast_Req());
			bakeryDoughDailyReport.setPacksToMake(articleResultSet
					.getRequired_qty());
			bakeryDoughDailyReport.setArticlePerPack(articleResultSet
					.getArticlesPerPack());
			bakeryDoughDailyReport.setTotArticlesReqd(articleResultSet
					.getTotal_art_req());
			bakeryDoughDailyReport
					.setItemsPerCut(convertDoubleToString(articleResultSet
							.getZzitempc()));
			bakeryDoughDailyReport.setTotCuts(articleResultSet.getTotal_cuts());
			bakeryDoughDailyReport
					.setDoughWt(convertDoubleToString(articleResultSet
							.getZzdowtpc()));
			bakeryDoughDailyReport.setTotDoughWt(articleResultSet
					.getTot_dough_weight());
			bakeryDoughDailyReport.setPremixName(articleResultSet.getPremix_desc());
			bakeryDoughDailyReport.setIsLastArticle(articleResultSet.getLast_article().equalsIgnoreCase("Y")? true:false);
			bakeryDoughDailyReport.setPlu(articleResultSet.getPlu());
			
			if(!oldPremixType.equalsIgnoreCase(articleResultSet.getPremix_desc())){
				
				totalNoOfBagsPerPremix=0.0;
				oldPremixType=articleResultSet.getPremix_desc();
				
			}
			
			
			try {
				if(articleResultSet.getTot_dough_weight()!=null && articleResultSet.getTot_dough_weight().trim().length()!=0)
				totalNoOfBagsPerPremix+=Double.parseDouble(articleResultSet.getTot_dough_weight());
			} catch (NumberFormatException e) {
				// TODO Auto-generated catch block
				log.error("article:"+articleResultSet.getArticle()+",tot dough weight:"+articleResultSet.getTot_dough_weight());
				e.printStackTrace();
			}
		
			if(articleResultSet.getLast_article().equalsIgnoreCase("Y")){
				bakeryDoughDailyReport.setNoOfBag(getTotalNoOfBags(totalNoOfBagsPerPremix,articleResultSet.getCalc_factor(),
						articleResultSet.getNo_of_kilos()));	
				if(Double.parseDouble(bakeryDoughDailyReport.getNoOfBag()) > 1)
				{
					bakeryDoughDailyReport.setBag("bags");
				}
				else
				{
					bakeryDoughDailyReport.setBag("bag");
				}
			}
			
			bakeryDoughDailyReports.add(bakeryDoughDailyReport);
			
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				bakeryDoughDailyReports);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("reportDate",
				"Daily Production Schedule for " + param.getCurrentDate()
						+ ", " + param.getDay());
		tempMap.put("storeNo", param.getSiteNo());
		ByteArrayOutputStream byos = jasper.printReport(
				bakeryDoughDailyReportName, "pdf", beanDS, tempMap,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request));
		jasperRptResponseHandler.handleJasperResponse(
				bakeryDoughDailyReportName, byos, "pdf", response);
	}

	private void buildChickenDailyReport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		List<PlannerChickenDailyReport> chickenDailyReports = new ArrayList<PlannerChickenDailyReport>();
		PlannerChickenDailyReport chickenDailyReport = null;
		for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
			chickenDailyReport = new PlannerChickenDailyReport();
			chickenDailyReport.setArticle(checkPromoInd(articleResultSet.getPromoInd(), articleResultSet.getArticle()));
			chickenDailyReport.setDescription(articleResultSet
					.getArticle_desc().replaceAll("\\s+", " "));
			chickenDailyReport.setForecast(articleResultSet
					.getTot_ForeCast_Req());
			chickenDailyReport.setShow8am(articleResultSet.getOn_show_8Am());
			chickenDailyReport.setShow10am(articleResultSet.getOn_show_10Am());
			chickenDailyReport.setShow12pm(articleResultSet.getOn_show_12Pm());
			chickenDailyReport.setShow2pm(articleResultSet.getOn_show_2Pm());
			chickenDailyReport.setShow4pm(articleResultSet.getOn_show_4Pm());
			chickenDailyReport.setShow6pm(articleResultSet.getOn_show_6Pm());
			chickenDailyReport.setShow8pm(articleResultSet.getOn_show_8Pm());
			chickenDailyReports.add(chickenDailyReport);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				chickenDailyReports);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("storeNo", param.getSiteNo());
		ByteArrayOutputStream byos = jasper.printReport(chickenDailyReportName,
				"pdf", beanDS, tempMap,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request));
		jasperRptResponseHandler.handleJasperResponse(chickenDailyReportName,
				byos, "pdf", response);
	}

	private void buildThawDailyReport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		List<PlannerThawDailyReport> thawDailyReports = new ArrayList<PlannerThawDailyReport>();
		PlannerThawDailyReport thawDailyReport = null;
		String prodlife = "";
		for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
			thawDailyReport = new PlannerThawDailyReport();
			thawDailyReport.setArticle(checkPromoInd(articleResultSet.getPromoInd(), articleResultSet.getArticle()));
			thawDailyReport.setDescription(articleResultSet.getArticle_desc()
					.replaceAll("\\s+", " "));
			thawDailyReport.setForecast(articleResultSet.getTot_ForeCast_Req());
			prodlife = articleResultSet.getZzbest_bef_days();
			if (prodlife.equalsIgnoreCase("0")) {
				prodlife = articleResultSet.getZzuse_by_days();
				prodlife = prodlife + " days UB";
			}else{
				prodlife = prodlife + " days BB";
			}
			thawDailyReport.setProductLife(prodlife); 
			thawDailyReports.add(thawDailyReport);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				thawDailyReports);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("storeNo", param.getSiteNo());
		ByteArrayOutputStream byos = jasper.printReport(thawDailyReportName,
				"pdf", beanDS, tempMap,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request));
		jasperRptResponseHandler.handleJasperResponse(thawDailyReportName,
				byos, "pdf", response);
	}

	private void buildSeafoodDailyREport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		List<PlannerSeafoodDailyReport> seafoodDailyReports = new ArrayList<PlannerSeafoodDailyReport>();
		PlannerSeafoodDailyReport seafoodDailyReport = null;
		for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
			seafoodDailyReport = new PlannerSeafoodDailyReport();
			seafoodDailyReport.setArticle(checkPromoInd(articleResultSet.getPromoInd(), articleResultSet.getArticle()));
			seafoodDailyReport.setDescription(articleResultSet
					.getArticle_desc().replaceAll("\\s+", " "));
			seafoodDailyReport.setForecast(articleResultSet
					.getTot_ForeCast_Req());
			seafoodDailyReports.add(seafoodDailyReport);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				seafoodDailyReports);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("storeNo", param.getSiteNo());
		ByteArrayOutputStream byos = jasper.printReport(seafoodDailyReportName,
				"pdf", beanDS, tempMap,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request));
		jasperRptResponseHandler.handleJasperResponse(seafoodDailyReportName,
				byos, "pdf", response);
	}

	private void buildMinceDailyReport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		List<PlannerMinceDailyReport> minceDailyReports = new ArrayList<PlannerMinceDailyReport>();
		PlannerMinceDailyReport minceDailyReport = null;
		for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
			minceDailyReport = new PlannerMinceDailyReport();
			minceDailyReport.setArticle(checkPromoInd(articleResultSet.getPromoInd(), articleResultSet.getArticle()));
			minceDailyReport.setDescription(articleResultSet.getArticle_desc()
					.replaceAll("\\s+", " "));
			minceDailyReport
					.setForecast(articleResultSet.getTot_ForeCast_Req());
			minceDailyReport.setMrngFC(articleResultSet.getMince_mrng_data());
			minceDailyReport.setAftnFC(articleResultSet.getMince_eve_data());
			minceDailyReports.add(minceDailyReport);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				minceDailyReports);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("storeNo", param.getSiteNo());
		ByteArrayOutputStream byos = jasper.printReport(minceDailyReportName,
				"pdf", beanDS, tempMap,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request));
		jasperRptResponseHandler.handleJasperResponse(minceDailyReportName,
				byos, "pdf", response);
	}

	private void buildWeeklyJasperReports(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		if ("MEAT".equalsIgnoreCase(param.getDepartment())) {
			buildMeatWeeklyReport(request, response);
		} else if ("BAKERY".equalsIgnoreCase(param.getDepartment())) {
			buildPropBakeryWeeklyReport(request, response);
		}
	}

	private void buildPropBakeryWeeklyReport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		List<PlannerPropBakeryWeeklyReport> propBakeryWeeklyReports = new ArrayList<PlannerPropBakeryWeeklyReport>();
		ArrayList<PPArticleSearchResults> bakerySupplierArticle = new ArrayList<PPArticleSearchResults>();
		PlannerPropBakeryWeeklyReport propBakeryWeeklyReport = null;
			for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
				String supplierNo = articleResultSet
						.getSupplier_no();
				bakerySupplierArticle = new ArrayList<PPArticleSearchResults>();
				if (bakeryArticleSet.containsKey(supplierNo)) {
					bakerySupplierArticle = bakeryArticleSet
							.get(supplierNo);
					bakerySupplierArticle.add(articleResultSet);
					bakeryArticleSet.remove(supplierNo);
					bakeryArticleSet.put(supplierNo,
							bakerySupplierArticle);
				} else {
					bakerySupplierArticle.add(articleResultSet);
					bakeryArticleSet.put(supplierNo,
							bakerySupplierArticle);
					}
			}	
			Set Keys = bakeryArticleSet.keySet();
			Iterator iterator = Keys.iterator();
			while(iterator.hasNext()){
				String key = ((String) iterator.next()).trim();
				ArrayList<PPArticleSearchResults> resultset = bakeryArticleSet.get(key);
				List<String> myList = new ArrayList<String>();
				for(PPArticleSearchResults articleResultset : resultset){
					if(!(myList.contains(articleResultset.getArticle().toString()))){
			propBakeryWeeklyReport = new PlannerPropBakeryWeeklyReport();
			propBakeryWeeklyReport.setArticle(articleResultset.getArticle());
			propBakeryWeeklyReport.setArticle_description(articleResultset
					.getArticle_desc().replaceAll("\\s+", " "));
			propBakeryWeeklyReport.setSupplierNo(articleResultset
					.getSupplier_no());
			propBakeryWeeklyReport.setSupplierName(articleResultset
					.getSupplier_name());
			propBakeryWeeklyReport.setDepartment(param.getDepartment());
			// Sale_last
					propBakeryWeeklyReport.setSale_last_Mon(checkPromoInd(
							articleResultset.getRcResponse()
									.getLastMonPromInd(), articleResultset
									.getRcResponse().getLastMonSale()));
					propBakeryWeeklyReport.setSale_last_Tue(checkPromoInd(
							articleResultset.getRcResponse()
									.getLastTuePromInd(), articleResultset
									.getRcResponse().getLastTueSale()));
					propBakeryWeeklyReport.setSale_last_Wed(checkPromoInd(
							articleResultset.getRcResponse()
									.getLastWedPromInd(), articleResultset
									.getRcResponse().getLastWedSale()));
					propBakeryWeeklyReport.setSale_last_Thur(checkPromoInd(
							articleResultset.getRcResponse()
									.getLastThuPromInd(), articleResultset
									.getRcResponse().getLastThuSale()));
					propBakeryWeeklyReport.setSale_last_Fri(checkPromoInd(
							articleResultset.getRcResponse()
									.getLastFriPromInd(), articleResultset
									.getRcResponse().getLastFriSale()));
					propBakeryWeeklyReport.setSale_last_Sat(checkPromoInd(
							articleResultset.getRcResponse()
									.getLastSatPromInd(), articleResultset
									.getRcResponse().getLastSatSale()));
					propBakeryWeeklyReport.setSale_last_Sun(checkPromoInd(
							articleResultset.getRcResponse()
									.getLastSunPromInd(), articleResultset
									.getRcResponse().getLastSunSale()));
					propBakeryWeeklyReport.setSale_last_Tot(checkPromoIndTot(
							articleResultset.getRcResponse().getLastMonPromInd(),
							articleResultset.getRcResponse().getLastTuePromInd(),
							articleResultset.getRcResponse().getLastWedPromInd(),
							articleResultset.getRcResponse().getLastThuPromInd(),
							articleResultset.getRcResponse().getLastFriPromInd(),
							articleResultset.getRcResponse().getLastSatPromInd(),
							articleResultset.getRcResponse().getLastSunPromInd(),
							articleResultset.getLastTotSales().toString()));// fix for defect 14755
			// Sale_this
					propBakeryWeeklyReport.setSale_this_Mon(checkPromoInd(
							articleResultset.getRcResponse().getMonPromInd(),
							articleResultset.getRcResponse().getMonSale()));
					propBakeryWeeklyReport.setSale_this_Tue(checkPromoInd(
							articleResultset.getRcResponse().getTuePromInd(),
							articleResultset.getRcResponse().getTueSale()));
					propBakeryWeeklyReport.setSale_this_Wed(checkPromoInd(
							articleResultset.getRcResponse().getWedPromInd(),
							articleResultset.getRcResponse().getWedSale()));
					propBakeryWeeklyReport.setSale_this_Thur(checkPromoInd(
							articleResultset.getRcResponse().getThuPromInd(),
							articleResultset.getRcResponse().getThuSale()));
					propBakeryWeeklyReport.setSale_this_Fri(checkPromoInd(
							articleResultset.getRcResponse().getFriPromInd(),
							articleResultset.getRcResponse().getFriSale()));
					propBakeryWeeklyReport.setSale_this_Sat(checkPromoInd(
							articleResultset.getRcResponse().getSatPromInd(),
							articleResultset.getRcResponse().getSatSale()));
					propBakeryWeeklyReport.setSale_this_Sun(checkPromoInd(
							articleResultset.getRcResponse().getSunPromInd(),
							articleResultset.getRcResponse().getSunSale()));
					propBakeryWeeklyReport.setSale_this_Tot(checkPromoIndTot(
							articleResultset.getRcResponse().getMonPromInd(),
							articleResultset.getRcResponse().getTuePromInd(),
							articleResultset.getRcResponse().getWedPromInd(),
							articleResultset.getRcResponse().getThuPromInd(),
							articleResultset.getRcResponse().getFriPromInd(),
							articleResultset.getRcResponse().getSatPromInd(),
							articleResultset.getRcResponse().getSunPromInd(),
							articleResultset.getThisTotSales().toString()));
			// RTC_Last
			propBakeryWeeklyReport.setRtc_last_Mon(articleResultset
					.getRcResponse().getLastMonRTC());
			propBakeryWeeklyReport.setRtc_last_Tue(articleResultset
					.getRcResponse().getLastTueRTC());
			propBakeryWeeklyReport.setRtc_last_Wed(articleResultset
					.getRcResponse().getLastWedRTC());
			propBakeryWeeklyReport.setRtc_last_Thur(articleResultset
					.getRcResponse().getLastThuRTC());
			propBakeryWeeklyReport.setRtc_last_Fri(articleResultset
					.getRcResponse().getLastFriRTC());
			propBakeryWeeklyReport.setRtc_last_Sat(articleResultset
					.getRcResponse().getLastSatRTC());
			propBakeryWeeklyReport.setRtc_last_Sun(articleResultset
					.getRcResponse().getLastSunRTC());
			propBakeryWeeklyReport.setRtc_last_Tot(articleResultset
					.getLastTotRTC().toString());
			// RTC_this
			propBakeryWeeklyReport.setRtc_this_Mon(articleResultset
					.getRcResponse().getMonRTC());
			propBakeryWeeklyReport.setRtc_this_Tue(articleResultset
					.getRcResponse().getTueRTC());
			propBakeryWeeklyReport.setRtc_this_Wed(articleResultset
					.getRcResponse().getWedRTC());
			propBakeryWeeklyReport.setRtc_this_Thur(articleResultset
					.getRcResponse().getThuRTC());
			propBakeryWeeklyReport.setRtc_this_Fri(articleResultset
					.getRcResponse().getFriRTC());
			propBakeryWeeklyReport.setRtc_this_Sat(articleResultset
					.getRcResponse().getSatRTC());
			propBakeryWeeklyReport.setRtc_this_Sun(articleResultset
					.getRcResponse().getSunRTC());
			propBakeryWeeklyReport.setRtc_this_Tot(articleResultset
					.getThisTotRTC().toString());
			// Dump_Last
			propBakeryWeeklyReport.setDump_last_Mon(articleResultset
					.getMon_last());
			propBakeryWeeklyReport.setDump_last_Tue(articleResultset
					.getTue_last());
			propBakeryWeeklyReport.setDump_last_Wed(articleResultset
					.getWed_last());
			propBakeryWeeklyReport.setDump_last_Thur(articleResultset
					.getThu_last());
			propBakeryWeeklyReport.setDump_last_Fri(articleResultset
					.getFri_last());
			propBakeryWeeklyReport.setDump_last_Sat(articleResultset
					.getSat_last());
			propBakeryWeeklyReport.setDump_last_Sun(articleResultset
					.getSun_last());
			propBakeryWeeklyReport.setDump_last_Tot(articleResultset
					.getLastTotDump().toString());
			// dump_this
			propBakeryWeeklyReport.setDump_this_Mon(articleResultset
					.getMon_this());
			propBakeryWeeklyReport.setDump_this_Tue(articleResultset
					.getTue_this());
			propBakeryWeeklyReport.setDump_this_Wed(articleResultset
					.getWed_this());
			propBakeryWeeklyReport.setDump_this_Thur(articleResultset
					.getThu_this());
			propBakeryWeeklyReport.setDump_this_Fri(articleResultset
					.getFri_this());
			propBakeryWeeklyReport.setDump_this_Sat(articleResultset
					.getSat_this());
			propBakeryWeeklyReport.setDump_this_Sun(articleResultset
					.getSun_this());
			propBakeryWeeklyReport.setDump_this_Tot(articleResultset
					.getThisTotDump().toString());
			// Planned Req
			propBakeryWeeklyReport.setPlannedReq_Mon(articleResultset
					.getRcResponse().getMonDemand());
			propBakeryWeeklyReport.setPlannedReq_Tue(articleResultset
					.getRcResponse().getTueDemand());
			propBakeryWeeklyReport.setPlannedReq_Wed(articleResultset
					.getRcResponse().getWedDemand());
			propBakeryWeeklyReport.setPlannedReq_Thur(articleResultset
					.getRcResponse().getThuDemand());
			propBakeryWeeklyReport.setPlannedReq_Fri(articleResultset
					.getRcResponse().getFriDemand());
			propBakeryWeeklyReport.setPlannedReq_Sat(articleResultset
					.getRcResponse().getSatDemand());
			propBakeryWeeklyReport.setPlannedReq_Sun(articleResultset
					.getRcResponse().getSunDemand());
			propBakeryWeeklyReport.setPlannedReq_Tot(articleResultset
					.getTotalDemand().toString());
			propBakeryWeeklyReports.add(propBakeryWeeklyReport);
			String article = articleResultset.getArticle().toString();
			myList.add(article);
					}
				}
			}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				propBakeryWeeklyReports);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("rHeading",
				"Weekly Production Schedule from " + param.getFromDate()
						+ " to  " + param.getToDate());
		tempMap.put("storeNo", param.getSiteNo());

		if ("UNI".equalsIgnoreCase(request.getParameter("siteDistrict"))
				|| "LNI".equalsIgnoreCase(request.getParameter("siteDistrict"))
				|| "SI".equalsIgnoreCase(request.getParameter("siteDistrict"))) {
			ByteArrayOutputStream byos = jasper.printReport(propBakeryWeeklyReportNameNZ, "pdf",
					beanDS, tempMap,
					jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request));
			jasperRptResponseHandler.handleJasperResponse(propBakeryWeeklyReportNameNZ, byos, "pdf",
					response);
		} else {
			ByteArrayOutputStream byos = jasper.printReport(propBakeryWeeklyReportName, "pdf",
					beanDS, tempMap,
					jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request));
			jasperRptResponseHandler.handleJasperResponse(propBakeryWeeklyReportName, byos, "pdf",
					response);
		}
	}

	private String checkPromoIndTot(String monPromInd, String tuePromInd,
			String wedPromInd, String thuPromInd, String friPromInd,
			String satPromInd, String sunPromInd, String article) {
		if(((monPromInd != null)&& (!monPromInd.isEmpty()))||((tuePromInd != null)&& (!tuePromInd.isEmpty()))||
				((wedPromInd != null)&& (!wedPromInd.isEmpty()))||((thuPromInd != null)&& (!thuPromInd.isEmpty()))||
				((friPromInd != null)&& (!friPromInd.isEmpty()))||((satPromInd != null)&& (!satPromInd.isEmpty()))||
				((sunPromInd != null)&& (!sunPromInd.isEmpty()))){
			if(monPromInd.equalsIgnoreCase("Y")||tuePromInd.equalsIgnoreCase("Y")||wedPromInd.equalsIgnoreCase("Y")||
					thuPromInd.equalsIgnoreCase("Y")||friPromInd.equalsIgnoreCase("Y")||satPromInd.equalsIgnoreCase("Y")||
					sunPromInd.equalsIgnoreCase("Y")){
				article = article+" *";
				return article;
			}
		}
		// TODO Auto-generated method stub
		return article;
	}
	
	private String checkPromoInd(String promoInd, String article){
		if((promoInd != null)&&(!promoInd.isEmpty())){
		if(promoInd.equalsIgnoreCase("Y")){
			article = article+" *";
			return article;
		}
		}
		return article;
	}

	private void buildMeatWeeklyReport(HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {
		List<PlannerMeatWeeklyReport> meatWeeklyReports = new ArrayList<PlannerMeatWeeklyReport>();
		PlannerMeatWeeklyReport plannerMeatWeeklyReport = null;
		for (PPArticleSearchResults articleResultSet : ppArticleSearchResults) {
			plannerMeatWeeklyReport = new PlannerMeatWeeklyReport();

			plannerMeatWeeklyReport.setArticle(articleResultSet.getArticle());

			plannerMeatWeeklyReport.setArticle_desc(articleResultSet
					.getArticle_desc().replaceAll("\\s+", " "));

			plannerMeatWeeklyReport.setPlu(articleResultSet.getPlu());

			plannerMeatWeeklyReport.setTray(articleResultSet.getTray_desc()
					.replaceAll("\\s+", " "));
			
			plannerMeatWeeklyReport.setLastMonSale(checkPromoInd(
					articleResultSet.getRcResponse().getLastMonPromInd(),
					articleResultSet.getRcResponse().getLastMonSale()));

			plannerMeatWeeklyReport.setMonSale(checkPromoInd(articleResultSet
					.getRcResponse().getMonPromInd(), articleResultSet
					.getRcResponse().getMonSale()));

			plannerMeatWeeklyReport.setLastTueSale(checkPromoInd(
					articleResultSet.getRcResponse().getLastTuePromInd(),
					articleResultSet.getRcResponse().getLastTueSale()));

			plannerMeatWeeklyReport.setTueSale(checkPromoInd(articleResultSet
					.getRcResponse().getTuePromInd(), articleResultSet
					.getRcResponse().getTueSale()));

			plannerMeatWeeklyReport.setLastWedSale(checkPromoInd(
					articleResultSet.getRcResponse().getLastWedPromInd(),
					articleResultSet.getRcResponse().getLastWedSale()));

			plannerMeatWeeklyReport.setWedSale(checkPromoInd(articleResultSet
					.getRcResponse().getWedPromInd(), articleResultSet
					.getRcResponse().getWedSale()));

			plannerMeatWeeklyReport.setLastThuSale(checkPromoInd(
					articleResultSet.getRcResponse().getLastThuPromInd(),
					articleResultSet.getRcResponse().getLastThuSale()));

			plannerMeatWeeklyReport.setThuSale(checkPromoInd(articleResultSet
					.getRcResponse().getThuPromInd(), articleResultSet
					.getRcResponse().getThuSale()));

			plannerMeatWeeklyReport.setLastFriSale(checkPromoInd(
					articleResultSet.getRcResponse().getLastFriPromInd(),
					articleResultSet.getRcResponse().getLastFriSale()));

			plannerMeatWeeklyReport.setFriSale(checkPromoInd(articleResultSet
					.getRcResponse().getFriPromInd(), articleResultSet
					.getRcResponse().getFriSale()));

			plannerMeatWeeklyReport.setLastSatSale(checkPromoInd(
					articleResultSet.getRcResponse().getLastSatPromInd(),
					articleResultSet.getRcResponse().getLastSatSale()));

			plannerMeatWeeklyReport.setSatSale(checkPromoInd(articleResultSet
					.getRcResponse().getSatPromInd(), articleResultSet
					.getRcResponse().getSatSale()));

			plannerMeatWeeklyReport.setLastSunSale(checkPromoInd(
					articleResultSet.getRcResponse().getLastSunPromInd(),
					articleResultSet.getRcResponse().getLastSunSale()));

			plannerMeatWeeklyReport.setSunSale(checkPromoInd(articleResultSet
					.getRcResponse().getSunPromInd(), articleResultSet
					.getRcResponse().getSunSale()));

			plannerMeatWeeklyReport.setLastTotSales(checkPromoIndTot(
					articleResultSet.getRcResponse().getLastMonPromInd(),
					articleResultSet.getRcResponse().getLastTuePromInd(),
					articleResultSet.getRcResponse().getLastWedPromInd(),
					articleResultSet.getRcResponse().getLastThuPromInd(),
					articleResultSet.getRcResponse().getLastFriPromInd(),
					articleResultSet.getRcResponse().getLastSatPromInd(),
					articleResultSet.getRcResponse().getLastSunPromInd(),
					articleResultSet.getLastTotSales().toString())); // fix for defect 14755
			plannerMeatWeeklyReport.setThisTotSales(checkPromoIndTot(
					articleResultSet.getRcResponse().getMonPromInd(),
					articleResultSet.getRcResponse().getTuePromInd(),
					articleResultSet.getRcResponse().getWedPromInd(),
					articleResultSet.getRcResponse().getThuPromInd(),
					articleResultSet.getRcResponse().getFriPromInd(),
					articleResultSet.getRcResponse().getSatPromInd(),
					articleResultSet.getRcResponse().getSunPromInd(),
					articleResultSet.getThisTotSales().toString()));


			// RTC

			plannerMeatWeeklyReport.setLastMonRTC(articleResultSet
					.getRcResponse().getLastMonRTC());

			plannerMeatWeeklyReport.setMonRTC(articleResultSet.getRcResponse()
					.getMonRTC());

			plannerMeatWeeklyReport.setLastTueRTC(articleResultSet
					.getRcResponse().getLastTueRTC());

			plannerMeatWeeklyReport.setTueRTC(articleResultSet.getRcResponse()
					.getTueRTC());

			plannerMeatWeeklyReport.setLastWedRTC(articleResultSet
					.getRcResponse().getLastWedRTC());

			plannerMeatWeeklyReport.setWedRTC(articleResultSet.getRcResponse()
					.getWedRTC());

			plannerMeatWeeklyReport.setLastThuRTC(articleResultSet
					.getRcResponse().getLastThuRTC());

			plannerMeatWeeklyReport.setThuRTC(articleResultSet.getRcResponse()
					.getThuRTC());

			plannerMeatWeeklyReport.setLastFriRTC(articleResultSet
					.getRcResponse().getLastFriRTC());

			plannerMeatWeeklyReport.setFriRTC(articleResultSet.getRcResponse()
					.getFriRTC());

			plannerMeatWeeklyReport.setLastSatRTC(articleResultSet
					.getRcResponse().getLastSatRTC());

			plannerMeatWeeklyReport.setSatRTC(articleResultSet.getRcResponse()
					.getSatRTC());

			plannerMeatWeeklyReport.setLastSunRTC(articleResultSet
					.getRcResponse().getLastSunRTC());

			plannerMeatWeeklyReport.setSunRTC(articleResultSet.getRcResponse()
					.getSunRTC());

			plannerMeatWeeklyReport.setLastTotRTC(articleResultSet
					.getLastTotRTC());

			plannerMeatWeeklyReport.setThisTotRTC(articleResultSet
					.getThisTotRTC());

			// Dump

			plannerMeatWeeklyReport.setLastMonDump(articleResultSet
					.getMon_last());

			plannerMeatWeeklyReport.setMonDump(articleResultSet.getMon_this());

			plannerMeatWeeklyReport.setLastTueDump(articleResultSet
					.getTue_last());

			plannerMeatWeeklyReport.setTueDump(articleResultSet.getTue_this());

			plannerMeatWeeklyReport.setLastWedDump(articleResultSet
					.getWed_last());

			plannerMeatWeeklyReport.setWedDump(articleResultSet.getWed_this());

			plannerMeatWeeklyReport.setLastThuDump(articleResultSet
					.getThu_last());

			plannerMeatWeeklyReport.setThuDump(articleResultSet.getThu_this());

			plannerMeatWeeklyReport.setLastFriDump(articleResultSet
					.getFri_last());

			plannerMeatWeeklyReport.setFriDump(articleResultSet.getFri_this());

			plannerMeatWeeklyReport.setLastSatDump(articleResultSet
					.getSat_last());

			plannerMeatWeeklyReport.setSatDump(articleResultSet.getSat_this());

			plannerMeatWeeklyReport.setLastSunDump(articleResultSet
					.getSun_last());

			plannerMeatWeeklyReport.setSunDump(articleResultSet.getSun_this());

			plannerMeatWeeklyReport.setLastTotDump(articleResultSet
					.getLastTotDump().toString());

			plannerMeatWeeklyReport.setThisTotDump(articleResultSet
					.getThisTotDump().toString());

			// Planned Req

			plannerMeatWeeklyReport.setMonDemand(articleResultSet
					.getRcResponse().getMonDemand());

			plannerMeatWeeklyReport.setTueDemand(articleResultSet
					.getRcResponse().getTueDemand());

			plannerMeatWeeklyReport.setWedDemand(articleResultSet
					.getRcResponse().getWedDemand());

			plannerMeatWeeklyReport.setThuDemand(articleResultSet
					.getRcResponse().getThuDemand());

			plannerMeatWeeklyReport.setFriDemand(articleResultSet
					.getRcResponse().getFriDemand());

			plannerMeatWeeklyReport.setSatDemand(articleResultSet
					.getRcResponse().getSatDemand());

			plannerMeatWeeklyReport.setSunDemand(articleResultSet
					.getRcResponse().getSunDemand());

			plannerMeatWeeklyReport.setTotalDemand(articleResultSet
					.getTotalDemand());

			meatWeeklyReports.add(plannerMeatWeeklyReport);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				meatWeeklyReports);
		HashMap<String, Object> tempMap = new HashMap<String, Object>();
		tempMap.put("rHeading",
				"Weekly Production Schedule from " + param.getFromDate()
						+ " to  " + param.getToDate());
		tempMap.put("storeNo", param.getSiteNo());
		// to check for Aus/New Zealand Store

		if ("UNI".equalsIgnoreCase(request.getParameter("siteDistrict"))
				|| "LNI".equalsIgnoreCase(request.getParameter("siteDistrict"))
				|| "SI".equalsIgnoreCase(request.getParameter("siteDistrict"))) { // UNI
																					// LNI
																					// SI
			ByteArrayOutputStream byos = jasper.printReport(meatWeeklyNewReportName, "pdf",
					beanDS, tempMap,
					jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request));
			jasperRptResponseHandler.handleJasperResponse(meatWeeklyNewReportName, byos, "pdf",
					response);

		} else {
			ByteArrayOutputStream byos = jasper.printReport(meatWeeklyReportName, "pdf",
					beanDS, tempMap,
					jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request));
			jasperRptResponseHandler.handleJasperResponse(meatWeeklyReportName, byos, "pdf",
					response);
		}
	}

	private String convertArticleSearchResultListTojson(
			Map<String, ArrayList<PPArticleSearchResults>> bakeryArticleSet,
			String msg) {

		return "{\"data\":" + Constants.convertToJsonString(bakeryArticleSet)
				+ ",\"msg\":\"" + msg + "\",\"param\":" + param.toString()
				+ "}";
	}
	
	private String convertArticleSearchResultListTojson(
			List<PPArticleSearchResults> ppArticleSearchResults, String msg) {

		return "{\"data\":"
				+ Constants.convertToJsonString(ppArticleSearchResults)
				+ ",\"msg\":\"" + msg + "\",\"param\":" + param.toString()
				+ "}";
	}

	public void setWeekDatesForNZStores() {
		String day = "Wed";
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Calendar fromCalendar = Calendar.getInstance();
		Calendar toCalendar = Calendar.getInstance();
		int day_of_week = fromCalendar.get(Calendar.DAY_OF_WEEK);
		String fromDate = dateFormat.format(fromCalendar.getTime());
		param.setCurrentDate(fromDate);
		String toDate = dateFormat.format(toCalendar.getTime());
		switch (day_of_week) {
		case 1:
			day = "Sunday";
			fromCalendar.add(Calendar.DATE, -6);
			toCalendar.add(Calendar.DATE, 0);
			break;
		case 2:
			day = "Monday";
			toCalendar.add(Calendar.DATE, 6);
			break;
		case 3:
			day = "Tuesday";
			fromCalendar.add(Calendar.DATE, -1);
			toCalendar.add(Calendar.DATE, 5);
			break;
		case 4:
			day = "Wednesday";
			fromCalendar.add(Calendar.DATE, -2);
			toCalendar.add(Calendar.DATE, 4);
			break;
		case 5:
			day = "Thursday";
			fromCalendar.add(Calendar.DATE, -3);
			toCalendar.add(Calendar.DATE, 3);
			break;
		case 6:
			day = "Friday";
			fromCalendar.add(Calendar.DATE, -4);
			toCalendar.add(Calendar.DATE, 2);
			break;
		case 7:
			day = "Saturday";
			fromCalendar.add(Calendar.DATE, -5);
			toCalendar.add(Calendar.DATE, 1);
			break;

		}
		fromDate = dateFormat.format(fromCalendar.getTime());
		toDate = dateFormat.format(toCalendar.getTime());
		param.setFromDate(fromDate);
		param.setToDate(toDate);
		param.setDay(day);
		setDatesForBakeryDough();
	}

	public void setWeekDates() {
		String day = "Wed";
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Calendar fromCalendar = Calendar.getInstance();
		Calendar toCalendar = Calendar.getInstance();
		int day_of_week = fromCalendar.get(Calendar.DAY_OF_WEEK);
		String fromDate = dateFormat.format(fromCalendar.getTime());
		param.setCurrentDate(fromDate);
		String toDate = dateFormat.format(toCalendar.getTime());
		switch (day_of_week) {
		case 1:
			day = "Sunday";
			fromCalendar.add(Calendar.DATE, -4);
			toCalendar.add(Calendar.DATE, 2);
			break;
		case 2:
			day = "Monday";
			fromCalendar.add(Calendar.DATE, -5);
			toCalendar.add(Calendar.DATE, 1);
			break;
		case 3:
			day = "Tuesday";
			fromCalendar.add(Calendar.DATE, -6);
			toCalendar.add(Calendar.DATE, 0);
			break;
		case 4:
			day = "Wednesday";
			toCalendar.add(Calendar.DATE, 6);
			break;
		case 5:
			day = "Thursday";
			fromCalendar.add(Calendar.DATE, -1);
			toCalendar.add(Calendar.DATE, 5);
			break;
		case 6:
			day = "Friday";
			fromCalendar.add(Calendar.DATE, -2);
			toCalendar.add(Calendar.DATE, 4);
			break;
		case 7:
			day = "Saturday";
			fromCalendar.add(Calendar.DATE, -3);
			toCalendar.add(Calendar.DATE, 3);
			break;

		}
		fromDate = dateFormat.format(fromCalendar.getTime());
		toDate = dateFormat.format(toCalendar.getTime());
		param.setFromDate(fromDate);
		param.setToDate(toDate);
		param.setDay(day);
		setDatesForBakeryDough();
	}

	private int convertStringToInt(String stringValue) {
		int value = 0;
		try {
			value = Integer.parseInt(stringValue);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}

	private Double convertStringToDouble(String stringValue) {
		Double value = 0.0;
		try {
			value = Double.parseDouble(stringValue);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}

	private String convertIntToString(int value) {
		StringBuilder sb = new StringBuilder();
		sb.append("");
		sb.append(value);
		return sb.toString();
	}

	private String convertDoubleToString(double value) {
		StringBuilder sb = new StringBuilder();
		sb.append("");
		sb.append(value);
		return sb.toString();
	}

	public void setDatesForBakeryDough() {
		String day = "";
		List<PPlannerDateParam> plannerDateParamList = new ArrayList<PPlannerDateParam>();
		PPlannerDateParam plannerDateParam = null;
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Calendar cal = Calendar.getInstance();
		int day_of_week = cal.get(Calendar.DAY_OF_WEEK);
		int dayInc = 0;
		String date = dateFormat.format(cal.getTime());
		for (int i = 0; i < 7; i++) {
			plannerDateParam = new PPlannerDateParam();
			cal = Calendar.getInstance();
			cal.add(Calendar.DATE, dayInc);
			date = dateFormat.format(cal.getTime());
			day_of_week = cal.get(Calendar.DAY_OF_WEEK);
			switch (day_of_week) {
			case 1:
				day = "Sunday";
				break;
			case 2:
				day = "Monday";
				break;
			case 3:
				day = "Tuesday";
				break;
			case 4:
				day = "Wednesday";
				break;
			case 5:
				day = "Thursday";
				break;
			case 6:
				day = "Friday";
				break;
			case 7:
				day = "Saturday";
				break;
			}
			plannerDateParam.setDate(date);
			plannerDateParam.setDay(day);
			plannerDateParamList.add(plannerDateParam);
			dayInc++;
		}
		param.setPlannerDateParamList(plannerDateParamList);

	}

	private double round(double value, int places) {
		if (places < 0)
			throw new IllegalArgumentException();

		long factor = (long) Math.pow(10, places);
		value = value * factor;
		long tmp = Math.round(value);
		return (double) tmp / factor;
	}

	@RequestMapping(value = "/fetchBakeryCategories.htm", method = RequestMethod.GET)
	@ResponseBody
	public String fetchBakeryCategories(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		
		List<PPCategoryResults> categories = productionPlannerService
		.getCategories(user);
		
		String msg = "";
		if(categories.size() > 0)
		{
			msg = categories.get(0).getMsg();
		}
		else {
			msg = Constants.TECH_ISSUE;
		}
		
		return "{\"data\":" + Constants.convertToJsonString(categories)
				+ ",\"msg\":\"" + msg + "\""+ "}";
	}	

	private String getTotalNoOfBags(double totalDoughWeight, String calcFactor, String noOfKilos){
		
		double calcFact=1;// for defect 14745
		double kiloPerBag=1;// for defect 14745
		double result=0.0;
		int compareVal1=0;
		double compareVal2=0.0;
		DecimalFormat df = new DecimalFormat("#.#"); 
		try {
			calcFact=Double.parseDouble(calcFactor);// for defect 14745
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			kiloPerBag=Double.parseDouble(noOfKilos);// for defect 14745
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		result=totalDoughWeight/calcFact;
		result=result/kiloPerBag;
		
		compareVal1=(int)result;
		compareVal2=compareVal1+0.5;
		if(result<=compareVal2 && result>compareVal1){
			result=compareVal2;
		}else if(result>compareVal2 ){
			result=compareVal2+0.5;
		}
		
		
		return String.valueOf(df.format(result));
	}
}
