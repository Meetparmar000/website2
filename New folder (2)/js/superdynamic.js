console.clear();
var globallinkid;
var globaltype;
var brdadd;
var brdmod;
var brddel;
var brdreport;
var messages_arr=new Array();
var labels_arr=new Array();
var testtest;
/*var global_selectname;
var global_civil;
var global_criminal;
var global_civilcriminal;
var global_subpurpose;
var global_purpose;
var global_prayer;
var global_relief;*/
$(document).ready(function() {
  $.ajaxSetup({ cache: false });

  /*$('.button2').on('click',function() {
	$('.button2').attr('disabled',true);
	setTimeout(function() {$('.button2').attr('disabled',false)},300);
});*/
$('a').on('click',function() {
	//alert('anil');
	var url="indexajax.php";
	var postdata='x=validatePage';
	if($(".alert-danger").html()=='' && $(".alert-success").html()=='')
		ajaxCall(url,postdata,callback);
	function callback(result)
	{

	}
});

});
//window.parent.$("#aid5").hide();

	

 function editDays(date) {

        for (var i = 0; i < disabledDates.length; i++) {

			var hdate=disabledDates[i].split('~');
			var expireDateArr=hdate[0].split("-");
			
			
			var expireDate = new Date(expireDateArr[2], expireDateArr[1]-1, expireDateArr[0]);
			//alert(expireDate);
		//alert( Date(dtchk).toString()+'------'+date.toString())
            if (expireDate.toString() == date.toString()) { 
					
                 return [true, "Highlighted", hdate[1]];

            }
        }
         return [true, '', ''];

     }   

function fetchHolidays()
{
	

	var disabledDates1='';
	$.ajax({
	async:false, 
	type: "POST",
	url: "../includes/fetchholidays.php",
	dataType: 'json',
	}).done(function( result ) {

		disabledDates1=result;
		
	});
	return disabledDates1;
}


function compulsaryCheck(str,flag)
{
	
	if(flag=='Y')
	{
	$('#'+str).rules("add", {
				required: true,  			
				messages    : {
				required    : alerts_array[1],
				}
			});
			setTimeout(function() {$('#'+str).css('background','rgb(229, 247, 254)')}, 300);	
	}
	else if(flag=='N')
	{
	
	
			$('#'+str).rules("add", {
				required: false
			});
			setTimeout(function() {$('#'+str).css('background','white')}, 300);	
			
	}
		
}
function manualCheck(str,msg)
{
	//alert(msg);
	 if(msg=='N')
	{
	
	
			$('#'+str).rules("add", {
				manual_invalid: false,  			
			
			});
			
	}
	else
	{ 
		$('#'+str).rules("add", {
				manual_invalid: true,  			
				messages    : {
				manual_invalid  : msg,
				}
			});
	}
	
		
}

function customizeValidation(str,msg,reg_expr)
{
	
		$('[name="'+str+'"]').rules("add", {
				
				
                cutomize   : true,  
				
                messages    : {	
				
                cutomize    : msg,
			  
                }
		});
		
	
		jQuery.validator.addMethod("cutomize", function( value, element ) {
        var regex = new RegExp(reg_expr);
        var key = value;
		
        if (regex.test(key)) {
           return true;
        }
        return false;
    });
}




function datePickerIcon(mydate,maxDate1,minDate1)
  {
	if(minDate1=='' || minDate1==undefined)
		minDate1='01-01-1930';
	  sessdate_arr=sessdate.split('-');
	 var base_url=$('#base_url').val()
   $('#'+mydate).datepicker({
		
	// defaultDate: new Date(2014, February 2015'), 
	  dateFormat: 'dd-mm-yy',
	  changeMonth: true,
	  changeYear: true,
	  beforeShowDay: editDays,
	  showOtherMonths: true,
	  selectOtherMonths: true,
	  //showOn: "button",
	  //buttonImage: "/"+base_url+"/jquery-date/images/calendar.gif",
	  //buttonImageOnly: false,
	  maxDate: maxDate1,
	  minDate: minDate1,
	  yearRange: "-100:+2",
	}).next('img.ui-datepicker-trigger').attr('tabIndex', "-1");;
	//$('#'+mydate).datepicker('setDate',new Date(2015,02,05));
	//$('#'+mydate).val('');
  }


function clearForm()
{
	$('#frm select[id]').map(function() {		
		$('#'+this.id).val("");
	});
	$('#frm input[type=text][id]').map(function() {
		$('#'+this.id).val("");
	});
	$('#frm textarea[id]').map(function() {
		$('#'+this.id).html("");
	});
	

}

jQuery.validator.addMethod("accept", function(value, element, param) {
  return value.match(new RegExp("." + param + "$"));
});
jQuery.validator.addMethod("alphanum", function(value, element) {
  return this.optional(element)|| /^\w+$/i.test(value);
});


jQuery.validator.addMethod("EngNotAllowed", function( value, element ) {
        var regex = new RegExp("^[^a-zA-Z]*$");
        var key = value;
		
        if (regex.test(key)) {
           return true;
        }
        return false;
    });

$.validator.addMethod('time', function(value, element, param) {
    return value == '' || value.match(/^([01][0-9]|2[0-3]):[0-5][0-9]$/) || value.match(/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);
}, 'Enter a valid time: hh:mm');

