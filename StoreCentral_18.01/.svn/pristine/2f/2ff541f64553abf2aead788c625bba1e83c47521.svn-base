package au.com.woolworths.portal.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.POGDataExtract;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.POGExtractDataParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.POGServiceImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/planOGram")
public class PlanOGramController extends BaseController {

	private ModelMap model;
	private UserContext userDetail;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['PlanOGrams']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private POGServiceImpl pogService;

	private String OVER_DUE = "OverDue";
	private String DUE_NOW = "DueNow";
	private String UPCOMING = "Upcoming";
	private String COMPLETED = "Completed";
	List<POGDataExtract> pogDataExtractList = null;

	List<POGDataExtract> pogDataExtractOverDueList = null;
	List<POGDataExtract> pogDataExtractDueNowList = null;
	List<POGDataExtract> pogDataExtractUpcomingList = null;
	List<POGDataExtract> pogDataExtractCompletedList = null;
	private String UPDATE_FAILED = "Update Failed";
	private String MANDATORY = "Please enter all mandatory inputs.";
	
	private static final Logger LOGGER = Logger.getLogger(PlanOGramController.class.getName());

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
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		POGExtractDataParam param = null;
		model = new ModelMap();
		userDetail = (UserContext) request.getSession().getAttribute("user");
		param = new POGExtractDataParam();
		param.setSite(userDetail.getSiteNo());
		param.setSorg(userDetail.getSalesOrg().toString());
		try {

			pogDataExtractList = pogService.getPOGExtractDetails(param,user);
			if (pogDataExtractList != null && pogDataExtractList.size() > 0) {
				updatePogExtractList(pogDataExtractList);
			}

			model.addAttribute("pogDataExtractList", pogDataExtractList);

		} catch (Exception e) {
			model.addAttribute("pogDataExtractList",
					new ArrayList<POGDataExtract>());
			LOGGER.info("Exception in planogram controller :"+e);
		}
		ModelAndView modelAndView = new ModelAndView("planOGram");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	private void updatePogExtractList(List<POGDataExtract> pogDataExtractList) throws ParseException {
		pogDataExtractOverDueList = new ArrayList<POGDataExtract>();
		pogDataExtractDueNowList = new ArrayList<POGDataExtract>();
		pogDataExtractUpcomingList = new ArrayList<POGDataExtract>();
		pogDataExtractCompletedList = new ArrayList<POGDataExtract>();

		SimpleDateFormat sf = new SimpleDateFormat("dd/MM/yyyy");
		//String curr="07/10/2014";
		//Date currentDate = sf.parse(curr);
		Date currentDate = new Date();
		String curr=sf.format(currentDate);
		currentDate = sf.parse(curr);
		Calendar cal = Calendar.getInstance();
		Date dueDate = null, recOnDate = null, plus2Days = null, lessThen9Days = null;
		cal.setTime(currentDate);
		cal.add(Calendar.DATE, 2);
		plus2Days = cal.getTime();
		cal.setTime(currentDate);
		cal.add(Calendar.DATE, -9);
		lessThen9Days = cal.getTime();
		try {
			LOGGER.info("plus2Days____currentDate"+plus2Days+"___"+currentDate);
			for (POGDataExtract pogDataExtract : pogDataExtractList) {
				
				if(pogDataExtract.getPog_imp_status()!=null && !pogDataExtract.getPog_imp_status().trim().equals("")){
					pogDataExtract.setTabName(COMPLETED);
					pogDataExtractCompletedList.add(pogDataExtract);
				}else{
					dueDate = null; recOnDate = null;
					if (pogDataExtract.getPogAcceptDuedate() != null
							&& !pogDataExtract.getPogAcceptDuedate().equals("")) {
						dueDate = sf.parse(pogDataExtract.getPogAcceptDuedate());
					}
					
					if(pogDataExtract.getPogAcceptRecvOn() != null
							&& !pogDataExtract.getPogAcceptRecvOn().equals("") && 
							!pogDataExtract.getPogAcceptRecvOn().equals(Constants.BLANK_DF) ){
						recOnDate = sf.parse(pogDataExtract.getPogAcceptRecvOn());
					}
				
					//LOGGER.info("recOnDate_"+recOnDate);
					if ((null != dueDate && dueDate.compareTo(currentDate) < 0
							&& null == recOnDate) || (null != recOnDate && recOnDate.compareTo(currentDate) < 0)) {
						
						//Display the Layout Module in the “Overdue” bucket if
						//“POG Acceptance Date” is equal to blank AND
						// “POG Acceptance Due Date” is less than the current date or
						// “POG Acceptance Date” is less than current date
						//LOGGER.info("recOnDate.compareTo(currentDate) < 0_"+ (recOnDate.compareTo(currentDate) < 0));
						pogDataExtract.setTabName(OVER_DUE);
						pogDataExtractOverDueList.add(pogDataExtract);
					} else if ((null != dueDate && dueDate.compareTo(currentDate) >= 0 && dueDate
							.compareTo(plus2Days) <= 0 && null == recOnDate)
							|| (null != recOnDate && recOnDate.compareTo(currentDate) >= 0 && recOnDate
									.compareTo(plus2Days) <= 0 )) {
						
						// Display the Layout Module in the “Due Now” bucket if
						// (“POG Acceptance Date” is equal to blank AND “POG Acceptance Due Date” is between current date and “current date + 2”) 
						// or (“POG Acceptance Date”  is between current date and “current date + 2”)
						
						pogDataExtract.setTabName(DUE_NOW);
						pogDataExtractDueNowList.add(pogDataExtract);
					} else if ((null != dueDate && dueDate.compareTo(plus2Days) > 0 && null == recOnDate)
							|| (recOnDate
									.compareTo(plus2Days) > 0)) {
						
						// Display the Layout Module in the “Upcoming” bucket if
						// “POG Acceptance Date” is greater than “current date + 2” OR
						// (“POG Acceptance Date” is blank AND “POG Acceptance Due Date” is greater than “current date + 2”)
						
						//LOGGER.info("UPCOMING");
						pogDataExtract.setTabName(UPCOMING);
						pogDataExtractUpcomingList.add(pogDataExtract);
					}
				}
				}
			//}
			model.addAttribute("pogDataExtractCompletedList",
					pogDataExtractCompletedList);
			model.addAttribute("pogDataExtractOverDueList",
					pogDataExtractOverDueList);
			model.addAttribute("pogDataExtractDueNowList",
					pogDataExtractDueNowList);
			model.addAttribute("pogDataExtractUpcomingList",
					pogDataExtractUpcomingList);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/saveDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String saveDetails(
			@ModelAttribute("oredeBook") POGExtractDataParam param,
			HttpServletRequest request, HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		List<POGDataExtract> pogDataExtractListTemp = null;
		String status = "";
		SimpleDateFormat sf = new SimpleDateFormat("dd/MM/yyyy");
		userDetail = (UserContext) request.getSession().getAttribute("user");
		param.setSite(userDetail.getSiteNo());
		if (param.getDetails() != null
				&& param.getDetails().split(":").length > 0
				&& pogDataExtractList != null && pogDataExtractList.size() > 0) {
			pogDataExtractListTemp = new ArrayList<POGDataExtract>();

			for (int i = 0; i < param.getDetails().split(":").length; i++) {
				POGDataExtract pogDataExtract = null;
				if (param.getDetails().split(":")[i].split("_")[0]
						.equalsIgnoreCase("upComing")
						&& pogDataExtractUpcomingList != null
						&& pogDataExtractUpcomingList.size() > 0) {
					pogDataExtract = (POGDataExtract) pogDataExtractUpcomingList
							.get(Integer
									.parseInt(param.getDetails().split(":")[i]
											.split("_")[1])).clone();
				} else if (param.getDetails().split(":")[i].split("_")[0]
						.equalsIgnoreCase("overDue")
						&& pogDataExtractOverDueList != null
						&& pogDataExtractOverDueList.size() > 0) {
					pogDataExtract = (POGDataExtract) pogDataExtractOverDueList
							.get(Integer
									.parseInt(param.getDetails().split(":")[i]
											.split("_")[1])).clone();
				} else if (param.getDetails().split(":")[i].split("_")[0]
						.equalsIgnoreCase("dueNow")
						&& pogDataExtractDueNowList != null
						&& pogDataExtractDueNowList.size() > 0) {
					pogDataExtract = (POGDataExtract) pogDataExtractDueNowList
							.get(Integer
									.parseInt(param.getDetails().split(":")[i]
											.split("_")[1])).clone();
				}
				if (pogDataExtract != null) {
					if (param.getDetails().split(":")[i].split("_")[4]
							.equals("false"))
						pogDataExtract.setPogAcceptRecvOn(param.getDetails()
								.split(":")[i].split("_")[3]);
					else
						{
						pogDataExtract
								.setPogAcceptRecvOn(sf.format(new Date()));
						pogDataExtract.setPog_imp_status("X");
						}
					// pogDataExtract.set(param.getDetails().split(":")[i].split("_")[3]);
					pogDataExtractListTemp.add(pogDataExtract);
				}

			}
			if (pogDataExtractListTemp != null
					&& pogDataExtractListTemp.size() > 0) {
				
				try {

					status = pogService.updatePogData(pogDataExtractListTemp,
							param,userDetail);

				} catch (Exception e) {
					e.printStackTrace();
					status = UPDATE_FAILED;
				}
			}
		} else {
			status = MANDATORY;
		}
		return status;

	}

}