package au.com.woolworths.portal.controller;

import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleDetail;
import au.com.woolworths.portal.model.CompetitorDtlList;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.InStorePromoArticleInfo;
import au.com.woolworths.portal.model.InstoreArticleInfo;
import au.com.woolworths.portal.model.InstorePromotionModel;
import au.com.woolworths.portal.model.PromoArticle;
import au.com.woolworths.portal.model.PromoSales;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.inStorePromotionDisplayType;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.param.InStorePromoParam;
import au.com.woolworths.portal.param.InstoreSearchParam;
import au.com.woolworths.portal.param.PromotionsPlanningParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.InStorePromoServiceImpl;
import au.com.woolworths.portal.service.PromotionsPlanningServiceImpl;
import au.com.woolworths.portal.service.SearchArticleServiceImpl;
import au.com.woolworths.portal.service.ValidationServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Controller
@RequestMapping(value = "*/instore")
@Scope("session")
public class InStorePromotionController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['InStorePromotionDisplayCentral']}")
	private String screenCode1;
	
	@Value("#{properties['InStorePromotionDisplayLocal']}")
	private String screenCode2;
	
	@Value("#{properties['InStorePromotionClearance']}")
	private String screenCode3;
	
	@Value("#{properties['InStorePromotionCompetion']}")
	private String screenCode4;
	
	@Value("#{properties['InStorePromotionOtherMarkdown']}")
	private String screenCode5;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private SearchArticleServiceImpl SearchArticleService;

	@Autowired
	private InStorePromoServiceImpl inStorePromoService;

	@Autowired
	private PromotionsPlanningServiceImpl promotionsPlanningService;
	
	@Autowired
	private ValidationServiceImpl validationServiceImpl;

	private ModelMap model;

	private UserContext userDetail;

	private List<PromoSales> promoSalesHistoryListMap;

	/**
	 * @return the promoValidatedList
	 */
	public InStorePromoParam getPromoValidatedList() {
		return promoValidatedList;
	}

	/**
	 * @param promoValidatedList
	 *            the promoValidatedList to set
	 */
	public void setPromoValidatedList(InStorePromoParam promoValidatedList) {
		this.promoValidatedList = promoValidatedList;
	}

	private InStorePromoParam promoValidatedList;
	HashMap<String, String[]> mapStartEndDate;
	
	

	public HashMap<String, String[]> getMapStartEndDate() {
		return mapStartEndDate;
	}

	public void setMapStartEndDate(HashMap<String, String[]> mapStartEndDate) {
		this.mapStartEndDate = mapStartEndDate;
	}

	private static final Logger LOGGER = Logger.getLogger(InStorePromotionController.class.getName());

	@RequestMapping(value = "/onPageLoad.htm")
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode2)){
			if((user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ModelAndView modelAndView = new ModelAndView("inStore-PromoCreation");
		try {
			if (userDetail.getImgLocation().equalsIgnoreCase("bigw")) {
				// ArrayList<inStorePromotionDisplayType> displayList =
				// inStorePromoService.getDisplayTypeList(userDetail.getSiteNo());
				ArrayList<inStorePromotionDisplayType> displayList = new ArrayList<inStorePromotionDisplayType>();
				modelAndView.addObject("displaylist", displayList);
				modelAndView.addObject("isbigw", true);
			} else {
				modelAndView.addObject("displaylist",
						new ArrayList<inStorePromotionDisplayType>());
				modelAndView.addObject("isbigw", false);
			}

			if (null != request.getSession().getAttribute("articleDisplayList")) {
				@SuppressWarnings("unchecked")
				ArrayList<String> articleList = (ArrayList<String>) request
						.getSession().getAttribute("articleDisplayList");
				modelAndView.addObject("addedArticles", articleList);
				request.getSession().removeAttribute("articleDisplayList");
			}

			modelAndView.addObject("banner", userDetail.getImgLocation());
			
			if("1060".equalsIgnoreCase(""+userDetail.getSalesOrg())){
			try {
				model.addAttribute("restrictionParam",validationServiceImpl.getRestrictionParam(user));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		} catch (Exception e) {
			LOGGER.info("Exception on load of display type");
		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/searchArticle.htm")
	@ResponseBody
	public String searchArticle(
			@ModelAttribute("InstoreSearchParam") InstoreSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {
		// used to hold response message
		LOGGER.info("Entering");
		InstoreArticleInfo searchRes = new InstoreArticleInfo();
		List<ArticleDetail> articleSearchResults = new ArrayList<ArticleDetail>();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			searchRes.setMessage("logout");
			return CommonUtils.convertObjectTojson(searchRes);
		} else {
			LOGGER.info("processing");
			try {
				param.setSr_searchOption(param.getSr_searchOption());
				ArticleSearchParam asp = param.getParam();

				if (param.getArticleSearchParam() != null) {
					asp.setSiteNo(userDetail.getSiteNo());
					asp.setSaleOrg(userDetail.getSalesOrg().toString());
					asp.setAutoStockRFlag(Constants.TRUE);
				}

				articleSearchResults = SearchArticleService
						.searchArticleRc(asp,userDetail);

				if (articleSearchResults == null
						|| articleSearchResults.size() == 0) {
					searchRes.setMessage("No article found for '"
							+ param.getSr_article() + "'");
				} else if (articleSearchResults.size() == 1) {
					searchRes.setMessage("directadd");
				} else {
					searchRes.setMessage("success");
				}
				searchRes.setArticleList(articleSearchResults);

			} catch (JsonParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				searchRes.setMessage("Sorry!Some technical issue occured.");
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				searchRes.setMessage("Sorry!Some technical issue occured.");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				searchRes.setMessage("Sorry!Some technical issue occured.");
			}
		}
		return CommonUtils.convertObjectTojson(searchRes);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/moreArticleInfo.htm", consumes = "application/json")
	@ResponseBody
	public String searchArticleInfo(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		LOGGER.info("inStorePromoParam"
				+ inStorePromoParam.getInStorePromoArticleInf());
		InStorePromoParam response = new InStorePromoParam();
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {

				//convertListToJson(inStorePromoParam);
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam.setOmInfoFlag(Constants.YES);
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					inStorePromoParam = setValidateProperies(inStorePromoParam);
					LOGGER.info("======"
							+ inStorePromoParam
									.getInStorePromoArticleInfoList().get(0)
									.getDeliveryDateValidateFlag());
					LOGGER.info("inStorePromoParam "
							+ inStorePromoParam.toString());
					response = inStorePromoService
							.getPromoArticleInfo(inStorePromoParam,userDetail);
					response.setMsg(Constants.SUCCESS);
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	private InStorePromoParam setValidateProperies(
			InStorePromoParam inStorePromoParam) {
		// TODO Auto-generated method stub
		for (int i = 0; i < inStorePromoParam.getInStorePromoArticleInfoList()
				.size(); i++) {
			if (inStorePromoParam.getInStorePromoArticleInfoList().get(i)
					.getBuildQty() != null
					&& !inStorePromoParam.getInStorePromoArticleInfoList()
							.get(i).getBuildQty().equals("")) {
				inStorePromoParam.getInStorePromoArticleInfoList().get(i)
						.setBuildValidateFlag("Y");
			}
			if (inStorePromoParam.getInStorePromoArticleInfoList().get(i)
					.getDisplayQty() != null
					&& !inStorePromoParam.getInStorePromoArticleInfoList()
							.get(i).getDisplayQty().equals("")) {
				inStorePromoParam.getInStorePromoArticleInfoList().get(i)
						.setDisplayValidateFlag("Y");
			}
			if (inStorePromoParam.getInStorePromoArticleInfoList().get(i)
					.getDemandQty() != null
					&& !inStorePromoParam.getInStorePromoArticleInfoList()
							.get(i).getDemandQty().equals("")) {
				inStorePromoParam.getInStorePromoArticleInfoList().get(i)
						.setDemandValidateFlag("Y");
			}

			inStorePromoParam.getInStorePromoArticleInfoList().get(i)
					.setBaseFrctFlag("Y");
			inStorePromoParam.getInStorePromoArticleInfoList().get(i)
					.setDeliveryDateValidateFlag("Y");

		}
		return inStorePromoParam;

	}

	@RequestMapping(method = RequestMethod.POST, value = "/displayvalidate.htm", consumes = "application/json")
	@ResponseBody
	public String displayValidate(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				//convertListToJson(inStorePromoParam);
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					inStorePromoParam.setOmInfoFlag(Constants.TRUE);
					inStorePromoParam.setAutoStockRFlag(Constants.TRUE);
					inStorePromoParam = setValidateProperies(inStorePromoParam);

					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					response.setMsg(Constants.SUCCESS);
					this.setPromoValidatedList(response);
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/displaycreate.htm")
	@ResponseBody
	public String displayCreate(HttpServletRequest request)
			throws IllegalArgumentException, IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam inStorePromoParam = this.getPromoValidatedList();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				//convertListToJson(inStorePromoParam);
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					LOGGER.info("response " + response.getMsg());
					if (null != response.getMsg()
							&& response.getMsg().trim() != "") {

					} else {
						response.setMsg(Constants.SUCCESS);
					}
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/createPromotionFromArticlelookup.htm", consumes = "application/json")
	@ResponseBody
	public String createPromotionFromArticleLookup(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		InStorePromoParam validateResponse = new InStorePromoParam();
		InStorePromoParam createResponse = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			validateResponse.setMsg("logout");
			return CommonUtils.convertObjectTojson(validateResponse);
		} else {
			LOGGER.info("processing displaycreateFromArticlelookup");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					inStorePromoParam = setValidateProperies(inStorePromoParam);
					if (inStorePromoParam.getInstorePromoType()
							.equalsIgnoreCase(Constants.PROMO_TYPE_DISPLAY)) {
						validateResponse = inStorePromoService
								.promoCreateOrValidate(inStorePromoParam,userDetail);
					} else {
						validateResponse = inStorePromoParam;
					}
					LOGGER.info("validate response "
							+ validateResponse.getMsg());
					if (null != validateResponse.getMsg()
							&& validateResponse.getMsg().trim() != "") {
						validateResponse.setMsg(Constants.VALIDATIONERROR);
						createResponse = validateResponse;
					} else {
						if (validateResponse.getInStorePromoArticleInfoList() != null) {
							if (validateResponse
									.getInStorePromoArticleInfoList().size() == 1) {
								InStorePromoArticleInfo obj = validateResponse
										.getInStorePromoArticleInfoList()
										.get(0);
								if ((obj.getDeliveryDateValidateStatusFlag() == null || obj
										.getDeliveryDateValidateStatusFlag()
										.equals(""))
										&& (obj.getDemandValidateStatusFlag() == null || obj
												.getDemandValidateStatusFlag()
												.equals(""))
										&& (obj.getDisplayValidateStatusFlag() == null || obj
												.getDisplayValidateStatusFlag()
												.equals(""))
										&& (obj.getBuildValidateStatusFlag() == null || obj
												.getBuildValidateStatusFlag()
												.equals(""))) {
									validateResponse
											.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
									createResponse = inStorePromoService
											.promoCreateOrValidate(validateResponse,userDetail);
									try {
										LOGGER.info("create response "
												+ createResponse.getMsg());
										if (createResponse
												.getInStorePromoArticleInfoList() != null) {
											if (createResponse
													.getInStorePromoArticleInfoList()
													.size() == 1) {
												if (null == createResponse
														.getMsg()
														|| createResponse
																.getMsg()
																.equalsIgnoreCase(
																		"")) {
													createResponse
															.setMsg(Constants.SUCCESS);
												}
											}
										}
									} catch (Exception e) {
										e.printStackTrace();
										createResponse.setMsg("failed");
									}

								} else {
									validateResponse
											.setMsg(Constants.VALIDATIONERROR);
									createResponse = validateResponse;
								}

							} else {
								validateResponse
										.setMsg(Constants.VALIDATIONERROR);
								createResponse = validateResponse;
							}
						} else {
							validateResponse.setMsg(Constants.VALIDATIONERROR);
							createResponse = validateResponse;
						}

					}
				} else {
					createResponse.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				createResponse.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(createResponse);
	}

	// METHOD USED TO GET PROMOTIONS ADDTIONAL DETAILS--copied from promotion
	// planning controller
	@RequestMapping(value = "/getPromoAddtionalDtls.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPromoAddtionalDtls(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		List<PromoArticle> promoArticleList = null;
		PromoArticle promoArticle = null;
		ObjectMapper mapper = null;
		StringWriter stw = null;
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());

		if ((param.getArticleNo() != null && param.getArticleNo().trim() != ""
				&& param.getWeekStartDate() != null && param.getWeekStartDate()
				.trim() != "")) {
			promoArticleList = promotionsPlanningService
					.getPromoAddtionalDtls(param,userDetail);
			// setting global data for save functionality
			if (promoArticleList != null
					&& promoArticleList.size() > 0
					&& promoArticleList.get(0).getPromoSalesHistList() != null
					&& promoArticleList.get(0).getPromoSalesHistList().size() > 0)
				promoSalesHistoryListMap = promoArticleList.get(0)
						.getPromoSalesHistList();
		} else {
			promoArticleList = new ArrayList<PromoArticle>();
			promoArticle = new PromoArticle();
			promoArticle.setMsg(Constants.MANDATORY);
			promoArticleList.add(promoArticle);
		}

		/*
		 * try { mapper = new ObjectMapper(); stw = new StringWriter(); final
		 * JsonGenerator jsonGenerator = mapper.getJsonFactory()
		 * .createJsonGenerator(stw);
		 * 
		 * mapper.writeValue(jsonGenerator, promoArticleList); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * e.printStackTrace(); } catch (IOException e) {
		 * 
		 * e.printStackTrace(); }
		 */
		// LOGGER.info("stw.toString()" + stw.toString());

		return "{\"data\":" + Constants.convertToJsonString(promoArticleList)
				+ "}";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/addToDisplayList.htm")
	@ResponseBody
	public String addToDisplayList(HttpServletRequest request) {
		String promoType = request.getParameter("promoType");
		ArrayList<String> articleList = new ArrayList<String>();
		if (promoType.equalsIgnoreCase(Constants.PROMO_TYPE_DISPLAY)) {

			if (null != request.getSession().getAttribute("articleDisplayList")) {
				articleList = (ArrayList<String>) request.getSession()
						.getAttribute("articleDisplayList");
				if (articleList.contains(request.getParameter("articleNo")
						+ "_" + request.getParameter("articleUom") + "_"
						+ request.getParameter("description"))) {
					return "exist";
				} else {
					articleList.add(request.getParameter("articleNo") + "_"
							+ request.getParameter("articleUom") + "_"
							+ request.getParameter("description"));
					request.getSession().removeAttribute("articleDisplayList");
					request.getSession().setAttribute("articleDisplayList",
							articleList);
				}
			} else {
				articleList.add(request.getParameter("articleNo") + "_"
						+ request.getParameter("articleUom") + "_"
						+ request.getParameter("description"));
				request.getSession().setAttribute("articleDisplayList",
						articleList);
			}

		} else if (promoType.equalsIgnoreCase(Constants.PROMO_TYPE_CLEARANCE)) {

			if (null != request.getSession().getAttribute(
					"articleClearanceList")) {
				articleList = (ArrayList<String>) request.getSession()
						.getAttribute("articleClearanceList");
				if (articleList.contains(request.getParameter("articleNo")
						+ "_" + request.getParameter("articleUom") + "_"
						+ request.getParameter("description"))) {
					return "exist";
				} else {
					articleList.add(request.getParameter("articleNo") + "_"
							+ request.getParameter("articleUom") + "_"
							+ request.getParameter("description"));
					request.getSession()
							.removeAttribute("articleClearanceList");
					request.getSession().setAttribute("articleClearanceList",
							articleList);
				}
			} else {
				articleList.add(request.getParameter("articleNo") + "_"
						+ request.getParameter("articleUom") + "_"
						+ request.getParameter("description"));
				request.getSession().setAttribute("articleClearanceList",
						articleList);
			}

		} else {

			if (null != request.getSession().getAttribute(
					"articleCompetitionList")) {
				articleList = (ArrayList<String>) request.getSession()
						.getAttribute("articleCompetitionList");
				if (articleList.contains(request.getParameter("articleNo")
						+ "_" + request.getParameter("articleUom") + "_"
						+ request.getParameter("description"))) {
					return "exist";
				} else {
					articleList.add(request.getParameter("articleNo") + "_"
							+ request.getParameter("articleUom") + "_"
							+ request.getParameter("description"));
					request.getSession().removeAttribute(
							"articleCompetitionList");
					request.getSession().setAttribute("articleCompetitionList",
							articleList);
				}
			} else {
				articleList.add(request.getParameter("articleNo") + "_"
						+ request.getParameter("articleUom") + "_"
						+ request.getParameter("description"));
				request.getSession().setAttribute("articleCompetitionList",
						articleList);
			}

		}
		return "added";
	}

	// Clearance Promo Functions

	@RequestMapping(value = "/clearanceOnPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView clearanceOnPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode3)){
			if((user.getUserAccessMap().get(screenCode3).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode3).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		/*List<Department> deptInfoList = new ArrayList<Department>();*/

		ModelAndView modelAndView = new ModelAndView("inStore-PromoClearance");
		try {
			if (userDetail.getImgLocation().equalsIgnoreCase("bigw")) {
				/*
				 * ArrayList<inStorePromotionDisplayType> displayList =
				 * inStorePromoService
				 * .getDisplayTypeList(userDetail.getSiteNo());
				 */
				/* modelAndView.addObject("displaylist",displayList); */
				modelAndView.addObject("isbigw", true);
			} else {
				modelAndView.addObject("displaylist",
						new ArrayList<inStorePromotionDisplayType>());
				modelAndView.addObject("isbigw", false);
			}

			if (null != request.getSession().getAttribute(
					"articleClearanceList")) {
				@SuppressWarnings("unchecked")
				ArrayList<String> articleList = (ArrayList<String>) request
						.getSession().getAttribute("articleClearanceList");
				modelAndView.addObject("addedArticles", articleList);

				request.getSession().removeAttribute("articleClearanceList");
			}

			modelAndView.addObject("banner", userDetail.getImgLocation());

		/*	String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) inStorePromoService
					.getDeptDetails(parent_node_no, userDetail.getSalesOrg());

			model.addAttribute("deptInfoList", deptInfoList);*/

		} catch (Exception e) {
		/*	model.addAttribute("deptInfoList", new ArrayList<Department>());*/
			LOGGER.info("Exception on load of display type");
		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/moreArticleInfoForClearance.htm", consumes = "application/json")
	@ResponseBody
	public String moreArticleInfoForClearance(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				inStorePromoParam.setSiteNo(userDetail.getSiteNo());
				inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
						.toString());
				inStorePromoParam.setUsername(userDetail.getUserId());
				inStorePromoParam.setSapPassword(userDetail.getSapPwd());
				inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_CLEARANCE);
				inStorePromoParam
						.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
				LOGGER.info("======"
						+ inStorePromoParam.getInStorePromoArticleInfoList()
								.get(0).getDeliveryDateValidateFlag());
				LOGGER.info("inStorePromoParam "
						+ inStorePromoParam.toString());
				// response = inStorePromoService
				// .getPromoArticleInfo(inStorePromoParam);
				response = inStorePromoParam;
				response.setMsg(Constants.SUCCESS);
				if (response.getMsg() == null || response.getMsg().equals("")) {
					response.setMsg(Constants.NO_DATA);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/clearanceValidate.htm", consumes = "application/json")
	@ResponseBody
	public String clearanceValidate(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_CLEARANCE);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					if(inStorePromoParam.getSalesOrg().equals(Constants.DANMURY_SALES_ORG)){
						//passing promo start , end date changes
						inStorePromoParam = getPromoStartEndDateforValidation(inStorePromoParam);	
						response=inStorePromoService.promoValidate(inStorePromoParam,userDetail);
					}else{
						 response=(inStorePromoParam);
					}
					response.setMsg(Constants.SUCCESS);
					response = getPromoStartEndDateforCreation(response);
					this.setPromoValidatedList(response);					
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	private InStorePromoParam getPromoStartEndDateforValidation(
			InStorePromoParam inStorePromoParam) {
		if(inStorePromoParam.getSalesOrg().equals(Constants.DANMURY_SALES_ORG)
				&& inStorePromoParam.getInStorePromoArticleInfoList().size() >0){
			mapStartEndDate = new HashMap<String, String[]>();
			for(InStorePromoArticleInfo articleDet : inStorePromoParam.getInStorePromoArticleInfoList()){
				String[] startEndDate = new String[2];
				startEndDate[0] = articleDet.getPromoStartDate();
				startEndDate[1] = articleDet.getPromoEndDate();
				mapStartEndDate.put(articleDet.getArticleNo() + "_" + articleDet.getArticleUom(),startEndDate);
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				Date date = new Date();
				articleDet.setPromoStartDate(dateFormat.format(date));//today's date
				Calendar cal1 = Calendar.getInstance();
				cal1.setTime(date);
				cal1.add(Calendar.DATE, 21);// 3 weeks after
				articleDet.setPromoEndDate(dateFormat.format(cal1.getTime()));
				}
			}
		return inStorePromoParam;
	}
	private InStorePromoParam getPromoStartEndDateforCreation(
			InStorePromoParam response) {		
		if(response != null && response.getSalesOrg()!= null &&
				response.getSalesOrg().equals(Constants.DANMURY_SALES_ORG)
				&& response.getInStorePromoArticleInfoList() != null &&
				response.getInStorePromoArticleInfoList().size() >0 && mapStartEndDate.size()>0){			
			for(InStorePromoArticleInfo articleDet : response.getInStorePromoArticleInfoList()){				
				articleDet.setPromoStartDate(mapStartEndDate.get(articleDet.getArticleNo() + "_" + articleDet.getArticleUom())[0]);				
				articleDet.setPromoEndDate(mapStartEndDate.get(articleDet.getArticleNo() + "_" + articleDet.getArticleUom())[1]);
				}
		}
		return response;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/compValidate.htm", consumes = "application/json")
	@ResponseBody
	public String compValidate(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_COMPETION);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
				 	/* if(((UserContext)request.getSession(false).getAttribute("user")).getSalesOrg().equals(Constants.DANMURY_SALES_ORG)){
				 		 response=inStorePromoService.promoValidate(inStorePromoParam);
					 }else{*/
						 response=(inStorePromoParam);
					 /*}*/
					 response.setMsg(Constants.SUCCESS);
					this.setPromoValidatedList(response);
					
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/clearanceCreate.htm")
	@ResponseBody
	public String clearanceCreate(HttpServletRequest request)
			throws IllegalArgumentException, IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam inStorePromoParam = this.getPromoValidatedList();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					if(userDetail.getImgLocation().equals("danmurphy"))
					{
						inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_LIQUOR_CLEARANCE);
					}
					else
					{
						inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_CLEARANCE);
					}
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils
									.convertObjectTojson(inStorePromoParam));
					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					LOGGER.info("response " + response.getMsg());
					if (null != response.getMsg()
							&& response.getMsg().trim() != "") {

					} else {
						response.setMsg(Constants.SUCCESS);
					}
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/compCreate.htm")
	@ResponseBody
	public String compCreate(HttpServletRequest request)
			throws IllegalArgumentException, IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam inStorePromoParam = this.getPromoValidatedList();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_COMPETION);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils
									.convertObjectTojson(inStorePromoParam));
					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					LOGGER.info("response " + response.getMsg());
					if (null != response.getMsg()
							&& response.getMsg().trim() != "") {

					} else {
						response.setMsg(Constants.SUCCESS);
					}
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(value = "/getActiveAndFuturePromotions.htm")
	@ResponseBody
	public String getActiveAndFuturePromotions(
			@ModelAttribute("InstoreSearchParam") InstoreSearchParam param,
			HttpServletRequest request) {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		// InStorePromoParam inStorePromoParam=this.getPromoValidatedList();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				// if (inStorePromoParam.getInStorePromoArticleInfoList() !=
				// null) {
				inStorePromoParam.setSiteNo(userDetail.getSiteNo());
				inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
						.toString());
				inStorePromoParam.setUsername(userDetail.getUserId());
				inStorePromoParam.setSapPassword(userDetail.getSapPwd());
				inStorePromoParam.setPageNo(param.getPageNo());
				inStorePromoParam.setRecords(param.getRecords());
				if(userDetail.getImgLocation().equals("danmurphy"))
				{
					inStorePromoParam
					.setInstorePromoType(Constants.PROMO_TYPE_LIQUOR_CLEARANCE);
				}
				else
				{
					inStorePromoParam
					.setInstorePromoType(Constants.PROMO_TYPE_CLEARANCE);
				}
				inStorePromoParam
						.setServiceConfig(Constants.SERVICE_CONFIG_ENQUIRY);
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				Date currentDate = new Date();
				/*
				 * Calendar cal1 = Calendar.getInstance(); cal1.set(2014, 11,
				 * 31); Date currentDate = new Date(cal1.getTimeInMillis());
				 */
				String dateFrom = sdf.format(currentDate);
				LOGGER.info("dateFrom ::::::: " + dateFrom);

				Calendar cal = Calendar.getInstance();
				cal.add(cal.DATE,28);
				Date endDate = new Date(cal.getTimeInMillis());
				String dateTo = sdf.format(endDate);
				LOGGER.info("dateTo ::::::: " + dateTo);

				inStorePromoParam.setDateFrom(dateFrom);
				inStorePromoParam.setDateTo(dateTo);
				LOGGER.info("inStorePromoParam ::: "
						+ CommonUtils.convertObjectTojson(inStorePromoParam));
				response = inStorePromoService
						.getActiveAndFuturePromotions(inStorePromoParam,userDetail);
				LOGGER.info("=== Response"
						+ CommonUtils.convertObjectTojson(response));
				LOGGER.info("response " + response.getMsg());
				if (null != response.getMsg() && response.getMsg().trim() != "") {

				} else {
					response.setMsg(Constants.SUCCESS);
				}
				/*
				 * }else{ response.setMsg(Constants.NOCHANGE); }
				 */

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(value = "/searchArticlePast.htm")
	@ResponseBody
	public String searchArticlePast(
			@ModelAttribute("InstoreSearchParam") InStorePromoParam param,
			HttpServletRequest request) {

		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				param.setSiteNo(userDetail.getSiteNo());
				param.setSalesOrg(userDetail.getSalesOrg().toString());
				param.setUsername(userDetail.getUserId());
				param.setSapPassword(userDetail.getSapPwd());
				if(userDetail.getImgLocation().equals("danmurphy"))
				{
					param
					.setInstorePromoType(Constants.PROMO_TYPE_LIQUOR_CLEARANCE);
				}
				else
				{
					param
					.setInstorePromoType(Constants.PROMO_TYPE_CLEARANCE);
				}
				param.setServiceConfig(Constants.SERVICE_CONFIG_ENQUIRY);
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

				if (null != param.getArticle()
						&& !param.getArticle().trim().equalsIgnoreCase("")) {

					if (isNumeric(param.getArticle().split("-")[0])) {
						param.setArticle(param.getArticle().split("-")[0]);
						param.setArticleDesc(null);
						param.setGtin(null);
					} else {
						param.setArticleDesc(param.getArticle());
						param.setGtin(null);
						param.setArticle(null);

					} /*else {
						param.setArticleDesc(null);
						param.setGtin(param.getArticle());
						param.setArticle(null);
					}*/
				} else {
					param.setArticleDesc(null);
					param.setGtin(null);
					param.setArticle(null);
				}

				LOGGER.info("inStorePromoParam ::: "
						+ CommonUtils.convertObjectTojson(param));
				response = inStorePromoService
						.getActiveAndFuturePromotions(param,userDetail);
				LOGGER.info("=== Response"
						+ CommonUtils.convertObjectTojson(response));
				LOGGER.info("response " + response.getMsg());
				if (null != response.getMsg() && response.getMsg().trim() != "") {

				} else {
					response.setMsg(Constants.SUCCESS);
				}
				/*
				 * }else{ response.setMsg(Constants.NOCHANGE); }
				 */

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/deactivatePromo.htm", consumes = "application/json")
	@ResponseBody
	public String deactivatePromo(@RequestBody InstorePromotionModel param,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		String response = "";

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response = ("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				if (param != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					if(userDetail.getImgLocation().equals("danmurphy"))
					{
						inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_LIQUOR_CLEARANCE);
					}
					else
					{
						inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_CLEARANCE);
					}
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					inStorePromoParam
							.setInstorePromoSearchRes(new ArrayList<InstorePromotionModel>());
					param.setMsg("deactivate");
					inStorePromoParam.getInstorePromoSearchRes().add(param);
					response = inStorePromoService
							.updatePromo(inStorePromoParam,userDetail);
					inStorePromoParam.setMsg(Constants.SUCCESS);
					this.setPromoValidatedList(inStorePromoParam);
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils
									.convertObjectTojson(inStorePromoParam));
				} else {
					response = (Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response = (Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/updatePromo.htm", consumes = "application/json")
	@ResponseBody
	public String updatePromo(@RequestBody InstorePromotionModel param,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		String response = "";

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response = ("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				if (param != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					if(userDetail.getImgLocation().equals("danmurphy"))
					{
						inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_LIQUOR_CLEARANCE);
					}
					else
					{
						inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_CLEARANCE);
					}
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					inStorePromoParam
							.setInstorePromoSearchRes(new ArrayList<InstorePromotionModel>());
					param.setMsg("update");
					inStorePromoParam.getInstorePromoSearchRes().add(param);
					response = inStorePromoService
							.updatePromo(inStorePromoParam,userDetail);
					response = (Constants.SUCCESS);
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils.convertObjectTojson(response));
				} else {
					response = (Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response = (Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(value = "/compOnPageLoad.htm")
	public ModelAndView compOnPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode4)){
			if((user.getUserAccessMap().get(screenCode4).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode4).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ModelAndView modelAndView = new ModelAndView("inStore-PromoComp");
		try {
			if (userDetail.getImgLocation().equalsIgnoreCase("bigw")) {
				modelAndView.addObject("isbigw", true);
			} else {
				modelAndView.addObject("isbigw", false);
			}
			CompetitorDtlList competitorList = inStorePromoService
					.getCompetitorList(new CompetitorDtlList(userDetail
							.getUserId(), userDetail.getSapPwd(), userDetail
							.getSiteNo()),user);
			modelAndView
					.addObject("competotorlist", competitorList.getResult());

			if (null != request.getSession().getAttribute(
					"articleCompetitionList")) {
				@SuppressWarnings("unchecked")
				ArrayList<String> articleList = (ArrayList<String>) request
						.getSession().getAttribute("articleCompetitionList");
				modelAndView.addObject("addedArticles", articleList);
				request.getSession().removeAttribute("articleCompetitionList");
			}

			modelAndView.addObject("banner", userDetail.getImgLocation());
		} catch (Exception e) {
			LOGGER.info("Exception on load of Competitor List");
		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/getDeliveryDate.htm")
	@ResponseBody
	public String getDeliveryDate(HttpServletRequest request,
			@RequestBody InStorePromoParam inStorePromoParam)
			throws IllegalArgumentException, IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();

		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					LOGGER.info("response " + response.getMsg());
					if (null != response.getMsg()
							&& response.getMsg().trim() != "") {

					} else {
						response.setMsg(Constants.SUCCESS);
					}
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	private void convertListToJson(InStorePromoParam param) {

		JsonElement jelement = null;
		JsonArray jarray = null;
		String val = "{\"data\":" + param.getInStorePromoArticleInf() + "}";
		LOGGER.info("ssyconverition");
		InStorePromoArticleInfo inStorePromoArticleInfo = null;
		ArrayList<InStorePromoArticleInfo> inStorePromoArticleInfoList = null;
		JsonObject jsonObj = null;
		try {
			if (val != null) {
				jelement = new JsonParser().parse(val);
				JsonObject jobject = jelement.getAsJsonObject();
				LOGGER.info("object" + jobject);

				if (jobject != null) {
					jarray = jobject.getAsJsonArray("data");
					if (jarray != null && jarray.size() > 0) {
						for (int i = 0; i < jarray.size(); i++) {
							jsonObj = jarray.get(i).getAsJsonObject();
							LOGGER.info("jarray"
									+ jsonObj.get("articleNo"));
							inStorePromoArticleInfo = new InStorePromoArticleInfo(
									jsonObj.get("art_mas_uom"),
									jsonObj.get("demandEditFlag"),
									jsonObj.get("pi_uom"),
									jsonObj.get("var_wgt"),
									jsonObj.get("piOmVal"),
									jsonObj.get("promoSalesOrgStartDay"),
									jsonObj.get("promoSalesOrgEndDay"),
									jsonObj.get("promoEndDateStartday"),
									jsonObj.get("promoEndDateEndday"),
									jsonObj.get("articleNo"),
									jsonObj.get("articleUom"),
									jsonObj.get("promoStartDate"),
									jsonObj.get("promoEndDate"),
									jsonObj.get("buildOrderDate"),
									jsonObj.get("deliveryDate"),
									jsonObj.get("buildQty"),
									jsonObj.get("displayQty"),
									jsonObj.get("demandQty"),
									jsonObj.get("promoPrice"),
									jsonObj.get("om"),
									jsonObj.get("baseFrct"),
									jsonObj.get("promFrct"),
									jsonObj.get("standardPrice"),
									jsonObj.get("displayType"),
									jsonObj.get("displayNo"),
									jsonObj.get("displayAlpha"),
									jsonObj.get("mediaTYpe"),
									jsonObj.get("promoOfferNo"),
									jsonObj.get("promoType"),
									jsonObj.get("createdUserId"),
									jsonObj.get("createdDate"),
									jsonObj.get("updateUserId"),
									jsonObj.get("updatedDate"),
									jsonObj.get("buckedId"),
									jsonObj.get("frctGrpId"),
									jsonObj.get("wtdQty"),
									jsonObj.get("ewtdQty"),
									jsonObj.get("promoCreateStatus"),
									jsonObj.get("buildValidateFlag"),
									jsonObj.get("buildValidateStatusFlag"),
									jsonObj.get("demandValidateFlag"),
									jsonObj.get("demandValidateStatusFlag"),
									jsonObj.get("displayValidateFlag"),
									jsonObj.get("displayValidateStatusFlag"),
									jsonObj.get("deliveryDateValidateFlag"),
									jsonObj.get("deliveryDateValidateStatusFlag"),
									jsonObj.get("autoStockRFlag"), jsonObj
											.get("autoFrctFlag"), jsonObj
											.get("department"), jsonObj
											.get("category"), jsonObj
											.get("subCategory"), jsonObj
											.get("segment"), jsonObj
											.get("promoDateValidateFlag"),
									jsonObj.get("promoDateValidateStatusFlag"),
									jsonObj.get("baseFrctFlag"), jsonObj
											.get("source_of_supp_ind"), jsonObj
											.get("order_uom"), jsonObj
											.get("distributionUom"), jsonObj
											.get("weekTodaySalesFlag"), jsonObj
											.get("weekStartDate"), jsonObj
											.get("notes"), jsonObj
											.get("promoCreationRcStatus"),
									jsonObj.get("promoCreationSAPStatus"),
									jsonObj.get("newPrice"), jsonObj
											.get("limitQty"), jsonObj
											.get("ifPromoExistFlag"), jsonObj
											.get("ifPromoExistFlagStatus"));

							if (inStorePromoArticleInfoList == null) {
								inStorePromoArticleInfoList = new ArrayList<InStorePromoArticleInfo>();
							}
							inStorePromoArticleInfoList
									.add(inStorePromoArticleInfo);
						}
						if (inStorePromoArticleInfoList != null
								&& inStorePromoArticleInfoList.size() > 0) {
							param.setInStorePromoArticleInfoList(inStorePromoArticleInfoList);
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getActiveAndFutureCompPromotions.htm")
	@ResponseBody
	public String getActiveAndFutureCompPromotions(
			@ModelAttribute("InstoreSearchParam") InstoreSearchParam param,
			HttpServletRequest request) {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		// InStorePromoParam inStorePromoParam=this.getPromoValidatedList();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				// if (inStorePromoParam.getInStorePromoArticleInfoList() !=
				// null) {
				inStorePromoParam.setSiteNo(userDetail.getSiteNo());
				inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
						.toString());
				inStorePromoParam.setUsername(userDetail.getUserId());
				inStorePromoParam.setSapPassword(userDetail.getSapPwd());
				inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_COMPETION);
				inStorePromoParam
						.setServiceConfig(Constants.SERVICE_CONFIG_ENQUIRY);
				inStorePromoParam.setPageNo(param.getPageNo());
				inStorePromoParam.setRecords(param.getRecords());
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				Date currentDate = new Date();
				/*
				 * Calendar cal1 = Calendar.getInstance(); cal1.set(2014, 11,
				 * 31); Date currentDate = new Date(cal1.getTimeInMillis());
				 */
				String dateFrom = sdf.format(currentDate);
				LOGGER.info("dateFrom ::::::: " + dateFrom);

				Calendar cal = Calendar.getInstance();
				cal.add(cal.DATE,28);
				Date endDate = new Date(cal.getTimeInMillis());
				String dateTo = sdf.format(endDate);
				LOGGER.info("dateTo ::::::: " + dateTo);

				inStorePromoParam.setDateFrom(dateFrom);
				inStorePromoParam.setDateTo(dateTo);
				LOGGER.info("inStorePromoParam ::: "
						+ CommonUtils.convertObjectTojson(inStorePromoParam));
				response = inStorePromoService
						.getActiveAndFuturePromotions(inStorePromoParam,userDetail);
				LOGGER.info("=== Response"
						+ CommonUtils.convertObjectTojson(response));
				LOGGER.info("response " + response.getMsg());
				if (null != response.getMsg() && response.getMsg().trim() != "") {

				} else {
					response.setMsg(Constants.SUCCESS);
				}
				/*
				 * }else{ response.setMsg(Constants.NOCHANGE); }
				 */

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/deactivateCompPromo.htm", consumes = "application/json")
	@ResponseBody
	public String deactivateCompPromo(@RequestBody InstorePromotionModel param,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		String response = "";

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response = ("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				if (param != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_COMPETION);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					inStorePromoParam
							.setInstorePromoSearchRes(new ArrayList<InstorePromotionModel>());
					param.setMsg("deactivate");
					inStorePromoParam.getInstorePromoSearchRes().add(param);
					response = inStorePromoService
							.updatePromo(inStorePromoParam,userDetail);
					inStorePromoParam.setMsg(Constants.SUCCESS);
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils
									.convertObjectTojson(inStorePromoParam));
				} else {
					response = (Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response = (Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/updateCompPromo.htm", consumes = "application/json")
	@ResponseBody
	public String updateCompPromo(@RequestBody InstorePromotionModel param,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		String response = "";

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response = ("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				if (param != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_COMPETION);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					inStorePromoParam
							.setInstorePromoSearchRes(new ArrayList<InstorePromotionModel>());
					param.setMsg("update");
					inStorePromoParam.getInstorePromoSearchRes().add(param);
					response = inStorePromoService
							.updatePromo(inStorePromoParam,userDetail);
					if(response.equalsIgnoreCase("")){
						response = (Constants.SUCCESS);
					}else{
						response="Update Failed.";
					}
					
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils.convertObjectTojson(response));
				} else {
					response = (Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response = (Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}
	
	@RequestMapping(value = "/searchArticleCompetitionPast.htm")
	@ResponseBody
	public String searchArticleCompetitionPast(
			@ModelAttribute("InstoreSearchParam") InStorePromoParam param,
			HttpServletRequest request) {

		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				param.setSiteNo(userDetail.getSiteNo());
				param.setSalesOrg(userDetail.getSalesOrg().toString());
				param.setUsername(userDetail.getUserId());
				param.setSapPassword(userDetail.getSapPwd());
				param.setInstorePromoType(Constants.PROMO_TYPE_COMPETION);
				param.setServiceConfig(Constants.SERVICE_CONFIG_ENQUIRY);
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

				if (null != param.getArticle()
						&& !param.getArticle().trim().equalsIgnoreCase("")) {

					if (isNumeric(param.getArticle().split("-")[0])) {
						param.setArticle(param.getArticle().split("-")[0]);
						param.setArticleDesc(null);
						param.setGtin(null);
					} else {
						param.setArticleDesc(param.getArticle());
						param.setGtin(null);
						param.setArticle(null);

					} /*else {
						param.setArticleDesc(null);
						param.setGtin(param.getArticle());
						param.setArticle(null);
					}*/
				} else {
					param.setArticleDesc(null);
					param.setGtin(null);
					param.setArticle(null);
				}

				LOGGER.info("inStorePromoParam ::: "
						+ CommonUtils.convertObjectTojson(param));
				response = inStorePromoService
						.getActiveAndFuturePromotions(param,userDetail);
				LOGGER.info("=== Response"
						+ CommonUtils.convertObjectTojson(response));
				LOGGER.info("response " + response.getMsg());
				if (null != response.getMsg() && response.getMsg().trim() != "") {

				} else {
					response.setMsg(Constants.SUCCESS);
				}
				/*
				 * }else{ response.setMsg(Constants.NOCHANGE); }
				 */

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(value = "/otherMarkdownOnPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView otherMarkdownOnPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode5)){
			if((user.getUserAccessMap().get(screenCode5).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode5).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<Department> deptInfoList = new ArrayList<Department>();

		ModelAndView modelAndView = new ModelAndView("inStore-PromoOtherMarkdown");
		try {
			if (userDetail.getImgLocation().equalsIgnoreCase("bigw")) {
				/*
				 * ArrayList<inStorePromotionDisplayType> displayList =
				 * inStorePromoService
				 * .getDisplayTypeList(userDetail.getSiteNo());
				 */
				/* modelAndView.addObject("displaylist",displayList); */
				modelAndView.addObject("isbigw", true);
			} else {
				modelAndView.addObject("displaylist",
						new ArrayList<inStorePromotionDisplayType>());
				modelAndView.addObject("isbigw", false);
			}

			if (null != request.getSession().getAttribute(
					"articleClearanceList")) {
				@SuppressWarnings("unchecked")
				ArrayList<String> articleList = (ArrayList<String>) request
						.getSession().getAttribute("articleClearanceList");
				modelAndView.addObject("addedArticles", articleList);

				request.getSession().removeAttribute("articleClearanceList");
			}

			modelAndView.addObject("banner", userDetail.getImgLocation());

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) inStorePromoService
					.getDeptDetails(parent_node_no, userDetail.getSalesOrg(),userDetail);

			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
			LOGGER.info("Exception on load of display type");
		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}
														
	@RequestMapping( method = RequestMethod.POST, value = "/getActiveAndFutureOtherMarkdownPromotions.htm")
	@ResponseBody
	public String getActiveAndFutureOtherMarkdownPromotions(
			@RequestBody InstoreSearchParam param,
			HttpServletRequest request) {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		// InStorePromoParam inStorePromoParam=this.getPromoValidatedList();
		InStorePromoParam response = new InStorePromoParam();
		String promoType = "";

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				// if (inStorePromoParam.getInStorePromoArticleInfoList() !=
				// null) {
				inStorePromoParam.setSiteNo(userDetail.getSiteNo());
				inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
						.toString());
				inStorePromoParam.setUsername(userDetail.getUserId());
				inStorePromoParam.setSapPassword(userDetail.getSapPwd());
				if(param.getPromoType().equalsIgnoreCase(Constants.SPA))
					promoType = Constants.PROMO_TYPE_SPECIAL;
				else if(param.getPromoType().equalsIgnoreCase(Constants.MKT))
					promoType = Constants.PROMO_TYPE_MARKETING;
				else if(param.getPromoType().equalsIgnoreCase(Constants.ADV))
					promoType = Constants.PROMO_TYPE_ADVERTISED;
				inStorePromoParam
						.setInstorePromoType(promoType);
				inStorePromoParam
						.setServiceConfig(Constants.SERVICE_CONFIG_ENQUIRY);
				inStorePromoParam.setPageNo(param.getPageNo());
				inStorePromoParam.setRecords(param.getRecords());
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				Date currentDate = new Date();
				/*
				 * Calendar cal1 = Calendar.getInstance(); cal1.set(2014, 11,
				 * 31); Date currentDate = new Date(cal1.getTimeInMillis());
				 */
				String dateFrom = sdf.format(currentDate);
				LOGGER.info("dateFrom ::::::: " + dateFrom);

				Calendar cal = Calendar.getInstance();
				cal.add(cal.DATE,28);
				Date endDate = new Date(cal.getTimeInMillis());
				String dateTo = sdf.format(endDate);
				LOGGER.info("dateTo ::::::: " + dateTo);

				inStorePromoParam.setDateFrom(dateFrom);
				inStorePromoParam.setDateTo(dateTo);
				LOGGER.info("inStorePromoParam ::: "
						+ CommonUtils.convertObjectTojson(inStorePromoParam));
				response = inStorePromoService
						.getActiveAndFuturePromotions(inStorePromoParam,userDetail);
				LOGGER.info("=== Response"
						+ CommonUtils.convertObjectTojson(response));
				LOGGER.info("response " + response.getMsg());
				if (null != response.getMsg() && response.getMsg().trim() != "") {

				} else {
					response.setMsg(Constants.SUCCESS);
				}
				/*
				 * }else{ response.setMsg(Constants.NOCHANGE); }
				 */

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/deactivateOtherMarkdownPromo.htm", consumes = "application/json")
	@ResponseBody
	public String deactivateOtherMarkdownPromo(@RequestBody InstorePromotionModel param,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		String response = "";

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response = ("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				if (param != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					// need to change the below logic
					inStorePromoParam
							.setInstorePromoType(param.getPromo_type());
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					inStorePromoParam
							.setInstorePromoSearchRes(new ArrayList<InstorePromotionModel>());
					param.setMsg("deactivate");
					inStorePromoParam.getInstorePromoSearchRes().add(param);
					response = inStorePromoService
							.updatePromo(inStorePromoParam,userDetail);
					inStorePromoParam.setMsg(Constants.SUCCESS);
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils
									.convertObjectTojson(inStorePromoParam));
				} else {
					response = (Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response = (Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/updateSpecialActivityPromo.htm", consumes = "application/json")
	@ResponseBody
	public String updateSpecialActivityPromo(@RequestBody InstorePromotionModel param,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		InStorePromoParam inStorePromoParam = new InStorePromoParam();
		String response = "";

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response = ("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				if (param != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_SPECIAL);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					inStorePromoParam
							.setInstorePromoSearchRes(new ArrayList<InstorePromotionModel>());
					param.setMsg("update");
					inStorePromoParam.getInstorePromoSearchRes().add(param);
					response = inStorePromoService
							.updatePromo(inStorePromoParam,userDetail);
					if(response.equalsIgnoreCase("")){
						response = (Constants.SUCCESS);
					}else{
						response="Update Failed.";
					}
					
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils.convertObjectTojson(response));
				} else {
					response = (Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response = (Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}
	
	@RequestMapping(value = "/searchArticleOtherMarkdownPast.htm")
	@ResponseBody
	public String searchArticleOtherMarkdownPast(
			@ModelAttribute("InstoreSearchParam") InStorePromoParam param,
			HttpServletRequest request) {

		InStorePromoParam response = new InStorePromoParam();
		String promoType = "";
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing"
					+ CommonUtils.convertObjectTojson(param));
			try {
				param.setSiteNo(userDetail.getSiteNo());
				param.setSalesOrg(userDetail.getSalesOrg().toString());
				param.setUsername(userDetail.getUserId());
				param.setSapPassword(userDetail.getSapPwd());
				if(param.getPromoTypeInPast().equalsIgnoreCase(Constants.SPA))
					promoType = Constants.PROMO_TYPE_SPECIAL;
				else if(param.getPromoTypeInPast().equalsIgnoreCase(Constants.MKT))
					promoType = Constants.PROMO_TYPE_MARKETING;
				else if(param.getPromoTypeInPast().equalsIgnoreCase(Constants.ADV))
					promoType = Constants.PROMO_TYPE_ADVERTISED;
				param.setInstorePromoType(promoType);
				
				param.setServiceConfig(Constants.SERVICE_CONFIG_ENQUIRY);
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

				if (null != param.getArticle()
						&& !param.getArticle().trim().equalsIgnoreCase("")) {

					if (isNumeric(param.getArticle().split("-")[0])) {
						param.setArticle(param.getArticle().split("-")[0]);
						param.setArticleDesc(null);
						param.setGtin(null);
					} else {
						param.setArticleDesc(param.getArticle());
						param.setGtin(null);
						param.setArticle(null);

					} /*else {
						param.setArticleDesc(null);
						param.setGtin(param.getArticle());
						param.setArticle(null);
					}*/
				} else {
					param.setArticleDesc(null);
					param.setGtin(null);
					param.setArticle(null);
				}

				LOGGER.info("inStorePromoParam ::: "
						+ CommonUtils.convertObjectTojson(param));
				response = inStorePromoService
						.getActiveAndFuturePromotions(param,userDetail);
				LOGGER.info("=== Response"
						+ CommonUtils.convertObjectTojson(response));
				LOGGER.info("response " + response.getMsg());
				if (null != response.getMsg() && response.getMsg().trim() != "") {

				} else {
					response.setMsg(Constants.SUCCESS);
				}
				/*
				 * }else{ response.setMsg(Constants.NOCHANGE); }
				 */

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}
//	
	@RequestMapping(method = RequestMethod.POST, value = "/otherMarkdownValidate.htm", consumes = "application/json")
	@ResponseBody
	public String otherMarkdownValidate(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_OTHERMKDN);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);

				//	 response=inStorePromoService.promoValidate(inStorePromoParam,userDetail);
					response=(inStorePromoParam);//defect 8384
					 response.setMsg(Constants.SUCCESS);
					this.setPromoValidatedList(response);
					
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/otherMarkdownCreate.htm")
	@ResponseBody
	public String otherMarkdownCreate(HttpServletRequest request)
			throws IllegalArgumentException, IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam inStorePromoParam = this.getPromoValidatedList();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_OTHERMKDN);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					LOGGER.info("inStorePromoParam ::: "
							+ CommonUtils
									.convertObjectTojson(inStorePromoParam));
					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					LOGGER.info("response " + response.getMsg());
					if (null != response.getMsg()
							&& response.getMsg().trim() != "") {

					} else {
						response.setMsg(Constants.SUCCESS);
					}
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}
	
	@RequestMapping(value = "/onPageLoadCentral.htm")
	public ModelAndView onPageLoadCentral(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode1)){
			if((user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ModelAndView modelAndView = new ModelAndView("inStore-PromoCreationCentral");
		try {
			if (userDetail.getImgLocation().equalsIgnoreCase("bigw")) {
				// ArrayList<inStorePromotionDisplayType> displayList =
				// inStorePromoService.getDisplayTypeList(userDetail.getSiteNo());
				ArrayList<inStorePromotionDisplayType> displayList = new ArrayList<inStorePromotionDisplayType>();
				modelAndView.addObject("displaylist", displayList);
				modelAndView.addObject("isbigw", true);
			} else {
				modelAndView.addObject("displaylist",
						new ArrayList<inStorePromotionDisplayType>());
				modelAndView.addObject("isbigw", false);
			}

			if (null != request.getSession().getAttribute("articleDisplayList")) {
				@SuppressWarnings("unchecked")
				ArrayList<String> articleList = (ArrayList<String>) request
						.getSession().getAttribute("articleDisplayList");
				modelAndView.addObject("addedArticles", articleList);
				request.getSession().removeAttribute("articleDisplayList");
			}
			modelAndView.addObject("banner", userDetail.getImgLocation());
			
			// code for bigW promotion validation
			if("1060".equalsIgnoreCase(""+userDetail.getSalesOrg())){
				try {
					model.addAttribute("restrictionParam",validationServiceImpl.getRestrictionParam(user));
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		} catch (Exception e) {
			LOGGER.info("Exception on load of display type");
		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/searchArticleCentral.htm")
	@ResponseBody
	public String searchArticleCentral(
			@ModelAttribute("InstoreSearchParam") InstoreSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {
		// used to hold response message
		LOGGER.info("Entering");
		InstoreArticleInfo searchRes = new InstoreArticleInfo();
		List<ArticleDetail> articleSearchResults = new ArrayList<ArticleDetail>();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			searchRes.setMessage("logout");
			return CommonUtils.convertObjectTojson(searchRes);
		} else {
			LOGGER.info("processing");
			try {
				param.setSr_searchOption(param.getSr_searchOption());
				ArticleSearchParam asp = param.getParam();

				if (param.getArticleSearchParam() != null) {
					asp.setSiteNo(userDetail.getSiteNo());
					asp.setSaleOrg(userDetail.getSalesOrg().toString());
					asp.setAutoStockRFlag(Constants.TRUE);
				}

				articleSearchResults = SearchArticleService
						.searchArticleRc(asp,userDetail);

				if (articleSearchResults == null
						|| articleSearchResults.size() == 0) {
					searchRes.setMessage("No article found for '"
							+ param.getSr_article() + "'");
				} else if (articleSearchResults.size() == 1) {
					searchRes.setMessage("directadd");
				} else {
					searchRes.setMessage("success");
				}
				searchRes.setArticleList(articleSearchResults);

			} catch (JsonParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				searchRes.setMessage("Sorry!Some technical issue occured.");
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				searchRes.setMessage("Sorry!Some technical issue occured.");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				searchRes.setMessage("Sorry!Some technical issue occured.");
			}
		}
		return CommonUtils.convertObjectTojson(searchRes);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/moreArticleInfoCentral.htm", consumes = "application/json")
	@ResponseBody
	public String searchArticleInfoCentral(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		LOGGER.info("inStorePromoParam"
				+ inStorePromoParam.getInStorePromoArticleInf());
		InStorePromoParam response = new InStorePromoParam();
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {

				//convertListToJson(inStorePromoParam);
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam.setOmInfoFlag(Constants.YES);
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					inStorePromoParam = setValidateProperies(inStorePromoParam);
					LOGGER.info("======"
							+ inStorePromoParam
									.getInStorePromoArticleInfoList().get(0)
									.getDeliveryDateValidateFlag());
					LOGGER.info("inStorePromoParam "
							+ inStorePromoParam.toString());
					response = inStorePromoService
							.getPromoArticleInfo(inStorePromoParam,userDetail);
					response.setMsg(Constants.SUCCESS);
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/valArticleISDList.htm", consumes = "application/json")
	@ResponseBody
	public String validateArticleISDList(@RequestBody InStorePromoParam inStorePromoParam,HttpServletRequest request) throws IllegalArgumentException,IllegalAccessException {
		LOGGER.info("inStorePromoParam"	+ inStorePromoParam.getInStorePromoArticleInf());
		
	//	ArrayList<InStorePromoArticleISDInfo> response = new ArrayList<InStorePromoArticleISDInfo>();
		
		InStorePromoParam response = new InStorePromoParam();
		
		
		if (request.getSession(false) == null || (request.getSession(false) != null && request.getSession(false).getAttribute("user") == null)) 
		{
			LOGGER.info("Session logout");
			
			response.setMsg("logout");			
			return CommonUtils.convertObjectTojson(response);
			
		} else {			
			LOGGER.info("processing");
			try {
				
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam.setOmInfoFlag(Constants.YES);
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					inStorePromoParam = setValidateProperies(inStorePromoParam);
					
					LOGGER.info("======"+ inStorePromoParam.getInStorePromoArticleInfoList().get(0).getDeliveryDateValidateFlag());
					LOGGER.info("inStorePromoParam "+ inStorePromoParam.toString());
					
					response = inStorePromoService.getPromoArticleISDList(inStorePromoParam,userDetail);					
				
					response.setMsg(Constants.SUCCESS);
					
					System.out.println("response====================>" + response);
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/displayvalidateCentral.htm", consumes = "application/json")
	@ResponseBody
	public String displayValidateCentral(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				//convertListToJson(inStorePromoParam);
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					inStorePromoParam.setOmInfoFlag(Constants.TRUE);
					inStorePromoParam.setAutoStockRFlag(Constants.TRUE);
					inStorePromoParam = setValidateProperies(inStorePromoParam);

					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					response.setMsg(Constants.SUCCESS);
					this.setPromoValidatedList(response);
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/displaycreateCentral.htm")
	@ResponseBody
	public String displayCreateCentral(HttpServletRequest request)
			throws IllegalArgumentException, IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();
		InStorePromoParam inStorePromoParam = this.getPromoValidatedList();
		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				//convertListToJson(inStorePromoParam);
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					LOGGER.info("response " + response.getMsg());
					if (null != response.getMsg()
							&& response.getMsg().trim() != "") {

					} else {
						response.setMsg(Constants.SUCCESS);
					}
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/createPromotionFromArticlelookupCentral.htm", consumes = "application/json")
	@ResponseBody
	public String createPromotionFromArticleLookupCentral(
			@RequestBody InStorePromoParam inStorePromoParam,
			HttpServletRequest request) throws IllegalArgumentException,
			IllegalAccessException {

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		InStorePromoParam validateResponse = new InStorePromoParam();
		InStorePromoParam createResponse = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			validateResponse.setMsg("logout");
			return CommonUtils.convertObjectTojson(validateResponse);
		} else {
			LOGGER.info("processing displaycreateFromArticlelookup");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					inStorePromoParam = setValidateProperies(inStorePromoParam);
					if (inStorePromoParam.getInstorePromoType()
							.equalsIgnoreCase(Constants.PROMO_TYPE_DISPLAY)) {
						validateResponse = inStorePromoService
								.promoCreateOrValidate(inStorePromoParam,userDetail);
					} else {
						validateResponse = inStorePromoParam;
					}
					LOGGER.info("validate response "
							+ validateResponse.getMsg());
					if (null != validateResponse.getMsg()
							&& validateResponse.getMsg().trim() != "") {
						validateResponse.setMsg(Constants.VALIDATIONERROR);
						createResponse = validateResponse;
					} else {
						if (validateResponse.getInStorePromoArticleInfoList() != null) {
							if (validateResponse
									.getInStorePromoArticleInfoList().size() == 1) {
								InStorePromoArticleInfo obj = validateResponse
										.getInStorePromoArticleInfoList()
										.get(0);
								if ((obj.getDeliveryDateValidateStatusFlag() == null || obj
										.getDeliveryDateValidateStatusFlag()
										.equals(""))
										&& (obj.getDemandValidateStatusFlag() == null || obj
												.getDemandValidateStatusFlag()
												.equals(""))
										&& (obj.getDisplayValidateStatusFlag() == null || obj
												.getDisplayValidateStatusFlag()
												.equals(""))
										&& (obj.getBuildValidateStatusFlag() == null || obj
												.getBuildValidateStatusFlag()
												.equals(""))) {
									validateResponse
											.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
									createResponse = inStorePromoService
											.promoCreateOrValidate(validateResponse,userDetail);
									try {
										LOGGER.info("create response "
												+ createResponse.getMsg());
										if (createResponse
												.getInStorePromoArticleInfoList() != null) {
											if (createResponse
													.getInStorePromoArticleInfoList()
													.size() == 1) {
												if (null == createResponse
														.getMsg()
														|| createResponse
																.getMsg()
																.equalsIgnoreCase(
																		"")) {
													createResponse
															.setMsg(Constants.SUCCESS);
												}
											}
										}
									} catch (Exception e) {
										e.printStackTrace();
										createResponse.setMsg("failed");
									}

								} else {
									validateResponse
											.setMsg(Constants.VALIDATIONERROR);
									createResponse = validateResponse;
								}

							} else {
								validateResponse
										.setMsg(Constants.VALIDATIONERROR);
								createResponse = validateResponse;
							}
						} else {
							validateResponse.setMsg(Constants.VALIDATIONERROR);
							createResponse = validateResponse;
						}

					}
				} else {
					createResponse.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				createResponse.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(createResponse);
	}

	// METHOD USED TO GET PROMOTIONS ADDTIONAL DETAILS--copied from promotion
	// planning controller
	@RequestMapping(value = "/getPromoAddtionalDtlsCentral.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPromoAddtionalDtlsCentral(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		List<PromoArticle> promoArticleList = null;
		PromoArticle promoArticle = null;
		ObjectMapper mapper = null;
		StringWriter stw = null;
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());

		if ((param.getArticleNo() != null && param.getArticleNo().trim() != ""
				&& param.getWeekStartDate() != null && param.getWeekStartDate()
				.trim() != "")) {
			promoArticleList = promotionsPlanningService
					.getPromoAddtionalDtls(param,userDetail);
			// setting global data for save functionality
			if (promoArticleList != null
					&& promoArticleList.size() > 0
					&& promoArticleList.get(0).getPromoSalesHistList() != null
					&& promoArticleList.get(0).getPromoSalesHistList().size() > 0)
				promoSalesHistoryListMap = promoArticleList.get(0)
						.getPromoSalesHistList();
		} else {
			promoArticleList = new ArrayList<PromoArticle>();
			promoArticle = new PromoArticle();
			promoArticle.setMsg(Constants.MANDATORY);
			promoArticleList.add(promoArticle);
		}

		/*
		 * try { mapper = new ObjectMapper(); stw = new StringWriter(); final
		 * JsonGenerator jsonGenerator = mapper.getJsonFactory()
		 * .createJsonGenerator(stw);
		 * 
		 * mapper.writeValue(jsonGenerator, promoArticleList); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * e.printStackTrace(); } catch (IOException e) {
		 * 
		 * e.printStackTrace(); }
		 */
		// LOGGER.info("stw.toString()" + stw.toString());

		return "{\"data\":" + Constants.convertToJsonString(promoArticleList)
				+ "}";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/addToDisplayListCentral.htm")
	@ResponseBody
	public String addToDisplayListCentral(HttpServletRequest request) {
		String promoType = request.getParameter("promoType");
		ArrayList<String> articleList = new ArrayList<String>();
		if (promoType.equalsIgnoreCase(Constants.PROMO_TYPE_DISPLAY)) {

			if (null != request.getSession().getAttribute("articleDisplayList")) {
				articleList = (ArrayList<String>) request.getSession()
						.getAttribute("articleDisplayList");
				if (articleList.contains(request.getParameter("articleNo")
						+ "_" + request.getParameter("articleUom") + "_"
						+ request.getParameter("description"))) {
					return "exist";
				} else {
					articleList.add(request.getParameter("articleNo") + "_"
							+ request.getParameter("articleUom") + "_"
							+ request.getParameter("description"));
					request.getSession().removeAttribute("articleDisplayList");
					request.getSession().setAttribute("articleDisplayList",
							articleList);
				}
			} else {
				articleList.add(request.getParameter("articleNo") + "_"
						+ request.getParameter("articleUom") + "_"
						+ request.getParameter("description"));
				request.getSession().setAttribute("articleDisplayList",
						articleList);
			}

		} else if (promoType.equalsIgnoreCase(Constants.PROMO_TYPE_CLEARANCE)) {

			if (null != request.getSession().getAttribute(
					"articleClearanceList")) {
				articleList = (ArrayList<String>) request.getSession()
						.getAttribute("articleClearanceList");
				if (articleList.contains(request.getParameter("articleNo")
						+ "_" + request.getParameter("articleUom") + "_"
						+ request.getParameter("description"))) {
					return "exist";
				} else {
					articleList.add(request.getParameter("articleNo") + "_"
							+ request.getParameter("articleUom") + "_"
							+ request.getParameter("description"));
					request.getSession()
							.removeAttribute("articleClearanceList");
					request.getSession().setAttribute("articleClearanceList",
							articleList);
				}
			} else {
				articleList.add(request.getParameter("articleNo") + "_"
						+ request.getParameter("articleUom") + "_"
						+ request.getParameter("description"));
				request.getSession().setAttribute("articleClearanceList",
						articleList);
			}

		} else {

			if (null != request.getSession().getAttribute(
					"articleCompetitionList")) {
				articleList = (ArrayList<String>) request.getSession()
						.getAttribute("articleCompetitionList");
				if (articleList.contains(request.getParameter("articleNo")
						+ "_" + request.getParameter("articleUom") + "_"
						+ request.getParameter("description"))) {
					return "exist";
				} else {
					articleList.add(request.getParameter("articleNo") + "_"
							+ request.getParameter("articleUom") + "_"
							+ request.getParameter("description"));
					request.getSession().removeAttribute(
							"articleCompetitionList");
					request.getSession().setAttribute("articleCompetitionList",
							articleList);
				}
			} else {
				articleList.add(request.getParameter("articleNo") + "_"
						+ request.getParameter("articleUom") + "_"
						+ request.getParameter("description"));
				request.getSession().setAttribute("articleCompetitionList",
						articleList);
			}

		}
		return "added";
	}

@RequestMapping(method = RequestMethod.POST, value = "/getDeliveryDateCentral.htm")
	@ResponseBody
	public String getDeliveryDateCentral(HttpServletRequest request,
			@RequestBody InStorePromoParam inStorePromoParam)
			throws IllegalArgumentException, IllegalAccessException {
		// InStorePromoParam inStorePromoParam=new InStorePromoParam();

		InStorePromoParam response = new InStorePromoParam();

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("Session logout");
			response.setMsg("logout");
			return CommonUtils.convertObjectTojson(response);
		} else {
			LOGGER.info("processing");
			try {
				if (inStorePromoParam.getInStorePromoArticleInfoList() != null) {
					inStorePromoParam.setSiteNo(userDetail.getSiteNo());
					inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
							.toString());
					inStorePromoParam.setUsername(userDetail.getUserId());
					inStorePromoParam.setSapPassword(userDetail.getSapPwd());
					inStorePromoParam
							.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
					inStorePromoParam
							.setServiceConfig(Constants.SERVICE_CONFIG_VALIDATE);
					response = inStorePromoService
							.promoCreateOrValidate(inStorePromoParam,userDetail);
					LOGGER.info("response " + response.getMsg());
					if (null != response.getMsg()
							&& response.getMsg().trim() != "") {

					} else {
						response.setMsg(Constants.SUCCESS);
					}
				} else {
					response.setMsg(Constants.NOCHANGE);
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setMsg(Constants.TECHNICAL_ISSUE);
			}
		}
		return CommonUtils.convertObjectTojson(response);
	}

public static boolean isNumeric(String str)  
{  
  try  
  {  
    double d = Double.parseDouble(str);  
  }  
  catch(NumberFormatException nfe)  
  {  
    return false;  
  }  
  return true;  
}

}