jQuery.validator.addMethod("EngAndSpecialCharNotAllowed", function( value, element ) {
        var regex = new RegExp("^[^a-zA-Z<>\";`%!~#$|+%&*=\[\\]\:^{}?]*$");
        var key = value;
		
        if (regex.test(key)) {
           return true;
        }
        return false;
    });
	jQuery.validator.addMethod("OnlySpecialCharsNotAllowed", function( value, element ) {
        
		// var regex = new RegExp("^[0-9@,-./_]*$");
		var regex = new RegExp("^[^0-9][()@,./\-_:]*$");
        var key = value;
		
        if (regex.test(key)) {
           return false;
        }
		else
		{
        return true;
		}
    });
	jQuery.validator.addMethod("CharCheckForSection", function( value, element ) {
        
		 var regexalpha = new RegExp("^[a-zA-Z0-9,()]+$");
        var keyalpha = value;

        if (regexalpha.test(keyalpha) || keyalpha=='') {
           return true;
        }
        return false;
    });


jQuery.validator.addMethod("specialChars", function( value, element ) {
        var regex = new RegExp("^[^<>\";`%!~#$|+%&*=\[\\]\:^{}?]*$");
        var key = value;
		
        if (regex.test(key)) {
           return true;
        }
        return false;
    });


	


	jQuery.validator.addMethod("nospecialChars", function( value, element ) {
        //var regex = new RegExp("^[^<>'\"/;`%!~#$%&*()=\[\\]\:{}?@.,_-]*$");
        var regex = new RegExp("^[a-zA-Z]+$");
        var key = value;

        if (regex.test(key)) {
           return true;
        }
        return false;
    });
	jQuery.validator.addMethod("urlspecialChars", function( value, element ) {
        var regex = new RegExp("^[^<>'\";`%!~#$%&*()=\[\\]\^{}?@,]*$");
        var key = value;
		
        if (regex.test(key)) {
           return true;
        }
        return false;
    });

	jQuery.validator.addMethod("alphabet", function( value, element ) {
        var regexalpha = new RegExp("^[a-zA-Z0-9()@,. -_/\\n]+$");
        var keyalpha = value;

        if (regexalpha.test(keyalpha) || keyalpha=='') {
           return true;
        }
        return false;
    });

	jQuery.validator.addMethod("emailchar", function( value, element ) {
        var regexalpha = new RegExp("^[a-zA-Z0-9@._-]+$");
        var keyalpha = value;

        if (regexalpha.test(keyalpha) || keyalpha=='') {
           return true;
        }
        return false;
    });

	jQuery.validator.addMethod("alphabetnumber", function( value, element ) {
        var regexalpha = new RegExp("^[a-zA-Z0-9,]+$");
        var keyalpha = value;

        if (regexalpha.test(keyalpha) || keyalpha=='') {
           return true;
        }
        return false;
    });

	jQuery.validator.addMethod("noalphabet", function( value, element ) {
        var regexalpha = new RegExp("^[a-zA-Z]+$");
        var keyalpha = value;

        if (regexalpha.test(keyalpha) && keyalpha!='') {
           return false;
        }
        return true;
    });
	jQuery.validator.addMethod("manual_valid", function( value, element ) {       
						 return true;
						});
jQuery.validator.addMethod("manual_invalid", function( value, element ) {       
						 return false;
						});

							
/*
jQuery.validator.addMethod("smallint", function( value, element ) {
        var regexalpha = new RegExp("^(?:[0-5]?[0-9]{1,4}|3[0-4][0-9]{3}|32[0-4][0-9]{2}|327[0-2][0-9]|3276[0-7])$");
        var keyalpha = value;

        if (regexalpha.test(keyalpha)) {
           return true;
        }
        return false;
    });

jQuery.validator.addMethod("date", function(value, element) {

  return this.optional(element) || value.match(/^(?:[0-5]?[0-9]{1,4}|3[0-4][0-9]{3}|32[0-4][0-9]{2}|327[0-2][0-9]|3276[0-7])$/);
  },'smallint');
*/

function hasWhiteSpace(s) {

  return /\s/g.test(s);
}

jQuery.validator.addMethod("notNumber", function(value, element, param) {
                       var reg = /[0-9]/;
					   var regex = new RegExp("^[0-9()@,-./_]*$");
					   var regex1 = new RegExp("^[()@,-./_0-9()@,-./_ ']+( [()@,-./_0-9()@,-./_ ']+)*$");
					    //var regex2 = new RegExp("^[0-9@,./_]+( [0-9']+)*$");

							
						
                      /* if((!isNaN(value) || value.indexOf(' ') >= 0 || regex.test(value)) && value!="" ){
                             return false;
                       }else{
                               return true;
                       }
					 */
					 //if((!isNaN(value) || regex.test(value) || regex1.test(value) || value.indexOf('\\') >= 0) && value!="" )--for not allowing \
						if((!isNaN(value) || regex.test(value) || regex1.test(value) ) && value!="" ){
                             return false;
                       }else{
                               return true;
                       }	

					  

                });



 jQuery.validator.addMethod("Number", function(value, element, param) {
                       var reg =  /^[0-9]+$/;					
                       if (reg.test(value)) {
								return true;
						}
						else
						{
							 return false;
						}

                });

	jQuery.validator.addMethod("onlyzeronotallowed", function(value, element, param) {                     	
		if( value!='')
				{
	
                       if (parseInt(value)>0) {
								return true;
						}
						else
						{
							 return false;
						}
				}
				else
				{
					 return true;
				}

                });






