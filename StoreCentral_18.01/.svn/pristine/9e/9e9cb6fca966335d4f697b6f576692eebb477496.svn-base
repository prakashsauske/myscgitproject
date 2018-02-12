(function($) {

	$.fn.sorter=function (){
		
	};
	$.fn.isDigit = function(s) {
		return isNaN(s) ? (/^[\-+(]?\d+[)]?$/).test(s.toString()
				.replace(/[,.'"\s]/g, '')) : true;
	};
	$.fn.getActDate = function(s) {
		s = formateDate(s);
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
				temp.push(list[i]);
			}
			map[obj[col]] = temp;
		}
		return map;
	};
	$.fn.isDate = function(s) {
		if (s != undefined){
			return (/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/)
					.test((s || '').replace(/\s+/g, " ")
							.replace(/[\-.,]/g, "/"));
		}
		else
			return false;
	};
	
	
}($));