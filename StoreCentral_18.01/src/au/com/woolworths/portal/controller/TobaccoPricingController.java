package au.com.woolworths.portal.controller;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import au.com.woolworths.portal.model.TobaccoPricing;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.TobaccoPricingServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/tobacco")
@Scope("session")
public class TobaccoPricingController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['TobaccoPricing']}")
	private String screenCode;
	
	/*@Value("#{properties['TPBTAB']}")
	private String screenCode2;*/ // commenting out as this is not used
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private TobaccoPricingServiceImpl tobaccoPricingServiceImpl;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	private UserContext userDetail;
	
	public ArrayList<TobaccoPricing> tobaccoPricings = new ArrayList<TobaccoPricing>();

	public static final String DATE_FORMAT_AUS = "dd/MM/yyyy";
	/**
	 * Displays Tobacco pricing details for the selected Site
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/tobaccoPageLoad.htm")
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out.println("In cont");
		ArrayList<TobaccoPricing> tobaccoPricingListTemp = tobaccoPricingServiceImpl.fetchTobaccoPricing(userDetail.getSiteNo());//temproaryList()
		tobaccoPricingListTemp=formatSearchResults(tobaccoPricingListTemp);
		
		if(tobaccoPricingListTemp.size()==1){
			if(tobaccoPricingListTemp.get(0).getPack().trim().equalsIgnoreCase("No Data Found")){
			String jsonData = CommonUtils.convertObjectTojson(tobaccoPricings);
			ModelAndView modelAndView = new ModelAndView("TobaccoPricing");
			modelAndView.addObject("tobaccoPricings", tobaccoPricingListTemp);
			modelAndView.addObject("total", tobaccoPricingListTemp.size());
			modelAndView.addObject("tobaccoJson",jsonData);
			return modelAndView;
			}else{
				tobaccoPricings = tobaccoPricingListTemp;
				String jsonData = CommonUtils.convertObjectTojson(tobaccoPricings);
				ModelAndView modelAndView = new ModelAndView("TobaccoPricing");
				modelAndView.addObject("tobaccoPricings", tobaccoPricings);
				modelAndView.addObject("total", tobaccoPricings.size());
				modelAndView.addObject("tobaccoJson",jsonData);
				return modelAndView;
			}	
		}
		ArrayList<TobaccoPricing> tobaccoPricingList = format(tobaccoPricingSort(tobaccoPricingListTemp),userDetail);
		
		if(userDetail.getDistrict().equalsIgnoreCase("TAS")){
		tobaccoPricings = tasmaniaTobaccoFilterNew(tobaccoPricingList);
        }else{
		tobaccoPricings = tobaccoPricingList;
		}
		 
		String jsonData = CommonUtils.convertObjectTojson(tobaccoPricings);
		ModelAndView modelAndView = new ModelAndView("TobaccoPricing");
		modelAndView.addObject("tobaccoPricings", tobaccoPricings);
		modelAndView.addObject("total", tobaccoPricings.size());
		modelAndView.addObject("tobaccoJson",jsonData);
		
		return modelAndView;
	}
	private ArrayList<TobaccoPricing> formatSearchResults(ArrayList<TobaccoPricing> tobaccoPricingList){
		ArrayList<TobaccoPricing> formatedResult=new ArrayList<TobaccoPricing>();
		for(TobaccoPricing obj:tobaccoPricingList){
			if("0.00".equalsIgnoreCase(obj.getCarton())){
				obj.setCarton("");
			}
			if("0.00".equalsIgnoreCase(obj.getPack())){
				obj.setPack("");
			}
			// Below part is commented as part of New CR.
			/*if(!StringUtils.isEmpty(obj.getSize())){
				String size=obj.getSize().split("\\.")[0];
				if(size != null && !"".equalsIgnoreCase(size.trim())){
					obj.setSize(size+"'s");
				}
			}*/
			formatedResult.add(obj);
		}
		return formatedResult;
	}
	
	/**
	 * Sort the List based on the sort field using comparator
	 * @param tobaccoPricingList
	 * @return
	 */
	private ArrayList<TobaccoPricing> tobaccoPricingSort(ArrayList<TobaccoPricing> tobaccoPricingList){
		
		Comparator<TobaccoPricing> comparator = new Comparator<TobaccoPricing>() {
			public int compare(TobaccoPricing c1,
					TobaccoPricing c2) {				
					return c1.getSort()
							- c2.getSort();// use															
			}

		};

		Collections.sort(tobaccoPricingList, comparator);
		
		return tobaccoPricingList;
	}
	
	/**
	 * Removes repeated brand names for TAS site
	 * @param tobaccoPricingList
	 * @return
	 */
		