jQuery.validator.addMethod("noNumberAtAll", function(value, element, param) {
                       var reg = /[0-9]/;					
                       if (reg.test(value)) {
								return false;
						}
						else
						{
							 return true;
						}

                });




jQuery.validator.addMethod("validstring", function(value, element, param) {
                       var reg = /(.)\1{2,}/;					
                       if (reg.test(value)) {
								return false;
						}
						else
						{
							 return true;
						}

                });







jQuery.validator.addMethod("date", function(date, element) {
 //              
   /*var regDate = /^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\-02\-((19|[2-9]\d)\d{2}))|(29\-02\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
   if (optional(element) || date.match(regDate))
	{
		return true;
	}
	return false;*/
  return this.optional(element) || date.match(/^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\-02\-((19|[2-9]\d)\d{2}))|(29\-02\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/);
  });




jQuery.validator.addMethod("float1", function(value, element) {

                       var reg = /^[-+]?\d{0,12}(\.\d{1})?\d{0,2}$/;
                       if (reg.test(value)) {
								return true;
						}
						else
						{
							 return false;
						}

                });





function dynamiccisnew(){
	
var dataString = 'y=dynamic';
$.ajax({
type: "POST",
url: "../includes/superdynamic.php",
dataType: 'json',
data:dataString
}).done(function( result ) {



//globallinkid=result;
//globaltype='1';
printMessage1(result);
	
	
	messages_arr=result.alerts;	
	
	labels_arr=result.formlabels;
	behaviours_arr=result.behaviour_arr;
	//alert(behaviour_arr);
	brdadd=result.brdcrums[168];
	brdmod=result.brdcrums[169];
	brddel=result.brdcrums[70];
	brdreport=result.brdcrums[598];

	window.parent.$("#brd1").html(result.brd1);
	window.parent.$("#brd2").html(result.brd2);

	if(result.linksamd!='4')
	{
	window.parent.$("#brd3").html(result.brdcrums[168]);
	}
	else
	{
	window.parent.$("#brd3").html(result.brdcrums[598]);
	}
	var myArray = result.linksamd.split(',');
	
	
	if(myArray.indexOf('1')>-1)
		window.parent.$("#aid1").show();
	else
		window.parent.$("#aid1").hide();
	if(myArray.indexOf('2')>-1)
		window.parent.$("#aid2").show();
	else
		window.parent.$("#aid2").hide();
	if(myArray.indexOf('3')>-1)
		window.parent.$("#aid3").show();
	else
		window.parent.$("#aid3").hide();
	if(myArray.indexOf('4')>-1)
		window.parent.$("#aid4").show();
	else
		window.parent.$("#aid4").hide();
	if(myArray.indexOf('5')>-1)
		window.parent.$("#aid5").show();
	else
		window.parent.$("#aid5").hide();
	if(myArray.indexOf('6')>-1)
		window.parent.$("#aid6").show();
	else
		window.parent.$("#aid6").hide();
	if(myArray.indexOf('7')>-1)
		window.parent.$("#aid7").show();
	else
		window.parent.$("#aid7").hide();
	$.each(myArray, function(key, value){
		if(value==5)
		{
			window.parent.$("#brd3").html('import');
			window.parent.$("#aid"+value).bind("click", function(e){ importData('desg_t'); e.stopPropagation() });
		}
		else if(value==6)
		{
			window.parent.$("#brd3").html('export');
			window.parent.$("#aid"+value).bind("click", function(e){ exportData('desg_t'); e.stopPropagation() });
			
		}
		else
		{
			window.parent.$("#aid"+value).bind("click", function(e){ changedata(value,value); e.stopPropagation() });	
		}
		
	});	
showformfields(result.formfieldsnew);
	
});
}

