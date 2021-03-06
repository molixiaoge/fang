/**
* @author fang
* @version 2017-06-29 19:35:18
* 
**/
var currentData = null;

funcList.onload = function() {
	fangjs.loadDict("deptType", function(data){
		fangjs.initDict(data);
		
		var act = fangjs.getParamFromURl("act");
		if(act && 'add' != act){
			currentData = fangjs.getSessionStorage("deptInfo");
			fangjs.showEntity(currentData, ['input', 'select', 'textarea']);
			fangjs.deleteSessionStorage("deptInfo");
			
			if( 'read' == act){
				$("select,input,textarea").attr("disabled",true);
				$(".btn").remove();
			}
		}
	});

};

/**
* 保存信息
* */
funcList.saveDept = function() {
    if (!isCheck()) {
    fangjs.alert('信息不完整或格式不正确，请正确填写所有信息！');
        return;
    }
    var params = {};
    var inputs = $s('input'), input;
    for ( var i = 0, len = inputs.length; i < len; i++) {
        input = inputs[i];
        if(input.id) fangjs.setEntity(params, input.id, input.value.trim());
    }
    inputs=$s('textarea');
	for( var i = 0, len = inputs.length; i < len;i++){
		input = inputs[i];
		if(input.id)	fangjs.setEntity(params, input.id, input.value.trim());
	}
    var selects = $s('select'), select;
    for ( var i = 0, len = selects.length; i < len; i++) {
        select = selects[i];
        if(select.id) fangjs.setEntity(params, select.id, select.value);
    }
    
	var url = $("#id").val()?"updateDept":"addDept";
    var callback = function(data) {
		if(data.code == '1'){
			fangjs.alert("操作成功！");
			fangjs.closeDialog();
		}else{
			fangjs.alert(data.message?data.message:"操作失败！请检查数据。");
		}
	};
    fangjs.execjava('sys/dept/' + url, params, callback, false);
};

