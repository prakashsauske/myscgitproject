package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.identity.exceptions.SystemException;
import au.com.woolworths.ngbo.identity.NGBOServices;
import au.com.woolworths.portal.model.ActivityOptions;
import au.com.woolworths.portal.model.SiteDtls;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserPreferences;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.param.UsrInfoParam;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.PassWordMgtDAOImpl;
import au.com.woolworths.portal.service.PwdEncryptDecryptService;
import au.com.woolworths.portal.service.SecretMgtDAOImpl;
import au.com.woolworths.portal.service.StoreSearchServiceImpl;
import au.com.woolworths.portal.service.UserAccessServiceImpl;
import au.com.woolworths.portal.service.UserPreferenceDAOImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.EncryptDecrypt;
import au.com.woolworths.portal.util.PortalUtil;

@Controller
@RequestMapping(value = "*/login")
@Scope("session")
public class Homecontroller /* extends BaseController */{

	/*
	 * XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page
	 * - Begin
	 */
	@Value("#{properties['layByScreen']}")
	private String screenCode;

	/*
	 * XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page
	 * - Begin
	 */
	@Value("#{properties['CentralTicketing']}")
	private String screenCode1;

	private ModelMap model;
	private UserContext userDetail;
	private String userName = "";
	private String passWord = "";

	@Value("#{url['UserPreferencesSize']}")
	private String userPreferencesSize;

	@Value("#{url['PPSUrl']}")
	private String PPSUrl;

	@Value("#{url['CTUrl']}")
	private String CTUrl;

	@Value("#{url['LayByURL']}")
	private String LayByURL;

	@Value("#{url['ngbo.ldap.secretqa.size']}")
	public String MIN_SECRET_QES_COUNT;

	@Autowired
	private StoreSearchServiceImpl storeSearchService;

	@Autowired
	private UserAccessServiceImpl userAccessService;

	@Autowired
	private EncryptDecrypt encryptDecrypt;

	@Autowired
	private LoginServiceImpl loginService;

	private static final Logger LOGGER = Logger.getLogger(Homecontroller.class
			.getName());

	private boolean isPilotRedirectRequired(UserContext user,
			HttpServletRequest request) throws SQLException, IOException {
		boolean isPilot = false;
		boolean redirectURL = false;
		StringBuffer validURL = null;
		StringBuffer requestURL = null;
		String sessionID = "";
		if (user != null && user.getSiteNo() != null
				&& !user.getSiteNo().isEmpty()) {
			// Step 1: validate logged in store pilot store
			try {
				isPilot = loginService.isPilotStore(user.getSiteNo());
			} catch (Exception e) {
				LOGGER.error(e);
			}

			// Step 2: validate current URL
			boolean isPilotURL = request.getRequestURL().toString()
					.contains(Constants.PILOTCONTEXT);

			// Step 3: Check redirect required
			if (isPilot && !isPilotURL) {
				requestURL = new StringBuffer(request
						.getRequestURL()
						.toString()
						.replace(Constants.NONPILOTCONTEXT,
								Constants.PILOTCONTEXT));
				validURL = new StringBuffer(
						requestURL.toString().split(Constants.PILOTCONTEXT)[0])
						.append(Constants.PILOTCONTEXT);
			} else if (!isPilot && isPilotURL) {
				requestURL = new StringBuffer(request
						.getRequestURL()
						.toString()
						.replace(Constants.PILOTCONTEXT,
								Constants.NONPILOTCONTEXT));
				validURL = new StringBuffer(
						requestURL.toString().split(Constants.NONPILOTCONTEXT)[0])
						.append(Constants.NONPILOTCONTEXT);
			}
			// Step 4: Check availability of redirect URL
			if (requestURL!=null) {
				if (checkAvailablityOfApp(validURL.toString())) {
					sessionID = request.getSession(false)
							.getId();
					// Step 5: cache session info
					loginService.updateSessionInfo(sessionID, user);
					
					//Step 6 : Append session id in request URL
					if(requestURL.toString().contains("?disableKey")){
						requestURL.append("&");
					}else{
						requestURL.append("?");
					}
					requestURL.append("sessionID=").append(URLEncoder.encode(sessionID,"UTF-8"));
					LOGGER.info("Valid URL = "+requestURL.toString());
					user.setRedirectURL(requestURL.toString());
					redirectURL = true;
				}
			}

		}
		return redirectURL;
	}
	
	private void invalidateCurrentSession(HttpServletRequest request){
		if(request.getSession(false)!=null && request.getSession(false).getAttribute("user") != null){
			request.getSession(false).invalidate();
		}
	}

	private boolean checkAvailablityOfApp(String requestURL) {
		boolean result = false;
		try {
			URL siteURL = new URL(requestURL);
			HttpURLConnection connection = (HttpURLConnection) siteURL
					.openConnection();
			connection.setRequestMethod("GET");
			connection.connect();
			int code = connection.getResponseCode();
			if (code == 200) {
				result = true;
			}
		} catch (Exception e) {
			LOGGER.error("Error ="+e);
		}
		return result;
	}

