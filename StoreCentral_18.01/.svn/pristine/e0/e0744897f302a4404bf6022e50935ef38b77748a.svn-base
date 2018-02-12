package au.com.woolworths.portal.model;

import java.util.ArrayList;

import au.com.woolworths.portal.util.Constants;

public class MenuOptions {
	private String code;
	private String description;
	private String type;
	private String menuCode;
	private String checked;
	private String site;
	private String includeExclude;
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		result = prime * result
				+ ((description == null) ? 0 : description.hashCode());
		result = prime * result
				+ ((menuCode == null) ? 0 : menuCode.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MenuOptions other = (MenuOptions) obj;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (menuCode == null) {
			if (other.menuCode != null)
				return false;
		} else if (!menuCode.equals(other.menuCode))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		return true;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getIncludeExclude() {
		return includeExclude;
	}

	public void setIncludeExclude(String includeExclude) {
		this.includeExclude = includeExclude;
	}

	public MenuOptions(String code, String description, String type) {
		super();
		this.code = code;
		this.description = description;
		this.type = type;
		this.checked="N";
	}
	
	public MenuOptions(String code, String description, String type,String checked) {
		super();
		this.code = code;
		this.description = description;
		this.type = type;
		if(checked!=null && checked.equalsIgnoreCase(Constants.YES)){
			this.checked="checked disabled defaultChecked";
		}else if(checked!=null && checked.equalsIgnoreCase("U")){
			this.checked="checked userChecked";
		}else{
			this.checked="noChecked";
		}
		
	}

	public static MenuOptions getScreenFromList(ArrayList<MenuOptions> list,String code, String description, String type){
		MenuOptions toReturnItm=new MenuOptions(code, description, type);
		for(MenuOptions itm: list){
			if(toReturnItm.equals(itm)){
				toReturnItm.setChecked("Y");
			}
		}		
		return toReturnItm;		
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMenuCode() {
		return menuCode;
	}

	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}

}