/*
function showformfields(result)
{


$.each(result.formfieldlength, function(key, val1){	
	
	//alert(val1)

	 $('#'+key).attr('maxlength', val1);
	 if(result.bilingual[key]=='Y')
	{
		
		//$('#'+key).attr('style', 'background:#f2f5A9;');
		$('#'+key).css({"background":"#f2f5A9"});
	}
	});

 $("#frm").validate();

 $.each(result.formname1, function(key, val1){

//alert('[name="'+val1+'"]'+'-------'+result.formcompulsory[key])
	if ($('[name="'+val1+'"]').length > 0 )
	{
	
	 if(result.formcompulsory[key]=='Y')
	 {	
		 
		//alert('[name="'+val1+'"]'+'-------'+result.formcompulsory[key])	
	 $('[name="'+val1+'"]').rules("add", {
                required        : true,                             
                messages        : {
                    required    : result.alert1[1]
                }
	
        });
		
		 
		
	 }
	if(result.formtype[key]==1 || result.formtype[key]==13)
	 {	
	
	 $('[name="'+val1+'"]').rules("add", {
                 digits: true,                             
                messages    : {
                    digits    : result.alert1[2]
                }
        });
	 }
	 else if(result.formtype[key]==2)
	 {	
	
	 $('[name="'+val1+'"]').rules("add", {
                float1   : true,                             
                messages    : {
                    float1    : result.alert1[30]
                }
        });
	 }



	 else if(result.formtype[key]==3 && result.bilingual[key]=="Y" && sessid==0)
	 {
		
	$('[name="'+val1+'"]').rules("add", {
				
				//validstring :true,
				EngNotAllowed : true,
				noalphabet	:	true,
				specialChars   : true,
               	notNumber   : true,  
				//OnlySpecialCharsNotAllowed : true,
                messages    : {
				
				//validstring : result.alert1[34],
				EngNotAllowed	:result.alert1[35],
				notNumber    : result.alert1[12],
				noalphabet    : result.alert1[3],
				specialChars    : result.alert1[3],
				//OnlySpecialCharsNotAllowed : "only spl char not allowed22"
                    
                }
		});
	
	
	 }
	 else if(result.formtype[key]==3 && result.bilingual[key]=="N" && sessid==1)
	 {
		
		 
	$('[name="'+val1+'"]').rules("add", {
               EngNotAllowed : true,
				//validstring :true,
				noalphabet	:	true,
				specialChars   : true,
               	notNumber   : true,  
			   // OnlySpecialCharsNotAllowed : true,
                messages    : {
				EngNotAllowed	:result.alert1[35],
				//validstring : result.alert1[34],
				notNumber    : result.alert1[12],
				noalphabet    : result.alert1[3],
				specialChars    : result.alert1[3],
			   // OnlySpecialCharsNotAllowed : "only spl char not allowed33"
                    
                }
		});
	
	
	 }
	 else if(result.formtype[key]==3)
	 {
		
	$('[name="'+val1+'"]').rules("add", {
		        
				//validstring :true,
				alphabet	: true,
                specialChars   : true,  
				notNumber   : true, 
			   // OnlySpecialCharsNotAllowed : true,
                messages    : {
					//validstring : result.alert1[34],
					notNumber    : result.alert1[12],
                    specialChars    : result.alert1[3],
					alphabet    : result.alert1[3],
					//OnlySpecialCharsNotAllowed : "only spl char not allowed11"
                }
		});
	
	
	 }
 else if(result.formtype[key]==4)
	 {	
		
		
	 $('[name="'+val1+'"]').rules("add", {
                date   : true,  
			    messages    : {
                    date    : result.alert1[37],
					
                }
        });
	 }

      else if(result.formtype[key]==12 && result.bilingual[key]=="N")
	 {
		   if(sessid==1)
		 {
			  $('[name="'+val1+'"]').rules("add", {
						EngNotAllowed : true,
						//validstring :true,
						
						messages    : {
						
						EngNotAllowed : result.alert1[35],
						//validstring :  result.alert1[34],
						
							
						}
				});
			
		 }
		 else
		 {
		   $('[name="'+val1+'"]').rules("add", {
						alphabetnumber : true,
						//validstring :true,
						
						messages    : {
						
						alphabetnumber : result.alert1[36],
						//validstring :  result.alert1[34],
						
							
						}
				});
		 }
		
	 }
      else if(result.formtype[key]==12 && result.bilingual[key]=="Y")
	{
	      if(sessid==1)
		 {
			 $('[name="'+val1+'"]').rules("add", {
						alphabetnumber : true,
						//validstring :true,
						
						messages    : {
						
						alphabetnumber : result.alert1[36],
						//validstring :  result.alert1[34],
						
							
						}
				});
          
		 }
		 else
		{
		  $('[name="'+val1+'"]').rules("add", {
						EngNotAllowed : true,
						//validstring :true,
						
						messages    : {
						
						EngNotAllowed : result.alert1[35],
						//validstring :  result.alert1[34],
						
							
						}
				});
			
		 
		 }
		 
	  }

	
	 else if(result.formtype[key]==9)
	 {	
	 $('[name="'+val1+'"]').rules("add", {
                noNumberAtAll   : true,  
			    nospecialChars   : true,     
                messages    : {
                    noNumberAtAll    : result.alert1[38],
					nospecialChars    : result.alert1[3]
                }
        });
	 }
	 else if(result.formtype[key]==8)
	 {	
		 
	 $('[name="'+val1+'"]').rules("add", {
                email   : true,                             
                messages    : {
                    email    : result.alert1[9]
                }
        });
	 }
	 else if(result.formtype[key]==10)
	 {	
	 $('[name="'+val1+'"]').rules("add", {
                urlspecialChars   : true,                             
                messages    : {
                    urlspecialChars    : 'Only These Allowed'
                }
        });
	 }
	 else if(result.formtype[key]==5)
	 {	
	 $('[name="'+val1+'"]').rules("add", {
                time   : true,                             
                messages    : {
                    time    : 'Invalid time'
                }
        });
	 }
	
	 }
	});
}




*/




function dynamiccis(){
var dataString = 'y=showlinkid';
$.ajax({
type: "POST",
url: "../includes/superdynamic.php",
data:dataString
}).done(function( result ) {

	if(result==0)
	{
	
		// window.location.href='../index.php';
		 return false;
	}
	else
	{

globallinkid=result;
globaltype='1';
showdynamiclabels(result);
showdynamicbuttons(result);
showdynamicalerts();
showdynamiclinks(result);
showdynamicbrdcrums(result);
showdynamicformfields(result);
showdynamicreport(result);
FetchAlerts(result);
fetchLabels(result);
fileBehaviour(result);


	}
});
}
function dynamiccismodifydelete()
	{
		
	
var dataString = 'y=showlinkid';
$.ajax({
type: "POST",
url: "../includes/superdynamic.php",
data:dataString
}).done(function( result ) {

	if(result==0)
	{
		// window.location.href='../index.php';
		 return false;
	}
	else
	{
showdynamicformfields(result);
	}
});
}

