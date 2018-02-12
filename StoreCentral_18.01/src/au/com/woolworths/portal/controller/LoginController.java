package au.com.woolworths.portal.controller;

import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.identity.exceptions.InvalidUserException;
import au.com.woolworths.identity.exceptions.MissingChallengeQuestionsException;
import au.com.woolworths.ngbo.identity.NGBOServices;
import au.com.woolworths.portal.model.ActivityOptions;
import au.com.woolworths.portal.model.SiteDtls;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserInfoDetail;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.param.UserParam;
import au.com.woolworths.portal.param.UsrInfoParam;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.PassWordMgtDAOImpl;
import au.com.woolworths.portal.service.StoreODataImpl;
import au.com.woolworths.portal.service.StoreSearchServiceImpl;
import au.com.woolworths.portal.service.UserAccessServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

@Controller
@Scope("session")
public class LoginController /*extends BaseController*/ {
	@Autowired
	private StoreODataImpl storeService;

	@Autowired
	private StoreSearchServiceImpl storeSearchService;

	@Autowired
	private UserAccessServiceImpl userAccessService;

	@Autowired
	private LoginServiceImpl loginService;

	public StoreODataImpl getStoreService() {
		return storeService;
	}

	@Autowired
	public void setStoreService(StoreODataImpl storeService) {
		this.storeService = storeService;
	}

	private static final Logger LOGGER = Logger.getLogger(LoginController.class
			.getName());

	private UserContext userDetails;