	@RequestMapping(value = "/homepage.htm", method = RequestMethod.GET)
	public ModelAndView homepage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		boolean retainSession = false;
		try {
			if (request.getSession(false) == null
					|| (request.getSession(false) != null && request
							.getSession(false).getAttribute("user") == null)) {
				String sessionID = request.getParameter("sessionID");
				if(sessionID !=null && !sessionID.isEmpty()){
					userDetail = loginService.retriveSessionInfo(sessionID.trim());
					retainSession = userDetail!=null;	
				}
				if(!retainSession){
					return new ModelAndView(new RedirectView("../../"));
				}
			}else{
				userDetail = ((UserContext) request.getSession().getAttribute(
						"user"));
			}
			if(!retainSession){
				if(isPilotRedirectRequired(userDetail,request)){
					if(userDetail.getRedirectURL()!=null && !userDetail.getRedirectURL().isEmpty()){
						invalidateCurrentSession(request);
						return new ModelAndView(new RedirectView(userDetail.getRedirectURL()));
					}
				}
			}
			
			ModelAndView modelAndView = new ModelAndView("home");
			UserPreferencesParam param = new UserPreferencesParam();
			
			
			model = new ModelMap();
			model.addAttribute("loginFlag", "Y");
			model.addAttribute("option", "");
			// model.addAttribute("secQues", "Y");
			model.addAttribute("inStore", userDetail.getInStore());
			// model.addAttribute("changePasswordMandatory",(userDetail.isChangePwdMandatory()?"Y":"N"));
			userName = userDetail
					.getUserId();
			passWord = userDetail
					.getPassword();
			if (Constants.isAdminUser(userDetail.getRoleID())) {
				loginService.updateLastLoggedInTime(userDetail.getUserId(),
						null);
			} else if (userDetail.getSiteDtlsList() != null
					&& userDetail.getSiteDtlsList().size() == 1) {
				loginService.updateLastLoggedInTime(userDetail.getUserId(),
						userDetail.getSiteNo());
			}
			param.setSiteNo(userDetail.getSiteNo());
			param.setOption("preferences");
			param.setUserId(userDetail.getUserId());
			param.setSaleOrg(userDetail.getSalesOrg().toString());
			param.setUserPreferencesSize(userPreferencesSize);
			param.setRoleId(userDetail.getRoleID());
			param.setPlatform(Constants.BROWSER);
			HttpSession session = request.getSession(retainSession);
			Map<String, UserPreferences> defaultPreferenceMap = null;
			Map<String, UserPreferences> userPreferenceMap = null;

			// ArrayList<String> menuBarOptions = null;
			// if (session.getAttribute("menuBarOptions") == null) {
			/*
			 * menuBarOptions =
			 * UserPreferenceDAOImpl.getMenuBarOptions(userDetail
			 * .getSalesOrg().toString()); session.setAttribute(
			 * "menuBarOptions", (menuBarOptions != null &&
			 * menuBarOptions.size() > 0) ? menuBarOptions : new
			 * ArrayList<String>());
			 */
			// }

			if (session.getAttribute("defaultPreferenceMap") == null
					&& session.getAttribute("userPreferenceMap") == null) {

				userPreferenceMap = UserPreferenceDAOImpl
						.getUserPreferences(param);

				// if (!(userPreferenceMap != null && userPreferenceMap.size() >
				// 0))
				defaultPreferenceMap = UserPreferenceDAOImpl
						.getDefaultPreferences(param);

				session.setAttribute("defaultPreferenceMap",
						(defaultPreferenceMap != null && defaultPreferenceMap
								.size() > 0) ? defaultPreferenceMap
								: new LinkedHashMap<String, UserPreferences>());
				session.setAttribute(
						"userPreferenceMap",
						(userPreferenceMap != null && userPreferenceMap.size() > 0) ? userPreferenceMap
								: new LinkedHashMap<String, UserPreferences>());

				if (userPreferenceMap != null && userPreferenceMap.size() > 0)
					model.addAttribute("preferenceMap",
							session.getAttribute("userPreferenceMap"));

				else
					model.addAttribute("preferenceMap",
							session.getAttribute("defaultPreferenceMap"));

			} else {
				userPreferenceMap = (LinkedHashMap<String, UserPreferences>) session
						.getAttribute("userPreferenceMap");

				if (userPreferenceMap == null || userPreferenceMap.size() == 0)
					model.addAttribute("preferenceMap",
							session.getAttribute("defaultPreferenceMap"));
				else

					model.addAttribute("preferenceMap",
							session.getAttribute("userPreferenceMap"));
			}
			// LOGGER.info("request.getAttribute(\"disableKey\")"+request.getParameter("disableKey"));
			LOGGER.info("Exp Days" + userDetail.getExpiryDueDays());
			System.out.println("Exp Days" + userDetail.getExpiryDueDays());
			if (userDetail.isNGBOStore()
					&& userDetail.getExpiryDueDays() <= Constants.NOTIFY_PERIOD
					&& !userDetail.isLoggedinChangePwd()) {
				request.setAttribute("changePwd", "true");
				request.setAttribute("pwdExpIn", userDetail.getExpiryDueDays());
			} else {
				request.setAttribute("changePwd", "");
				request.setAttribute("pwdExpIn", userDetail.getExpiryDueDays());
			}

			/*
			 * if (userName.equals(passWord) ||
			 * PwdEncryptDecryptService.encrypt(userName).equals(passWord) &&
			 * request.getParameter("disableKey") == null)
			 * request.setAttribute("changePwd", "true"); else {
			 * request.setAttribute("changePwd", ""); }
			 */
			if (request.getParameter("disableKey") == null)
				request.setAttribute("Key", "Key");
			else
				request.setAttribute("Key", "");
			// temp solution for pos store
			// CommonServiceImpl.updateUserContext(request);
			if (userDetail.isNGBOStore()
					&& (userDetail)
							.getSecretQuesFlag().equalsIgnoreCase("N")
					&& !userDetail.isLoggedinSecretQues()) {
				getSecretQues(request, model);
				request.setAttribute("secQues", "Y");
				request.setAttribute("secQuesMandatory", "Y");
				// userDetail.setLoggedinSecretQues(true);
			} else {
				request.setAttribute("secQues", "N");
				request.setAttribute("secQuesMandatory", "N");
			}

			String pwdExpiryDate = userDetail.getExpiryDate();

			if (!userDetail.isChangePwdMandatoryOnLogin()
					&& userDetail.isChangePwdMandatory()) {
				if (checkIfReseted(userName, passWord)) {
					request.setAttribute("changePasswordMandatory", "R");

				} else {
					request.setAttribute("changePasswordMandatory", "Y");

					// userDetail.setChangePwdMandatoryOnLogin(true);
				}
			} else {
				request.setAttribute("changePasswordMandatory", "N");
			}

			// if(getSecretQues(request,model)){ request.setAttribute("secQues",
			// "N"); }else{ request.setAttribute("secQues", "Y"); }

			// getSecretQues(request,model);

			// XPSNV - Security Requirement - Logging User Details each time
			// they login to a store - Begin
			userDetail.setInStore(userDetail.getInStore() == null ? "N"
					: userDetail.getInStore());
			try {
				if ((userDetail != null && Constants.isAdminUser(userDetail
						.getRoleID()))
						|| (userDetail != null && userDetail.getInStore()
								.equalsIgnoreCase("Y"))) {
					if (userDetail.isNGBOStore()
							&& !userDetail.isLoggedinAccessExp()) {
						loginService.createUserLogAudit(userDetail.getUserId(),
								userDetail.getRoleID(), userDetail.getSiteNo());
						ArrayList<UserSiteDtl> notify = loginService
								.getExpieryDays(userDetail.getUserId(),
										userDetail.getRoleID(), null);
						request.setAttribute("notify",
								CommonUtils.convertObjectTojson(notify));
						userDetail.setLoggedinAccessExp(true);
						CommonUtils.convertObjectTojson(userDetail);
						loginService.updateLastLoggedInTime(userDetail
								.getUserId(), (userDetail.getInStore()
								.equalsIgnoreCase("Y") ? userDetail.getSiteNo()
								: null));
					}
				} else if (userDetail.getSiteDtlsList() != null
						&& userDetail.getSiteDtlsList().size() == 1) {
					if (userDetail.isNGBOStore()
							&& !userDetail.isLoggedinAccessExp()) {
						loginService.createUserLogAudit(userDetail.getUserId(),
								userDetail.getRoleID(), userDetail.getSiteNo());
						ArrayList<UserSiteDtl> notify = loginService
								.getExpieryDays(userDetail.getUserId(),
										userDetail.getRoleID(),
										userDetail.getSiteNo());
						request.setAttribute("notify",
								CommonUtils.convertObjectTojson(notify));
						userDetail.setLoggedinAccessExp(true);
						loginService.updateLastLoggedInTime(
								userDetail.getUserId(), userDetail.getSiteNo());
					}
				}
				/*String session_seq = LoginServiceImpl.logSessionId("", userDetail.getUserId(),
						request.getRequestedSessionId(), request
								.getRemoteAddr(), InetAddress.getLocalHost()
								.getHostName(), "", "", null, null, null, null,
						true);*/
				//userDetail.setSession_seq(session_seq);
				userDetail.setUser_session(request.getRequestedSessionId());
				userDetail.setC_user_id(userDetail.getUserId());
				userDetail.setRemote_ip(request.getRemoteAddr());
			} catch (Exception e) {
				e.printStackTrace();
				LOGGER.error((Constants.EXCEPTION + e), e);
			}
			
			request.getSession(retainSession).setAttribute("user", userDetail);
			LOGGER.info("User level audit log for store users with single store executed");

			// XPSNV - Security Requirement - Logging User Details each time
			// they login to a store - End

			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	// TODO: TO BE VALIDATED: IF THIS METHOD IS REQUIRED

	/*
	 * // called when user preference button is clicked from header option
	 * 
	 * @RequestMapping(value = "/userPreferences.htm", method =
	 * RequestMethod.GET) public ModelAndView userPreferences(HttpServletRequest
	 * request, HttpServletResponse response) throws Exception { if
	 * (request.getSession(false) == null || (request.getSession(false) != null
	 * && request.getSession( false).getAttribute("user") == null)) { return new
	 * ModelAndView(new RedirectView("../../"));
	 * 
	 * } // LOGGER.info("userPreferences"); UserPreferencesParam param = new
	 * UserPreferencesParam(); model.addAttribute("loginFlag", "");
	 * param.setSiteNo(userDetail.getSiteNo()); param.setOption("preferences");
	 * param.setUserId(userDetail.getUserId());
	 * param.setSaleOrg(userDetail.getSalesOrg().toString());
	 * param.setUserPreferencesSize(userPreferencesSize);
	 * 
	 * Map<String, UserPreferences> defaultPreferenceMap = UserPreferenceDAOImpl
	 * .getHomeShortcutFunction(param); Map<String, UserPreferences>
	 * userPreferenceMap = (LinkedHashMap<String, UserPreferences>) request
	 * .getSession(false).getAttribute("userPreferenceMap");
	 * 
	 * ModelAndView modelAndView = new ModelAndView("userPreferences");
	 * model.addAttribute( "defaultPreferenceMap", (defaultPreferenceMap != null
	 * && defaultPreferenceMap.size() > 0) ? defaultPreferenceMap : new
	 * LinkedHashMap<String, UserPreferences>()); model.addAttribute(
	 * "userPreferenceMap", (userPreferenceMap != null &&
	 * userPreferenceMap.size() > 0) ? userPreferenceMap : new
	 * LinkedHashMap<String, UserPreferences>()); model.addAttribute("param",
	 * param); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * }
	 */
	@RequestMapping(value = "/resetPwdOnpageLoad.htm", method = RequestMethod.GET)
	public ModelAndView resetPwdOnpageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		model = new ModelMap();
		setUserPreferenceVal(request);
		ModelAndView modelAndView = new ModelAndView("home");

		try {
			NGBOServices myNGBOServices = new NGBOServices();
		} catch (SystemException e) {
			LOGGER.error((Constants.EXCEPTION + e), e);
			model.addAttribute("timOffline", "Y");
			System.out.println(e.getMessage());
			model.addAttribute("timMessage",
					Constants.getTimerror(e.getMessage().split(":")[0]));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			LOGGER.error((Constants.EXCEPTION + e), e);
			model.addAttribute("timOffline", "Y");
			System.out.println(e.getMessage());
			model.addAttribute("timMessage",
					Constants.getTimerror(e.getMessage().split(":")[0]));
		}

		// model.addAttribute("timOffline", "Y");
		// // status = "false";
		// }
		model.addAttribute("loginFlag", "");
		model.addAttribute("option", "reset");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		return modelAndView;

	}