function reportLink(formname){

var dataString = 'y=showlinkid';
$.ajax({
type: "POST",
url: "../includes/superdynamic.php",
data:dataString
}).done(function( result ) {

	if(result==0)
	{
		 //window.location.href='../index.php';
		 return false;
	}
	else
	{
		showReportLinkId(result,formname);
	}
});
}
/*function getMessages(){
	
var dataString = 'y=showlinkid';
$.ajax({
type: "POST",
url: "../includes/superdynamic.php",
data:dataString
}).done(function( result ) {

	if(result==0)
	{
		 window.location.href='../index.php';
		 return false;
	}
	else
	{
showdynamicmessages();
	}
});
}
*/


function showdynamiclabels(linkid)
{	
	globallinkid=linkid;
	
	dataString = 'y=dynamiclabels&linkid='+linkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {
	
	/*$.session.set("linklabeladd", result.labelE[168]);
	$.session.set("linklabelmodify", result.labelE[169]);
	$.session.set("linklabeldelete", result.labelE[70]);
	$.session.set("selectname", result.labelE[167]);	
	global_selectname=result.labelE[167];	*/
	brdadd=result.labelE[168];
	brdmod=result.labelE[169];
	brddel=result.labelE[70];
	brdreport=result.labelE[598];
	window.parent.$("#brd3").html(result.labelE[168]);	
	setTimeout(function() { displaylabels(result)}, 200);
				
			//displaylabels(result);			
		});
}
function showdynamicbuttons(linkid)
{	

	dataString = 'y=dynamicbuttons&linkid='+linkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {
			
			$('#compulsory').html(result.button1[8]);
			$('#dyndel').html(result.button1[5]);
			$('#dynundel').html(result.button1[25]);
			displaybuttons(result);			
		});
}
function showdynamiclinks(linkid)
{	

	dataString = 'y=dynamiclinks&linkid='+linkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {
			
			
			displaylinks(result);			
		});
}
function showdynamicreport(linkid)
{		
//displayreport(linkid);		
}
function showdynamicalerts()
{	
	dataString = 'y=dynamicalerts';
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {			
		//	displayalert(result);	
		});
}
function showdynamicbrdcrums(linkid)
{	
	dataString = 'y=dynamicbrdcrums&linkid='+linkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",		
		data:dataString	,
		}).done(function( result ) {		
			displaybrdcrums(result);	
		});
}
function brdcrums(linkid)
{	
	dataString = 'y=brdcrums&linkid='+linkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {
		
			brdadd=result.labelE[168];
			brdmod=result.labelE[169];
			brddel=result.labelE[70];
			brdreport=result.labelE[598];
			window.parent.$("#brd3").html(result.labelE[168]);
			window.parent.$('#brd2').html(result.labelE[18]);

		});
}
function showdynamicmessages()
{	
	dataString = 'y=dynamicalerts&linkid='+globallinkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {
			
			displaymessages(result);
		});
}
function fileBehaviour(linkid)
{
	dataString='y=setbehaviour';
	
	dataString=dataString+"&linkid="+linkid;	
	 var output=$.ajax({
			type: "POST",
			url: "../includes/superdynamic.php",	
			data:dataString,
			dataType: 'json',
			}).done(function( result ) {
				
			//displaybehaviour(result);
			
		});
	
}

function showReportLinkId(linkid,formname)
{	
	$('#report').show();
	$('#formtable').hide();
	
	$('#report').html('<iframe src="'+formname+'?linkid='+linkid+'&type='+globaltype+'" frameborder="0" name="data1"  id="ifr1" class="iframeclass" style="width:100%;height:87%;"/></iframe>'); 
}
function showImportFile(linkid,table)
{	
	$('#report').show();
	$('#formtable').hide();
	
	$('#report').html('<iframe src="export.php?linkid='+linkid+'&tab='+table+'&backuptype=restore&type='+globaltype+'" frameborder="0" name="data1"  id="ifr1" class="iframeclass" style="width:100%;height:87%;"/></iframe>'); 
}
function showExportFile(linkid,table)
{	
	$('#report').show();
	$('#formtable').hide();
	
	$('#report').html('<iframe src="export.php?linkid='+linkid+'&tab='+table+'&backuptype=backup&type='+globaltype+'" frameborder="0" name="data1"  id="ifr1" class="iframeclass" style="width:100%;height:87%;"/></iframe>'); 
}

