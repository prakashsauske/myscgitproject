(function($) {

	$.fn.sortArrOfObjectsByParam = function(arrToSort, strObjParamToSortBy,
			sortAscending,dataparser,data_function,sort_func) {
		if (sortAscending == undefined)
			sortAscending = true;

		arrToSort.sort(function(a, b) {
			!a.hasOwnProperty(strObjParamToSortBy) ? (data_function !=undefined ? data_function(a) :'') : '';
			!b.hasOwnProperty(strObjParamToSortBy) ? (data_function !=undefined ? data_function(b) :'') : '';
			var data1 = (dataparser!=undefined) ? dataparser(a[strObjParamToSortBy]): a[strObjParamToSortBy];
			var data2 = (dataparser!=undefined) ? dataparser(b[strObjParamToSortBy]) : b[strObjParamToSortBy];
			if (data1 != undefined && data2 != undefined) {
				if(sort_func!=undefined && sort_func!= '' ){
					return sort_func(data1, data2, sortAscending, a, b , data_function);
				}else if ($.fn.isDigit(data1) && $.fn.isDigit(data2)) {
					//if(data1!='' && data2!='' && Number(data1)!=Number(data2)){
						return getSortNumeric(data1, data2, sortAscending);
					//}
				} else if ($.fn.isDate(data1) && $.fn.isDate(data2)) {
					data1 = $.fn.getActDate(data1);
					data2 = $.fn.getActDate(data2);
					return getSortNumeric(data1, data2, sortAscending);
				} else {
					var dat1=data1.toLowerCase(), dat2=data2.toLowerCase();
						return getSortOrder(dat1, dat2, sortAscending);
				}
			}
		});
	};
	$.fn.isDate = function(s) {
		// testing for ##-##-#### or ####-##-##, so it's not
		// perfect; time can be included
		if (s != undefined)
			return (/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/)
					.test((s || '').replace(/\s+/g, " ")
							.replace(/[\-.,]/g, "/"));
		else
			return false;
	};
	$.fn.isDigit = function(s) {
		return isNaN(s) ? (/^[\-+(]?\d+[)]?$/).test(s.toString().replace(
				/[,.'"\s]/g, '')) : true;
	};

	$.fn.getActDate = function(s) {
		s = formateSortDate(s);
		//s=formatDateToMDY(s);//added by muthu to fix sorter issue
		return new Date(s);
	};

	$.fn.groupByIndex = function(list, col) {
		var map = {};
		for ( var i = 0; i < list.length; i++) {
			var obj = list[i];
			if (obj[col] == null || obj[col] == undefined) {
				obj[col] = '';
			}
			var temp = [];
			if (map.hasOwnProperty(obj[col])) {
				temp = map[obj[col]];
				temp.push(list[i]);
			} else {
				// temp=map[obj[col]];
				temp.push(list[i]);
			}
			map[obj[col]] = temp;
		}
		return map;
	};

}(jQuery));
function getSortOrder(data1, data2, flag) {
	if (flag) {
		if(data1 > data2)
			return 1;
		else if(data1 < data2)
			return -1;
		else 
			return 0;
	} else {
		if(data1 < data2)
			return 1;
		else if(data1 > data2)
			return -1;
		else
			return 0;
	}
}
function getSortNumeric(data1, data2, flag) {
	if (flag) {
		return data1 - data2;
	} else {
		return data2 - data1;
	}
}
function formateSortDate(v) {
	try {
		if(v.indexOf("-") > -1){//if date contains "-"
			return new date(v);
		}else if(v.indexOf(".") > -1){//if date contains "."
			return new date(v);
		}else if(v.length == 8) {
			var splitDate = v.split("/");
			var finalDate = new Date(splitDate[1] + "/" + splitDate[0] + '/'
					+ splitDate[2]);
			finalDate = splitDate[0] + "/" + splitDate[1] + "/"
					+ finalDate.getFullYear();
			return finalDate;
		} else if(v.length == 10) {
			var splitDate = v.split("/");
			var finalDate = splitDate[1] + "/" + splitDate[0] + '/'
					+ splitDate[2];
			return finalDate;
		} else if(v.indexOf("/") > -1 && v.indexOf(":") > -1){//assume dd/mm/yyyy hh:mm:ss format
			var dateOnly = v.split(" ")[0];
			var timeOnly = v.split(" ")[1];
			var dateArray = dateOnly.split("/");
			return new Date(dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0]+" "+timeOnly);
		}else {
			return v;
		}
	} catch (err) {
		return v;
	}
}