	// called when user preference button is clicked from header option
	@RequestMapping(value = "/validateUser.htm", method = RequestMethod.GET)
	@ResponseBody
	public String validateUser(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String status = "";

		return status;
		// NGBOPerson nGBOPerson=new NGBOPerson();
		// nGBOPerson.setSecretquestion(secretquestion)

	}

	// called when user preference button is clicked from header option
	@RequestMapping(value = "/validateSecQues.htm", method = RequestMethod.GET)
	@ResponseBody
	public String validateSecQues(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String status = "";

		return status;
		// NGBOPerson nGBOPerson=new NGBOPerson();
		// nGBOPerson.setSecretquestion(secretquestion)

	}

	@RequestMapping(value = "/resetPwd.htm", method = RequestMethod.GET)
	@ResponseBody
	public String resetPwd(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String status = "";
		String newPwd = (String) request.getParameter("newPwd");
		String oldPwd = (String) request.getParameter("oldPwd");
		String curPwd = ((UserContext) request.getSession()
				.getAttribute("user")).getPassword();
		ArrayList<UsrInfoParam> enclist = new ArrayList<UsrInfoParam>();

		if (oldPwd.equalsIgnoreCase(((UserContext) request.getSession()
				.getAttribute("user")).getUserId())) {
			oldPwd = oldPwd.toLowerCase();
		}
		enclist.add(new UsrInfoParam(userName.toLowerCase(), newPwd));
		enclist.add(new UsrInfoParam(userName.toLowerCase(), oldPwd));
		// enclist.add(new UsrInfoParam(userName.toLowerCase();,curPwd));
		ArrayList<String> prevPasswords = PassWordMgtDAOImpl
				.getPrevPasswords(userName.toLowerCase());
		enclist = loginService.getEncryptPassword(enclist, userDetail);
		// LOGGER.info("CURRENT PASSWORD"+curPwd);
		LOGGER.info("==" + CommonUtils.convertObjectTojson(enclist));

		if (!curPwd.equals(enclist.get(1).getEncPassword())) {
			status = "Current Password entered is invalid.";
		} else if (curPwd.equals(enclist.get(0).getEncPassword())) {
			status = "New Password should not be same as Current Password.";
		} else if (checkWithLastPassword(prevPasswords, enclist.get(0)
				.getEncPassword())) {
			status = "You cannot use your previous 4 passwords. Please enter a different password.";
		} else {
			if (true) {
				// PassWordMgtDAOImpl.updateNewPassword(userName.toLowerCase();,enclist.get(0).getEncPassword());
				try {
					status = "true";
					userDetail.setChangePwdMandatoryOnLogin(true);
					PassWordMgtDAOImpl.updatePassword(userName.toLowerCase(),
							enclist.get(0).getEncPassword(),
							updatePwdExpiryDate());
					// userDetail.setChangePwdMandatory(true);
					// reset incorrect attempts password and secret ques
					loginService.resetIncorrectAttempt(userName.toLowerCase());
					// copy the pwd to history table
					if (!checkWithLastPassword(prevPasswords, enclist.get(1)
							.getEncPassword()))
						PassWordMgtDAOImpl
								.updateNewPassword(userName.toLowerCase(),
										enclist.get(1).getEncPassword());
					userDetail.setPassword(enclist.get(0).getEncPassword());
					request.getSession().setAttribute("user", userDetail);
					NGBOServices myNGBOServices = new NGBOServices();
					myNGBOServices.changeUserPassword(
							((UserContext) request.getSession().getAttribute(
									"user")).getUserId(),
							((UserContext) request.getSession().getAttribute(
									"user")).getUserId(), newPwd, false);
				} catch (Exception e) {
					LOGGER.error((Constants.EXCEPTION + e), e);
					if (updateNewPwdToStoreDb(enclist.get(0).getEncPassword(),
							request)) {
						// PassWordMgtDAOImpl.updateNewPassword(userName.toLowerCase();,enclist.get(0).getEncPassword());
						status = "partiallyTrue:"
								+ Constants.getTimerror(e.getMessage().split(
										":")[0]);
						userDetail.setChangePwdMandatoryOnLogin(true);
						// reset incorrect attempts password and secret ques
						loginService.resetIncorrectAttempt(userName
								.toLowerCase());
						// copy the pwd to history table
						if (!checkWithLastPassword(prevPasswords, enclist
								.get(1).getEncPassword()))
							PassWordMgtDAOImpl.updateNewPassword(userName
									.toLowerCase(), enclist.get(1)
									.getEncPassword());
						// userDetail.setChangePwdMandatory(true);
						userDetail.setPassword(enclist.get(0).getEncPassword());
						request.getSession().setAttribute("user", userDetail);
					} else {
						status = "false";
					}
					// boolean
					// isUpdate=PassWordMgtDAOImpl.updatePasswordExpToToday(userName.toLowerCase(););
					// LOGGER.error(("Updated exp date :"+ isUpdate));

				}
			}/*
			 * else{ status = "false"; }
			 */

		}

		return status;
	}

	private boolean checkWithLastPassword(ArrayList<String> prevPasswords,
			String encPassword) {
		boolean flag = false;
		if (prevPasswords.size() > 0) {
			for (String str : prevPasswords) {
				if (str.equalsIgnoreCase(encPassword)) {
					return true;
				}
			}
		}
		return flag;
	}

	@RequestMapping(value = "/timTest.htm", method = RequestMethod.GET)
	@ResponseBody
	public String timTest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Exception e = null, e1 = null;
		String[] qus = { "test-1 ?", "test-2 ?", "test-3 ?", "test-4 ?" };
		String[] ans = { "ans-1", "ans-2", "ans-3", "ans-4" };

