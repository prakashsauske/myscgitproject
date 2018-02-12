package au.com.woolworths.portal.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.pos.controller.BaseController;

@Controller
@RequestMapping(value = "*/stockAdjust")
public class StockAdjustmentController extends BaseController {

	private ModelMap model;
	
	// ************************* on page load*********
		@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
		public ModelAndView onPageLoad(HttpServletRequest request,
				HttpServletResponse response) {

			if (request.getSession(false) == null
					|| (request.getSession(false) != null && request.getSession(
							false).getAttribute("user") == null)) {
				return new ModelAndView(new RedirectView("../../"));

			}
			model = new ModelMap();
			ModelAndView modelAndView = new ModelAndView("stockAdjustment");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
	
}