/*
function showdynamicformfields(linkid)
{	
	 
	dataString = 'y=dynamicformfields&linkid='+linkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {
printMessage(result);
	
			//alert(result.formname1[2]);			
	//	$.each(result.formname1, function(key, val1){					
	// $('#'+key).attr('name', val1);
	 
	//});
 

$.each(result.formfieldlength, function(key, val1){	

	 $('#'+key).attr('maxlength', val1);
	 if(result.bilingual[key]=='Y')
	{
		//$('#'+key).attr('style', 'background:#f2f5A9;');
		$('#'+key).css({"background":"#f2f5A9"});
	}
	 
	});

 $("#frm").validate();
//$("#showmsg").show();
	//	$("#info1").show().css('color', 'red').dump(result.formname1);		

 $.each(result.formname1, function(key, val1){

	
	 
	if ($('[id="'+val1+'"]').length > 0)
		{
//alert('mona---[name="'+val1+'"]');
	 if(result.formcompulsory[key]=='Y')
	 {	
		 
		
 	
	 $('[id="'+val1+'"]').rules("add", {
                required        : true,                             
                messages        : {
                    required    : result.alert1[1]
                }
	
        });
		
		 
		
	 }
	if(result.formtype[key]==1 || result.formtype[key]==13)
	 {	
	
	 $('[name="'+val1+'"]').rules("add", {
                 digits: true,                             
                messages    : {
                    digits    : result.alert1[2]
                }
        });
	 }
	 else if(result.formtype[key]==2)
	 {	
	
	 $('[name="'+val1+'"]').rules("add", {
                float1   : true,                             
                messages    : {
                    float1    : result.alert1[30]
                }
        });
	 }


	 else if(result.formtype[key]==3 && result.bilingual[key]=="Y" && sessid==0)
	 {
		
	$('[name="'+val1+'"]').rules("add", {
				
				//validstring :true,
				EngNotAllowed : true,
				noalphabet	:	true,
				specialChars   : true,
               	notNumber   : true,  
                messages    : {
				
				//validstring : result.alert1[34],
				EngNotAllowed	:result.alert1[35],
				notNumber    : result.alert1[12],
				noalphabet    : result.alert1[3],
				specialChars    : result.alert1[3]
                    
                }
		});
	
	
	 }
	 else if(result.formtype[key]==3 && result.bilingual[key]=="N" && sessid==1)
	 {
		 
	$('[name="'+val1+'"]').rules("add", {
               EngNotAllowed : true,
				//validstring :true,
				noalphabet	:	true,
				specialChars   : true,
               	notNumber   : true,  
                messages    : {
				EngNotAllowed	:result.alert1[35],
				//validstring : result.alert1[34],
				notNumber    : result.alert1[12],
				noalphabet    : result.alert1[3],
				specialChars    : result.alert1[3]
                    
                }
		});
	
	
	 }
	 else if(result.formtype[key]==3)
	 {
		
	$('[name="'+val1+'"]').rules("add", {
		        
				//validstring :true,
				alphabet	: true,
                specialChars   : true,  
				notNumber   : true,  
                messages    : {
					//validstring : result.alert1[34],
					notNumber    : result.alert1[12],
                    specialChars    : result.alert1[3],
					alphabet    : result.alert1[3]
                }
		});
	
	
	 }
 else if(result.formtype[key]==4)
	 {	
		
		
	 $('[name="'+val1+'"]').rules("add", {
                date   : true,  
			    messages    : {
                    date    : result.alert1[37],
					
                }
        });
	 }

      else if(result.formtype[key]==12)
	 {
	$('[name="'+val1+'"]').rules("add", {
				alphabetnumber : true,
				//validstring :true,				
                messages    : {				
				alphabetnumber : result.alert1[36],
				//validstring :  result.alert1[34],
				
                    
                }
		});
	
	
	 }
	
	 else if(result.formtype[key]==9)
	 {	
	 $('[name="'+val1+'"]').rules("add", {
                noNumberAtAll   : true,  
			    nospecialChars   : true,     
                messages    : {
                    noNumberAtAll    : result.alert1[38],
					nospecialChars    : result.alert1[3]
                }
        });
	 }
	 else if(result.formtype[key]==8)
	 {	
		 
	 $('[name="'+val1+'"]').rules("add", {
                email   : true,                             
                messages    : {
                    email    : result.alert1[9]
                }
        });
	 }
	  else if(result.formtype[key]==10)
	 {	
	 $('[name="'+val1+'"]').rules("add", {
                urlspecialChars   : true,                             
                messages    : {
                    urlspecialChars    : 'Only These Allowed'
                }
        });
	 }
	 
	 }
	});
});
	$("#submitdata").bind("click", function(e){
	//alert("aaaaaaaa");
		if($("#frm").valid()) {	
		var dataString='';
		dataString=$("#frm").serialize()+'&y=servalidation&linkid='+linkid;
		var finalresult="";		
		$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",		
		data:dataString,
		}).done(function( result ) {	
			
			
			$("#showmsg").show();
			$("#info1").show();
			
			$('#info1').css('color', 'red');
			$('#info1').html(result);
		});
		
		e.stopPropagation()
		}
	 });	
	 
}
*/
/*......... START Set Behaviour with link id and behaviour id .......*/