	@RequestMapping(value = "/home.htm", method = RequestMethod.GET)
	public ModelAndView logout(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		LOGGER.info("Host = " + request.getServerName());
		LOGGER.info("Port = " + request.getServerPort());
		// //LOGGER.info("inside get");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			getLocatedBanner(request);

			if (request.getAttribute("img") == null) {
				String salesOrgFromURL = request
						.getParameter("salesOrgFromURL");
				request.setAttribute("img", salesOrgFromURL);
			}
			return new ModelAndView("login");
		} else {
			UserContext user = (UserContext) request.getSession().getAttribute(
					"user");
			// //LOGGER.info("user.getSalesOrg()"+user.getSalesOrg());
			return new ModelAndView(new RedirectView(user.getSalesOrg()
					+ "/login/homepage.htm"));
		}

	}

	@RequestMapping(value = "/logginOut.htm", method = RequestMethod.GET)
	public void logginOut(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //LOGGER.info("inside get");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			RequestDispatcher rd = request.getRequestDispatcher("/login.jsp");
			rd.forward(request, response);
		}
		UserContext user = (UserContext) request.getSession().getAttribute(
				"user");
		int defaultSalesOrg = Integer.parseInt(loginService
				.getLocatedSalesOrg(request.getRemoteAddr()));
		if (defaultSalesOrg > 0) {
			user.setSalesOrg(defaultSalesOrg);
		}

		if (user.getSalesOrg().equals(PortalUtil.SM_SALES_ORG)) {
			request.setAttribute("img", "woolworths");

		} else if (user.getSalesOrg().equals(PortalUtil.BWS_SALES_ORG)) {
			request.setAttribute("img", "bws");

		} else if (user.getSalesOrg().equals(PortalUtil.DM_SALES_ORG)) {
			request.setAttribute("img", "danmurphy");

		} else if (user.getSalesOrg().equals(PortalUtil.PETROL_SALES_ORG)) {
			request.setAttribute("img", "petrol");

		} else if (user.getSalesOrg().equals(PortalUtil.THMSDUX_SALES_ORG)) {
			request.setAttribute("img", "thomasdux");

		} else if (user.getSalesOrg().equals(PortalUtil.BIGW_SALES_ORG)) {
			request.setAttribute("img", "bigw");

		} else if (user.getSalesOrg().equals(PortalUtil.CNTDWN_SALES_ORG)) {
			request.setAttribute("img", "countdown");

		} else if (user.getSalesOrg().equals(PortalUtil.SFS_SALES_ORG)) {
			request.setAttribute("img", "metro");

		} else {
			request.setAttribute("img", "woolworths");
		}
		// //LOGGER.info("Request attribute is "+request.getAttribute("img"));

		// Session clearing.

		if (request.getSession(false) != null) {
			request.getSession().invalidate();

		}

		RequestDispatcher rd = request.getRequestDispatcher("/login.jsp");
		rd.forward(request, response);
	}

	@RequestMapping(value = "/home.htm", method = RequestMethod.POST)
	public ModelAndView home(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			UserParam userParam = new UserParam(
					request.getParameter("username"),
					request.getParameter("password"));

			String userName = userParam.getUsername();
			String userEnteredPwd = userParam.getPassword();
			String encryptedPass = new String();
			String primaryDept = null;

			getLocatedBanner(request);

			if (request.getAttribute("img") == null) {
				String salesOrgFromURL = request
						.getParameter("salesOrgFromURL");
				request.setAttribute("img", salesOrgFromURL);
			}

			if ((userName == null || userName.length() <= 0
					|| userName.trim().length() <= 0 || userName.equals(""))
					&& (userEnteredPwd == null || userEnteredPwd.equals(""))) {
				return new ModelAndView("login", "validity",
						"Please enter username & password");
			} else if (userName == null || userName.length() <= 0
					|| userName.trim().length() <= 0 || userName.equals("")) {
				return new ModelAndView("login", "validity",
						"Please enter username");
			} else if (userEnteredPwd == null || userEnteredPwd.length() <= 0
					|| userEnteredPwd.equals("")) {
				request.setAttribute("userName", userName);
				return new ModelAndView("login", "validity",
						"Please enter password");
			}

			try {
				userDetails = LoginServiceImpl.getUserContext(userName);
				String locatedStoreNo = getLocatedStore(request.getRemoteAddr());
				userDetails.setPhysicalStore("" + locatedStoreNo + "");
				primaryDept = LoginServiceImpl.getPrimaryDeptsForUser(userName);
				userDetails.setPrimaryDeptString(primaryDept);
				userDetails.setStoreHostMap(CommonUtils.convertObjectTojson(LoginServiceImpl.getAllStoreHost()));
				
			} catch (Exception e) {
				e.printStackTrace();
				LOGGER.error(Constants.EXCEPTION + e.getStackTrace(), e);
			}
			// LOGGER.info(CommonUtils.convertObjectTojson(userDetails));
			int incorrectAttempt = loginService
					.getIncorrectSecretQuesAttempt(userName);
			if (userDetails != null) {
				String pwdFromDb = userDetails.getPassword();

				if (userDetails.isDeactivated()) {
					request.setAttribute("userName", userName);
					return new ModelAndView("login", "validity",
							"Your account has been deactivated. Please contact your system administration.");
				} else if (userDetails.isLocked()) {
					request.setAttribute("userName", userName);

					if (incorrectAttempt < Constants.FRGT_PWD_ATTEMPT_LIMIT) {
						return new ModelAndView(
								"login",
								"validity",
								"Your account has been locked, select 'Forgot Password' link to unlock password or see your Store Administrator");
					} else {
						return new ModelAndView("login", "validity",
								"Your account is locked. Please contact your system administration.");
					}
				}

				try {
					userDetails.setLoggedInUser(userName);
					userDetails.setLoggedInPwd(userEnteredPwd);
					userDetails.setLoggedInSAPPwd(userDetails.getSapPwd());

					if (userEnteredPwd.equalsIgnoreCase(userName)) {
						userEnteredPwd = userEnteredPwd.toLowerCase();
					}
					ArrayList<UsrInfoParam> enclist = new ArrayList<UsrInfoParam>();
					enclist.add(new UsrInfoParam(userName, userEnteredPwd));
					encryptedPass = loginService.getEncryptPassword(enclist,userDetails)
							.get(0).getEncPassword();
					// LOGGER.info("Actual Encrypted Password--" + encryptedPass
					// + " --from db--" + pwdFromDb);
				} catch (Exception e) {
					e.printStackTrace();
					return new ModelAndView("login", "validity",
							"Incorrect password, try again!");
				}

				if (userEnteredPwd != null && !userEnteredPwd.equals("")) {
					/*
					 * if (userEnteredPwd.equals(pwdFromDb)) {
					 * UserMgtDAOImpl.updatePwd(userName, userEnteredPwd);
					 * return loginUser(userParam, userDetails, request); } else
					 */

					if (!pwdFromDb.equals("")
							&& (encryptedPass.equals(pwdFromDb) || pwdFromDb
									.equals(userEnteredPwd))) {
						if (userEnteredPwd.equalsIgnoreCase(userName) || checkPwdExpiryDate(userName)) {
							userDetails.setChangePwdMandatory(true);
						} else {
							userDetails.setChangePwdMandatory(false);
						}
						// loadParams(request);
						return loginUser(userParam, userDetails, request);

					} else {
						request.setAttribute("userName", userName);
						String message = "Incorrect password, try again!";
						if (loginService.getIncorrectAttempt(userName) >= Constants.MAX_INCORRECT_ATTEMPT - 1) {
							if (incorrectAttempt < Constants.FRGT_PWD_ATTEMPT_LIMIT) {
								message = "Your account has been locked, select 'Forgot Password' link to unlock password or see your Store Administrator";
							} else {
								message = "Your account is locked. Please contact your system administration.";
							}
						}
						loginService.updateIncorrectAttempt(userName);
						return new ModelAndView("login", "validity", message);
					}
				}
			}
			return new ModelAndView("login", "validity",
					"Username and/or password is incorrect");
		} catch (Exception e) {
			e.printStackTrace();
			return new ModelAndView("login", "validity",
					"Username and/or password is incorrect");
		}
	}

	private boolean checkIfReseted(String userName, String encPassword) {
		boolean flag = false;
		ArrayList<UsrInfoParam> enclist = new ArrayList<UsrInfoParam>();
		userName=userName.toLowerCase();
		// new user password
		UsrInfoParam item=new UsrInfoParam(userName,userName+Constants.NEW_USER_PREFIX+"1");
		enclist.add(item);

		// password probality for reset
		for (int i = 1; i <= Constants.RESET_SEQ_LIMIT; i++) {
			item=new UsrInfoParam(userName,userName+Constants.RESET_PREFIX+i);
			enclist.add(item);
		}
		
		// new user password
		userName=userName.toUpperCase();
		item=new UsrInfoParam(userName,userName+Constants.NEW_USER_PREFIX+"1");
		enclist.add(item);
		
		
		enclist = loginService.getEncryptPassword(enclist,userDetails);

		for (UsrInfoParam itm : enclist) {
			if (itm.getEncPassword().equalsIgnoreCase(encPassword)) {
				flag = true;
			}
		}

		return flag;
	}

	private boolean checkPwdExpiryDate(String userName) {
		boolean flag=false;
		String expiryDate = null;
		try {
			expiryDate = LoginServiceImpl.getPwdExpiryDate(userName);
			
		if(new SimpleDateFormat("dd/MM/yy").parse(expiryDate).before(new Date()))
		{
			flag=true;
		}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return flag;
	}

	private void createSession(UserContext userDetails,
			HttpServletRequest request) {

		HttpSession session = request.getSession(false);

		if (null != session)
			session.invalidate();

		session = request.getSession(true);
		session.setMaxInactiveInterval(60 * 60);
		Integer salesOrg = userDetails.getSalesOrg();
		if (salesOrg.equals(PortalUtil.PETROL_SALES_ORG))
			userDetails.setImgLocation("petrol");
		else if (salesOrg.equals(PortalUtil.SM_SALES_ORG))
			userDetails.setImgLocation("woolworths");
		else if (salesOrg.equals(PortalUtil.CNTDWN_SALES_ORG))
			userDetails.setImgLocation("countdown");
		else if (salesOrg.equals(PortalUtil.BWS_SALES_ORG))
			userDetails.setImgLocation("bws");
		else if (salesOrg.equals(PortalUtil.DM_SALES_ORG))
			userDetails.setImgLocation("danmurphy");
		else if (salesOrg.equals(PortalUtil.THMSDUX_SALES_ORG))
			userDetails.setImgLocation("thomasdux");
		else if (salesOrg.equals(PortalUtil.BIGW_SALES_ORG))
			userDetails.setImgLocation("bigw");
		else if (salesOrg.equals(PortalUtil.SFS_SALES_ORG))
			userDetails.setImgLocation("metro");
		else
			userDetails.setImgLocation("woolworths");
		boolean isActiveBws = false, isActiveSmkt = false;
		// if(userDetails.getSiteDtlsList()!=null &&
		// userDetails.getSiteDtlsList().size()>0){
		//
		// for(SiteDtls itm:userDetails.getSiteDtlsList()){
		// if(itm.getSalesOrg().equalsIgnoreCase(""+PortalUtil.BWS_SALES_ORG+"")){
		// isActiveBws=true;
		// }
		// if(itm.getSalesOrg().equalsIgnoreCase(""+PortalUtil.SM_SALES_ORG+"")){
		// isActiveSmkt=true;
		// }
		// }
		// }
		//
		// if(isActiveSmkt&&isActiveBws&&userDetails.getPayingDept().equalsIgnoreCase(Constants.PAYING_CODE)&&salesOrg.equals(PortalUtil.SM_SALES_ORG)){
		if (null != userDetails.getPayingDept()
				&& userDetails.getPayingDept().equalsIgnoreCase(
						Constants.PAYING_CODE)
				&& salesOrg.equals(PortalUtil.SM_SALES_ORG)) {
			userDetails.setImgLocation("bws");
		}

		//userDetails.setTimeOffset(String.valueOf(request.getParameter("timeOffset")));
		try {
			userDetails.setNGBOStore(LoginServiceImpl.isNGBOStore(userDetails
					.getSiteNo()));
		} catch (Exception e1) {
			e1.printStackTrace();
			userDetails.setNGBOStore(false);
		}
		
		try {
			userDetails.set1S3Store(LoginServiceImpl.is1S3Store(userDetails
					.getSiteNo()));
		} catch (Exception e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
			userDetails.set1S3Store(false);
		}

		try {
			userDetails.setStoreHost(LoginServiceImpl.getStoreHost((userDetails
					.getSiteNo())));
		} catch (Exception e1) {
			e1.printStackTrace();
			userDetails.setStoreHost("");
			LOGGER.info("not an ngbo store");
		}
		System.out.println("is ngbo store :" + userDetails.isNGBOStore()
				+ " -Store :" + userDetails.getSiteNo());
		setUserAccessFunction(userDetails);

		String domain = PortalUtil.getDomainForLocalURLs(userDetails);
		LOGGER.info(domain);
		userDetails.setDomain(domain);
		try {
			loginService.resetIncorrectAttempt(userDetails.getUserId());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		userDetails.setTimeZoneOffSet(request.getParameter("timeZoneOffSet"));
		try {			
			String userid = userDetails.getUserId();
			String encSapPwd = "";
			String finalUsrID = Constants.getUTCUserforSAPPwd(userid);
			if(finalUsrID != null && finalUsrID != ""){
				encSapPwd = loginService.encryptSAPPassword(userid, finalUsrID);
				LOGGER.info("Encrypted SAP Password"+encSapPwd);
				userDetails.setLoggedInEncryptedSAPPwd(encSapPwd);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
		session.setAttribute("user", userDetails);
	}
	
	private ModelAndView loginUser(UserParam userParam,
			UserContext userDetails, HttpServletRequest request)
			throws Exception {

		String userName = userParam.getUsername();
		String passWord = userParam.getPassword();
		String locatedStoreNo = "";
		String primaryStore = "";
		try {
			userDetails.setLoggedInUser(userName);
			userDetails.setLoggedInPwd(passWord);
			userDetails.setLoggedInSAPPwd(userDetails.getSapPwd());
			// loginService.updateLastLoggedInTime(userName,null);
			locatedStoreNo = loginService.getLocatedStoreNo(request
					.getRemoteAddr());
			primaryStore = LoginServiceImpl.getPrimaryStore(userName);
			userDetails.setPrimaryStore(primaryStore);
			// Added for password mandatory

			// FIRST CHECKING USR_SITE_DTL TABLE FOR ADMIN ROLES
			List<UserInfoDetail> siteList = null;
			userDetails.setSuperUserFlag("Y");
			siteList = LoginServiceImpl.getUserStores(userDetails, "");
			userDetails.setSuperUserFlag("N");

			if (siteList != null && siteList.size() > 0) {
				if (Constants.isAdminUser(siteList.get(0).getRoleId())) {
					userDetails.setRoleID(siteList.get(0).getRoleId());
					userDetails
							.setSalesOrg(siteList.get(0).getSalesOrg() != null
									&& !siteList.get(0).getSalesOrg()
											.equals("") ? Integer
									.parseInt(siteList.get(0).getSalesOrg())
									: null);
					// CHECKING USER ROLE ID IS A ADMIN OR STORE SUPPORT
					if (userDetails.getRoleID().equals(Constants.AREA_MANAGER)
							|| userDetails.getRoleID().equals(
									Constants.SAlESORG_MANAGER)) {
						userDetails.setLinkedSalesOrg(siteList.get(0)
								.getSalesOrg());
						return new ModelAndView("login", "verify", "S");
					} else
						return new ModelAndView("login", "verify", "Y");
				}

				// CHECKING IF USER IS ACTIVE IN USR_SITE_DTL WITH ADMIN
				// ROLES
			}
			siteList = LoginServiceImpl.getUserStores(userDetails, "");

			if (siteList != null && siteList.size() > 0) {
				String locatedStore = locatedStoreNo;
				UserInfoDetail instore = null;
				boolean inStore = false;
				for (UserInfoDetail userInfoDetail : siteList) {
					if (locatedStore.equalsIgnoreCase(userInfoDetail
							.getSiteNo())) {
						inStore = true;
						instore = userInfoDetail;
					}

				}
				if (inStore && LoginServiceImpl.isNGBOStore(locatedStoreNo)) {
					userDetails.setInStore("Y");
					userDetails.setLocatedStore(instore);
				} else {
					userDetails.setInStore("N");
					userDetails.setPhysicalStore(locatedStore);
				}

				return validateStoreUser(userDetails, request);
			} else if (userDetails.getActive_flag() != null
					&& userDetails.getActive_flag().equals("N")) {

				return new ModelAndView("login", "validity",
						"Your account has been deactivated. Please contact your system administration.");
				// CHECKING USR TABLE FOR ADMIN ROLES
			} else if (userDetails.getRoleID() != null
					&& !userDetails.getRoleID().equals("")) {

				if (Constants.isAdminUser(userDetails.getRoleID())) {
					if (userDetails.getRoleID().equals(Constants.AREA_MANAGER)
							|| userDetails.getRoleID().equals(
									Constants.SAlESORG_MANAGER)) {
						userDetails.setLinkedSalesOrg(userDetails.getSalesOrg()
								.toString());
						return new ModelAndView("login", "verify", "S");
					} else
						return new ModelAndView("login", "verify", "Y");

					// CHECKING USR TABLE FOR MANAGER ROLES
				} else if (Constants.isStoreManagers(userDetails.getRoleID())) {
					return validateStoreManager(userDetails, request);
				} else {
					return validateStoreUser(userDetails, request);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return validateStoreUser(userDetails, request);

	}

	private ModelAndView validateStoreUser(UserContext userDetails,
			HttpServletRequest request) throws Exception {
		List<SiteDtls> siteDtlsList = null;
		List<String> siteNoList = null;
		Map<String, UserSiteDtl> userSiteDtlList = null;

		try {
			// GETTING USER INFO FROM USR_SITE_DTL TABLE FOR BOTH ACTIVE AND
			// INACTIVE INFO
			// loginService.updateLastLoggedInTime(userDetails.getUserId(),null);
			userSiteDtlList = LoginServiceImpl.getUserStoreList(userDetails);

			if (userSiteDtlList != null && userSiteDtlList.size() > 0) {
				siteNoList = new ArrayList<String>();

				for (Map.Entry<String, UserSiteDtl> entry : userSiteDtlList
						.entrySet()) {
					siteNoList.add(entry.getKey());

				}

				siteDtlsList = LoginServiceImpl.getSiteDtlsList(siteNoList);

				int index = 0, locatedSiteIndex = -1;
				for (SiteDtls site : siteDtlsList) {
					if (userDetails.getLocatedStore() != null
							&& userDetails.getLocatedStore().getSiteNo()
									.equalsIgnoreCase(site.getSiteNo()))
						locatedSiteIndex = index;
					index++;
				}
				// GET THE SITE INFO FROM SITE MASTER (BECAUSE WE NEED SITE
				// NAME, WHICH IS NOT IN USR_SITE_DTL )
				System.out.println("located Store info- " + locatedSiteIndex);
				System.out.println("located Store info located site - "
						+ CommonUtils.convertObjectTojson(userDetails
								.getLocatedStore()));
				System.out.println("located Store info actual store list- "
						+ CommonUtils.convertObjectTojson(siteDtlsList));
				if (siteDtlsList != null && siteDtlsList.size() > 0) {

					// IN ORDER TO LOGIN IN TO THE STORE, WE NEED A BANNER AND
					// STORE SO LOADING THE FIRST RESULT INTO USER CONTEXT
					if (userDetails.getInStore() != null
							&& userDetails.getInStore().equalsIgnoreCase("Y")
							&& locatedSiteIndex != -1
							&& siteDtlsList.get(locatedSiteIndex) != null) {
						userDetails.setSalesOrg(Integer.parseInt(siteDtlsList
								.get(locatedSiteIndex).getSalesOrg()));
						userDetails.setSiteNo(siteDtlsList
								.get(locatedSiteIndex).getSiteNo());
						userDetails.setSiteName(siteDtlsList.get(
								locatedSiteIndex).getSiteName());
						userDetails.setDistrict(siteDtlsList.get(
								locatedSiteIndex).getDistrict());
						userDetails.setLatitude(siteDtlsList.get(
								locatedSiteIndex).getLatitude());
						userDetails.setLongitude(siteDtlsList.get(
								locatedSiteIndex).getLongitude());
						userDetails.setRoleID(userSiteDtlList.get(
								siteDtlsList.get(locatedSiteIndex).getSiteNo())
								.getRoleId());
						userDetails.setStoreHost(LoginServiceImpl
								.getStoreHost(userDetails.getSiteNo()));
						LOGGER.info("logged in to physically located Store :"
								+ siteDtlsList.get(locatedSiteIndex)
										.getSiteNo());
						System.out
								.println("logged in to physically located Store :"
										+ siteDtlsList.get(locatedSiteIndex)
												.getSiteNo());
					} else {
						userDetails.setSalesOrg(Integer.parseInt(siteDtlsList
								.get(0).getSalesOrg()));
						userDetails.setSiteNo(siteDtlsList.get(0).getSiteNo());
						userDetails.setSiteName(siteDtlsList.get(0)
								.getSiteName());
						userDetails.setDistrict(siteDtlsList.get(0)
								.getDistrict());
						userDetails.setLatitude(siteDtlsList.get(0)
								.getLatitude());
						userDetails.setLongitude(siteDtlsList.get(0)
								.getLongitude());
						userDetails.setRoleID(userSiteDtlList.get(
								siteDtlsList.get(0).getSiteNo()).getRoleId());
						userDetails.setStoreHost(LoginServiceImpl
								.getStoreHost(userDetails.getSiteNo()));
					}

					// IF MORE THAN ONE RESULT FOUND, LOAD THE SITE DTL LIST TO
					// SWITCH BETWEEN SITES INSIDE THE APP
					// THIS SCENARIO WILL NOT HAPPEN FOR CURRENT RELEASE
					for (int i = 0; i < siteDtlsList.size(); i++) {
						siteDtlsList.get(i).setRoleId(
								userSiteDtlList.get(
										siteDtlsList.get(i).getSiteNo())
										.getRoleId());
						siteDtlsList.get(i).setRoleDesc(
								userSiteDtlList.get(
										siteDtlsList.get(i).getSiteNo())
										.getRoleDesc());
						/*
						 * siteDtlsList.get(i).setSiteNo( userSiteDtlList.get(
						 * siteDtlsList.get(i).getSiteNo()) .getSiteId());
						 * siteDtlsList.get(i).setSiteName( userSiteDtlList.get(
						 * siteDtlsList.get(i).getSiteNo()) .getSiteName());
						 * siteDtlsList.get(i).setSalesOrg( userSiteDtlList.get(
						 * siteDtlsList.get(i).getSiteNo()) .getSalesOrg());
						 */
					}
					userDetails.setSiteDtlsList(siteDtlsList);
					userDetails.setSiteListString("{\"data\":"
							+ Constants.convertToJsonString(siteDtlsList)// .replace("\"","\\\"")
							+ "}");
					createSession(userDetails, request);

					if (userDetails.isInactiveInPrimary()) {
						if (userDetails.getPhysicalStore() != null
								&& userDetails.getPrimaryStore() != null
								&& userDetails.getPhysicalStore()
										.equalsIgnoreCase(
												userDetails.getPrimaryStore())) {
							return new ModelAndView("login",
									"confirmSecondaryLogin", "yes");
						}
					}

					return new ModelAndView(new RedirectView(
							userDetails.getSalesOrg() + "/login/homepage.htm"));
				} else {
					return new ModelAndView("login", "validity",
							"User not mapped to a store. Please contact your system administrator.");
				}
			} else {
				if (userDetails.getActive_flag() != null
						&& userDetails.getActive_flag().equals("N")) {
					return new ModelAndView("login", "validity",
							"Your account has been deactivated. Please contact your system administration.");
				} else {
					return new ModelAndView("login", "validity",
							"User not mapped to a store. Please contact your system administrator.");
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return new ModelAndView("login", "validity",
					"User not mapped to a store. Please contact your system administrator.");
		}
	}

	// NOT USED FOR NOW
	public ModelAndView validateAreaManager(UserContext userDetails,
			HttpServletRequest request) throws Exception {
		String store = userDetails.getSiteNo();
		String salesOrg = userDetails.getSalesOrg() != null ? userDetails
				.getSalesOrg().toString() : "";
		String roleId = userDetails.getRoleID() != null ? userDetails
				.getRoleID() : "";
		List<SiteDtls> siteDtlsList = null;

		try {
			siteDtlsList = LoginServiceImpl.getSiteDtls(store, "", "",
					salesOrg, roleId);
			if (siteDtlsList != null && siteDtlsList.size() > 0) {
				userDetails.setSalesOrg(Integer.parseInt(siteDtlsList.get(0)
						.getSalesOrg()));
				userDetails.setSiteNo(siteDtlsList.get(0).getSiteNo());
				userDetails.setSiteName(siteDtlsList.get(0).getSiteName());
				userDetails.setDistrict(siteDtlsList.get(0).getDistrict());
				userDetails.setLatitude(siteDtlsList.get(0).getLatitude());
				userDetails.setLongitude(siteDtlsList.get(0).getLongitude());
				for (SiteDtls st : siteDtlsList) {
					st.setRoleId(userDetails.getRoleID());
				}
				userDetails.setSiteListString("{\"data\":"
						+ Constants.convertToJsonString(siteDtlsList)// .replace("\"","\\\"")
						+ "}");
				createSession(userDetails, request);
				return new ModelAndView(new RedirectView(
						userDetails.getSalesOrg() + "/login/homepage.htm"));
			} else {
				return new ModelAndView("login", "validity",
						"User is mapped to an invalid area.");
			}

		} catch (Exception e) {
			e.printStackTrace();
			return new ModelAndView("login", "validity",
					"User is mapped to an invalid area.");
		}
	}

	private ModelAndView validateStoreManager(UserContext userDetails,
			HttpServletRequest request) throws Exception {
		List<UserInfoDetail> siteList = null;
		List<SiteDtls> siteDtlsList = null;
		List<String> siteNoList = null;
		Map<String, UserSiteDtl> userSiteDtlList = null;
		String roleId = userDetails.getRoleID() != null ? userDetails
				.getRoleID() : "";
		try {
			// CHECK THE USR_SITE_DTL FOR DEFAULT SITE ENTRY
			siteList = LoginServiceImpl.getUserStores(userDetails,
					userDetails.getSiteNo());

			// IF USER HAS A DEFAULT ENTRY IN USER SITE DTL TABLE THE BELOW
			// BLOAK WILL NOT WORK
			if ((siteList == null || siteList.size() == 0)
					&& (userDetails.getSmInsertFlag() == null || !userDetails
							.getSmInsertFlag().equals("Y"))) {

				// GETTING THE SITE DETAIL INFORMATION FROM SITE MASTER TABLE
				// FOR THE DEFAULT STORE
				siteDtlsList = LoginServiceImpl.getSiteDtls(
						userDetails.getSiteNo(), "", "", "", roleId);

				if (siteDtlsList != null && siteDtlsList.size() > 0) {

					userDetails.setSalesOrg(Integer.parseInt(siteDtlsList
							.get(0).getSalesOrg()));
					userDetails.setSiteNo(siteDtlsList.get(0).getSiteNo());
					userDetails.setSiteName(siteDtlsList.get(0).getSiteName());
					userDetails.setDistrict(siteDtlsList.get(0).getDistrict());
					userDetails.setLatitude(siteDtlsList.get(0).getLatitude());
					userDetails
							.setLongitude(siteDtlsList.get(0).getLongitude());
					userDetails.setStoreHost(userDetails.getSiteNo());
					LoginServiceImpl.creatNewUser(userDetails.getUserId(),
							userDetails.getSiteNo(), userDetails.getRoleID(),
							userDetails.getSalesOrg().toString(), "");
				} else {
					return new ModelAndView("login", "validity",
							"User is mapped with invalid default site.");
				}

			} else {
				if (userDetails.getActive_flag() != null
						&& userDetails.getActive_flag().equals("N")
						&& userDetails.getSmInsertFlag() != null
						&& userDetails.getSmInsertFlag().equals("Y")) {
					return new ModelAndView("login", "validity",
							"Your account has been deactivated. Please contact your system administration.");
				}
			}
			// else{

			// GET THE USER SITE INFORMATION FROM THE USR_SITE_DTL TABLE WITH
			// BOTH ACTIVE AND INACTIVE
			userSiteDtlList = LoginServiceImpl.getUserStoreList(userDetails);
			if (userSiteDtlList != null && userSiteDtlList.size() > 0) {

				siteNoList = new ArrayList<String>();

				for (Map.Entry<String, UserSiteDtl> entry : userSiteDtlList
						.entrySet()) {
					siteNoList.add(entry.getKey());
				}
				// GET THE ALL ACTIVE STORE DETAIL INFORMATION FROM THE SITE
				// MASTER TABLE FOR SITE NAME
				siteDtlsList = LoginServiceImpl.getSiteDtlsList(siteNoList);

				if (siteDtlsList != null && siteDtlsList.size() > 0) {

					// IN ORDER TO LOGIN IN TO THE STORE, WE NEED A BANNER AND
					// STORE SO LOADING THE FIRST RESULT INTO USER CONTEXT
					userDetails.setSalesOrg(Integer.parseInt(siteDtlsList
							.get(0).getSalesOrg()));
					userDetails.setSiteNo(siteDtlsList.get(0).getSiteNo());
					userDetails.setSiteName(siteDtlsList.get(0).getSiteName());
					userDetails.setDistrict(siteDtlsList.get(0).getDistrict());
					userDetails.setRoleID(userSiteDtlList.get(
							siteDtlsList.get(0).getSiteNo()).getRoleId());
					userDetails.setStoreHost(userDetails.getSiteNo());

					for (int i = 0; i < siteDtlsList.size(); i++) {

						siteDtlsList.get(i).setRoleId(
								userSiteDtlList.get(
										siteDtlsList.get(i).getSiteNo())
										.getRoleId());
						siteDtlsList.get(i).setRoleDesc(
								userSiteDtlList.get(
										siteDtlsList.get(i).getSiteNo())
										.getRoleDesc());
						/*
						 * siteDtlsList.get(i).setSiteNo( userSiteDtlList.get(
						 * siteDtlsList.get(i).getSiteNo()) .getSiteId());
						 * siteDtlsList.get(i).setSiteName( userSiteDtlList.get(
						 * siteDtlsList.get(i).getSiteNo()) .getSiteName());
						 * siteDtlsList.get(i).setSalesOrg( userSiteDtlList.get(
						 * siteDtlsList.get(i).getSiteNo()) .getSalesOrg());
						 */
					}
					userDetails.setSiteDtlsList(siteDtlsList);
					userDetails.setSiteListString("{\"data\":"
							+ Constants.convertToJsonString(siteDtlsList)// .replace("\"","\\\"")
							+ "}");
					createSession(userDetails, request);
					return new ModelAndView(new RedirectView(
							userDetails.getSalesOrg() + "/login/homepage.htm"));
				} else {
					return new ModelAndView("login", "validity",
							"User is mapped to invalid site.");
				}
			} else {
				if (userDetails.getActive_flag() != null
						&& userDetails.getActive_flag().equals("N")) {
					return new ModelAndView("login", "validity",
							"Your account has been deactivated. Please contact your system administration.");
				} else {
					return new ModelAndView("login", "validity",
							"User not mapped to a store. Please contact your system administrator.");
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			if (userDetails.getActive_flag() != null
					&& userDetails.getActive_flag().equals("N")) {
				return new ModelAndView("login", "validity",
						"Your account has been deactivated. Please contact your system administration.");
			} else {
				return new ModelAndView("login", "validity",
						"Technical issue occured.");
			}
		}
	}

	private void setUserAccessFunction(UserContext userDetails) {

		Map<String, ArrayList<ActivityOptions>> userAccessMap = null;
		Map<String, ArrayList<ActivityOptions>> userAccessRemovedMap = null;
		StringBuffer articleStr = null;
		/*
		 * ObjectMapper mapper = new ObjectMapper(); StringWriter stw = new
		 * StringWriter();
		 */

		try {

			userAccessMap = userAccessService.getUserFunctionacces(userDetails,
					true);

			if (userAccessMap != null && userAccessMap.size() > 0) {

				Iterator iter = userAccessMap.entrySet().iterator();
				while (iter.hasNext()) {
					Map.Entry pairss = (Entry) iter.next();

					if (articleStr == null)
						articleStr = new StringBuffer("'" + pairss.getKey()
								+ "'");
					articleStr.append(",'" + pairss.getKey() + "'");
				}
				userDetails.setFunctionCodeList(articleStr.toString());
			}

			userAccessRemovedMap = userAccessService.getUserFunctionacces(
					userDetails, false);
			if (userAccessRemovedMap != null && userAccessRemovedMap.size() > 0) {
				userAccessMap.putAll(userAccessRemovedMap);
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// LOGGER.info("stw.toString() -__" + stw.toString());
		userDetails.setUserAccess("{\"data\":"
				+ Constants.convertToJsonString(userAccessMap) + "}");
		userDetails.setUserAccessMap(userAccessMap);
	}

	@RequestMapping(value = "/verifyStore.htm", method = RequestMethod.GET)
	@ResponseBody
	public String verifyStore(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String store = request.getParameter("site");
		String salesOrg = (request.getParameter("salesOrg") != null
				&& !request.getParameter("salesOrg").equals("")
				&& userDetails != null
				&& userDetails.getLinkedSalesOrg() != null && !userDetails
				.getLinkedSalesOrg().equals("")) ? userDetails
				.getLinkedSalesOrg().toString() : "";
		List<SiteDtls> siteDtlsList = null;
		String status = "false";
		String roleId = userDetails.getRoleID() != null ? userDetails
				.getRoleID() : "";
		try {
			siteDtlsList = LoginServiceImpl.getSiteDtls(store, "", "",
					salesOrg, roleId);
			if (siteDtlsList != null && siteDtlsList.size() > 0) {

				if (siteDtlsList.get(0) != null
						&& siteDtlsList.get(0).getMsg()
								.equalsIgnoreCase(Constants.ERROR_MSG)) {
					return "invalid_salesorg";
				} else {
					userDetails.setSalesOrg(Integer.parseInt(siteDtlsList
							.get(0).getSalesOrg()));
					userDetails.setSiteNo(siteDtlsList.get(0).getSiteNo());
					userDetails.setSiteName(siteDtlsList.get(0).getSiteName());
					userDetails.setDistrict(siteDtlsList.get(0).getDistrict());
					userDetails.setLatitude(siteDtlsList.get(0).getLatitude());
					userDetails
							.setLongitude(siteDtlsList.get(0).getLongitude());
					// createSession(userDetails, request);
					return "true-" + userDetails.getSalesOrg() + "-"
							+ userDetails.getSiteNo() + "-"
							+ userDetails.getSiteName();
				}
			} else {
				return "false";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return status;
	}

	@RequestMapping(value = "/createSession.htm", method = RequestMethod.GET)
	@ResponseBody
	public String createSession(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// String store = request.getParameter("site");
		// List<SiteDtls> siteDtlsList = null;
		String status = "false";
		try {
			// siteDtlsList = LoginServiceImpl.getSiteDtls(store, "", "", "");
			// if (siteDtlsList != null && siteDtlsList.size() > 0) {

			/*
			 * userDetails.setSalesOrg(Integer.parseInt(siteDtlsList.get(0)
			 * .getSalesOrg()));
			 * userDetails.setSiteNo(siteDtlsList.get(0).getSiteNo());
			 * userDetails.setSiteName(siteDtlsList.get(0).getSiteName());
			 */
			createSession(userDetails, request);

			// XPSNV - Security Requirement - Logging User Details each time
			// they login to a store - Begin

			// try {
			// if(userDetails != null) {
			// loginService.createUserLogAudit(userDetails.getUserId(),
			// userDetails.getRoleID(),(String)request.getParameter("site"));
			// }
			// }
			// catch(Exception e) {
			// LOGGER.error((Constants.EXCEPTION + e));
			// }

			LOGGER.info("User level audit log for Admin user executed");

			// XPSNV - Security Requirement - Logging User Details each time
			// they login to a store - End
			return "true-" + userDetails.getSalesOrg() + "-"
					+ userDetails.getSiteNo() + "-" + userDetails.getSiteName();
			/*
			 * } else { return "false"; }
			 */

		} catch (Exception e) {
			e.printStackTrace();
		}

		return status;
	}

	@RequestMapping(value = "/getSecrQues.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getSecrQues(HttpServletRequest request,
			HttpServletResponse response) {

		String status = "";
		String userId = (String) request.getParameter("userId");
		String seqQues[] = null;

		try {
			// loadParams(request);
			NGBOServices myNGBOServices = new NGBOServices();
			seqQues = myNGBOServices.getChallengeQuestions(userId);

			if (seqQues != null && seqQues.length > 0)
				status = "true";
			else
				status = "false";

		} catch (InvalidUserException e) {
			System.out.println("message :" + e.getMessage() + ",map message:"
					+ Constants.getTimerror(e.getMessage().split(":")[0]));
			e.printStackTrace();
			LOGGER.error("Stack Trace :", e);
			status = Constants.getTimerror(e.getMessage().split(":")[0]);

		} catch (MissingChallengeQuestionsException e) {
			System.out.println("message :" + e.getMessage() + ",map message:"
					+ Constants.getTimerror(e.getMessage().split(":")[0]));
			e.printStackTrace();
			LOGGER.error("Stack Trace :", e);
			status = Constants.getTimerror(e.getMessage().split(":")[0]);

		} catch (Exception e) {
			System.out.println("message :" + e.getMessage() + "");
			System.out.println("map message:"
					+ Constants.getTimerror(e.getMessage().split(":")[0]));
			e.printStackTrace();
			LOGGER.error("Stack Trace :", e);
			status = Constants.getTimerror(e.getMessage().split(":")[0]);

		}

		/*
		 * ObjectMapper mapper = new ObjectMapper(); StringWriter stw = new
		 * StringWriter();
		 * 
		 * try { final JsonGenerator jsonGenerator = mapper.getJsonFactory()
		 * .createJsonGenerator(stw);
		 * 
		 * mapper.writeValue(jsonGenerator, seqQues); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * e.printStackTrace(); } catch (IOException e) {
		 * 
		 * e.printStackTrace(); }
		 */
		return "{\"data\":" + Constants.convertToJsonString(seqQues)
				+ ",\"msg\":\"" + status + "\"}";

		// return status;
	}

	@RequestMapping(value = "/validateAns.htm", method = RequestMethod.GET)
	@ResponseBody
	public String validateAns(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String status = "";
		String questions[] = null;
		String answers[] = null;
		String userID = null;
		int incorrectAttempt = 0;
		if (request.getParameter("ques") != null
				&& !request.getParameter("ques").equals("")
				&& request.getParameter("ques").split(":").length > 0
				&& request.getParameter("ans") != null
				&& !request.getParameter("ans").equals("")
				&& request.getParameter("ans").split(":").length > 0
				&& request.getParameter("userId") != null
				&& !request.getParameter("userId").equals("")) {
			questions = new String[request.getParameter("ques").split(":").length];
			answers = new String[request.getParameter("ans").split(":").length];
			userID = request.getParameter("userId");
			incorrectAttempt = loginService
					.getIncorrectSecretQuesAttempt(userID);
			for (int i = 0; i < request.getParameter("ans").split(":").length; i++) {
				questions[i] = request.getParameter("ques").split(":")[i];
				answers[i] = request.getParameter("ans").split(":")[i]
						.toLowerCase();
				// LOGGER.info("questions:" + questions[i]);
				// LOGGER.info("answers:" + answers[i]);
			}

			try {
				// LOGGER.info("incorrect attempt :" + incorrectAttempt);
				if (incorrectAttempt < Constants.FRGT_PWD_ATTEMPT_LIMIT) {
					NGBOServices myNGBOServices = new NGBOServices();
					// questions = myNGBOServices.getChallengeQuestions(userID);
					myNGBOServices.validateChallengeQuestions(userID,
							questions, answers);
					loginService.secretAnsIncorrectAttempt(userID, true);
				} else {
					status = "Due to three failed attempts to answer at least one security question, your account has been locked and can only be unlocked by administration.";
				}
			} catch (Exception e) {
				e.printStackTrace();
				loginService.secretAnsIncorrectAttempt(userID, false);
				status = Constants.getTimerror(e.getMessage().split(":")[0]);
				if (incorrectAttempt + 1 == Constants.FRGT_PWD_ATTEMPT_LIMIT) {
					loginService.lockUserAccount(userID);
					status = "Due to three failed attempts to answer at least one security question, your account has been locked and can only be unlocked by administration.";
				}

			}
		} else {
			status = "Please enter security answer.";
		}

		return status;
	}

	private boolean checkWithLastPassword(ArrayList<String> prevPasswords,
			String encPassword) {
		// TODO Auto-generated method stub
		boolean flag = false;
		for (String str : prevPasswords) {
			if (str.equalsIgnoreCase(encPassword)) {
				return true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/restPwd.htm", method = RequestMethod.GET)
	@ResponseBody
	public String restPwd(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String status = "";
		String userID = (String) request.getParameter("userId");
		String newPwd = (String) request.getParameter("newPwd");
		String curPwd = null ;
		
		UserContext user = null;
		user = LoginServiceImpl.getUserContext(userID);
		curPwd = user.getPassword();
		
		LOGGER.info("userID" + userID);

		user.setLoggedInUser(userID);
		user.setLoggedInPwd("");
		ArrayList<UsrInfoParam> enclist = new ArrayList<UsrInfoParam>();

		enclist.add(new UsrInfoParam(userID, newPwd));

		ArrayList<String> prevPasswords = PassWordMgtDAOImpl
				.getPrevPasswords(userID);
		enclist = loginService.getEncryptPassword(enclist,user);

		UsrInfoParam userObj = new UsrInfoParam();
		userObj.setEncPassword(curPwd);
		enclist.add(userObj);

		// LOGGER.info("==" + CommonUtils.convertObjectTojson(enclist));

		if (checkWithLastPassword(prevPasswords, enclist.get(0)
				.getEncPassword())) {
			status = "You cannot use your previous 4 passwords. Please enter a different password.";
		}else if (curPwd.equals(enclist.get(0).getEncPassword())) {
			status = "New Password should not be same as Current Password.";
		} else {
			if (isUserAccounLocked(userID)) {
				if (unlockUserInTIM(userID)) {
					status = changePwdOfUser(enclist, request, userID, newPwd);
				} else {
					LOGGER.info("unlockUserInTIM  falied");
					status = "false";
				}
			} else {
				status = changePwdOfUser(enclist, request, userID, newPwd);
			}
		}

		return status;
	}

	private String changePwdOfUser(ArrayList<UsrInfoParam> enclist,
			HttpServletRequest request, String userID, String newPwd) {
		LOGGER.info("Inside changePwdOfUser method start");
		String stat = "";
		try {
			LOGGER.info("Calling updateNewPwdToStoreDb for pwd update local");
			if (true) {
				LOGGER.info("new pwd updated local call");
//				PassWordMgtDAOImpl.updateNewPassword(userID, enclist.get(0)
//						.getEncPassword());
				ArrayList<String> prevPasswords = PassWordMgtDAOImpl
						.getPrevPasswords(userID);
				
				LOGGER.info("new pwd updated local call success");
				try {
					NGBOServices myNGBOServices = new NGBOServices();
					myNGBOServices.changeUserPassword(userID,userID, newPwd,false);// need to ask palani y reset flag should be set Y as of code its N
					PassWordMgtDAOImpl.updatePassword(userID, enclist.get(0).getEncPassword(), updatePwdExpiryDate());
					//reset incorrect attempts password and secret ques
					loginService.resetIncorrectAttempt(userID);
					//copy the pwd to history table 
					if(!checkWithLastPassword(prevPasswords,enclist.get(1).getEncPassword()))
					PassWordMgtDAOImpl.updateNewPassword(userID,enclist.get(1).getEncPassword());
					
					stat = "true";
				} catch (Exception e) {
					LOGGER.error((Constants.EXCEPTION + e), e);
					// e.printStackTrace();

					if (updateNewPwdToStoreDb(enclist.get(0).getEncPassword(),
							request, userID,prevPasswords,enclist)) {
						stat = "partiallyTrue:"
								+ Constants.getTimerror(e.getMessage().split(
										":")[0]);
					} else {
						stat = "false";
					}

					// boolean isUpdate = PassWordMgtDAOImpl
					// .updatePasswordExpToToday(userID);
					// LOGGER.error(("Updated exp date :" + isUpdate));

				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();

			// TODO: handle exception
			LOGGER.error("Error at" + e.getStackTrace()[0].getClassName() + " "
					+ e.getStackTrace()[0].getLineNumber() + " "
					+ e.getStackTrace()[0].getMethodName());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();

			// TODO: handle exception
			LOGGER.error(
					"Error at" + e.getStackTrace()[0].getClassName() + " "
							+ e.getStackTrace()[0].getLineNumber() + " "
							+ e.getStackTrace()[0].getMethodName(), e);

		}
		LOGGER.info("Inside changePwdOfUser method end");
		return stat;
	}

	private boolean unlockUserInTIM(String userID) {
		boolean stat = false;
		try {
			NGBOServices myNGBOServices = new NGBOServices();
			myNGBOServices.unlockUser(userID,userID);
			stat = true;
		} catch (Exception e) {
			LOGGER.error(
					"Error at" + e.getStackTrace()[0].getClassName() + " "
							+ e.getStackTrace()[0].getLineNumber() + " "
							+ e.getStackTrace()[0].getMethodName(), e);
		}
		return stat;
	}

	public boolean updateNewPwdToStoreDb(String newPassword,
			HttpServletRequest request, String userId,ArrayList<String> prevPasswords,ArrayList<UsrInfoParam> enclist) throws Exception {

		boolean updateStatus = false;

		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

		Date date = new Date();

		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(dateFormat.parse(currentDate));
		cal.add(Calendar.DATE, 1);
		String newExpirydate = dateFormat.format(cal.getTime());
		

		// newPassword;// = PwdEncryptDecryptService.encrypt(newPassword);
		if (newPassword != null) {
			updateStatus = PassWordMgtDAOImpl.updatePassword(userId,
					newPassword, newExpirydate);

			//reset incorrect attempts password and secret ques
			loginService.resetIncorrectAttempt(userId);
			//copy the pwd to history table 
			if(!checkWithLastPassword(prevPasswords,enclist.get(1).getEncPassword()))
			PassWordMgtDAOImpl.updateNewPassword(userId,enclist.get(1).getEncPassword());

		}
		return updateStatus;
	}

	public boolean isUserAccounLocked(String userId) {
		LOGGER.info("checking account is locked --- isUserAccounLocked method start ");
		boolean locked = false;

		try {
			locked = PassWordMgtDAOImpl.isUserLocked(userId);
		} catch (Exception e) {
			// TODO: handle exception
			LOGGER.error(
					"Error at" + e.getStackTrace()[0].getClassName() + " "
							+ e.getStackTrace()[0].getLineNumber() + " "
							+ e.getStackTrace()[0].getMethodName(), e);
		}
		LOGGER.info("isUserAccounLocked method end --- account lock status "
				+ locked);
		return locked;
	}

	public boolean checkAcc(String newPassword, HttpServletRequest request,
			String userId) throws Exception {

		boolean updateStatus = false;
		String newExpirydate = updatePwdExpiryDate();

		// newPassword;// = PwdEncryptDecryptService.encrypt(newPassword);
		if (newPassword != null) {
			updateStatus = PassWordMgtDAOImpl.updatePassword(userId,
					newPassword, newExpirydate);

		}
		return updateStatus;
	}

	public String updatePwdExpiryDate() throws ParseException {

		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

		Date date = new Date();

		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(dateFormat.parse(currentDate));
		cal.add(Calendar.DATE, Constants.EXPIERY_DAYS_COUNT);
		String convertedDate = dateFormat.format(cal.getTime());

		// LOGGER.info("convertedDate=" + convertedDate);

		return convertedDate;
	}

	/*
	 * @RequestMapping(value = "/restPwd.htm", method = RequestMethod.GET)
	 * 
	 * @ResponseBody public String restPwd(HttpServletRequest request,
	 * HttpServletResponse response) throws Exception {
	 * 
	 * String status = ""; String newPassword = (String)
	 * request.getParameter("newPwd"); String userID = (String)
	 * request.getParameter("userId"); // String answers[] ={(String)
	 * request.getParameter("ans")}; try { NGBOServices myNGBOServices = new
	 * NGBOServices(); myNGBOServices.changeUserPassword(userID, newPassword);
	 * // status ="true"; } catch (Exception e) { e.printStackTrace(); status =
	 * "false."; }
	 * 
	 * return status; }
	 */

	@RequestMapping(value = "/landing.htm", method = RequestMethod.GET)
	public void landing(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// //LOGGER.info("inside get");

		UserContext user = new UserContext();

		LOGGER.info("Remote Ip:" + request.getRemoteAddr());

		user.setSalesOrg(getLocatedSalesOrg(request.getRemoteAddr()));

		if (user.getSalesOrg().equals(PortalUtil.SM_SALES_ORG)) {
			request.setAttribute("img", "woolworths");

		} else if (user.getSalesOrg().equals(PortalUtil.BWS_SALES_ORG)) {
			request.setAttribute("img", "bws");

		} else if (user.getSalesOrg().equals(PortalUtil.DM_SALES_ORG)) {
			request.setAttribute("img", "danmurphy");

		} else if (user.getSalesOrg().equals(PortalUtil.PETROL_SALES_ORG)) {
			request.setAttribute("img", "petrol");

		} else if (user.getSalesOrg().equals(PortalUtil.THMSDUX_SALES_ORG)) {
			request.setAttribute("img", "thomasdux");

		} else if (user.getSalesOrg().equals(PortalUtil.BIGW_SALES_ORG)) {
			request.setAttribute("img", "bigw");

		} else if (user.getSalesOrg().equals(PortalUtil.CNTDWN_SALES_ORG)) {
			request.setAttribute("img", "countdown");

		} else if (user.getSalesOrg().equals(PortalUtil.SFS_SALES_ORG)) {
			request.setAttribute("img", "metro");

		} else {
			request.setAttribute("img", "woolworths");
		}

		if (request.getSession(false) != null) {
			request.getSession().invalidate();

		}

		RequestDispatcher rd = request.getRequestDispatcher("/login.jsp");
		rd.forward(request, response);
	}

	private Integer getLocatedSalesOrg(String remoteAddr) {
		// logic to get physically located store.

		try {
			return Integer
					.parseInt(loginService.getLocatedSalesOrg(remoteAddr));
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return -1;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return -1;
		}
	}

	private String getLocatedStore(String remoteAddr) {
		// logic to get physically located store.
		try {
			String store = loginService.getLocatedStoreNo(remoteAddr);
			if (null == store) {
				return "-1";
			} else {
				return store;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "-1";
		}
		// return 1004;
	}

	public void getLocatedBanner(HttpServletRequest request) throws Exception {

		UserContext user = new UserContext();

		LOGGER.info("Remote Ip:" + request.getRemoteAddr());

		user.setSalesOrg(getLocatedSalesOrg(request.getRemoteAddr()));

		if (user.getSalesOrg().equals(PortalUtil.SM_SALES_ORG)) {
			request.setAttribute("img", "woolworths");

		} else if (user.getSalesOrg().equals(PortalUtil.BWS_SALES_ORG)) {
			request.setAttribute("img", "bws");

		} else if (user.getSalesOrg().equals(PortalUtil.DM_SALES_ORG)) {
			request.setAttribute("img", "danmurphy");

		} else if (user.getSalesOrg().equals(PortalUtil.PETROL_SALES_ORG)) {
			request.setAttribute("img", "petrol");

		} else if (user.getSalesOrg().equals(PortalUtil.THMSDUX_SALES_ORG)) {
			request.setAttribute("img", "thomasdux");

		} else if (user.getSalesOrg().equals(PortalUtil.BIGW_SALES_ORG)) {
			request.setAttribute("img", "bigw");

		} else if (user.getSalesOrg().equals(PortalUtil.SFS_SALES_ORG)) {
			request.setAttribute("img", "metro");

		} else if (user.getSalesOrg().equals(PortalUtil.CNTDWN_SALES_ORG)) {
			request.setAttribute("img", "countdown");

		}

	}

	public void setLocatedBanner(int salesOrg, HttpServletRequest request)
			throws Exception {

		UserContext user = new UserContext();

		user.setSalesOrg(salesOrg);

		if (user.getSalesOrg().equals(PortalUtil.SM_SALES_ORG)) {
			request.setAttribute("img", "woolworths");

		} else if (user.getSalesOrg().equals(PortalUtil.BWS_SALES_ORG)) {
			request.setAttribute("img", "bws");

		} else if (user.getSalesOrg().equals(PortalUtil.DM_SALES_ORG)) {
			request.setAttribute("img", "danmurphy");

		} else if (user.getSalesOrg().equals(PortalUtil.PETROL_SALES_ORG)) {
			request.setAttribute("img", "petrol");

		} else if (user.getSalesOrg().equals(PortalUtil.THMSDUX_SALES_ORG)) {
			request.setAttribute("img", "thomasdux");

		} else if (user.getSalesOrg().equals(PortalUtil.BIGW_SALES_ORG)) {
			request.setAttribute("img", "bigw");

		} else if (user.getSalesOrg().equals(PortalUtil.SFS_SALES_ORG)) {
			request.setAttribute("img", "metro");

		} else if (user.getSalesOrg().equals(PortalUtil.CNTDWN_SALES_ORG)) {
			request.setAttribute("img", "countdown");

		}

	}
}
