package au.com.woolworths.portal.util;

/**
 * @author xsvm1
 * @name Saravanakumar Venkatachalam
 * 
 * Use this class to sort the list of bean based on multiple attributes. 
 * This was developed with an intention to use this in jasper print reports.
 * In the generate reports screen, the user is given provision to sort the records. 
 * On jasper print the same order has to be preserved.
 * 
 * usage: while instantiating this class pass the attribute name in the bean to sort, data type of the attribute, 
 * 		sorting order and if the additional attribute list to sort.
 * 
 */

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class MultiAttributeDynaSortComparator implements Comparator<Object> {
	private String attribute;
	private String type;
	private String sortingOrder;
	private String sortCategory;
	private String nulls;
	LinkedList<SecondSortAttributeDetails> queue;
	
	protected MultiAttributeDynaSortComparator() {
		// This is meant only for creating dummy instance, which has to be then populated
	}

	public MultiAttributeDynaSortComparator(String attribute, String type,
			String sortingOrder, String nulls) {
		this(attribute, type, sortingOrder, nulls, null);
	}

	public MultiAttributeDynaSortComparator(String attribute, String type,
			String sortingOrder, String nulls, LinkedList<SecondSortAttributeDetails> queue) {
		instantiateMethod(attribute, type,
				sortingOrder, nulls, queue);
	}
	/**
	 * Override this method if any custom sorting comparator is used
	 * @param attribute
	 * @param type
	 * @param sortingOrder
	 * @param q
	 * @return
	 */
	public MultiAttributeDynaSortComparator getMultiAttributeDynaSortComparator(String attribute, String type, String sortingOrder, String nullsLast, LinkedList<SecondSortAttributeDetails> q) {
		return new MultiAttributeDynaSortComparator(
				attribute, type, sortingOrder, nullsLast, q);
	}
	public void instantiateMethod(String attribute, String type,
			String sortingOrder, String nulls, LinkedList<SecondSortAttributeDetails> queue) {
		this.attribute = attribute;
		List<String> lst = new ArrayList<String>();
		lst.add("int");
		lst.add("integer");
		lst.add("double");
		lst.add("long");
		lst.add("string");
		lst.add("date");
		lst.add("time");
		
		lst.add("java_date");
		lst.add("java_int");
		lst.add("java_float");
		lst.add("java_long");
		lst.add("java_double");
		if (type != null
				&& lst.contains(type.toLowerCase())) {
			this.type = type.toLowerCase().trim();
		} else {
			throw new InstantiationError(
					"Could not instantiate, The second argument, type, should be \"int | integer | double | long | float  | string | date | time | java_date | java_int | java_float | java_long | java_double \"");
		}
		if (sortingOrder != null
				&& sortingOrder.toLowerCase().trim().matches("asc|desc|dsc")) {
			this.sortingOrder = sortingOrder.toLowerCase().trim();
		} else {
			throw new InstantiationError(
					"Could not instantiate, The Third arguement, sortingOrder, should be \"asc\" - Ascending order or \"desc\" or \"dsc\" - Descending Order");
		}
		if ("int".equals(type) || "integer".equals(type)
				|| "double".equals(type) || "long".equals(type)
				|| "float".equals(type)) {
			this.sortCategory = "number";
		} else if ("string".equals(type)) {
			this.sortCategory = "string";
		} else if ("date".equals(type)) {
			this.sortCategory = "date";
		} else if ("time".equals(type)) {
			this.sortCategory = "time";
		} else if ("java_date".equalsIgnoreCase(type)) {
			this.sortCategory = "java_date";
		} else if ("java_int".equalsIgnoreCase(type) || "java_integer".equalsIgnoreCase(type)) {
			this.sortCategory = "java_int";
		} else if ("java_float".equalsIgnoreCase(type)) {
			this.sortCategory = "java_float";
		} else if ("java_long".equalsIgnoreCase(type)) {
			this.sortCategory = "java_long";
		} else if ("java_double".equalsIgnoreCase(type)) {
			this.sortCategory = "java_double";
		}
		this.queue = queue;
		this.nulls = (CommonUtils.isNullEmptyWhiteSpace(nulls)?"none":nulls.toLowerCase());
	}
	
	public static LinkedList<SecondSortAttributeDetails> convertStringToSortAttrList(String input) {
		if (input != null && !input.trim().isEmpty()) {
			String[] attr = input.trim().split(",");
			LinkedList<SecondSortAttributeDetails> allAttr = new LinkedList<SecondSortAttributeDetails>();
			for (int i = 0; i < attr.length; i += 4) {
				SecondSortAttributeDetails sec = new SecondSortAttributeDetails();
				sec.setAttribute(attr[i]);
				sec.setType(attr[i + 1]);
				sec.setSortingOrder(attr[i + 2]);
				sec.setNulls(attr[i + 3]);
				allAttr.add(sec);
			}
			return allAttr;
		}
		return null;
	}
	/**
	 * For any custom sort comparator, have custom specific static method accordingly
	 * 
	 * @param input
	 * @return
	 */
	public static MultiAttributeDynaSortComparator getComparatorInstance(String input) {
		LinkedList<SecondSortAttributeDetails> list = MultiAttributeDynaSortComparator.convertStringToSortAttrList(input);
		MultiAttributeDynaSortComparator comparator = null;
		if(list != null) {
			comparator = new MultiAttributeDynaSortComparator();
			comparator.populateComparatorInstance(list);
		}
		else {
			comparator = null;
		}
		return comparator;
	}
	public void populateComparatorInstance(LinkedList<SecondSortAttributeDetails> list) {
		if (list!=null && list.isEmpty() == false) {
			SecondSortAttributeDetails secondSortAttributeDetails = list.remove();
			populateComparatorInstance(secondSortAttributeDetails, list);
		}
	}
	/**
	 * Override this method if any custom sort comparator is used
	 * @param secondSortAttributeDetails
	 * @param list
	 * @return
	 */
	public void populateComparatorInstance(SecondSortAttributeDetails secondSortAttributeDetails, LinkedList<SecondSortAttributeDetails> list) {
		instantiateMethod(secondSortAttributeDetails.getAttribute(), secondSortAttributeDetails.getType(),
		secondSortAttributeDetails.getSortingOrder(), secondSortAttributeDetails.getNulls(), list);
	}



	public int compare(Object o1, Object o2) {
		CompareAttributes compareAttributes = inputAttribtes(o1, o2);
		return processAttributes(o1, o2, compareAttributes.getFirstObjectAttribute(),
				compareAttributes.getSecondObjectAttribute());
	}
	/**
	 * Override this method if the column sorting is performed on the 
	 * derived fields from the bean.
	 * @param o1
	 * @param o2
	 * @return
	 */
	public CompareAttributes inputAttribtes(Object o1, Object o2) {
		CompareAttributes compareAttributes = new CompareAttributes();
		compareAttributes.setFirstObjectAttribute(getObjectAttributeValue(o1));
		compareAttributes.setSecondObjectAttribute(getObjectAttributeValue(o2));
		return compareAttributes;
	}
	public Object getObjectAttributeValue(Object o) {
		try {
			Method m = o.getClass().getMethod(
					"get" + attribute.substring(0, 1).toUpperCase()
							+ attribute.substring(1));
			// String s2 = (String) m.invoke(o2);
			return  m.invoke(o);
		} catch (SecurityException e) {
			throw new RuntimeException(e);
		} catch (NoSuchMethodException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			throw new RuntimeException(e);
		}
		
	}
	public Integer processAttributes(Object o1, Object o2, Object t1, Object t2) {
		
		if(t1 == t2) {
			if (queue != null && queue.size() > 0) {
				return proceedFurtherSorting(o1, o2);
			}
			return 0;
		}
		Class<?> parameterTypes[] = new Class[4];
		parameterTypes[0] = Object.class;
		parameterTypes[1] = Object.class;

		Object[] obj = new Object[4];
		obj[0] = o1;
		obj[1] = o2;
		if((t1!=null && t1 instanceof String) || (t2!=null && t2 instanceof String) ) {
			String s1 = (String)t1;
			String s2 = (String)t2;
			if (s1 != null && s2 != null && s1.equalsIgnoreCase(s2)) {
				if (queue != null && queue.size() > 0) {
					return proceedFurtherSorting(o1, o2);
				}
				return 0;
			}
			if (s1 == null || s1.isEmpty()) {
				return firstRecordNullSorting();
			}
			else if((s1!=null && "#".equals(s1.trim()) && "time".equals(this.sortCategory))) { // Use this logic for nulls last
				s1 = null;
				if ("asc".equals(sortingOrder)) {
					return 1;
				} else if (sortingOrder.matches("dsc|desc")) {
					return -1;
				}
			}
			else if((s1!=null && CommonUtils.isNumeric(s1)== false && "number".equals(this.sortCategory))) { // Use this logic for nulls last
				s1 = null;
				return firstRecordNullSorting();
			}
			if (s2 == null || s2.isEmpty()) {
				return secondRecordNullSorting();
			}
			else if((s2!=null && "#".equals(s2.trim()) && "time".equals(this.sortCategory))) { // Use this logic for nulls last
				s2 = null;
				if ("asc".equals(sortingOrder)) {
					return -1;
				} else if (sortingOrder.matches("dsc|desc")) {
					return 1;
				}
			}
			else if((s2!=null && CommonUtils.isNumeric(s2)== false && "number".equals(this.sortCategory))) { // Use this logic for nulls last
				s2 = null;
				return secondRecordNullSorting();
			}
			s1 = s1.toLowerCase();
			s2 = s2.toLowerCase();
			parameterTypes[2] = String.class;
			parameterTypes[3] = String.class;
			obj[2] = s1;
			obj[3] = s2;
		}
		else if((t1!=null && t1 instanceof Date) || (t2!=null && t2 instanceof Date) ) {
			Date d1 = (Date)t1;
			Date d2 = (Date)t2;
			if (d1 != null && d2 != null && d1.equals(d2)) {
				if (queue != null && queue.size() > 0) {
					return proceedFurtherSorting(o1, o2);
				}
				return 0;
			}
			int isNull = nullsSorting(d1, d2);
			if(isNull != 0) {
				return isNull;
			}
			parameterTypes[2] = Date.class;
			parameterTypes[3] = Date.class;
			obj[2] = d1;
			obj[3] = d2;
		}
		else if((t1!=null && t1 instanceof Integer) || (t2!=null && t2 instanceof Integer) ) {
			Integer i1 = (Integer)t1;
			Integer i2 = (Integer)t2;
			if (i1 != null && i2 != null && i1.equals(i2)) {
				if (queue != null && queue.size() > 0) {
					return proceedFurtherSorting(o1, o2);
				}
				return 0;
			}
			int isNull = nullsSorting(i1, i2);
			if(isNull != 0) {
				return isNull;
			}
			parameterTypes[2] = Integer.class;
			parameterTypes[3] = Integer.class;
			obj[2] = i1;
			obj[3] = i2;
		}
		else if((t1!=null && t1 instanceof Float) || (t2!=null && t2 instanceof Float) ) {
			Float f1 = (Float)t1;
			Float f2 = (Float)t2;
			if (f1 != null && f2 != null && f1.equals(f2)) {
				if (queue != null && queue.size() > 0) {
					return proceedFurtherSorting(o1, o2);
				}
				return 0;
			}
			int isNull = nullsSorting(f1, f2);
			if(isNull != 0) {
				return isNull;
			}
			parameterTypes[2] = Float.class;
			parameterTypes[3] = Float.class;
			obj[2] = f1;
			obj[3] = f2;
		}
		else if((t1!=null && t1 instanceof Long) || (t2!=null && t2 instanceof Long) ) {
			Long l1 = (Long)t1;
			Long l2 = (Long)t2;
			if (l1 != null && l2 != null && l1.equals(l2)) {
				if (queue != null && queue.size() > 0) {
					return proceedFurtherSorting(o1, o2);
				}
				return 0;
			}
			int isNull = nullsSorting(l1, l2);
			if(isNull != 0) {
				return isNull;
			}
			parameterTypes[2] = Long.class;
			parameterTypes[3] = Long.class;
			obj[2] = l1;
			obj[3] = l2;
		}
		else if((t1!=null && t1 instanceof Double) || (t2!=null && t2 instanceof Double) ) {
			Double d1 = (Double)t1;
			Double d2 = (Double)t2;
			if (d1 != null && d2 != null && d1.equals(d2)) {
				if (queue != null && queue.size() > 0) {
					return proceedFurtherSorting(o1, o2);
				}
				return 0;
			}
			int isNull = nullsSorting(d1, d2);
			if(isNull != 0) {
				return isNull;
			}
			parameterTypes[2] = Double.class;
			parameterTypes[3] = Double.class;
			obj[2] = d1;
			obj[3] = d2;
		}
		else if((t1!=null && t1 instanceof Set<?>) || (t2!=null && t2 instanceof Set<?>) ) {
			Set<?> d1 = (Set<?>)t1;
			Set<?> d2 = (Set<?>)t2;
			if (d1 != null && d2 != null && d1.size()==d2.size()) {
				if (queue != null && queue.size() > 0) {
					return proceedFurtherSorting(o1, o2);
				}
				return 0;
			}
			int isNull = nullsSorting(d1, d2);
			if(isNull != 0) {
				return isNull;
			}
			parameterTypes[2] = String.class;
			parameterTypes[3] = String.class;
			obj[2] = d1.size()+"";
			obj[3] = d2.size()+"";
		}
		try {
			Method meth = this.getClass().getMethod(sortCategory,
					parameterTypes);
			return (Integer) meth.invoke(this, obj);
		} catch (SecurityException e) {
			throw new RuntimeException(e);
		} catch (NoSuchMethodException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			throw new RuntimeException(e);
		}

	}
	private int nullsSorting(Object o1, Object o2) {
		if(o1==null) {
			return firstRecordNullSorting();
		}
		else if(o2==null) {
			return secondRecordNullSorting();
		}
		return 0;
	}
	private int firstRecordNullSorting() {
		if("none".equals(this.nulls) && "asc".equals(sortingOrder)) {
			return 1;
		}
		else if("none".equals(this.nulls) && sortingOrder.matches("dsc|desc")) {
			return -1;
		}
		else if("first".equals(this.nulls)) {
			return -1;
		}
		else if("last".equals(this.nulls)) {
			return 1;
		}
		else if ("asc".equals(sortingOrder)) {
			return -1;
		} else if (sortingOrder.matches("dsc|desc")) {
			return 1;
		}
		return 0;
	}
	private int secondRecordNullSorting() {
		if("none".equals(this.nulls) && "asc".equals(sortingOrder)) {
			return -1;
		}
		else if("none".equals(this.nulls) && sortingOrder.matches("dsc|desc")) {
			return 1;
		}
		else if("first".equals(this.nulls)) {
			return 1;
		}
		else if("last".equals(this.nulls)) {
			return -1;
		}
		else if ("asc".equals(sortingOrder)) {
			return 1;
		} else if (sortingOrder.matches("dsc|desc")) {
			return -1;
		}
		return 0;
	}

	public Integer string(Object o1, Object o2, String s1, String s2) {
		if ("asc".equals(sortingOrder)) {
			return compareString(o1, o2, s1, s2);
		} else if (sortingOrder.matches("dsc|desc")) {
			return compareString(o1, o2, s2, s1);
		}
		return 0;
	}

	public Integer number(Object o1, Object o2, String s1, String s2) {
		if ("int".equals(type) || "integer".equals(type)) {
			if ("asc".equals(sortingOrder)) {
				return compareInt(o1, o2, s1, s2);
			} else {
				return compareInt(o1, o2, s2, s1);
			}
		} else if ("double".equals(type)) {
			if ("asc".equals(sortingOrder)) {
				return compareDouble(o1, o2, s1, s2);
			} else if (sortingOrder.matches("dsc|desc")) {
				return compareDouble(o1, o2, s2, s1);
			}
		} else if ("long".equals(type)) {
			if ("asc".equals(sortingOrder)) {
				return compareLong(o1, o2, s1, s2);
			} else if (sortingOrder.matches("dsc|desc")) {
				return compareLong(o1, o2, s2, s1);
			}
		} else if ("float".equals(type)) {
			if ("asc".equals(sortingOrder)) {
				return compareFloat(o1, o2, s1, s2);
			} else if (sortingOrder.matches("dsc|desc")) {
				return compareFloat(o1, o2, s2, s1);
			}
		}
		return 0;
	}
	
	public Integer java_number(Object o1, Object o2, String s1, String s2) {
		if ("java_int".equals(type) || "java_integer".equals(type)) {
			if ("asc".equals(sortingOrder)) {
				return compareInt(o1, o2, s1, s2);
			} else {
				return compareInt(o1, o2, s2, s1);
			}
		} else if ("java_double".equals(type)) {
			if ("asc".equals(sortingOrder)) {
				return compareDouble(o1, o2, s1, s2);
			} else if (sortingOrder.matches("dsc|desc")) {
				return compareDouble(o1, o2, s2, s1);
			}
		} else if ("java_long".equals(type)) {
			if ("asc".equals(sortingOrder)) {
				return compareLong(o1, o2, s1, s2);
			} else if (sortingOrder.matches("dsc|desc")) {
				return compareLong(o1, o2, s2, s1);
			}
		} else if ("java_float".equals(type)) {
			if ("asc".equals(sortingOrder)) {
				return compareFloat(o1, o2, s1, s2);
			} else if (sortingOrder.matches("dsc|desc")) {
				return compareFloat(o1, o2, s2, s1);
			}
		}
		return 0;
	}

	public Integer date(Object o1, Object o2, String s1, String s2) {
		if ("asc".equals(sortingOrder)) {
			return compareDate(o1, o2, s1, s2);
		} else if (sortingOrder.matches("dsc|desc")) {
			return compareDate(o1, o2, s2, s1);
		}
		return 0;
	}
	public Integer java_date(Object o1, Object o2, Date d1, Date d2) {
		if ("asc".equals(sortingOrder)) {
			return compareDate(o1, o2, d1, d2);
		} else if (sortingOrder.matches("dsc|desc")) {
			return compareDate(o1, o2, d2, d1);
		}
		return 0;
	}

	public Integer time(Object o1, Object o2, String s1, String s2) {
		String ts1 = (s1==null?s1:s1.replaceAll(":", ""));
		String ts2 = (s2==null?s2:s2.replaceAll(":", ""));
		if ("asc".equals(sortingOrder)) {
			return compareLong(o1, o2, ts1, ts2);
		} else if (sortingOrder.matches("dsc|desc")) {
			return compareLong(o1, o2, ts2, ts1);
		}
		return 0;
	}
	public Integer java_int(Object o1, Object o2, Integer i1, Integer i2) {
		if ("asc".equals(sortingOrder)) {
			return compareInt(o1, o2, i1, i2);
		} else if (sortingOrder.matches("dsc|desc")) {
			return compareInt(o1, o2, i2, i1);
		}
		return 0;
	}
	public Integer java_float(Object o1, Object o2, Float f1, Float f2) {
		if ("asc".equals(sortingOrder)) {
			return compareFloat(o1, o2, f1, f2);
		} else if (sortingOrder.matches("dsc|desc")) {
			return compareFloat(o1, o2, f2, f1);
		}
		return 0;
	}
	public Integer java_long(Object o1, Object o2, Long l1, Long l2) {
		if ("asc".equals(sortingOrder)) {
			return compareLong(o1, o2, l1, l2);
		} else if (sortingOrder.matches("dsc|desc")) {
			return compareLong(o1, o2, l2, l1);
		}
		return 0;
	}
	public Integer java_double(Object o1, Object o2, Double d1, Double d2) {
		if ("asc".equals(sortingOrder)) {
			return compareDouble(o1, o2, d1, d2);
		} else if (sortingOrder.matches("dsc|desc")) {
			return compareDouble(o1, o2, d2, d1);
		}
		return 0;
	}

	public Integer compareInt(Object o1, Object o2, String s1, String s2) {
		int i1 = parseInt(s1);
		int i2 = parseInt(s2);
		return compareInt(o1, o2, i1, i2);
	}
	public Integer compareInt(Object o1, Object o2, Integer i1, Integer i2) {
		if (i1 - i2 == 0 && queue != null
				&& queue.size() > 0) {
			return proceedFurtherSorting(o1, o2);
		}
		return i1 - i2;
	}

	public Integer compareDouble(Object o1, Object o2, String s1, String s2) {
		double d1 = Double.parseDouble(s1);
		double d2 = Double.parseDouble(s2);
		return compareDouble(o1, o2, d1, d2);
	}

	public Integer compareDouble(Object o1, Object o2, Double d1, Double d2) {
		if (d1 - d2 == 0
				&& queue != null && queue.size() > 0) {
			return proceedFurtherSorting(o1, o2);
		}
		return Double.compare(d1, d2);
	}

	public Integer compareLong(Object o1, Object o2, String s1, String s2) {
		Long l1 = parseLong(s1);
		Long l2 = parseLong(s2);
		return compareLong(o1, o2, l1, l2);
	}
	
	public Integer compareLong(Object o1, Object o2, Long l1, Long l2) {
		if (l1 - l2 == 0 && queue != null
				&& queue.size() > 0) {
			return proceedFurtherSorting(o1, o2);
		}
		return l1.compareTo(l2);
	}


	public Integer compareFloat(Object o1, Object o2, String s1, String s2) {
		float f1 = Float.parseFloat(s1);
		float f2 = Float.parseFloat(s2);
		return compareFloat(o1, o2, f1, f2);
	}

	public Integer compareFloat(Object o1, Object o2, Float f1, Float f2) {
		if (f1 - f2 == 0 && queue != null
				&& queue.size() > 0) {
			return proceedFurtherSorting(o1, o2);
		}
		return Float.compare(f1, f2);
	}

	public Integer compareDate(Object o1, Object o2, String s1, String s2) {
		Date d1 = new Date(Long.parseLong(s1.replaceAll("\\D+", "")));
		Date d2 = new Date(Long.parseLong(s2.replaceAll("\\D+", "")));
		return compareDate(o1, o2, d1, d2);
	}
	public Integer compareDate(Object o1, Object o2, Date d1, Date d2) {
		if (d1.compareTo(d2) == 0 && queue != null && queue.size() > 0) {
			return proceedFurtherSorting(o1, o2);
		}
		return d1.compareTo(d2);
	}

	public Integer compareString(Object o1, Object o2, String s1, String s2) {
		if (s1.compareTo(s2) == 0 && queue != null && queue.size() > 0) {
			return proceedFurtherSorting(o1, o2);
		}
		return s1.compareTo(s2);
	}

	public Integer proceedFurtherSorting(Object o1, Object o2) {
		@SuppressWarnings("unchecked")
		LinkedList<SecondSortAttributeDetails> q = (LinkedList<SecondSortAttributeDetails>) queue
				.clone();
		SecondSortAttributeDetails ss = q.remove();
		MultiAttributeDynaSortComparator dyn = getMultiAttributeDynaSortComparator(
				ss.getAttribute(), ss.getType(), ss.getSortingOrder(), ss.getNulls(), q);
		return dyn.compare(o1, o2);
	}
	public int parseInt(String s) {
		int ret = 0;
		try {
			ret = Integer.parseInt(s);
		} catch (Exception e) {
			ret = (int)Double.parseDouble(s);
		}
		return ret;
	}
	public Long parseLong(String s) {
		Long ret = new Long(0l);
		try {
			ret = Long.parseLong(s);
		} catch (Exception e) {
			ret = (long)Double.parseDouble(s);
		}
		return ret;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSortingOrder() {
		return sortingOrder;
	}

	public void setSortingOrder(String sortingOrder) {
		this.sortingOrder = sortingOrder;
	}

	public String getSortCategory() {
		return sortCategory;
	}

	public void setSortCategory(String sortCategory) {
		this.sortCategory = sortCategory;
	}

	public LinkedList<SecondSortAttributeDetails> getQueue() {
		return queue;
	}

	public void setQueue(LinkedList<SecondSortAttributeDetails> queue) {
		this.queue = queue;
	}

	public String getNulls() {
		return nulls;
	}

	public void setNulls(String nulls) {
		this.nulls = nulls;
	}
}