private ArrayList<TobaccoPricing> tasmaniaTobaccoFilterNew(ArrayList<TobaccoPricing> tobaccoPricingList){
		ArrayList<TobaccoPricing> tobaccoPricingsTemp = new ArrayList<TobaccoPricing>();
		String previousBrand="";
		for(TobaccoPricing bean : tobaccoPricingList)
		{
				if(previousBrand.equalsIgnoreCase(bean.getBrand()))
			{
					bean.setBrand("");
					tobaccoPricingsTemp.add(bean);
				}
				else
				{
					if(bean.getBrand()!=null){
						previousBrand=bean.getBrand();
					}else{
						previousBrand="";
				}
				tobaccoPricingsTemp.add(bean);
			}
		}
		return tobaccoPricingsTemp;
			}

	private ArrayList<TobaccoPricing> format(ArrayList<TobaccoPricing> tobaccoPricingList,UserContext userDtl){
		ArrayList<TobaccoPricing> tobaccoPricingLists = new ArrayList<TobaccoPricing>();
		for(TobaccoPricing tobacco : tobaccoPricingList){
			tobacco.setPack(tobacco.getPack().split("\\s+")[0].trim());
			tobacco.setCarton(tobacco.getCarton().split("\\s+")[0].trim());
			tobacco.setPack(String.format("%6s", tobacco.getPack()));
			tobacco.setCarton(String.format("%6s", tobacco.getCarton()));	
			tobacco.setSize(String.format("%6s", tobacco.getSize()));
			tobaccoPricingLists.add(tobacco);
		}
		
		return tobaccoPricingLists;
		
	}
	
	public ArrayList<TobaccoPricing>  temproaryList(ArrayList<TobaccoPricing> temlist){
		temlist.add(new TobaccoPricing("Alpine","50's","923.45","193.45",0));
		temlist.add(new TobaccoPricing("Benson & Hedges","25's","123.45","199.45",1));
		temlist.add(new TobaccoPricing("Brand 123456789123","100's","123.45","923.45",2));
		temlist.add(new TobaccoPricing("Bond Street (Twin)","99g","123.45","",3));
		temlist.add(new TobaccoPricing("John Player Special","100g","193.45","123.45",4));
		temlist.add(new TobaccoPricing("Rothmans Superkings","100's","123.45","123.95",5));
		temlist.add(new TobaccoPricing("Winfield (Half Carton)","111g","923.45","123.45",6));
		temlist.add(new TobaccoPricing("Rothmans (RYO)","001g","123.45","123.45",7));
		return temlist;
		
	}
	
	public ArrayList<TobaccoPricing>  createEmptyRow(ArrayList<TobaccoPricing> temlist){
		
		if(temlist.get(0).getBrand().equalsIgnoreCase("") && temlist.get(0).getSize().equalsIgnoreCase("")
			&& temlist.get(0).getPack().equalsIgnoreCase("") && temlist.get(0).getCarton().equalsIgnoreCase(""))
		{
		
		}else
		{
			temlist.add(0,new TobaccoPricing("" ,"","","",1));
		}
		return temlist;
		
	}
	
	/**
	 * Prints the list using JASPER
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/tobaccoPagePrint.htm" ,method = RequestMethod.GET)
	public String tobaccoPrint(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		
		System.out.println("Inside Prind method");
		String filename = "tobaccoPricingReport";
		String extension = "pdf";
		if(tobaccoPricings!=null && !tobaccoPricings.isEmpty() && tobaccoPricings.size()>0){
		tobaccoPricings=createEmptyRow(tobaccoPricings);
		}
		Date currentDate = new Date();
		
		Calendar c = Calendar.getInstance();
		c.setTime(currentDate);
		
		Integer day = c.get(Calendar.DAY_OF_WEEK);
		String weekDay = null; 
		if(day == 1){
			c.add(Calendar.DAY_OF_WEEK, 2);
		}else if(day == 2){
			c.add(Calendar.DAY_OF_WEEK, 1);
		}else if (day == 3){
			c.add(Calendar.DAY_OF_WEEK, 0);
		}else if(day == 4){
			c.add(Calendar.DAY_OF_WEEK, 6);
		}else if (day == 5){
			c.add(Calendar.DAY_OF_WEEK, 5);
		}else if (day == 6){
			c.add(Calendar.DAY_OF_WEEK, 4);
		}else if (day == 7){
			c.add(Calendar.DAY_OF_WEEK, 3);
		}
		
		weekDay = dateToString(c.getTime());
		if(tobaccoPricings!=null){
			System.out.println("tobacco size " + tobaccoPricings.size());
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(tobaccoPricings);
		 HashMap<String,Object> tempMap = new HashMap<String,Object>();
		 tempMap.put("validDate", weekDay);
		 ByteArrayOutputStream byos = jasper.printReport(filename, extension, beanDS, tempMap, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request));
		jasperRptResponseHandler.handleJasperResponse(filename, byos, extension, response);
		 
		return null;
	}
	
	 public static String dateToString(Date dt) {
	        if (null == dt)
	            return "";
	        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_AUS);
	        return sdf.format(dt);
	    }
}