/*......... END Set Behaviour with link id and behaviour id .......*/
function printMessage(result,str)
{
	
	//$("#info1").show().html('');
	$(':button').attr('disabled',false);
	if(result.msg1 && ( result.msg1 !== null && result.msg1 !== ' '))
	{
		
		$("#showmsg").show();
		$("#info1").show().css('color', 'red').html(result.msg1);
		
	}
	if(result.msg2 && ( result.msg2 !== null && result.msg2 !== ' '))
	{
		
		$("#showmsg").show();
		$("#info1").show().css('color', 'green').html(result.msg2);
		displaymessages();	
		
	}
	else if(result.printarr=="YES")
	{
		
		$("#showmsg").show();
		$("#info1").show().css('color', 'red').dump(result);
		
	}
	else if( result.count1 !== null && result.count1 !== '' && result.count1 !== undefined && str=='Submit' )
	{	
		
		$('#str').val(str);
		$('#count1').val(result.count1);	
		//showdynamicmessages();
		displaymessages();
		
	}
	
	


}
function printMessage1(result,str)
{

	if(result.msg1 && ( result.msg1 !== null && result.msg1 !== ' '))
	{
		
		$("#showmsg").show();
		$("#info1").show().css('color', 'red').html(result.msg1);				
	}
	else if(result.printarr=="YES")
	{
		
		$("#showmsg").show();
		$("#info1").show().css('color', 'red').dump(result);				
	}
	else if( result.count1 !== null && result.count1 !== '' && result.count1 !== undefined && str=='Submit' )
	{	
			
		$('#str').val(str);
		$('#count1').val(result.count1);	
		showdynamicmessages();
		
	}
	


}
function FetchAlerts(linkid)
{
	
	dataString = 'y=dynamicalerts&linkid='+linkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {
		
			messages_arr=result;			
		});
}
function fetchLabels(linkid)
{
	
	dataString = 'y=dynamiclabels&linkid='+linkid;
	$.ajax({
		type: "POST",
		url: "../includes/superdynamic.php",	
		dataType: 'json',
		data:dataString	,
		}).done(function( result ) {
		
			//labels_arr=result;			
		});
}

function newcss()
{
if (parent.document.getElementById("txt_css").value=='default')
{
parent.applycssdefault();
}
if (parent.document.getElementById("txt_css").value=='blue')
{
parent.applycssblue();
}
if (parent.document.getElementById("txt_css").value=='orange')
{
parent.applycssorange();
}
if (parent.document.getElementById("txt_css").value=='green')
{
parent.applycssgreen();
}
if (parent.document.getElementById("txt_css").value=='darkblue')
{
parent.applycssdarkblue();
}
if (parent.document.getElementById("txt_css").value=='yellow')
{
parent.applycssyellow();
}
}
/*
function isdate(hearing_dt)
	{
			
			
			var rxDatePattern = /^(\d{4})(\-|-)(\d{1,2})(\-|-)(\d{1,2})$/; //Declare Regex
			var dtArray = hearing_dt.match(rxDatePattern); // is format OK?
			
			if (dtArray == null) 
				return false;
			
			//Checks for mm/dd/yyyy format.
			var dtYear = dtArray[1];    
			var dtMonth = dtArray[3];
			var dtDay= dtArray[5];
			    
			
			if (dtMonth < 1 || dtMonth > 12) 
				return false;
			else if (dtDay < 1 || dtDay> 31) 
				return false;
			else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31) 
				return false;
			else if (dtMonth == 2) 
			{
				var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
				if (dtDay> 29 || (dtDay ==29 && !isleap)) 
						return false;
			}
			return true;

	}
*/

function errorConfirm(msg)
{
	
	$(".alert-warning").show().html(msg);
	var retval=true;
	$("#confirm_id").modal({
	  backdrop: "static", //remove ability to close modal with click
	  keyboard: false, //remove option to close with keyboard
	  show: true //Display loader!
	});
	 $('#confirm_id').modal('show'); // display the modal
	$('#confirm_cancel').click(function(){
		retval=false;
	});
	$('#confirm_ok').click(function(){
		retval=true;
	});
	return retval;
}
function errorAlert(msg)
{
	$('#successIcon').addClass('d-none');
	$('#errorIcon').removeClass('d-none');
	$(".alert-danger").show().html(msg);
	$(".alert-success").hide().html('');
	$("#validateError").modal({
	  backdrop: "static", //remove ability to close modal with click
	  keyboard: false, //remove option to close with keyboard
	  //show: true //Display loader!
	});
	 $('#validateError').modal('show'); // display the modal
}
function successAlert(msg)
{
	$('#errorIcon').addClass('d-none');
	$('#successIcon').removeClass('d-none');
	$(".alert-success").show().html(msg);
	$(".alert-danger").hide().html('');
	$("#validateError").modal({
	  backdrop: "static", //remove ability to close modal with click
	  keyboard: false, //remove option to close with keyboard
	 // show: true //Display loader!
	});
	 $('#validateError').modal('show'); // display the modal
}

function ajaxCall(url,postdata,callback,redirect)
{
	//alert($('#v_token').val())
	$(".alert-danger").html('').hide();
	$(".alert-success").html('').hide();
	//alert(url);
	$.ajax({
		type: "POST",
		url:  url,
		dataType: 'json',
		async: "false",
		data:postdata+'&vajax=Y&v_token='+$('#v_token').val(),		
		error: function(jqXHR, textStatus, errorThrown) {
			//alert(jqXHR.responseText)
			fadeout();
			//$(".alert-danger").show().html(jqXHR.responseText);
			if($.trim(jqXHR.responseText)!='' && jqXHR.responseText!=undefined && redirect!='Y')
				errorAlert(jqXHR.responseText);
			if(redirect=='Y')
			{
				$('#redirect').html(jqXHR.responseText);
			}
			//$(".alert-danger").focus();
			//$('.alert-danger').modal('show'); 
			
		},
		beforeSend:function()
	   	{		
	   		fadein();
	   	},
		success:function( result ) {
			
			fadeout();
			if(result.msg1!='' && result.msg1!=undefined && result.msg1!=null)
			{
				errorAlert(result.msg1);
			}
			else if(result.msg2!='' && result.msg2!=undefined && result.msg2!=null)
			{
				successAlert(result.msg2);
			}

			setTimeout(function(){
				if(result.connError=='Y')
				{
					window.location='index.php';
				}
				else if(result.v_token!='' && result.v_token!=undefined && result.v_token!=null)
				{
					$('#v_token').val(result.v_token);
				}
			},500);
				
			
			callback(result);
			
		}
	
	});
}
function ajaxCall1(url,postdata,callback)
{
	
	$(".alert-danger").html('').hide();
	$(".alert-success").html('').hide();
	//alert(url);
	$.ajax({
		type: "POST",
		url:  url,
		
		async: "false",
		data:postdata,		
		error: function(jqXHR, textStatus, errorThrown) {
			//alert('Error: '+errorThrown+'\nOutput: '+jqXHR.responseText)
			
			$(".alert-danger").show().html(jqXHR.responseText);
			fadeout();
		},
		beforeSend:function()
	   	{		
	   		fadein();
	   	},
		success:function( result ) {
			
			fadeout();
			/*if(result.msg1!='' && result.msg1!=undefined && result.msg1!=null)
			{
				$(".alert-danger").show().html(result.msg1);
			}
			else if(result.msg2!='' && result.msg2!=undefined && result.msg2!=null)
			{
				$(".alert-success").show().html(result.msg2);
			}*/
			
			callback(result);
			
		}
	
	});
}

