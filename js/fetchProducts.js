//Akash Banerjee jadrn006 Assignment 4
var entire_data, entire_data_arranged, milk_chocolates, dark_chocolates, nuts_and_chews, brittles_and_toffies, truffles, gifts, holiday_assortments, home_page_random_data, christmas_special ;
var cookie_data,cart_data;

$(function() {

	//Initialize all window objects

	entire_data = new Array();
	entire_data_arranged = "";
	milk_chocolates = "";
	dark_chocolates = "";
	nuts_and_chews = "";
	brittles_and_toffies = "";
	truffles = "";
	gifts = "";
	holiday_assortments = "";
	cookie_data = "";
	home_page_random_data = "";
	christmas_special = "";
	

	//Fetch entire data in an array
	$.get('/perl/jadrn000/proj4/get_products.cgi', storeData);

	function storeData(response) {
	    var tmpArray = explodeArray(response,';');
	    for(var i=0; i < tmpArray.length; i++) {
	        innerArray = explodeArray(tmpArray[i],'|');
	        entire_data[i] = innerArray;
	        }
	    storeIndividualData();

    }

	// from http://www.webmasterworld.com/forum91/3262.htm            
	function explodeArray(item,delimiter) {
		tempArray=new Array(1);
		var Count=0;
		var tempString=new String(item);

		while (tempString.indexOf(delimiter)>0) {
		tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
		tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
		Count=Count+1
		}

		tempArray[Count]=tempString;
		return tempArray;
	}   

	//Iterate over entire data and store individual data in String ready to display on dom
	function storeIndividualData(){
		var milktemp = [], darktemp = [], nutstemp = [], brittlestemp = [], trufflestemp = [], giftstemp = [], holidaystemp = [], entire_data_arranged_temp = [], home_page_random_data_temp=[];


		for(var i=0; i < entire_data.length-1; i++) {

			entire_data_arranged_temp.push(entire_data[i]);

			if(entire_data[i][1] == "Milk chocolate") {
				milktemp.push(entire_data[i]);		
			}

			else if(entire_data[i][1] == "Dark chocolate") {
				darktemp.push(entire_data[i]);	
			}

			else if(entire_data[i][1] == "Nuts and chews") {
				nutstemp.push(entire_data[i]);	
			}

			else if(entire_data[i][1] == "Brittles and toffies") {
				brittlestemp.push(entire_data[i]);	
			}

			else if(entire_data[i][1] == "Truffles") {
				trufflestemp.push(entire_data[i]);	
			}

			else if(entire_data[i][1] == "Gifts") {
				giftstemp.push(entire_data[i]);		
			}

			else if(entire_data[i][1] == "Holiday assortments") {
				holidaystemp.push(entire_data[i]);	
			}

		}

		var randomarr = [];
		while (randomarr.length < 4){
			var randomnumber = Math.floor(Math.random()*(entire_data.length-2)) + 1;
		    if(randomarr.indexOf(randomnumber) > -1) continue;
		    randomarr[randomarr.length] = randomnumber

		    home_page_random_data_temp.push(entire_data[randomnumber]);
		}


		
		entire_data_arranged = constructString(entire_data_arranged_temp);
		milk_chocolates = constructString(milktemp);
		dark_chocolates = constructString(darktemp);
		nuts_and_chews = constructString(nutstemp);
		brittles_and_toffies = constructString(brittlestemp);
		truffles = constructString(trufflestemp);
		gifts = constructString(giftstemp);
		holiday_assortments = constructString(holidaystemp);
		home_page_random_data = constructString(home_page_random_data_temp);
		
		
		$('[id="random-products"]').html(home_page_random_data);
		
		//Function for constructing String for chocolate categories to display to dom
		function constructString(data){
			tmpString = "";
	        tmpString = "<div class = 'container-data'>";
	        tmpString += "<div class = 'data-box' >";
	        tmpString += "<div class = 'info-flex-container'>";

	        for(var i=0; i < data.length; i++) {

	            tmpString+="<div class = 'info-box' id= '"+data[i][0]+"'>";

	            tmpString += "<div class='info-box-images'><img src=\"/~jadrn000/PROJ4_IMAGES/"+data[i][0]+".jpg\" alt=\""+data[i][2]+"\""+" width=\"200px\"  /></div>";            
	               
	                
	            tmpString += "<div class = 'info-box-heading'>"+data[i][2] + "</div>";
	            tmpString += "<div class = 'info-box-short-desc'>"+data[i][3] + "</div>";
	               
	            tmpString += "<div class = 'info-box-price'><div class=\"price\">$"+data[i][6] + "</div>";
	                
	               
	            tmpString += "<button class='btn btn-default home-page-buttons addtoCartModal' data-toggle=\"modal\" data-target=\".bd-example-modal-lg\" name=\""+data[i][0]+"\" data-long = \""+data[i][4]+"\" data-category = \""+data[i][1]+"\"><i class=\"fas fa-shopping-cart\"></i>Add to Cart</button></div>";
	              
	               
	            tmpString+='</div>';         
	            }
	        
	        tmpString+="</div></div></div>";

	        return tmpString;
		}
	}

	});






