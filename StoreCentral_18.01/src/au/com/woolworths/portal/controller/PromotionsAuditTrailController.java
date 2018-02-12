package au.com.woolworths.portal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleDetail;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.PromoAuditTrail;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ArticleParam;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.param.PromotionsAuditTrailParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.PromotionsPlanningServiceImpl;
import au.com.woolworths.portal.service.SearchArticleServiceImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/auditTrail")
@Scope("session")
public class PromotionsAuditTrailController extends BaseController {

	private List<ArticleDetail> articleSearchResutlsList = null;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['PromotionAuditTrail']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private SearchArticleServiceImpl SearchArticleService;
	
	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private PromotionsPlanningServiceImpl promotionsPlanningService;

	private ModelMap model;

	private UserContext userDetail;

	/*
	 * private String NO_DATA = "noData"; private String SINGLE_RESULT =
	 * "singleResult"; private String PROMODETAIL = "promotionDetails"; private
	 * String MANDATORY = "Please fill all the mandatory fields.";
	 */

	private String MULTIPLE_RESULT = "multipleResult";
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";

	private PromotionsAuditTrailParam paramForPagination;

	private static final Logger LOGGER = Logger.getLogger(PromotionsAuditTrailController.class.getName());

	// METHOD USED TO LOAD PROMOTIONS AUDIT DETAILS SCREEN
	@RequestMapping(value = "/onPageLoadAuditTrail.htm")
	public ModelAndView onPageLoadAuditTrail(HttpServletRequest request,
			HttpServletResponse response) {
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

		ModelAndView modelAndView = new ModelAndView("promotionalAuditTrail");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// METHOD USED TO GET PROMOTIONS AUDIT DETAILS
	@RequestMapping(value = "/getPromoAuditDetail.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPromoAuditDetail(
			@ModelAttribute("promotionsPlanning") PromotionsAuditTrailParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		List<PromoAuditTrail> promoAuditTrailList = null;
		PromoAuditTrail promoAuditTrail = null;
		ArticleDetail articleDetail = null;
		Map<String, String> userDetails = null;
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());

		if (param.getPageNo() != null && param.getPageNo() != "") {
			//System.out.println("pageNO" + param.getPageNo());
			paramForPagination.setPageNo(param.getPageNo());
			param = paramForPagination;
		}

		else if (param.getSearchByOptions() != null
				&& param.getSearchByOptions().trim() != "") {

			if (param.getIndex() != null && param.getIndex().trim() != ""
					&& articleSearchResutlsList != null
					&& articleSearchResutlsList.size() > 0) {
				//System.out.println("param.getIndex" + param.getIndex());
				param.setArticleNo(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getArticleNo());
				param.setUom(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getUom());
				param.setArticleDesc(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getDescription());
				param.setSrcSupplyInd(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getSrcSupplyInd());
				param.setOrderUom(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getOrderUom());
				param.setDistribution_uom(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getDistribution_uom());
				
				articleSearchResutlsList = new ArrayList<ArticleDetail>();
				paramForPagination = param;
			} else {
				ArticleSearchParam articleParam = new ArticleSearchParam(
						param.getSiteNo(), param.getSalesOrg(),
						param.getSearchByOptions(), param.getArticleNo());
				//articleParam.setSrcSupplyInd(param.getSrcSupplyInd());
				//articleParam.setOrderUom(param.getSrcSupplyInd());
				articleSearchResutlsList = searchAndAddArticle(articleParam);

				if (articleSearchResutlsList != null
						&& articleSearchResutlsList.size() > 0) {
					if (articleSearchResutlsList.size() == 1) {
						param.setArticleNo(articleSearchResutlsList.get(0)
								.getArticleNo());
						param.setUom(articleSearchResutlsList.get(0).getUom());
						param.setArticleDesc(articleSearchResutlsList.get(0)
								.getDescription());
						param.setSrcSupplyInd(articleSearchResutlsList.get(0).getSrcSupplyInd());
						param.setOrderUom(articleSearchResutlsList.get(0).getOrderUom());
						param.setDistribution_uom(articleSearchResutlsList.get(0).getDistribution_uom());
						param.setMasArtUom(articleSearchResutlsList.get(0).getArt_mas_uom());
						param.setDepartment(articleSearchResutlsList.get(0).getDeptNo());
						param.setPiOmVal(articleSearchResutlsList.get(0).getPiOmVal());
						param.setPiUOM(articleSearchResutlsList.get(0).getPi_uom());
						paramForPagination = param;
						articleSearchResutlsList = new ArrayList<ArticleDetail>();
					} else {
						articleSearchResutlsList.get(0).setMsg(MULTIPLE_RESULT);
						return convertArticleListTojson(articleSearchResutlsList);
					}

				} else {
					articleDetail = new ArticleDetail();
					articleDetail.setMsg((articleParam.getMsg()));
					articleSearchResutlsList = new ArrayList<ArticleDetail>();
					articleSearchResutlsList.add(articleDetail);
					return convertArticleListTojson(articleSearchResutlsList);
				}
			}
		}
		// TODO NEEDTO WRITE ELSE CONDINTION
		if ((param.getArticleNo() != null && param.getArticleNo().trim() != ""
				&& param.getUom() != null && param.getUom().trim() != "")
				|| !(param.getSearchByOptions() != null
						&& param.getSearchByOptions().trim() != "" && !param
						.getSearchByOptions().equalsIgnoreCase("reference"))) {

			// CALLING PROMO AUDIT WEB SERVICE
			promoAuditTrailList = promotionsPlanningService
					.getPromoAuditDetails(param,userDetail);

			// IF THE RESULT IS NULL SETTING THE MSG GIVEN BY WEBSERVICE
			if (!(promoAuditTrailList != null && promoAuditTrailList.size() > 0)) {
				promoAuditTrailList = new ArrayList<PromoAuditTrail>();
				promoAuditTrail = new PromoAuditTrail();
				promoAuditTrail.setMsg((param.getMsg() != null && param
						.getMsg().trim() != "") ? param.getMsg() : EXCEPTION);
				promoAuditTrailList.add(promoAuditTrail);
			} else {
				if (promoAuditTrailList.get(0).getArticleNo() == null) {
					promoAuditTrailList.get(0).setArticleDesc(
							param.getArticleDesc());
					promoAuditTrailList.get(0).setArticleNo(
							param.getArticleNo());
				}
				try {
					// Method to update employee name from the result list
					userDetails = LoginServiceImpl
							.updatepromoAuditTrailList(promoAuditTrailList);
				} catch (Exception e) {
					e.printStackTrace();
				}

				if (userDetails != null && userDetails.size() > 0) {
					for (PromoAuditTrail query : promoAuditTrailList) {
						query.setUpdatedUserName((userDetails.get(query
								.getUpdatedUser()) != null && userDetails.get(
								query.getUpdatedUser()).trim() != "") ? userDetails
								.get(query.getUpdatedUser()) : "");
					}
				}

			}
		}
		return convertPromoAuditListTojson(promoAuditTrailList);

	}

	private String convertPromoAuditListTojson(
			List<PromoAuditTrail> promoAuditTrailList) {
		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoAuditTrailList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/
		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + Constants.convertToJsonString(promoAuditTrailList)  + "}";
	}

	private String convertArticleListTojson(
			List<ArticleDetail> articleDetailList) {
		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, articleDetailList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/
		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" +Constants.convertToJsonString(articleDetailList)  + "}";
	}

	public ArrayList<ArticleDetail> searchAndAddArticle(ArticleSearchParam param) {
		List<ArticleDetail> articleSearchResult = null;
		try {
			if(param.getArticleDescrition() != null && param.getArticleDescrition() != "")
			{				// added for defect 14651	
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("/", "*"));
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("\\\\", "^"));
			}
			articleSearchResult = SearchArticleService.searchArticleRc(param,userDetail);

			if (articleSearchResult != null && articleSearchResult.size() > 0) {
				return (ArrayList<ArticleDetail>) articleSearchResult;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return null;
	}

}