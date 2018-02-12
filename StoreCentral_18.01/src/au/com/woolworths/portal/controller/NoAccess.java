package au.com.woolworths.portal.controller;

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
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.CommonServiceImpl;
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
@RequestMapping(value = "*/security")
public class NoAccess extends BaseController {
	

	@RequestMapping(value = "/noAccess.htm", method = RequestMethod.GET)
	public ModelAndView logout(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return new ModelAndView("noAccess");
		
	}	

}