		try {
			NGBOServices myNGBOServices = new NGBOServices();
			myNGBOServices.setChallengeResponse("xrlca", qus, ans);
		} catch (Exception ex1) {
			return CommonUtils.convertObjectTojson(qus) + "<br>"
					+ CommonUtils.convertObjectTojson(ans) + "<br>"
					+ CommonUtils.convertObjectTojson(ex1);
		}
		return "executed";
	}

	// called when user preference button is clicked from header option
	@RequestMapping(value = "/updateSecQues.htm", method = RequestMethod.GET)
	@ResponseBody
	public String updateSecQues(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		String status = "";
		String questions[] = null;
		String answers[] = null;
		String userID = "";
		if (request.getParameter("ques") != null
				&& !request.getParameter("ques").equals("")
				&& request.getParameter("ques").split(":").length > 0
				&& request.getParameter("ans") != null
				&& !request.getParameter("ans").equals("")
				&& request.getParameter("ans").split(":").length > 0
		// && request.getParameter("userId") != null
		// && !request.getParameter("userId").equals("")
		) {
			questions = new String[request.getParameter("ques").split(":").length];
			answers = new String[request.getParameter("ans").split(":").length];
			userID = ((UserContext) request.getSession().getAttribute("user"))
					.getUserId();
			int count = 0;
			for (int i = 0; i < request.getParameter("ans").split(":").length; i++) {
				if (!request.getParameter("ans").split(":")[i].trim()
						.equalsIgnoreCase("")) {
					questions[count] = request.getParameter("ques").split(":")[i];
					answers[count] = request.getParameter("ans").split(":")[i]
							.toLowerCase();// Defect_1503
					count++;
				}
			}

			try {
				if (count < 3) {
					status = "You must have a minimum of 3 security questions compelted to use this facility.";
				} else {
					NGBOServices myNGBOServices = new NGBOServices();

					// for(int i=0;i<questions.length;i++)
					// LOGGER.info("question index:"+i+" question: "+questions[i]);
					// for(int i=0;i<answers.length;i++)
					// LOGGER.info("answers index:"+i+" answers: "+answers[i]);
					// LOGGER.info("questions List:"+questions+" Answers:"+answers);

					myNGBOServices.setChallengeResponse(userID, questions,
							answers);
					SecretMgtDAOImpl.updateSecFlag(userID);
					HttpSession session = request.getSession(false);
					UserContext user = ((UserContext) session
							.getAttribute("user"));
					user.setSecretQuesFlag("Y");
					user.setLoggedinSecretQues(true);
					session.removeAttribute("user");
					session.setAttribute("user", user);
				}
				// status ="true";
			} catch (Exception e) {
				LOGGER.error((Constants.EXCEPTION + e), e);
				status = Constants.getTimerror(e.getMessage().split(":")[0]);
			}
		} else {
			status = "Missing input fields.";
		}

		return status;

	}

	// called when user preference button is clicked from header option
	@RequestMapping(value = "/destoySecFlag.htm", method = RequestMethod.GET)
	@ResponseBody
	public String destoySecFlag(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "false";

		}
		UserContext ux = (UserContext) request.getSession(false).getAttribute(
				"user");
		ux.setLoggedinSecretQues(true);
		request.getSession().setAttribute("user", ux);
		return "true";

	}

	// called when user preference button is clicked from header option
	@RequestMapping(value = "/setSecretQues.htm", method = RequestMethod.GET)
	public ModelAndView setSecretQues(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		// ArrayList<String> secretQuesList = null;
		// String[] challengeQues = null;
		model = new ModelMap();
		setUserPreferenceVal(request);
		getSecretQues(request, model);
		ModelAndView modelAndView = new ModelAndView("home");
		model.addAttribute("loginFlag", "");
		model.addAttribute("option", "setQues");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	private boolean getSecretQues(HttpServletRequest request, ModelMap model) {
		String[] challengeQues = null;
		ArrayList<String> secretQuesList = null;
		try {
			NGBOServices myNGBOServices = new NGBOServices();
			// challengeQues=myNGBOServices
			// .getChallengeQuestions(((UserContext) request.getSession()
			// .getAttribute("user")).getUserId());
		} catch (SystemException e) {
			// TODO Auto-generated catch block
			LOGGER.error((Constants.EXCEPTION + e), e);
			model.addAttribute("timOffline", "Y");
			System.out.println(e.getMessage());
			model.addAttribute("timMessage",
					Constants.getTimerror(e.getMessage().split(":")[0]));
		}
		System.out.println("LDAP PROP" + MIN_SECRET_QES_COUNT);
		model.addAttribute("SQlimit", Integer.parseInt(MIN_SECRET_QES_COUNT));
		if (challengeQues == null
				|| challengeQues.length < Integer
						.parseInt(MIN_SECRET_QES_COUNT)) {
			try {
				secretQuesList = PassWordMgtDAOImpl.getSecretQues();
				// LOGGER.info("secretQuesList__" + secretQuesList);
				model.remove("secretQuesList");
				model.addAttribute("secretQuesList",
						secretQuesList != null ? secretQuesList
								: new ArrayList<String>());

			} catch (Exception e) {
				e.printStackTrace();
				// LOGGER.info("secretQues" + secretQuesList);
			}
		}
		return true;
	}

	// called when save Preferences button is clicked from header option
	@RequestMapping(value = "/savePreferences.htm", method = RequestMethod.GET)
	@ResponseBody
	public String savePreferences(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		String[] userSelectedPreferences = request.getParameter(
				"userSelectedPreference").split(",");
		// LOGGER.info("userPreferences");
		UserPreferencesParam param = new UserPreferencesParam();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());
		param.setOption("preferences");
		param.setUserId(userDetail.getUserId());
		param.setUserPreferencesSize(userPreferencesSize);
		HttpSession session = request.getSession(false);
		Map<String, UserPreferences> defaultPreferenceMap = null;
		Map<String, UserPreferences> userPreferenceMap = null;

		String updateStatus = UserPreferenceDAOImpl.updateUserPreferences(
				param, userSelectedPreferences);

		if (updateStatus.equalsIgnoreCase("true")) {
			userPreferenceMap = UserPreferenceDAOImpl.getUserPreferences(param);

			if (!(userPreferenceMap != null && userPreferenceMap.size() > 0)) {
				defaultPreferenceMap = UserPreferenceDAOImpl
						.getDefaultPreferences(param);
				session.setAttribute("defaultPreferenceMap",
						(defaultPreferenceMap != null && defaultPreferenceMap
								.size() > 0) ? defaultPreferenceMap
								: new LinkedHashMap<String, UserPreferences>());
			}

			// LOGGER.info("userPreferenceMap size"
			// + userPreferenceMap.size());
			session.removeAttribute("userPreferenceMap");
			session.setAttribute(
					"userPreferenceMap",
					(userPreferenceMap != null && userPreferenceMap.size() > 0) ? userPreferenceMap
							: new LinkedHashMap<String, UserPreferences>());
			return "success";
		} else {
			return updateStatus;
		}

	}

	/*
	 * // called when preview button is clicked on home preference screen
	 * 
	 * @RequestMapping(value = "/showHomePreview.htm", method =
	 * RequestMethod.GET) public ModelAndView showHomePreview(
	 * 
	 * @ModelAttribute("userPreferences") UserPreferencesParam param,
	 * BindingResult result, HttpServletRequest request, HttpServletResponse
	 * response) throws Exception { if (request.getSession(false) == null ||
	 * (request.getSession(false) != null && request.getSession(
	 * false).getAttribute("user") == null)) { return new ModelAndView(""); }
	 * ModelAndView modelAndView = new ModelAndView("homePreview"); Map<String,
	 * UserPreferences> preferenceMap = null; String[] userSelectedPreferences =
	 * request.getParameter( "userSelectedPreference").split(","); //
	 * LOGGER.info("userSelectedPreferences.length" // +
	 * userSelectedPreferences.length);
	 * 
	 * try { if (userSelectedPreferences != null &&
	 * userSelectedPreferences.length > 0 && userSelectedPreferences[0] != "" &&
	 * userSelectedPreferences[0].split(":")[0] != "") { preferenceMap = new
	 * LinkedHashMap<String, UserPreferences>(); for (Integer i = 1; i <=
	 * userSelectedPreferences.length; i++) { preferenceMap.put(
	 * userSelectedPreferences[i - 1].split(":")[0], new
	 * UserPreferences(userSelectedPreferences[i - 1] .split(":")[1],
	 * i.toString(), IconUtil.urlMap .get(userSelectedPreferences[i - 1]
	 * .split(":")[0]), IconUtil.iconMap .get(userSelectedPreferences[i - 1]
	 * .split(":")[0]))); } } } catch (Exception e) { e.printStackTrace(); }
	 * model = new ModelMap(); // to resolve ajax success call.
	 * param.setOption("preview"); model.addAttribute( "preferenceMap",
	 * (preferenceMap != null && preferenceMap.size() > 0) ? preferenceMap : new
	 * LinkedHashMap<String, UserPreferences>()); model.addAttribute("param",
	 * param); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 */
	@RequestMapping(value = "/logout.htm", method = RequestMethod.GET)
	public String logginOut(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String session_seq = request.getParameter("session_seq");
		if (session_seq != null && !session_seq.isEmpty()) {
			String session_id = request.getParameter("user_session");
			String request_session = request.getRequestedSessionId();
			String is_active = "N";
			if (session_id != null && request_session != null
					&& request_session.equals(session_id)) {
				is_active = "Y";
			}
			/*
			 * LoginServiceImpl.logSessionId(request.getParameter("session_seq"),
			 * "", "", "", "", request.getParameter("c_user_id"),
			 * (String)request.getRequestedSessionId(),
			 * (String)request.getRemoteAddr(),
			 * InetAddress.getLocalHost().getHostName(), "N", is_active, false);
			 */
		}
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "redirect:/";
		}
		return "redirect:/logginOut.htm";

	}

	@RequestMapping(value = "/logoutTrace.htm", method = RequestMethod.GET)
	public void logOutTrace(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String origin = null;
		origin = request.getParameter("origin");
		userDetail = (UserContext) request.getSession(false).getAttribute(
				"user");

		LOGGER.info("User clicked Logout is : "
				+ origin
				+ " by user : "
				+ (userDetail != null && userDetail.getUserId() != null ? userDetail
						.getUserId() : " No session Attibute available."));
	}

	@RequestMapping(value = "/goingHome.htm", method = RequestMethod.GET)
	public ModelAndView goingHome(ModelMap model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// CommonServiceImpl.departmentList=null;
		// CommonServiceImpl.supplierModelList=null;
		ModelAndView modelAndView;
		boolean retainSession = false;
		try {
			if (request.getSession(false) == null
					|| (request.getSession(false) != null && request
							.getSession(false).getAttribute("user") == null)) {
				String sessionID = request.getParameter("sessionID");
				if(sessionID !=null && !sessionID.isEmpty()){
					userDetail = loginService.retriveSessionInfo(sessionID.trim());
					retainSession = userDetail!=null;	
				}
				if(!retainSession){
					return new ModelAndView(new RedirectView("../../"));
				}
			}else{
				userDetail = ((UserContext) request.getSession().getAttribute(
						"user"));
			}
			if(!retainSession){
				if(isPilotRedirectRequired(userDetail,request)){
					if(userDetail.getRedirectURL()!=null && !userDetail.getRedirectURL().isEmpty()){
						invalidateCurrentSession(request);
						return new ModelAndView(new RedirectView(userDetail.getRedirectURL()));
					}
				}
			}
			
			modelAndView = new ModelAndView("home");
			UserPreferencesParam param = new UserPreferencesParam();
			model = new ModelMap();
			model.addAttribute("loginFlag", "");
			model.addAttribute("option", "");
			userName = userDetail
					.getUserId();
			passWord = userDetail
					.getPassword();

			param.setSiteNo(userDetail.getSiteNo());
			param.setOption("preferences");
			param.setUserId(userDetail.getUserId());
			param.setSaleOrg(userDetail.getSalesOrg().toString());
			param.setUserPreferencesSize(userPreferencesSize);
			param.setRoleId(userDetail.getRoleID());

			HttpSession session = request.getSession(retainSession);
			Map<String, UserPreferences> defaultPreferenceMap = null;
			Map<String, UserPreferences> userPreferenceMap = null;
			/*
			 * ArrayList<String> menuBarOptions = null; // if
			 * (session.getAttribute("menuBarOptions") == null) { menuBarOptions
			 * = UserPreferenceDAOImpl.getMenuBarOptions(userDetail
			 * .getSalesOrg().toString()); session.setAttribute(
			 * "menuBarOptions", (menuBarOptions != null &&
			 * menuBarOptions.size() > 0) ? menuBarOptions : new
			 * ArrayList<String>());
			 */
			// }

			// if (session.getAttribute("defaultPreferenceMap") == null
			// && session.getAttribute("userPreferenceMap") == null) {

			// LOGGER.info("getting preferences map");

			userPreferenceMap = UserPreferenceDAOImpl.getUserPreferences(param);

			// if (userPreferenceMap == null)
			defaultPreferenceMap = UserPreferenceDAOImpl
					.getDefaultPreferences(param);

			session.setAttribute("defaultPreferenceMap",
					(defaultPreferenceMap != null && defaultPreferenceMap
							.size() > 0) ? defaultPreferenceMap
							: new LinkedHashMap<String, UserPreferences>());
			session.setAttribute(
					"userPreferenceMap",
					(userPreferenceMap != null && userPreferenceMap.size() > 0) ? userPreferenceMap
							: new LinkedHashMap<String, UserPreferences>());

			if (userPreferenceMap != null && userPreferenceMap.size() > 0)
				model.addAttribute("preferenceMap",
						session.getAttribute("userPreferenceMap"));
			else
				model.addAttribute("preferenceMap",
						session.getAttribute("defaultPreferenceMap"));

			/*
			 * } else { userPreferenceMap = (LinkedHashMap<String,
			 * UserPreferences>) session .getAttribute("userPreferenceMap");
			 * 
			 * if (userPreferenceMap == null || userPreferenceMap.size() == 0)
			 * model.addAttribute("preferenceMap",
			 * session.getAttribute("defaultPreferenceMap")); else
			 * 
			 * model.addAttribute("preferenceMap",
			 * session.getAttribute("userPreferenceMap")); }
			 */

			model.addAttribute("option", "");
			model.addAttribute("loginFlag", "");
			// LOGGER.info("request.getParameter(\"disableKey\")"+request.getParameter("disableKey"));
			if (userName.equals(passWord)
					|| PwdEncryptDecryptService.encrypt(userName).equals(
							passWord)
					&& request.getParameter("disableKey") == null
					&& !userDetail.isLoggedinChangePwd()) {
				request.setAttribute("changePwd", "true");
				userDetail.setLoggedinChangePwd(true);

			} else {
				request.setAttribute("changePwd", "");
			}
			if (request.getParameter("disableKey") == null)
				request.setAttribute("Key", "Key");
			else if (request.getParameter("disableKey") != null
					&& request.getParameter("disableKey").equalsIgnoreCase(
							"Change")) {
				request.setAttribute("Key", "Change");
			} else {
				request.setAttribute("Key", "");
			}

			// temp solution for pos store
			// CommonServiceImpl.updateUserContext(request);
			if (userDetail.isNGBOStore()
					&& (userDetail)
							.getSecretQuesFlag().equalsIgnoreCase("N")
					&& !userDetail.isLoggedinSecretQues()) {
				getSecretQues(request, model);
				request.setAttribute("secQues", "Y");
				request.setAttribute("secQuesMandatory", "Y");
				// userDetail.setLoggedinSecretQues(true);
			} else {
				request.setAttribute("secQues", "N");
				request.setAttribute("secQuesMandatory", "N");
			}

			if (!userDetail.isChangePwdMandatoryOnLogin()
					&& userDetail.isChangePwdMandatory()) {
				request.setAttribute("changePasswordMandatory", "Y");
				// userDetail.setChangePwdMandatoryOnLogin(true);
			} else {
				request.setAttribute("changePasswordMandatory", "N");
			}

			// request.setAttribute("secQues",((UserContext)
			// request.getSession().getAttribute("user")).getSecretQuesFlag());
			// if(getSecretQues(request,model)){ request.setAttribute("secQues",
			// "N"); }else{ request.setAttribute("secQues", "Y"); }
			//

			// XPSNV - Security Requirement - Logging User Details each time
			// they login to a store - Begin

			try {
				if (userDetail != null) {
					if (userDetail.isNGBOStore()
					// Commenting to Fix Defect_7568
					/* && !userDetail.isLoggedinAccessExp() */
					) {
						// loginService.createUserLogAudit(userDetail.getUserId(),
						// userDetail.getRoleID(),userDetail.getSiteNo());
						ArrayList<UserSiteDtl> notify = loginService
								.getExpieryDays(userDetail.getUserId(),
										userDetail.getRoleID(),
										userDetail.getSiteNo());
						request.setAttribute("notify",
								CommonUtils.convertObjectTojson(notify));
						userDetail.setLoggedinAccessExp(true);
					}
				}
			} catch (Exception e) {
				LOGGER.error((Constants.EXCEPTION + e), e);
			}
			request.getSession(retainSession).setAttribute("user", userDetail);
			// defect 9277
			if (Constants.isAdminUser(userDetail.getRoleID())) {
				loginService.updateLastLoggedInTime(userDetail.getUserId(),
						null);
			} else if (userDetail.getSiteDtlsList() != null
					&& userDetail.getSiteDtlsList().size() >= 1) {
				loginService.updateLastLoggedInTime(userDetail.getUserId(),
						userDetail.getSiteNo());
			}

			// loginService.updateLastLoggedInTime(userDetail.getUserId(),
			// userDetail.getSiteNo());
			LOGGER.info("User level audit log for store users with multiple store access executed");

			// XPSNV - Security Requirement - Logging User Details each time
			// they login to a store - End

			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	private void setUserPreferenceVal(HttpServletRequest request)
			throws Exception {
		UserPreferencesParam param = new UserPreferencesParam();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model = new ModelMap();
		model.addAttribute("option", "");
		model.addAttribute("loginFlag", "");
		userName = ((UserContext) request.getSession().getAttribute("user"))
				.getUserId();
		passWord = ((UserContext) request.getSession().getAttribute("user"))
				.getPassword();

		param.setSiteNo(userDetail.getSiteNo());
		param.setOption("preferences");
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		param.setUserPreferencesSize(userPreferencesSize);
		HttpSession session = request.getSession(false);
		param.setRoleId(userDetail.getRoleID());
		Map<String, UserPreferences> defaultPreferenceMap = null;
		Map<String, UserPreferences> userPreferenceMap = null;

		/*
		 * ArrayList<String> menuBarOptions=null; if
		 * (session.getAttribute("menuBarOptions") == null) {
		 * menuBarOptions=LoginServiceImpl
		 * .getMenuBarOptions(userDetail.getSalesOrg().toString());
		 * session.setAttribute("menuBarOptions", (menuBarOptions!=null &&
		 * menuBarOptions.size()>0)? menuBarOptions:new ArrayList<String>()); }
		 */

		/*
		 * if (session.getAttribute("defaultPreferenceMap") == null &&
		 * session.getAttribute("userPreferenceMap") == null) {
		 */

		// LOGGER.info("getting preferences map");

		userPreferenceMap = UserPreferenceDAOImpl.getUserPreferences(param);

		// if (userPreferenceMap == null)
		defaultPreferenceMap = UserPreferenceDAOImpl
				.getDefaultPreferences(param);

		session.setAttribute(
				"defaultPreferenceMap",
				(defaultPreferenceMap != null && defaultPreferenceMap.size() > 0) ? defaultPreferenceMap
						: new LinkedHashMap<String, UserPreferences>());
		session.setAttribute(
				"userPreferenceMap",
				(userPreferenceMap != null && userPreferenceMap.size() > 0) ? userPreferenceMap
						: new LinkedHashMap<String, UserPreferences>());

		if (userPreferenceMap != null && userPreferenceMap.size() > 0)
			model.addAttribute("preferenceMap",
					session.getAttribute("userPreferenceMap"));
		else
			model.addAttribute("preferenceMap",
					session.getAttribute("defaultPreferenceMap"));

		/*
		 * } else { userPreferenceMap = (LinkedHashMap<String, UserPreferences>)
		 * session .getAttribute("userPreferenceMap");
		 * 
		 * if (userPreferenceMap == null || userPreferenceMap.size() == 0)
		 * model.addAttribute("preferenceMap",
		 * session.getAttribute("defaultPreferenceMap"));
		 * 
		 * else model.addAttribute("preferenceMap",
		 * session.getAttribute("userPreferenceMap")); }
		 */

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

	@RequestMapping(value = "/validateOldPwd.htm", method = RequestMethod.GET)
	@ResponseBody
	public String validateOldPwd(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String pwd = request.getParameter("oldPwd");
		String newPwd = request.getParameter("newPass");
		String pwdFromDataBase = ((UserContext) request.getSession()
				.getAttribute("user")).getPassword();
		if (pwdFromDataBase.equals(pwd)
				|| pwdFromDataBase
						.equals(PwdEncryptDecryptService.encrypt(pwd))) {
			if (newPwd.equals(pwd))
				return "true~false";
			else
				return "true~true";

		} else
			return "false";

	}

	@RequestMapping(value = "/updateNewPwd.htm", method = RequestMethod.GET)
	@ResponseBody
	public String updateNewPwd(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession(false);
		String newPassword = request.getParameter("newPassword");
		String updateStatus = "false";
		String newExpirydate = updatePwdExpiryDate();
		String curPwd = ((UserContext) request.getSession()
				.getAttribute("user")).getPassword();
		ArrayList<UsrInfoParam> enclist = new ArrayList<UsrInfoParam>();
		// newPassword;// = PwdEncryptDecryptService.encrypt(newPassword);
		if (newPassword != null) {
			enclist.add(new UsrInfoParam(userName, newPassword));
			enclist.add(new UsrInfoParam(userName, curPwd));

			ArrayList<String> prevPasswords = PassWordMgtDAOImpl
					.getPrevPasswords(userName);
			enclist = loginService.getEncryptPassword(enclist, userDetail);

			NGBOServices myNGBOServices = new NGBOServices();
			myNGBOServices.changeUserPassword(userName, userName, newPassword,
					false);// ask doubt to Guru why tim services not called here
			boolean updateStatusBol = PassWordMgtDAOImpl.updatePassword(
					userName, enclist.get(0).getEncPassword(), newExpirydate);

			// reset incorrect attempts password and secret ques
			loginService.resetIncorrectAttempt(userName);
			// copy the pwd to history table
			if (!checkWithLastPassword(prevPasswords, enclist.get(1)
					.getEncPassword()))
				PassWordMgtDAOImpl.updateNewPassword(userName, enclist.get(1)
						.getEncPassword());

			updateStatus = (updateStatusBol ? "true" : "false");
			UserContext userDetail = ((UserContext) request.getSession()
					.getAttribute("user"));
			userDetail.setExpiryDate(newExpirydate);
			userDetail.setPassword(newPassword);
			session.removeAttribute("user");
			session.setAttribute("user", userDetail);

		}
		return updateStatus;
	}

	public boolean updateNewPwdToStoreDb(String newPassword,
			HttpServletRequest request) throws Exception {

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
			updateStatus = PassWordMgtDAOImpl.updatePassword(userName,
					newPassword, newExpirydate);

			UserContext userDetail = ((UserContext) request.getSession()
					.getAttribute("user"));
			userDetail.setExpiryDate(newExpirydate);
			userDetail.setPassword(newPassword);

			HttpSession session = request.getSession(false);
			session.removeAttribute("user");
			session.setAttribute("user", userDetail);

		}
		return updateStatus;
	}

	@RequestMapping(value = "/setStore.htm", method = RequestMethod.GET)
	@ResponseBody
	public String setStore(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String siteNo = request.getParameter("siteNo");
		String siteName = request.getParameter("siteName");
		String saleOrg = request.getParameter("salesOrg");
		// LOGGER.info("saleOrg___" + saleOrg);
		String roleId = request.getParameter("roleId");
		String district = request.getParameter("district");

		HttpSession session = request.getSession(false);
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		userDetail.setStoreHost(LoginServiceImpl.getStoreHost(siteNo));
		createSession(userDetail, request); // set host on selection
		LOGGER.info("Set host :" + userDetail.getStoreHost());
		UserContext usr = LoginServiceImpl.getUserContext(userDetail
				.getUserId());
		userDetail.setPassword(usr.getPassword());
		userDetail.setLoggedInPwd(usr.getPassword());
		if (siteNo != null && !siteNo.equals("") && saleOrg != null
				&& !saleOrg.equals("")) {
			userDetail.setSiteNo(siteNo);
			userDetail.setSiteName(siteName != null ? siteName : "");
			Integer salesOrg = Integer.parseInt(saleOrg);
			userDetail.setSalesOrg(salesOrg);
			userDetail.setRoleID(roleId);
			userDetail.setDistrict(district);
			userDetail.setNGBOStore(LoginServiceImpl.isNGBOStore(userDetail
					.getSiteNo()));
			userDetail.set1S3Store(LoginServiceImpl.is1S3Store(userDetail
					.getSiteNo()));
			userDetail.setStoreHost(LoginServiceImpl.getStoreHost(siteNo));
			userDetail.setSalesOrgAuth(salesOrg.toString());
			session.removeAttribute("user");

			if (salesOrg.equals(PortalUtil.PETROL_SALES_ORG))
				userDetail.setImgLocation("petrol");
			else if (salesOrg.equals(PortalUtil.SM_SALES_ORG))
				userDetail.setImgLocation("woolworths");
			else if (salesOrg.equals(PortalUtil.CNTDWN_SALES_ORG))
				userDetail.setImgLocation("countdown");
			else if (salesOrg.equals(PortalUtil.BWS_SALES_ORG))
				userDetail.setImgLocation("bws");

			else if (salesOrg.equals(PortalUtil.DM_SALES_ORG))
				userDetail.setImgLocation("danmurphy");
			else if (salesOrg.equals(PortalUtil.THMSDUX_SALES_ORG))
				userDetail.setImgLocation("thomasdux");
			else if (salesOrg.equals(PortalUtil.BIGW_SALES_ORG))
				userDetail.setImgLocation("bigw");
			else if (salesOrg.equals(PortalUtil.SFS_SALES_ORG))
				userDetail.setImgLocation("metro");
			else
				userDetail.setImgLocation("woolworths");

			boolean isActiveBws = false, isActiveSmkt = false;
			// if(userDetail.getSiteDtlsList()!=null &&
			// userDetail.getSiteDtlsList().size()>0){
			//
			// for(SiteDtls itm:userDetail.getSiteDtlsList()){
			// if(itm.getSalesOrg().equalsIgnoreCase(""+PortalUtil.BWS_SALES_ORG+"")){
			// isActiveBws=true;
			// }
			// if(itm.getSalesOrg().equalsIgnoreCase(""+PortalUtil.SM_SALES_ORG+"")){
			// isActiveSmkt=true;
			// }
			// }
			// }

			// if(isActiveSmkt&&isActiveBws&&userDetail.getPayingDept().equalsIgnoreCase(Constants.PAYING_CODE)&&salesOrg.equals(PortalUtil.SM_SALES_ORG)){
			if (null != userDetail.getPayingDept()
					&& userDetail.getPayingDept().equalsIgnoreCase(
							Constants.PAYING_CODE)
					&& salesOrg.equals(PortalUtil.SM_SALES_ORG)) {
				userDetail.setImgLocation("bws");
			}

			setUserAccessFunction(userDetail);

			session.setAttribute("user", userDetail);
			session.removeAttribute("menuBarOptions");
			session.removeAttribute("userPreferenceMap");
			session.removeAttribute("defaultPreferenceMap");
			loginService.createUserLogAudit(userDetail.getUserId(),
					userDetail.getRoleID(), userDetail.getSiteNo());
			// temp solution for pos store

			// CommonServiceImpl.updateUserContext(request);
			// setUserPreferenceVal(request);

		} else {
			return "false";
		}
		return "true";
	}

	@RequestMapping(value = "/verifyStore.htm", method = RequestMethod.GET)
	@ResponseBody
	public String verifyStore(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String store = request.getParameter("site");
		HttpSession session = request.getSession(false);
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		String status = "";
		try {
			status = storeSearchService.verifyStore(store,
					userDetail.getUserId(), userDetail);

		} catch (Exception e) {
			e.printStackTrace();
		}
		if (store != null) {
			userDetail.setSiteNo(status.split("-")[0]);
			userDetail.setSiteName(status.split("-")[1]);
			userDetail.setNGBOStore(LoginServiceImpl.isNGBOStore(userDetail
					.getSiteNo()));
			userDetail.set1S3Store(LoginServiceImpl.is1S3Store(userDetail
					.getSiteNo()));
			userDetail.setStoreHost(LoginServiceImpl.getStoreHost(userDetail
					.getSiteNo()));
			session.removeAttribute("user");
			session.setAttribute("user", userDetail);
			// temp solution for pos store
			// CommonServiceImpl.updateUserContext(request);
		} else {
			return "false";
		}
		return status;
	}

	private void setUserAccessFunction(UserContext userDetails) {

		Map<String, ArrayList<ActivityOptions>> userAccessMap = null;
		Map<String, ArrayList<ActivityOptions>> userAccessRemovedMap = null;
		StringBuffer articleStr = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter stw = new StringWriter();

		try {
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

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
			mapper.writeValue(jsonGenerator, userAccessMap);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// LOGGER.info("stw.toString()__" + stw.toString());
		userDetails.setUserAccess("{\"data\":" + stw.toString() + "}");
		userDetails.setUserAccessMap(userAccessMap);
	}

	@RequestMapping(value = "/changeStore.htm", method = RequestMethod.GET)
	public ModelAndView changeStore(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		model = new ModelMap();

		setUserPreferenceVal(request);
		ModelAndView modelAndView = new ModelAndView("home");
		model.addAttribute("changeStoreFlag", "Y");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/verifyItAdminStore.htm", method = RequestMethod.GET)
	@ResponseBody
	public String verifyItAdminStore(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		String store = request.getParameter("site");
		List<SiteDtls> siteDtlsList = null;
		String status = "false";
		UserContext userDetails = ((UserContext) request.getSession()
				.getAttribute("user"));
		String roleId = userDetails.getRoleID() != null ? userDetails
				.getRoleID() : "";
		try {
			siteDtlsList = LoginServiceImpl
					.getSiteDtls(
							store,
							"",
							"",
							(userDetails.getRoleID().equals(
									Constants.AREA_MANAGER) || userDetails
									.getRoleID().equals(
											Constants.SAlESORG_MANAGER)) ? ""
									+ userDetails.getLinkedSalesOrg() + "" : "",
							roleId);
			if (siteDtlsList != null && siteDtlsList.size() > 0) {

				if (siteDtlsList.get(0).getMsg() != null
						&& siteDtlsList.get(0).getMsg()
								.equalsIgnoreCase(Constants.ERROR_MSG)) {
					return "invalid_salesorg";
				} else {
					userDetails.setSalesOrg(Integer.parseInt(siteDtlsList
							.get(0).getSalesOrg()));
					userDetails.setSiteNo(siteDtlsList.get(0).getSiteNo());
					userDetails.setStoreHost(LoginServiceImpl
							.getStoreHost(siteDtlsList.get(0).getSiteNo()));
					userDetails.setSiteName(siteDtlsList.get(0).getSiteName());
					userDetails.setDistrict(siteDtlsList.get(0).getDistrict());
					userDetails.setLatitude(siteDtlsList.get(0).getLatitude());
					userDetails
							.setLongitude(siteDtlsList.get(0).getLongitude());
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

		String status = "false";
		UserContext userDetails = ((UserContext) request.getSession()
				.getAttribute("user"));
		try {

			createSession(userDetails, request);

			// XPSNV - Security Requirement - Logging User Details each time
			// they login to a store - Begin

			LOGGER.info("Inside Home Controller Create Session -------->");
			LOGGER.info("User ID :" + userDetails.getUserId());
			LOGGER.info("Role ID :" + userDetails.getRoleID());
			LOGGER.info("Site ID :" + request.getParameter("site"));

			try {
				if (userDetails != null) {
					loginService.createUserLogAudit(userDetails.getUserId(),
							userDetails.getRoleID(),
							(String) request.getParameter("site"));
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			// XPSNV - Security Requirement - Logging User Details each time
			// they login to a store - End

			return "true-" + userDetails.getSalesOrg() + "-"
					+ userDetails.getSiteNo() + "-" + userDetails.getSiteName();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return status;
	}

	private void createSession(UserContext userDetails,
			HttpServletRequest request) {

		HttpSession session = request.getSession(false);

		/*
		 * if (null != session) session.invalidate();
		 * 
		 * session = request.getSession(true);
		 */
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

		if (null != userDetails.getPayingDept()
				&& userDetails.getPayingDept().equalsIgnoreCase(
						Constants.PAYING_CODE)
				&& salesOrg.equals(PortalUtil.SM_SALES_ORG)) {
			userDetails.setImgLocation("bws");
		}

		setUserAccessFunction(userDetails);

		try {
			userDetails.setNGBOStore(LoginServiceImpl.isNGBOStore(userDetails
					.getSiteNo()));
		} catch (Exception e1) {
			e1.printStackTrace();
			userDetails.setNGBOStore(false);
		}

		try {
			userDetail.set1S3Store(LoginServiceImpl.is1S3Store(userDetail
					.getSiteNo()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			userDetails.set1S3Store(false);
		}

		try {
			String userid = userDetails.getUserId();
			String encSapPwd = "";
			String finalUsrID = Constants.getUTCUserforSAPPwd(userid);
			if (finalUsrID != null && finalUsrID != "") {
				encSapPwd = loginService.encryptSAPPassword(userid, finalUsrID);
				LOGGER.info("Encrypted SAP Password" + encSapPwd);
				userDetails.setLoggedInEncryptedSAPPwd(encSapPwd);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		String domain = PortalUtil.getDomainForLocalURLs(userDetails);

		LOGGER.info(domain);

		userDetails.setDomain(domain);

		session.setAttribute("user", userDetails);
	}

	@RequestMapping(value = "/PPSTeamError.htm", method = RequestMethod.GET)
	public ModelAndView PPSTeamError(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		LOGGER.info("PPSTool");
		return new ModelAndView("PPSTool");

	}

	@RequestMapping(value = "/redirect.htm", method = RequestMethod.GET)
	public ModelAndView method(
			@RequestParam(value = "", required = false) String indexParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		HttpSession session = request.getSession(false);
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		// model.addAttribute("loginFlag", "");
		String redirectURLPath = null;
		redirectURLPath = "http://" + request.getServerName() + ":"
				+ request.getServerPort() + request.getContextPath();
		int salesOrg = userDetail.getSalesOrg().intValue();
		String url = userDetail.getRoleID().trim() + "&"
				+ userDetail.getSiteNo().trim() + "&"
				+ userDetail.getSiteName().trim() + "&"
				+ userDetail.getFirstName() + "&" + userDetail.getUserId()
				+ "&" + redirectURLPath + "&" + salesOrg;
		String encryptedString = encryptDecrypt.encrypt(url);
		String decryptedString = encryptDecrypt.decrypt(encryptedString);
		// LOGGER.info("encryptedString"+encryptedString);
		// LOGGER.info("decryptedString"+decryptedString);
		return new ModelAndView("redirect:" + PPSUrl + encryptedString);
	}

	@RequestMapping(value = "/redirectToCT.htm", method = RequestMethod.GET)
	public ModelAndView redirectToCTMethod(
			@RequestParam(value = "", required = false) String indexParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		HttpSession session = request.getSession(false);
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		/*
		 * XPSNV - Code for Backend Restriction - Redirection to Not Authorized
		 * Page - Begin
		 */
		UserContext user = (UserContext) request.getSession(false)
				.getAttribute("user");
		if (user.getUserAccessMap().containsKey(screenCode1)) {
			if ((user.getUserAccessMap().get(screenCode1).get(0)
					.getIncludeExcludeFlag()
					.equalsIgnoreCase(Constants.EXCLUDE_FLAG))
					|| (user.getUserAccessMap().get(screenCode1).get(0)
							.getIncludeExcludeFlag()
							.equalsIgnoreCase(Constants.READ_ACCESS))) {
				return new ModelAndView("noAccess");
			}

		}
		/*
		 * XPSNV - Code for Backend Restriction - Redirection to Not Authorized
		 * Page - End
		 */

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		// model.addAttribute("loginFlag", "");
		String redirectURLParameters = null;
		String hashPwd = null;
		SimpleDateFormat formDate = new SimpleDateFormat("ddMMyyyy");
		SimpleDateFormat sampleDate = new SimpleDateFormat(
				"dd/MM/yyyy hh:mm:ss");
		LOGGER.info("DATE IN LOCAL : " + sampleDate.format(new Date()));

		formDate.setTimeZone(TimeZone.getTimeZone("GMT"));
		String strDate = formDate.format(new Date()); // option 2

		sampleDate.setTimeZone(TimeZone.getTimeZone("GMT"));
		LOGGER.info("DATE IN GMT : " + sampleDate.format(new Date()));

		try {
			ArrayList<UsrInfoParam> enclist = new ArrayList<UsrInfoParam>();
			enclist.add(new UsrInfoParam(userDetail.getUserId().toLowerCase(),
					userDetail.getUserId().toLowerCase() + strDate));
			hashPwd = loginService.getEncryptPassword(enclist, userDetail)
					.get(0).getEncPassword();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(hashPwd);
		redirectURLParameters = userDetail.getUserId().toLowerCase() + "&sid="
				+ userDetail.getSiteNo() + "&h=" + hashPwd;
		// LOGGER.info("decryptedString"+decryptedString);
		return new ModelAndView("redirect:" + CTUrl + redirectURLParameters);
	}

	@RequestMapping(value = "/redirectToLayBy.htm", method = RequestMethod.GET)
	public ModelAndView redirectToLayByMethod(
			@RequestParam(value = "", required = false) String indexParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		/*
		 * XPSNV - Code for Backend Restriction - Redirection to Not Authorized
		 * Page - Begin
		 */
		UserContext user = (UserContext) request.getSession(false)
				.getAttribute("user");
		if (user.getUserAccessMap().containsKey(screenCode)) {
			if ((user.getUserAccessMap().get(screenCode).get(0)
					.getIncludeExcludeFlag()
					.equalsIgnoreCase(Constants.EXCLUDE_FLAG))
					|| (user.getUserAccessMap().get(screenCode).get(0)
							.getIncludeExcludeFlag()
							.equalsIgnoreCase(Constants.READ_ACCESS))) {
				return new ModelAndView("noAccess");
			}

		}
		/*
		 * XPSNV - Code for Backend Restriction - Redirection to Not Authorized
		 * Page - End
		 */
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		// model.addAttribute("loginFlag", "");
		String redirectURLParameters = null;
		String hashPwd = null;
		SimpleDateFormat formDate = new SimpleDateFormat("ddMMyyyy");
		String strDate = formDate.format(new Date());

		try {
			ArrayList<UsrInfoParam> enclist = new ArrayList<UsrInfoParam>();
			enclist.add(new UsrInfoParam(userDetail.getUserId().toLowerCase(),
					userDetail.getUserId().toLowerCase() + strDate));
			hashPwd = loginService.getEncryptPassword(enclist, userDetail)
					.get(0).getEncPassword();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		LOGGER.info(hashPwd);
		redirectURLParameters = userDetail.getUserId().toLowerCase()
				+ "&storeId=" + userDetail.getSiteNo() + "&encryptedValues="
				+ hashPwd;
		LOGGER.info(redirectURLParameters);
		return new ModelAndView("redirect:" + LayByURL + redirectURLParameters);
	}

	private boolean checkIfReseted(String userName, String encryptedPass) {
		boolean flag = false;
		ArrayList<UsrInfoParam> enclist = new ArrayList<UsrInfoParam>();

		// new user password
		userName = userName.toLowerCase();
		UsrInfoParam item = new UsrInfoParam(userName, userName
				+ Constants.NEW_USER_PREFIX + "1");
		enclist.add(item);

		// password probality for reset
		for (int i = 1; i <= Constants.RESET_SEQ_LIMIT; i++) {
			item = new UsrInfoParam(userName, userName + Constants.RESET_PREFIX
					+ i);
			enclist.add(item);
		}

		/*
		 * userName=userName.toUpperCase(); item=new
		 * UsrInfoParam(userName,userName+Constants.NEW_USER_PREFIX+"1");
		 * enclist.add(item);
		 * 
		 * //password probality for reset for(int
		 * i=1;i<=Constants.RESET_SEQ_LIMIT;i++){ item=new
		 * UsrInfoParam(userName,userName+Constants.RESET_PREFIX+i);
		 * enclist.add(item); }
		 */

		enclist = loginService.getEncryptPassword(enclist, userDetail);

		for (UsrInfoParam itm : enclist) {
			if (itm.getEncPassword().equalsIgnoreCase(encryptedPass)) {
				flag = true;
			}
		}

		return flag;
	}

}