function ajaxCallfile(url,postdata,callback)
{
	
	$(".alert-danger").html('').hide();
	$(".alert-success").html('').hide();
	//alert(url);
	$.ajax({
		type: "POST",
		url:  url,
		dataType: 'json',
		async: "false",
		cache: false,
        contentType: false,
        processData: false,
		data:postdata,		
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Error: '+errorThrown+'\nOutput: '+jqXHR.responseText)
			
			$(".alert-danger").show().html(jqXHR.responseText);
			fadeout();
		},
		beforeSend:function()
	   	{		
	   		fadein();
	   	},
		success:function( result ) {
			
			fadeout();
			if(result.msg1!='' && result.msg1!=undefined && result.msg1!=null)
			{
				$(".alert-danger").show().html(result.msg1);
			}
			else if(result.msg2!='' && result.msg2!=undefined && result.msg2!=null)
			{
				$(".alert-success").show().html(result.msg2);
			}

			
			callback(result);
			
		}
	
	});
}

function jsonCall(url,postdata,callback)
{
	
   $(".alert-danger").html('').hide();
	$(".alert-success").html('').hide();
	//var url="jsonFiles/jsondistrict.php";
	fadein();
	$.getJSON(url,postdata ,function(obj)
   	{
		fadeout();
		if(obj.msg1!='' && obj.msg1!=undefined && obj.msg1!=null)
		{
			$(".alert-danger").show().html(obj.msg1);
		}
		else if(obj.msg2!='' && obj.msg2!=undefined && obj.msg2!=null)
		{
			$(".alert-success").show().html(obj.msg2);
		}

		callback(obj);

    }).fail(function(jqXHR, textStatus, errorThrown) {
      	alert('Error: '+errorThrown+'\nOutput: '+jqXHR.responseText)
			
		$(".alert-danger").show().html(jqXHR.responseText);
		fadeout();
    });


}
function fadein()
{
	//$("body").css("background",'#989898').css("opacity",'0.7');			
	//$(".faded").show();
	$("#loadMe").modal({
      backdrop: "static", //remove ability to close modal with click
      keyboard: false, //remove option to close with keyboard
      //show: true //Display loader!
    });
	$('#loadMe').modal('show'); // display the modal
}
function fadeout()
{
	//$("body").show().css("background",'white').css("opacity",'1');
	//$(".faded").hide();
	
	setTimeout(function(){ $("#loadMe").modal("hide")},500);
	//alert('aaaaaaaaa');
}
function exportPDF()
{


	var table = $('#example').DataTable();
	
	//var allData = tables.tables().rows().data();

	var columns = $('#myDataTable').dataTable().dataTableSettings[0].aoColumns;
	var report_title=$('#report_title').html();
	var strheader='';
	
	$.each(columns, function(i,v) {
		if(table.column(i).visible() === true)
	 		strheader+='~'+v.sTitle; 

	});
	var str='';
	var i=0;
	/*var names = tables.rows( function ( idx, data, node ) {
       alert(idx+'---'+data+'>>'+node);
    } ).data();*/
/*alert( 'Column index 0 is '+
    (table.column( 2 ).visible() === true ? 'visible' : 'not visible')
);*/
    table.rows().data().each(function(value, index) {
    	var str1='';
    	$.each(value,function(k,v){
			//console.log(k+'------'+v);
			if(table.column(k).visible() === true)
				str1+='$#'+v;
	});
    	str+='^'+str1;
   // console.log(value);
});

	/*$.each(allData,function(k,v){
			
			if(i==9)
			{
				str+='^'+v;
			}
		
		i++;
	});*/
	//alert(str)
	var base_url=$('#base_url').val();
	
	var url='/'+base_url+'/includes/exportPdf.php';
	var postdata='x=exportpdf&report_data='+str+'&report_header='+strheader+'&report_title='+report_title;
	//alert(postdata)
	ajaxCall(url,postdata,callback);
	function callback(result)
	{
		window.open(result.output, '_blank');
		//window.location.href = result.output; 
		/*$.each(result,function(k,v){
			alert('ram'+k+'--'+v);
		});*/
	}
}