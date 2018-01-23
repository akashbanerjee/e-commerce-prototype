// Akash Banerjee jadrn006 Assignment 4
$(function() {
	cart_data = [];
	var htmlForCheckout = "";
	var cart = new shopping_cart("jadrn006");
	$('.badge').html(cart.size());
	
	

	function isEmpty(fieldValue) {
	        return $.trim(fieldValue).length == 0;    
	}

	function isValidFormData(){
		if(!isValidBillingData()){
			$('#heading-billing-address').find('.payement-header').trigger('click');
			return false;
		}
		if(!isValidShippingData()){
			$('#heading-shipping-address').find('.payement-header').trigger('click');
			return false;
		}
		if(!isValidCreditCardData()){
			return false;
		}

		return true;
	}
	
	function isValidCreditCardExpiration(){
		var currentTime = new Date();
		var month = currentTime.getMonth();
		var year = currentTime.getYear();
		

		if ($('[id="expiration-year"]').val() == year.toString().slice(1,4) && $('[id="expiration-month"]').val() < month+1)
			return false;

		return true;

	}
	function isValidCreditCardData(){

		if(!$('input[name=cc]:checked').val()) {
		      $('#ErrorMessageLine span').text("");
		      $('input[name=cc').addClass("highLightcc")
		      $('#ErrorMessageLine span').text("Please select credit card");
		   	  return false;
		}

		if(isEmpty($('[id="cc-number"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="cc-number"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter credit card");
	      $('[id="cc-number"]').focus();            
	      return false;
	    }

	    if(!$.isNumeric($('[id="cc-number"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="cc-number"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter valid credit card, numbers only");
	      $('[id="cc-number"]').focus();            
	      return false;
	    }

	    if($('[id="cc-number"]').val().length !=16) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="cc-number"]').addClass("error");
	      $('#ErrorMessageLine span').text("Credit card should be of 16 digits");
	      $('[id="cc-number"]').focus();            
	      return false;
    	}

    	if(isEmpty($('[id="expiration-month"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="expiration-month"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter credit card expiration month");
	      $('[id="expiration-month"]').focus();            
	      return false;
	    }

	    if(!$.isNumeric($('[id="expiration-month"]').val()) || $('[id="expiration-month"]').val() > 12) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="expiration-month"]').addClass("error");
	      $('#ErrorMessageLine span').text("Credit card expiration month is invalid");
	      $('[id="expiration-month"]').focus();            
	      return false;
	    }

	    if(isEmpty($('[id="expiration-year"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="expiration-year"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter credit card expiration year");
	      $('[id="expiration-year"]').focus();            
	      return false;
	    }

	    if(!$.isNumeric($('[id="expiration-year"]').val()) || $('[id="expiration-year"]').val() < 17) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="expiration-year"]').addClass("error");
	      $('#ErrorMessageLine span').text("Credit card expiration year is invalid");
	      $('[id="expiration-year"]').focus();            
	      return false;
	    }

	    if(!isValidCreditCardExpiration()){
	    	$('#ErrorMessageLine span').text("");
		    $('[id="expiration-year"] , [id="expiration-month"]').addClass("error");
		    $('#ErrorMessageLine span').text("Your credit card is expired!");
		    $('[id="expiration-month"]').focus();            
		    return false;
	    }
		

	    return true;


	}

	function isValidBillingData() {

		if(isEmpty($('[id="firstName"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="firstName"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter your first name");
	      $('[id="firstName"]').focus();
	      return false;
    	}

    	if(isEmpty($('[id="lastName"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="lastName"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter your last name");
	      $('[id="lastName"]').focus();
	      return false;
    	}

    	if(isEmpty($('[id="inputAddress"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="inputAddress"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter your address");
	      $('[id="inputAddress"]').focus();
	      return false;
    	}

    	if(isEmpty($('[id="inputCity"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="inputCity"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter your city");
	      $('[id="inputCity"]').focus();
	      return false;
    	}

    	if($("#inputState option:selected").val() =="") {
	      $('#ErrorMessageLine span').text("");
	      $('[id="inputState"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please select a state");
	      $('[id="inputState"]').focus();            
	      return false;
	    }

	    if(isEmpty($('[id="inputZip"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="inputZip"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter your zip code");
	      $('[id="inputZip"]').focus();            
	      return false;
	    }

	    if(!$.isNumeric($('[id="inputZip"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="inputZip"]').addClass("error");
	      $('#ErrorMessageLine span').text("The zip code appears to be invalid! Numbers only please.");
	      $('[id="inputZip"]').focus();            
	      return false;
	    }

	    if($('[id="inputZip"]').val().length !=5) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="inputZip"]').addClass("error");
	      $('#ErrorMessageLine span').text("Zip code should be exactly 5 digits");
	      $('[id="inputZip"]').focus();            
	      return false;
    	}

	    if(isEmpty($('[id="areacode"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="areacode"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter an area code of your phone number");
	      $('[id="areacode"]').focus();            
	      return false;
	    }

	    if(!$.isNumeric($('[id="areacode"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="areacode"]').addClass("error");
	      $('#ErrorMessageLine span').text("The area code of phone number appears to be invalid! Numbers only please.");
	      $('[id="areacode"]').focus();            
	      return false;
	    }

	    if($('[id="areacode"]').val().length != 3) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="areacode"]').addClass("error");
	      $('#ErrorMessageLine span').text("The area code must have exactly three digits")
	      $('[id="areacode"]').focus();            
	      return false;
	    }

	    if(isEmpty($('[id="phone1"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="phone1"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter your phone number");
	      $('[id="phone1"]').focus();            
	      return false;
	    }

	    if(!$.isNumeric($('[id="phone1"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="phone1"]').addClass("error");
	      $('#ErrorMessageLine span').text("The phone number appears to be invalid! Numbers only please.");
	      $('[id="phone1"]').focus();            
	      return false;
	    }

	    if($('[id="phone1"]').val().length != 3) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="phone1"]').addClass("error");
	      $('#ErrorMessageLine span').text("The phone number must have exactly three digits")
	      $('[id="phone1"]').focus();            
	      return false;
	    }

	    if(isEmpty($('[id="phone2"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="phone2"]').addClass("error");
	      $('#ErrorMessageLine span').text("Please enter your phone number");
	      $('[id="phone2"]').focus();            
	      return false;
	    }

	    if(!$.isNumeric($('[id="phone2"]').val())) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="phone2"]').addClass("error");
	      $('#ErrorMessageLine span').text("The phone number appears to be invalid! Numbers only please.");
	      $('[id="phone2"]').focus();            
	      return false;
	    }

	    if($('[id="phone2"]').val().length != 4) {
	      $('#ErrorMessageLine span').text("");
	      $('[id="phone2"]').addClass("error");
	      $('#ErrorMessageLine span').text("The phone number must have exactly four digits")
	      $('[id="phone2"]').focus();            
	      return false;
	    }




		return true;

	}

	$(document).on('blur','[id="firstName"]', function() {
        if(isEmpty($('[id="firstName"]').val()))
            return;
        $('[id="firstName"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="lastName"]', function() {
        if(isEmpty($('[id="lastName"]').val()))
            return;
        $('[id="lastName"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur', '[id="inputAddress"]', function() {
        if(isEmpty($('[id="inputAddress"]').val()))
            return;
        $('[id="inputAddress"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="inputCity"]', function() {
        if(isEmpty($('[id="inputCity"]').val()))
            return;
        $('[id="inputCity"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="inputState"]', function() {
        if(isEmpty($('[id="inputState"]').val()))
            return;
        $('[id="inputState"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="inputZip"]', function() {
        if(isEmpty($('[id="inputZip"]').val()) || !$.isNumeric($('[id="inputZip"]').val()) || $('[id="inputZip"]').val().length !=5)
            return;
        $('[id="inputZip"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="areacode"]', function() {
        if(isEmpty($('[id="areacode"]').val()) || !$.isNumeric($('[id="areacode"]').val()) || $('[id="areacode"]').val().length != 3)
            return;
        $('[id="areacode"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="phone1"]', function() {
        if(isEmpty($('[id="phone1"]').val()) || !$.isNumeric($('[id="phone1"]').val()) || $('[id="phone1"]').val().length != 3)
            return;
        $('[id="phone1"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="phone2"]', function() {
        if(isEmpty($('[id="phone2"]').val()) || !$.isNumeric($('[id="phone2"]').val()) || $('[id="phone2"]').val().length != 4)
            return;
        $('[id="phone2"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });

   $(document).on('blur','[id="expiration-month"]', function() {
        if(isEmpty($('[id="expiration-month"]').val()) || !$.isNumeric($('[id="expiration-month"]').val()) || $('[id="expiration-month"]').val() > 12 || !isValidCreditCardExpiration())
            return;
        $('[id="expiration-month"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });

   $(document).on('blur','[id="expiration-year"]', function() {
        if(isEmpty($('[id="expiration-year"]').val()) || !$.isNumeric($('[id="expiration-year"]').val()) || $('[id="expiration-year"]').val() < 17 || !isValidCreditCardExpiration())
            return;
        $('[id="expiration-year"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });

   $(document).on('blur','[id="cc-number"]', function() {
        if(isEmpty($('[id="cc-number"]').val()) || !$.isNumeric($('[id="cc-number"]').val()) || $('[id="cc-number"]').val().length != 16)
            return;
        $('[id="cc-number"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });

	$(document).on('blur','[name="cc"]', function() {
	        if(isEmpty($('[name="cc"]').val()))
	            return;
	        $('[name="cc"]').removeClass("error");
	        $('#ErrorMessageLine span').text("");
	});

	$(document).on('click', 'input[name=cc]', function(event) {
  
	    $('input[name=cc').removeClass("highLightcc")
	    $('#ErrorMessageLine span').text("");

   });

   $(document).on('keyup', '[id="areacode"]', function() {
        if($('[id="areacode"]').val().length == 3)
            $('[id="phone1"]').focus();
    });

   $(document).on('keyup', '[id="phone1"]',function() {
        if($('[id="phone1"]').val().length == 3)
            $('[id="phone2"]').focus();
    });


	function isValidShippingData() {
		if($('input[type=checkbox][name=sameAsBilling]').prop('checked')==true){
			return true;
		}
		
			if(isEmpty($('[id="shippingfirstName"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingfirstName"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please enter your first name");
		      $('[id="shippingfirstName"]').focus();
		      return false;
	    	}

	    	if(isEmpty($('[id="shippinglastName"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippinglastName"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please enter your last name");
		      $('[id="shippinglastName"]').focus();
		      return false;
	    	}

	    	if(isEmpty($('[id="shippinginputAddress"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippinginputAddress"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please enter your address");
		      $('[id="shippinginputAddress"]').focus();
		      return false;
	    	}

	    	if(isEmpty($('[id="shippinginputCity"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippinginputCity"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please enter your city");
		      $('[id="shippinginputCity"]').focus();
		      return false;
	    	}

	    	if($("#shippinginputState option:selected").val() =="") {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippinginputState"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please select a state");
		      $('[id="shippinginputState"]').focus();            
		      return false;
		    }

		    if(isEmpty($('[id="shippinginputZip"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippinginputZip"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please enter your zip code");
		      $('[id="shippinginputZip"]').focus();            
		      return false;
		    }

		    if(!$.isNumeric($('[id="shippinginputZip"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippinginputZip"]').addClass("error");
		      $('#ErrorMessageLine span').text("The zip code appears to be invalid! Numbers only please.");
		      $('[id="shippinginputZip"]').focus();            
		      return false;
		    }

		    if($('[id="shippinginputZip"]').val().length !=5) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippinginputZip"]').addClass("error");
		      $('#ErrorMessageLine span').text("Zip code should be exactly 5 digits");
		      $('[id="shippinginputZip"]').focus();            
		      return false;
	    	}

		    if(isEmpty($('[id="shippingareacode"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingareacode"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please enter an area code of your phone number");
		      $('[id="shippingareacode"]').focus();            
		      return false;
		    }

		    if(!$.isNumeric($('[id="shippingareacode"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingareacode"]').addClass("error");
		      $('#ErrorMessageLine span').text("The area code of phone number appears to be invalid! Numbers only please.");
		      $('[id="shippingareacode"]').focus();            
		      return false;
		    }

		    if($('[id="shippingareacode"]').val().length != 3) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingareacode"]').addClass("error");
		      $('#ErrorMessageLine span').text("The area code must have exactly three digits")
		      $('[id="shippingareacode"]').focus();            
		      return false;
		    }

		    if(isEmpty($('[id="shippingphone1"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingphone1"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please enter your phone number");
		      $('[id="shippingphone1"]').focus();            
		      return false;
		    }

		    if(!$.isNumeric($('[id="shippingphone1"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingphone1"]').addClass("error");
		      $('#ErrorMessageLine span').text("The phone number appears to be invalid! Numbers only please.");
		      $('[id="shippingphone1"]').focus();            
		      return false;
		    }

		    if($('[id="shippingphone1"]').val().length != 3) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingphone1"]').addClass("error");
		      $('#ErrorMessageLine span').text("The phone number must have exactly three digits")
		      $('[id="shippingphone1"]').focus();            
		      return false;
		    }

		    if(isEmpty($('[id="shippingphone2"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingphone2"]').addClass("error");
		      $('#ErrorMessageLine span').text("Please enter your phone number");
		      $('[id="shippingphone2"]').focus();            
		      return false;
		    }

		    if(!$.isNumeric($('[id="shippingphone2"]').val())) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingphone2"]').addClass("error");
		      $('#ErrorMessageLine span').text("The phone number appears to be invalid! Numbers only please.");
		      $('[id="shippingphone2"]').focus();            
		      return false;
		    }

		    if($('[id="shippingphone2"]').val().length != 4) {
		      $('#ErrorMessageLine span').text("");
		      $('[id="shippingphone2"]').addClass("error");
		      $('#ErrorMessageLine span').text("The phone number must have exactly four digits")
		      $('[id="shippingphone2"]').focus();            
		      return false;
		    }
		

		return true;
	}

	$(document).on('blur','[id="shippingfirstName"]', function() {
        if(isEmpty($('[id="shippingfirstName"]').val()))
            return;
        $('[id="shippingfirstName"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="shippinglastName"]', function() {
        if(isEmpty($('[id="shippinglastName"]').val()))
            return;
        $('[id="shippinglastName"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur', '[id="shippinginputAddress"]', function() {
        if(isEmpty($('[id="shippinginputAddress"]').val()))
            return;
        $('[id="shippinginputAddress"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="shippinginputCity"]', function() {
        if(isEmpty($('[id="shippinginputCity"]').val()))
            return;
        $('[id="shippinginputCity"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="shippinginputState"]', function() {
        if(isEmpty($('[id="shippinginputState"]').val()))
            return;
        $('[id="shippinginputState"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="shippinginputZip"]', function() {
        if(isEmpty($('[id="shippinginputZip"]').val()) || !$.isNumeric($('[id="shippinginputZip"]').val()) || $('[id="shippinginputZip"]').val().length !=5)
            return;
        $('[id="shippinginputZip"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="shippingareacode"]', function() {
        if(isEmpty($('[id="shippingareacode"]').val()) || !$.isNumeric($('[id="shippingareacode"]').val()) || $('[id="shippingareacode"]').val().length != 3)
            return;
        $('[id="shippingareacode"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="shippingphone1"]', function() {
        if(isEmpty($('[id="shippingphone1"]').val()) || !$.isNumeric($('[id="shippingphone1"]').val()) || $('[id="shippingphone1"]').val().length != 3)
            return;
        $('[id="shippingphone1"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });
   $(document).on('blur','[id="shippingphone2"]', function() {
        if(isEmpty($('[id="shippingphone2"]').val()) || !$.isNumeric($('[id="shippingphone2"]').val()) || $('[id="shippingphone2"]').val().length != 4)
            return;
        $('[id="shippingphone2"]').removeClass("error");
        $('#ErrorMessageLine span').text("");
    });

   $(document).on('keyup', '[id="shippingareacode"]', function() {
        if($('[id="shippingareacode"]').val().length == 3)
            $('[id="shippingphone1"]').focus();
    });

   $(document).on('keyup', '[id="shippingphone1"]',function() {
        if($('[id="shippingphone1"]').val().length == 3)
            $('[id="shippingphone2"]').focus();
    });

   $(document).on('keyup', '[id="expiration-month"]',function(){
   		if($('[id="expiration-month"]').val().length == 2)
   			$('[id="expiration-year"]').focus();
   });

   // $(document).on('change', '[id="cc-number"]',function(){
   // 		if($('[id="cc-number"]').val().length == 4 || $('[id="cc-number"]').val().length == 9 || $('[id="cc-number"]').val().length == 14 ){
   // 			console.log("keypress");
   // 			$('[id="cc-number"]').val($('[id="cc-number"]').val()+" ");
   			
   // 		}
   			
   // });





  


	

	$(document).on('change','input[type=checkbox][name=sameAsBilling]', function(){
		console.log("Clicking checkbox");
		if(isValidBillingData() && $('input[type=checkbox][name=sameAsBilling]').prop('checked')==true){
			console.log("inside disabling inputs and copyoign data");
			$('#orderForm').find("*").removeClass('error');
			$('#ErrorMessageLine span').text("");
			copyingBilling();
		}

		else if(isValidBillingData() && $('input[type=checkbox][name=sameAsBilling]').prop('checked')==false){
			console.log("inside clearning data and enabling inputs");
			clearingShipping();
		}
	});

	function clearingShipping(){
			$('#shippingfirstName').prop('disabled',false);
			$('#shippinglastName').prop('disabled',false);
			$('#shippinginputAddress').prop('disabled',false);
			$('#shippinginputAddress2').prop('disabled',false);
			$('#shippinginputCity').prop('disabled',false);
			$('#shippinginputState').prop('disabled',false);
			$('#shippinginputZip').prop('disabled',false);
			$('#shippingareacode').prop('disabled',false);
			$('#shippingphone1').prop('disabled',false);
			$('#shippingphone2').prop('disabled',false);
			$('#shippingfirstName').val("");
			$('#shippinglastName').val("");
			$('#shippinginputAddress').val("");
			$('#shippinginputAddress2').val("");
			$('#shippinginputCity').val("");
			$('#shippinginputState').val("");
			$('#shippinginputZip').val("");
			$('#shippingareacode').val("");
			$('#shippingphone1').val("");
			$('#shippingphone2').val("");
	}
	function copyingBilling(){
		$('#shippingfirstName').val($('#firstName').val());
			$('#shippinglastName').val($('#lastName').val());
			$('#shippinginputAddress').val($('#inputAddress').val());
			$('#shippinginputAddress2').val($('#inputAddress2').val());
			$('#shippinginputCity').val($('#inputCity').val());
			$('#shippinginputState').val($('#inputState').val());
			$('#shippinginputZip').val($('#inputZip').val());
			$('#shippingareacode').val($('#areacode').val());
			$('#shippingphone1').val($('#phone1').val());
			$('#shippingphone2').val($('#phone2').val());
			$('#shippingfirstName').prop('disabled',true);
			$('#shippinglastName').prop('disabled',true);
			$('#shippinginputAddress').prop('disabled',true);
			$('#shippinginputAddress2').prop('disabled',true);
			$('#shippinginputCity').prop('disabled',true);
			$('#shippinginputState').prop('disabled',true);
			$('#shippinginputZip').prop('disabled',true);
			$('#shippingareacode').prop('disabled',true);
			$('#shippingphone1').prop('disabled',true);
			$('#shippingphone2').prop('disabled',true);
	}


	$('#home, #shop-name').on('click', function(event){
		$('.active-page').removeClass('active-page');
		$('#home').addClass('active-page');
		$('.mainPage').show();
		$('#OrderPage').hide();
		$('#AboutPage').hide();
		$('#ProductsPage').hide();
		$('#ContactsPage').hide();
	})
	
	$(document).on('click', '#products', function(e){
		/* Act on the event */
		
		$('.active-page').removeClass('active-page');
		$('#products').addClass('active-page');
		$('.mainPage').hide();
		$('#OrderPage').hide();
		$('#AboutPage').hide();
		$('#ContactsPage').hide();
		$('#ProductsPage').show();
		$('#products-page-content').html(entire_data_arranged);
		$('#products-header').html("View Our Delicious Products!");
		$('html, body').animate({ scrollTop: 0 }, 0);
		$('#all_products').prop("checked", true);

	});

	$('.checkoutbutton').on('click', function(event){
		$('.active-page').removeClass('active-page');
		$('#order-online').addClass('active-page');
		$('#product-modal').modal('hide');
		$('.mainPage').hide();
		$('#OrderPage').show();
		$('#AboutPage').hide();
		$('#ContactsPage').hide();
		$('#ProductsPage').hide();

		showCartDetails(cart);
	});

	$('.order').on('click', function(event){
		$('.active-page').removeClass('active-page');
		$('#order-online').addClass('active-page');
		$('.mainPage').hide();
		$('#OrderPage').show();
		$('#AboutPage').hide();
		$('#ContactsPage').hide();
		$('#ProductsPage').hide();
		showCartDetails(cart);

	});

	$(document).on('click','.select-christmas', function(){

		$('.active-page').removeClass('active-page');
		$('#products').addClass('active-page');
		$('.mainPage').hide();
		$('#OrderPage').hide();
		$('#AboutPage').hide();
		$('#ContactsPage').hide();
		$('#ProductsPage').show();
		$('#products-page-content').html(holiday_assortments);
		$('#products-header').html("Christmas special holiday assortments!");
		$('html, body').animate({ scrollTop: 0 }, 0);
		$('#holiday').prop("checked", true);
	});

	$(document).on('click', '#aboutus', function(e){
		$('.active-page').removeClass('active-page');
		$('#aboutus').addClass('active-page');
		$('.mainPage').hide();
		$('#OrderPage').hide();
		$('#AboutPage').show();
		$('#ContactsPage').hide();
		$('#ProductsPage').hide();
	});

	$(document).on('click', '#contact', function(e){
		$('.active-page').removeClass('active-page');
		$('#contact').addClass('active-page');
		$('.mainPage').hide();
		$('#OrderPage').hide();
		$('#AboutPage').hide();
		$('#ContactsPage').show();
		$('#ProductsPage').hide();
	});




	

	//On clicking of product categories
	$('input[type=radio][name=category]').change(function() {
		if(this.value == "All Products"){
			$('#products-page-content').html(entire_data_arranged);
			$('#products-header').html("View Our Delicious Products!");
		}

		if(this.value == "Milk Chocolate"){
			$('#products-page-content').html(milk_chocolates);
			$('#products-header').html("Milk Chocolates!");
		}
		if(this.value == "Dark Chocolate"){
			$('#products-page-content').html(dark_chocolates);
			$('#products-header').html("Dark Chocolates!");
		};
		if(this.value == "Nuts and Chews"){
			$('#products-page-content').html(nuts_and_chews);
			$('#products-header').html("Nuts and Chews!");
		};
		if(this.value == "Brittles and Toffies"){
			$('#products-page-content').html(brittles_and_toffies);
			$('#products-header').html("Brittles and Toffies!");
		};
		if(this.value == "Truffles"){
			$('#products-page-content').html(truffles);
			$('#products-header').html("Truffles!");
		};
		if(this.value == "Gifts"){
			$('#products-page-content').html(gifts);
			$('#products-header').html("Gifts!");
		};
		if(this.value == "Holiday Assortments"){
			$('#products-page-content').html(holiday_assortments);
			$('#products-header').html("Christmas special holiday assortments!");
		};
	});


	//On clicking add to cart in products page open and load modal
	
	$(document).on('click', '.addtoCartModal', function(e){

        var elements = $(this).parent().siblings();
        var long_desc = $(this).attr("data-long");
        var category = $(this).attr("data-category");
        var sku = $(this).attr("name");
        var short_desc = elements[2].innerHTML;
        var img_url = elements[0].innerHTML;
        var img_heading = elements[1].innerHTML;
        var retail_price = $(this).prev("div").text();

      	$('#product-modal').show();
     	$('.item-added-msg').hide();
     	$("[name='quantity']").val('1');
        $('#product-modal .modal-title').html(img_heading);
        $('#product-modal .modal-body .info-box-images').html(img_url);
        $('#product-modal .modal-body .category').html("<span>Category:</span> "+category);
        $('#product-modal .modal-body .short-desc').html("<span>Description:</span> " +short_desc);
        $('#product-modal .modal-body .long-desc').html("<span>Detail:</span> "+long_desc);
        $('#product-modal .modal-body .cost').html(retail_price);
       
        $(document).off('click','.buy').on('click', '.buy', function(e){  
        	var element = $(this).parent().prev('.modal-body');
        	console.log(element);
            addCart(sku);
            function addCart(sku){
		      
		        var quantity = $("[name='quantity']").val();
		        cart.add(sku,quantity);
		        $('.badge').html(cart.size());
		        //Reference: https://www.codexworld.com/fly-to-cart-effect-using-jquery/
		        var imgclone = $(element).find('img').clone();
		        var imgpos = $(element).find('img');
		        var flyingTo = $('#cart-logo');
		        var divider = 3;
		        console.log(imgclone);
		        $(imgclone).css({position:'absolute', top: $(imgpos).offset().top+"px",left: $(imgpos).offset().left + "px", opacity: 1, 'z-index': 1000 });
		        $('body').append($(imgclone));
		        var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(imgpos).width()/divider)/2;
    			var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(imgpos).height()/divider)/2;
    			$('#product-modal').modal('hide');
    			$(imgclone).animate({
    				opacity : 0.4,
    				left:gotoX,
    				top:gotoY,
    				width: $(imgpos).width()/divider,
			        height: $(imgpos).height()/divider
			    }, 700,
			    function function_name() {

			    	$(flyingTo).fadeOut('fast', function () {
		            $(flyingTo).fadeIn('fast', function () {
		                $(imgclone).fadeOut('fast', function () {
		                    $(imgclone).remove();
		                });
		            });
		        });
			    }
    			);
		        
			}
        
        });      
        
                    
    });	

    //To erase modal content on modal close
	$(document).on('click', '.close', function(){
		eraseModalContent();
	});

	function eraseModalContent(){
    $('.modal-title').html();
        $('.modal-body .info-box-images').html();
        $('.modal-body .category').html();
        $('.modal-body .short-desc').html();
        $('.modal-body .long-desc').html();
        $('.modal-body .cost').html();
	}

	function showCartDetails(cart){

		cookie_data = cart.getCartArray();
		cart_data = [];
		console.log("cookie data is ", cookie_data);
		for(var i=0; i< cookie_data.length; i++)
		{
			for(var j=0; j< entire_data.length; j++){
				if(entire_data[j][0] == cookie_data[i][0]){
					cart_data[i] = new Array();
					cart_data[i].push(entire_data[j]);
					cart_data[i].push(cookie_data[i][1]);
					break;
				}
			}

		}

		console.log("fetched entire data of cookie is ", cart_data);
		
		//Now printing Cart details
		htmlForCheckout = "";
		tmpString = "";
		tmpString +="<div class=\"container\"><div class=\"row\"><div class=\"col-md-8 cart-head\"><h3>My Cart</h3>";
		for(var i = 0; i<cart_data.length; i++){
			tmpString+="<div class=\"item row\"><div class=\"col-md-4\"><img src=\"/~jadrn000/PROJ4_IMAGES/"+cart_data[i][0][0]+".jpg\" alt=\""+cart_data[i][0][2]+"\""+" width=\"200px\"/></div><div class=\"col-md-6\"><div class=\"item-checkout-details\">"+cart_data[i][0][2]+"<div class=\"item-checkout-category\">Category: "+cart_data[i][0][1]+"</div><div class=\"item-checkout-price\">$"+cart_data[i][0][6]+"</div></div><div class=\"item-checkout-quantity\"><div class=\"quantity\">Quantity: <input type=\"number\" class=\"input-checkout-quantity\" id = \""+cart_data[i][0][0]+"\" value=\""+cart_data[i][1]+"\" maxlength=\"3\"/><button class=\"btn remove-item btn-danger\" id = \""+cart_data[i][0][0]+"\">Remove</button></div></div></div></div>";
		}
		tmpString+="</div>"
			
		//Now printing cost
		var tax = 0.08;
		var shippin = 2;
		var item_total = 0;
		var total_cost = 0;

		for(var i=0; i< cart_data.length; i++){
			item_total+=cart_data[i][0][6]*cart_data[i][1];
		}

		tax = tax * item_total;
		total_cost = tax + item_total + shippin;
			

		tmpString+="<div class=\"col-md-4\"><div class=\"order-summary\"><h3>Payment Details</h3><div id= \"item-cost\">Items Price <span class=\"float-right\">$ "+item_total.toFixed(2)+"</span></div><div id=\"tax\">Tax (8%) <span class=\"float-right\">$ "+tax.toFixed(2)+"</span></div><div id=\"shipping\">Shipping<span class=\"float-right\">$ "+shippin.toFixed(2)+"</span></div><div id=\"total-cost\">Total Cost <span class=\"float-right\">$ "+total_cost.toFixed(2)+"</span></div>";
		tmpString +="<button class=\"btn proceed-checkout\">Proceed To Checkout</button>";
		tmpString += "</div></div></div></div>";
		
		htmlForCheckout = tmpString;

		console.log(htmlForCheckout);
		if(cookie_data.length != 0)
			$('#OrderPage').html(htmlForCheckout);
		else
			$('#OrderPage').html("<div class=\"empty-cart-greet\"><img src=\"images/empty-cart-page.png\" alt=\"Empty Cart\" /><div class=\"empty-bag-text\">YOUR CART IS EMPTY</div><span>Hope to see you soon!</span><button class=\"btn\" id=\"products\">Continue Shopping</button></div>");


	}

	$(document).off('focusout','.input-checkout-quantity').on('focusout', '.input-checkout-quantity', function(e){
		var input = $(this);
		var sku = $(this).attr("id");
		var quantity = $(this).val();
		//console.log("To update sku ", sku, " to quantity ", quantity);

		updateCart(sku,quantity);
        function updateCart(sku,quantity){
		      
	      
	        cart.setQuantity(sku,quantity);
	        for(var i=0; i<cookie_data.length; i++){
	        	if(cookie_data[i][0] == sku){
	        		console.log("Setting cookie data ", cookie_data[i][1], ' to ', quantity);
	        		cookie_data[i][1] = quantity;
	        		break;
	        	}
	        }

	        $('.badge').html(cart.size());
	        if(quantity == 0){
	       	 $(input).siblings('.remove-item').trigger('click');
	        }

		}
		showCartDetails(cart);
	});

	//Reference https://stackoverflow.com/questions/17209180/jquery-keyup-function-check-if-number
	$(document).on('keypress', '.input-checkout-quantity', function(event){
		if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
		           event.preventDefault(); //stop character from entering input
		       }
	});



	$(document).off('click', '.remove-item').on('click','.remove-item', function(e){
		var sku = $(this).attr("id");
		cart.delete(sku);
		for(var i=0; i<cookie_data.length; i++){
	        	if(cookie_data[i][0] == sku){
	        		console.log("Removing cookie data ", cookie_data[i][1], ' to '. quantity);
	        		cookie_data.splice(i,1);
	        		break;
	        	}
	        }
		$('.badge').html(cart.size());
		showCartDetails(cart);


	});

	//JS code for ordering form
	//Modal Open on click of Proceed to checkout
	$(document).off('click', '.proceed-checkout').on('click', '.proceed-checkout', function(event){
		console.log("clicked order modal");
		$('#order-modal').modal('show');

	});

	//JS form validation while clicking next button
	$(document).on('click','#billing-save',function(){
		if(isValidBillingData()){
			$('input[type=checkbox][name=sameAsBilling]').prop('disabled',false);
			$(this).parent().parent().parent().next().find('.payement-header').trigger('click');

		}
		
	});

	$(document).on('click','#shipping-save',function(){
		if(isValidShippingData()){
			$('#orderForm').find("*").removeClass('error');
			$('#ErrorMessageLine span').text("");
			$(this).parent().parent().parent().next().find('.payement-header').trigger('click');
		}
	});

	$('#order-modal .btn-danger').click(function(event) {

	  $('#orderForm').find("*").removeClass('error');
	  $('#ErrorMessageLine span').text("");
	  $('input[type=checkbox][name=sameAsBilling]').prop('disabled',true);
	  clearingShipping();
	});

	$(document).on('hidden.bs.modal', '#order-modal',function(){
		$('#orderForm').find("*").removeClass('error');
		$('#ErrorMessageLine span').text("");
	  $('#order-modal .btn-danger').trigger('click');
	});


	//JS for Order Modal Form 
	$(document).on('click', '#order-modal .payement-header',function(e){

		// if($(this).parent().parent().attr('id')=='heading-billing-address' && !isValidBillingData()){
		// 	console.log("Clearing shipping");
		// 	clearingShipping();
		// 	$('input[type=checkbox][name=sameAsBilling]').prop('checked',false);
		// }
		
		jQuery.each($('#order-modal .payement-header') ,function(index, el) {
			
			if($(el).hasClass('collapsed')){
				$(el).css("color","rosybrown");
				$(el).find('svg').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-right');
			}

			else if (!$(el).hasClass('collapsed')){
				$(el).css("color","#826868");
				
				$(el).find('svg').removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-down');
			}
		});

	});


	//JS for insert data and confirmation page
	$(document).on('click','.formSubmit', function(event){
		event.preventDefault();
	

		//$('#orderForm').submit();
		if(isValidFormData()){
			$.get('/perl/jadrn006/insertrecord.cgi', showConfirmation);
			function showConfirmation(response){
				console.log("Confirmed");

				//Clearning Cookie and updating cart
				document.cookie = this.owner + "= ;expires=-1;path=/";
				cart = new shopping_cart("jadrn006");
				$('.badge').html(cart.size());
				console.log("cart: ",cart.size());
				eraseModalContent();
				$('#order-modal').modal('hide');
				var credit_card = $('#cc-number').val();
				credit_card = credit_card.substr(credit_card.length-4);
				//Print confirmation here
				$('#OrderPage .cart-head h3').text("Order Confirmed!");
				$('#OrderPage .cart-head h3').after("<span id=\"delivery-date\">Your Order will be delivered within 5 business days</span>");
				$('input[type=number][class="input-checkout-quantity"]').prop('disabled',true);
				$('#OrderPage .remove-item').remove();
				$('#OrderPage .order-summary h3').text("Details");
				$('#OrderPage .proceed-checkout').remove();
				$('#OrderPage .order-summary').append("<div id=\"card-details\">Card: XXXX-XXXX-XXXX-"+ credit_card+"</div><div id=\"card-expire\">Expiration: "+$('#expiration-month').val()+"/"+$('#expiration-year').val()+"</div><div id=\"shipping-address\">Shipping Address: "+$('#shippingfirstName').val()+" "+$('#shippinglastName').val()+" "+$('#shippinginputAddress').val()+$('#shippinginputAddress2').val()+$('#shippinginputCity').val()+" "+$('#shippinginputState').val()+" "+$('#shippinginputZip').val()+" Phone: ("+$('#shippingareacode').val()+") "+$('#shippingphone1').val()+"-"+$('#shippingphone2').val()+"</div>")



				//$('#OrderPage').html("<div class=\"container\"><div class=\"row\"></div></div>");




			}
		}
		
	});


});