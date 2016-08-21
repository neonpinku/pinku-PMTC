$(document).ready(function(){
	
	/** clones the main done in html for Game 1 for games 2-5 **/
	for (i=1; i <= 4; i++) {
		var mainClone = $("#panels > div.main:nth-child(1)").clone();
		$("#panels > div.main:nth-child(1)").after(mainClone);
	};
	
	/* load any saved inputs */
	$('#div-thread-info input').each(function(e){
		var key = $(this).attr('id');
		var value = localStorage.getItem(key);
		if (value !== null) {
			$(this).val(value);
		}
	});
	
	for (i=1; i <= 5; i++) {
		$('#panels > .main:nth-child('+i+') input').each(function(e){
			var key = i+"_"+$(this).attr('class');
			var value = localStorage.getItem(key);
			if (value !== null) {
				$(this).val(value);
			}
		});
		$('#panels > .main:nth-child('+i+') select').each(function(e){
			console.log("Found a select: " + $(this));
			var key = i+"_"+$(this).attr('class');
			console.log("Class " + key);
			var value = localStorage.getItem(key);
			console.log("Value stored for this select is " + value);
			if (value !== null && value !== '' && value !== 'null') {
				$(this).append('<option selected="selected" value="'+value+'">'+value+'</option>');
			}
		});
	}
	
	$('.drag-counter').data("drag-counter", 0);
	$('#series-result').data("blue-score", 0);
	$('#series-result').data("red-score", 0);
	
	/** copy button */
	var clipboard = new Clipboard('button.btn');
	
	clipboard.on('success', function(e) {
		e.clearSelection();
		$("body").scrollTop(0);
	});
	
	clipboard.on('error', function(e) {
		alert("Error copying! Use control+c instead");
	});

	$(":input").inputmask();
	$("#fade").removeClass('hidden');
	$("#loading-teams-popup").removeClass('hidden');
	
	var myEvent = window.attachEvent || window.addEventListener;
	var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compatable

	myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
		var someInput = '#create input[type=text]';
		$(someInput).each(function(){
			console.log($(this));
			if ($(this).val() != '') {
				var confirmationMessage = 'Warning: You will lose all inputs you did!';  // a space
				(e || window.event).returnValue = confirmationMessage;
				return confirmationMessage;
			}
		});
	});
});

// Before refreshing the page, save the form data to localStorage
window.onbeforeunload = function() {
	$('#div-thread-info input').each(function(e){
		var key = $(this).attr('id');
		var val = $(this).val();
		localStorage.setItem(key, val);
	});
	for (i=1; i <= 5; i++) {
		$('#panels > .main:nth-child('+i+') input').each(function(e){
			var key = i+"_"+$(this).attr('class');
			var val = $(this).val();
			localStorage.setItem(key, val);
		});
		$('#panels > .main:nth-child('+i+') select').each(function(e){
			console.log("Storing some select value: " + $(this).val());
			if ($(this).val() !== '') {
				var key = i+"_"+$(this).attr('class');
				var val = $(this).val();
				localStorage.setItem(key, val);
			}
		});
	}
	
}

var TEAMS = {};

//$.post("../php/getJSON.php",
//    {feed: "https://docs.google.com/spreadsheet/pub?key=0AneWTc0o_1bpdEVVczlDckt2aXpmX0tRUU01eUZMX3c&single=true&gid=8&output=csv"}).done(function(d) {
//$.getJSON("https://docs.google.com/spreadsheets/d/1Fy4QRab0v4zStSal7zVs1R2JIjnAZO5otcUr-luj1HQ/pub?single=true&gid=8&alt=json").done(function(d) {
$.ajax({
    url: "/csv/teams.csv",
    async: false,
    success: function (csvd) {
		console.log(csvd);
        csvdata = $.csv.toArray(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 

		console.log(JSON.stringify(csvdata));

		for (i in d) {
			TEAMS[csvdata[i]["INITIALS"]] = csvdata[i];
		}
	
	var playoffsText = " Playoffs";
	var promotionsText = "Promotion";
	
	var currentTime = new Date();
	
	var year = currentTime.getFullYear();
	
	var month = currentTime.getMonth() + 1;
	
	var currentSplit = "";
	
	var promotionYear = year;
	var promotionSplit = "";
	
	if (month >= 1 && month <= 4) {
		currentSplit = "Spring";
		promotionSplit = "Summer";
	} else if (month >= 5 && month <= 8) {
		currentSplit = "Summer";
		promotionYear++;
		promotionSplit = "Spring";
	}

	var eventInfos = [];
	eventInfos["eulcs"] = [];
	eventInfos["eulcs"]["name"] = "EU LCS "+year+" "+currentSplit;
	eventInfos["eulcs"]["name_playoffs"] = "EU LCS "+year+" "+currentSplit+ playoffsText;
	eventInfos["eulcs"]["lolesports"] = "http://www.lolesports.com/en_US/eu-lcs";
	eventInfos["eulcs"]["esportswikis"] 			= "http://lol.esportswikis.com/wiki/League_Championship_Series/Europe/"+year+"_Season/"+currentSplit+"_Season";
	eventInfos["eulcs"]["esportswikis_playoffs"] 	= "http://lol.esportswikis.com/wiki/League_Championship_Series/Europe/"+year+"_Season/"+currentSplit+"_Playoffs";
	
	eventInfos["eulcs_promotion"] = [];
	eventInfos["eulcs_promotion"]["name"] = "EU LCS "+promotionYear+" "+promotionSplit+" "+promotionsText;
	eventInfos["eulcs_promotion"]["lolesports"] = "http://www.lolesports.com/en_US/eu-lcs";
	eventInfos["eulcs_promotion"]["esportswikis"] = "http://lol.esportswikis.com/wiki/League_Championship_Series/Europe/"+promotionYear+"_Season/"+promotionSplit+"_Promotion";
	
	eventInfos["nalcs"] = [];
	eventInfos["nalcs"]["name"] = "NA LCS "+year+" "+currentSplit;
	eventInfos["nalcs"]["name_playoffs"] = "NA LCS "+year+" "+currentSplit+ playoffsText;
	eventInfos["nalcs"]["lolesports"] = "http://www.lolesports.com/en_US/na-lcs";
	eventInfos["nalcs"]["esportswikis"] = "http://lol.esportswikis.com/wiki/League_Championship_Series/North_America/"+year+"_Season/"+currentSplit+"_Season";
	eventInfos["nalcs"]["esportswikis_playoffs"] = "http://lol.esportswikis.com/wiki/League_Championship_Series/North_America/"+year+"_Season/"+currentSplit+"_Playoffs";
	
	eventInfos["nalcs_promotion"] = [];
	eventInfos["nalcs_promotion"]["name"] = "NA LCS "+promotionYear+" "+promotionSplit+" "+promotionsText;
	eventInfos["nalcs_promotion"]["lolesports"] = "http://www.lolesports.com/en_US/na-lcs";
	eventInfos["nalcs_promotion"]["esportswikis"] = "http://lol.esportswikis.com/wiki/League_Championship_Series/North_America/"+promotionYear+"_Season/"+promotionSplit+"_Promotion";
	
	eventInfos["lck"] = [];
	eventInfos["lck"]["name"] = "LCK "+year+" "+currentSplit;
	eventInfos["lck"]["name_playoffs"] = "LCK "+year+" "+currentSplit+ playoffsText;
	eventInfos["lck"]["lolesports"] = "http://www.lolesports.com/en_US/lck";
	eventInfos["lck"]["esportswikis"] = "http://lol.esportswikis.com/wiki/LCK/"+year+"_Season/"+currentSplit+"_Season";
	eventInfos["lck"]["esportswikis_playoffs"] = "http://lol.esportswikis.com/wiki/LCK/"+year+"_Season/"+currentSplit+"_Playoffs";
	
	eventInfos["lpl"] = [];
	eventInfos["lpl"]["name"] = "LPL "+year+" "+currentSplit;
	eventInfos["lpl"]["name_playoffs"] = "LPL "+year+" "+currentSplit+ playoffsText;
	eventInfos["lpl"]["lolesports"] = "http://www.lolesports.com/en_US/lpl-china";
	eventInfos["lpl"]["esportswikis"] = "http://lol.esportswikis.com/wiki/LPL/"+year+"_Season/"+currentSplit+"_Season";
	eventInfos["lpl"]["esportswikis_playoffs"] = "http://lol.esportswikis.com/wiki/LPL/"+year+"_Season/"+currentSplit+"_Playoffs";
	
	eventInfos["lms"] = [];
	eventInfos["lms"]["name"] = "LMS "+year+" "+currentSplit;
	eventInfos["lms"]["name_playoffs"] = "LMS "+year+" "+currentSplit+ playoffsText;
	eventInfos["lms"]["lolesports"] = "http://www.lolesports.com/en_US/lms";
	eventInfos["lms"]["esportswikis"] = "http://lol.esportswikis.com/wiki/LMS/"+year+"_Season/"+currentSplit+"_Season";
	eventInfos["lms"]["esportswikis_playoffs"] = "http://lol.esportswikis.com/wiki/LMS/"+year+"_Season/"+currentSplit+"_Playoffs";
	
	eventInfos["tcl"] = [];
	eventInfos["tcl"]["name"] = "TCL "+year+" "+currentSplit;
	eventInfos["tcl"]["name_playoffs"] = "TCL "+year+" "+currentSplit+ playoffsText;
	eventInfos["tcl"]["lolesports"] = "http://lolespor.com/sl/"+year+"/"+year+"tbf/overview";
	eventInfos["tcl"]["esportswikis"] = "http://lol.esportswikis.com/wiki/TCL/"+year+"_Season/"+currentSplit+"_Season";
	eventInfos["tcl"]["esportswikis_playoffs"] = "http://lol.esportswikis.com/wiki/TCL/"+year+"_Season/"+currentSplit+"_Playoffs";
	
	eventInfos["eucs"] = [];
	eventInfos["eucs"]["name"] = "EU CS "+year+" "+currentSplit;
	eventInfos["eucs"]["name_playoffs"] = "EU CS "+year+" "+currentSplit+ playoffsText;
	eventInfos["eucs"]["lolesports"] = "http://www.lolesports.com/en_US/eu-cs";
	eventInfos["eucs"]["esportswikis"] = "http://lol.esportswikis.com/wiki/EU_Challenger_Series/"+year+"_Season/"+currentSplit+"_Season";
	eventInfos["eucs"]["esportswikis_playoffs"] = "http://lol.esportswikis.com/wiki/League_Championship_Series/EU_Challenger_Series/"+year+"_Season/"+currentSplit+"_Playoffs";
	
	eventInfos["nacs"] = [];
	eventInfos["nacs"]["name"] = "NA CS "+year+" "+currentSplit;
	eventInfos["nacs"]["name_playoffs"] = "NA CS "+year+" "+currentSplit+ playoffsText;
	eventInfos["nacs"]["lolesports"] = "http://www.lolesports.com/en_US/na-cs";
	eventInfos["nacs"]["esportswikis"] = "http://lol.esportswikis.com/wiki/NA_Challenger_Series/"+year+"_Season/"+currentSplit+"_Season";
	eventInfos["nacs"]["esportswikis_playoffs"] = "http://lol.esportswikis.com/wiki/League_Championship_Series/NA_Challenger_Series/"+year+"_Season/"+currentSplit+"_Playoffs";
	
	eventInfos["msi"] = [];
	eventInfos["msi"]["name"] = "MSI "+year;
	eventInfos["msi"]["lolesports"] = "http://www.lolesports.com/";
	eventInfos["msi"]["esportswikis"] = "http://lol.esportswikis.com/wiki/";
	
	eventInfos["worlds"] = [];
	eventInfos["worlds"]["name"] = "Worlds "+year;
	eventInfos["worlds"]["lolesports"] = "http://www.lolesports.com/";
	eventInfos["worlds"]["esportswikis"] = "http://lol.esportswikis.com/wiki/";
	}
});

String.prototype.KWS        =   function() {
    return this.replace(/\s/g, '');
};

String.prototype.Flarify    =   function() {
    return "[](#c-" + this.toLowerCase().KWS() +")";
}

LB = {};

LB.PMTC = {};

LB.PMTC.roleId = {
    0 : "TOP",
    1 : "JNG",
    2 : "MID",
    3 : "ADC",
    4 : "SUP"
};

/*
$("#createButton").click(function() {
    $("#create").css("display", "inline-block");
    $("#edit").css("display","none");
});


$("#editButton").click(function() {
    $("#edit").css("display", "inline-block");
    $("#create").css("display", "none");
});

$('#select-lolesports-link').change(function() {
        var x = $(this).val();
        $('#lolesports-link').val(x);
});

$('#select-esportswikis-link').change(function() {
        var x = $(this).val();
        $('#esportswikis-link').val(x);
});
*/

$("#btn-reset").click(function() {
    $('.game-infos select option').each(function(){
		if (!$(this).is('[disabled=disabled]')) {
			$(this).remove();
		}
	});
});

$('#select-event-name').change(function() {
	var key = $(this).val();
	if (key == "") {
		$('#event-name').val("");
		$('#lolesports-link').val("");
		$('#esportswikis-link').val("");
	} else {
		updateEventInfos(key);
		switch (key) {
			/* for promotion tournaments, disable playoffs */
			case "eulcs_promotion":
			case "nalcs_promotion":
				$("#playoffs-checkbox").prop({disabled: true});
				break;
			case "lck":
			case "lpl":
				/* common between lck and lpl */
				$('.game-infos-poll').css('display', 'none');
				$('.game-infos-lck').css('display', 'inline-block');
				$("#playoffs-checkbox").prop({disabled: false});
				switch (key) {
					case "lck":
						$('.game-infos-lck input, .game-infos-lck select').css('display', 'inline-block');
						break;
					case "lpl":
						$('.game-infos-lck .mvp-points').css('display', 'none');
						$('.game-infos-lck .game-total-dmg-champs').css('display', 'none');
						break;
				}
				break;
			default:
				$('.game-infos-poll').css('display', 'inline-block');
				$('.game-infos-lck').css('display', 'none');
				$("#playoffs-checkbox").prop({disabled: false});
				break;
		}
		if (key == "lck") {
			$('#div-lck-warning').removeClass('hidden');
		} else {
			$('#div-lck-warning').addClass('hidden');
		}
	}
});

$('select.winner').change(function() {
	console.log("winner selected for some game");
	var resultInput = $('#series-result');
	var oldBlueScore = resultInput.data("blue-score");
	var oldRedScore = resultInput.data("red-score");
	var gameWinner = $(this).val();
	if (gameWinner == resultInput.data("blue-team")) {
		resultInput.data("blue-score", oldBlueScore+1);
		console.log("winner: blue team");
	} else if (gameWinner == resultInput.data("red-team")) {
		resultInput.data("red-score", oldRedScore+1);
		console.log("winner: red team");
	}
	resultInput.val(resultInput.data("blue-score")+"-"+resultInput.data("red-score"));
});

function updateEventInfos(eventId) {
	if (eventId == "") {
		return;
	}
	var suffix = "";
	if ($('#playoffs-checkbox').is(":checked")) {
		suffix = "_playoffs";
	}
	$('#event-name').val(eventInfos[eventId]["name"+suffix]);
	$('#esportswikis-link').val(eventInfos[eventId]["esportswikis"+suffix]);
	/* lolesports link doesnt appear to change if it is playoffs */
	$('#lolesports-link').val(eventInfos[eventId]["lolesports"]);
};

$('#playoffs-checkbox').change(function() {
	updateEventInfos($('#select-event-name').val());
});

$('#live-thread-checkbox').change(function() {
	if($(this).is(":checked")) {
		$("#live-thread-link").prop({disabled: false});
	} else {
		$("#live-thread-link").prop({disabled: true});
	}
});

$('#checkbox-use-old-style').change(function() {
	if($(this).is(":checked")) {
		$(".div-drags-buttons button, .blue-dragons, .blue-barons, .red-dragons, .red-barons").prop({disabled: true});
	} else {
		$(".div-drags-buttons button, .blue-dragons, .blue-barons, .red-dragons, .red-barons").prop({disabled: false});
	}
});

$("#tabList li.btn-game").click(function() {
    index = $(this).index();
	$("#tabList li").removeClass('selected');
	$(this).addClass('selected');
    $("#panels .main, #panels #output-tab").css("display", "none");
    $("#panels .main:nth-child(" + (index+1) + ")").css("display", "inline-block");
});

/** When clicking on tab Output **/
$("#tabList li#btn-output").click(function() {

	$("#tabList li").removeClass('selected');
	$(this).addClass('selected');
    $("#panels .main").css("display", "none");
    $("#panels #output-tab").css("display", "inline-block");

    data = [];

    for (i=1;i<6;i++) {
		// check if this tab has teams filled
        if ($("#panels > div:nth-child(" + i + ") .T1").val() != "") {
            data[i-1] = {};

            $("#panels > div:nth-child(" + i +") input").each(function() {

                if(!$(this).attr("o")) {
                    data[i-1][$(this).attr("class")] = {};
					if ($(this).parent().parent().hasClass("scores") && $(this).val() == "") {
						data[i-1][$(this).attr("class")].value = "0-0-0";
					} else {
						data[i-1][$(this).attr("class")].value = $(this).val();
					}
                }
            });
			
			var inputVal = "";
			
			// event name
			data[i-1]["event-name"] = {};
			data[i-1]["event-name"].value = $("#event-name").val().toUpperCase();
			
			// lolesports link
			data[i-1]["lolesports-link"] = {};
			data[i-1]["lolesports-link"].value = $("#lolesports-link").val();
			
			// esportswikis link
			data[i-1]["esportswikis-link"] = {};
			data[i-1]["esportswikis-link"].value = $("#esportswikis-link").val();
			
			// live thread link
			data[i-1]["live-thread-link"] = {};
			data[i-1]["live-thread-link"].value = $("#live-thread-link").val();
			
			// series result
			inputVal = $("#series-result").val();
			if (inputVal == null || inputVal == '') {
				inputVal = '0-0';
			}
			data[i-1]["series-result"] = {};
			data[i-1]["series-result"].value = inputVal;
			  
			// winner of each game
            inputVal = $("#panels > div:nth-child(" + i + ") .winner").val();
			if (inputVal == null || inputVal == '') {
				inputVal = 'tbd';
			}
			data[i-1]["winner"] = {};
			data[i-1]["winner"].value = inputVal;
			
			// time of each game
			inputVal = $("#panels > div:nth-child(" + i + ") .game-time").val();
			if (inputVal == null || inputVal == '') {
				inputVal = 'tbd';
			}
			data[i-1]["game-time"] = {};
            data[i-1]["game-time"].value = inputVal;
			
			// end game ss of each game
			data[i-1]["end-game-ss"] = {};
            data[i-1]["end-game-ss"].value = $("#panels > div:nth-child(" + i + ") .end-game-ss").val();
			
			// match-history link of each game
			data[i-1]["match-history"] = {};
            data[i-1]["match-history"].value = $("#panels > div:nth-child(" + i + ") .match-history").val();

			// mvp poll of each game
            data[i-1]["poll"] = {};
            data[i-1]["poll"].value = $("#panels > div:nth-child(" + i + ") .poll").val();
			
			// mvp of each game (lck/lpl)
			data[i-1]["game-mvp"] = {};
            data[i-1]["game-mvp"].value = $("#panels > div:nth-child(" + i + ") .game-mvp").val();
			if (data[i-1]["game-mvp"].value == null || data[i-1]["game-mvp"].value == '') {
				data[i-1]["game-mvp"].value = 'tbd';
			}
			
			// mvp points of each game (lck)
			data[i-1]["mvp-points"] = {};
            data[i-1]["mvp-points"].value = $("#panels > div:nth-child(" + i + ") .mvp-points").val();
			if (data[i-1]["mvp-points"].value == null || data[i-1]["mvp-points"].value == '') {
				data[i-1]["mvp-points"].value = 'tbd';
			}
			
			// total damage dealt to champs of each game (lck)
			data[i-1]["game-total-dmg-champs"] = {};
            data[i-1]["game-total-dmg-champs"].value = $("#panels > div:nth-child(" + i + ") .game-total-dmg-champs").val();
			
			// dragons took by blue team in each game
			inputVal = $("#panels > div:nth-child(" + i + ") .blue-dragons").val();
			if (inputVal == null || inputVal == "")
				inputVal = "0";
			data[i-1]["blue-dragons"] = {};
            data[i-1]["blue-dragons"].value = inputVal;
			
			// dragons took by red team in each game
			inputVal = $("#panels > div:nth-child(" + i + ") .red-dragons").val();
			if (inputVal == null || inputVal == "")
				inputVal = "0";
			data[i-1]["red-dragons"] = {};
            data[i-1]["red-dragons"].value = inputVal;
			
			// barons took by blue team in each game
			inputVal = $("#panels > div:nth-child(" + i + ") .blue-barons").val();
			if (inputVal == null || inputVal == "")
				inputVal = "0";
			data[i-1]["blue-barons"] = {};
            data[i-1]["blue-barons"].value = inputVal;
			
			// barons took by red team in each game
			inputVal = $("#panels > div:nth-child(" + i + ") .red-barons").val();
			if (inputVal == null || inputVal == "")
				inputVal = "0";
			data[i-1]["red-barons"] = {};
            data[i-1]["red-barons"].value = inputVal;
			
			/*
            data[i-1]["extra1"] = {};
            data[i-1]["extra1"].value = $("#extra1").val();

            data[i-1]["extra2"] = {};
            data[i-1]["extra2"].value = $("#extra2").val();
			*/
			
			// game number
            data[i-1]["gameX"] = {};
            data[i-1]["gameX"].value = i;

            var index = 0;
            $("#panels > div:nth-child("+i+") [o]").each(function() {
                index++;

                if (index === 10) {
                    index = "X";
                }
                data[i-1]["C" + index] = {};
                data[i-1]["C" + index].value = $(this).val();
                data[i-1]["C" + index].order = $(this).attr("o");
            });

            T1ut = {
                string : $("#panels > div:nth-child(" + i + ") .T1").val()
            }
			
			T1ut.fb = "";
			T1ut.tw = "";
			T1ut.lp = "";
			T1ut.os = "";
			T1ut.yt = "";
			T1ut.sb = "";
			
			if (TEAMS[T1ut.string]["Facebook"] != "") {
				T1ut.fb = " | [Facebook](" + TEAMS[T1ut.string]["Facebook"] + ")" ||  "";
			}
			if (TEAMS[T1ut.string]["Twitter"] != "") {
				T1ut.tw = " | [Twitter](" + TEAMS[T1ut.string]["Twitter"] + ")" ||  "";
			}
			if (TEAMS[T1ut.string]["Leaguepedia"] != "") {
				T1ut.lp = " | [EsportsWikis](" + TEAMS[T1ut.string]["Leaguepedia"] + ")" ||  "";
			}
			if (TEAMS[T1ut.string]["Official Site"] != "") {
				T1ut.os = " | [Official Site](" + TEAMS[T1ut.string]["Official Site"] + ")" ||  "";
			}
			if (TEAMS[T1ut.string]["Youtube"] != "") {
				T1ut.yt = " | [Youtube](" + TEAMS[T1ut.string]["Youtube"] + ")" ||  "";
			}
			if (TEAMS[T1ut.string]["Subreddit"] != "") {
				T1ut.sb = " | [Subreddit](" + TEAMS[T1ut.string]["Subreddit"] + ")" ||  "";
			}

            T2ut = {
                string : $("#panels > div:nth-child(" + i + ") .T2").val()
            }
			
			T2ut.fb = "";
			T2ut.tw = "";
			T2ut.lp = "";
			T2ut.os = "";
			T2ut.yt = "";
			T2ut.sb = "";
			
			if (TEAMS[T2ut.string]["Facebook"] != "") {
				T2ut.fb = " | [Facebook](" + TEAMS[T2ut.string]["Facebook"] + ")" ||  "";
			}
            if (TEAMS[T2ut.string]["Twitter"] != "") {
				T2ut.tw = " | [Twitter](" + TEAMS[T2ut.string]["Twitter"] + ")" ||  "";
            }
			if (TEAMS[T2ut.string]["Leaguepedia"] != "") {
				T2ut.lp = " | [EsportsWikis](" + TEAMS[T2ut.string]["Leaguepedia"] + ")" ||  "";
            }
			if (TEAMS[T2ut.string]["Official Site"] != "") {
				T2ut.os = " | [Official Site](" + TEAMS[T2ut.string]["Official Site"] + ")" ||  "";
            }
			if (TEAMS[T2ut.string]["Youtube"] != "") {
				T2ut.yt = " | [Youtube](" + TEAMS[T2ut.string]["Youtube"] + ")" ||  "";
            }
			if (TEAMS[T2ut.string]["Subreddit"] != "") {
				T2ut.sb = " | [Subreddit](" + TEAMS[T2ut.string]["Subreddit"] + ")" ||  "";
			}
            var T1string = $("#panels > div:nth-child(" + i + ") .T1").val();
            var T2string = $("#panels > div:nth-child(" + i + ") .T2").val();

            data[i-1]["team1info"] = {value: "**" + T1ut.string + "**" + T1ut.lp + T1ut.os + T1ut.tw + T1ut.fb + T1ut.yt + T1ut.sb}
            data[i-1]["team2info"] = {value: "**" + T2ut.string + "**" + T2ut.lp + T2ut.os + T2ut.tw + T2ut.fb + T2ut.yt + T2ut.sb}
        }
    }

	var headerId = "header";
	var endWithPoll = true;
	switch ($("#select-event-name").val()) {
		case "lpl":
			headerId += "-lpl";
			endWithPoll = false;
			break;
		case "lck":
			endWithPoll = false;
			break;
		default:
			break;
	}
	
	if ($("#live-thread-checkbox").is(":checked")) {
		// do nothing
	} else {
		headerId += "-no-live-thread"
	}
	
	var header		=		$("#" + headerId).val();

    var main        =       "";

    var transition  =       $("#transition").val();

    var string      =       "";
	
    main            +=      header;

	var regionSuffix = "";
	/** check here if event is LCK, LPL or standard **/
	switch ($("#select-event-name").val()) {
		case "lck":
			regionSuffix = "-lck";
			break;
		case "lpl":
			regionSuffix = "-lpl";
			break;
	}
	
	var oldSuffix = "";
	if ($('input#checkbox-use-old-style').is(":checked")) {
		oldSuffix = "-old";
	}
	
    for (i=0; i < data.length; i++) {
        main += transition; /* adds the horizontal line between games */
		/* 
		 * build one game output before giving it to the function that replaces 
		 * the %variables in textareas with the data inputted
		 * (depending on region and use old style for stats) 
		 */
		main += $('textarea#main-match-details'+regionSuffix).val();
		main += $('textarea#main-bans').val();
		main += $('textarea#main-scoreboard-infos'+regionSuffix).val();
		main += $('textarea#main-scoreboard-stats'+oldSuffix).val();
        for (j in data[i]) {
            main = SearchReplace("%" + j, data[i][j], main);
        }
    }
	
	main += transition;
	
	if (!($('#checkbox-use-old-style').is(":checked"))) {
		main += $("#end-new-style").val();
	}

    if (endWithPoll) {
		main += $("#end-poll").val();
	}
	
	main += $("#end").val();

	/* set the value of the output textarea so users can copy */
    $("div#output-tab textarea").val(string + main);
});


$(".div-drags-buttons button").click(function() {
	var type = $(this).attr('class');
	var code = "";
	/*
	Fire: &#128293;
	Ocean: &#127754;
	Mountain: &#9968;
	Cloud: &#9729;
	Elder: &#128009;
	*/
	switch (type) {
		case "fire-drag":
			code = "&#128293;";
			break;
		case "water-drag":
			code = "&#127754;";
			break;
		
		case "mountain-drag":
			code = "&#9968;";
			break;
		
		case "cloud-drag":
			code = "&#9729;";
			break;
		
		case "elder-drag":
			code = "&#128009;";
			break;
		default:
			console.log("Invalid dragon?" + type);
	}
	var closestDragons = $(this).parent().parent().find('input.blue-dragons,input.red-dragons');
	var oldVal = closestDragons.val();
	var counter = closestDragons.closest('.main').find('.drag-counter');
	console.log("this drag counter was: "+counter.data("drag-counter"));
	counter.data("drag-counter", counter.data("drag-counter")+1);
	var counterVal = counter.data("drag-counter");
	closestDragons.val(oldVal + "" + code + " ^"+counterVal + " ");
});

$(".blue-dragons, .red-dragons").change(function() {
	if ($(this).val() == "") {
		var counter = $(this).closest('.main').find('.drag-counter');
		counter.data("drag-counter", 0);
	}
});


$(".createPoll").click(function() {

	if(!window.confirm("Do you want to create a poll for this game now?")) {
		return;
	}
	
	var team1 = '';
	var team2 = '';
	
	var t1val = '';
	var t2val = '';
	
	t1val = $(this).closest("div.main").find(".T1").val();
	t2val = $(this).closest("div.main").find(".T2").val();
	
	if (t1val == '' || t2val == '') {
		window.alert("Teams not filled");
		return;
	}
	/*
	if (!TEAMS[t1val]) {
		window.alert("Invalid blue team");
		return;
	}
	
	if (!TEAMS[t2val]) {
		window.alert("Invalid red team");
		return;
	}
	*/
	team1 += '["' + t1val +'"';

	var index = 1;
	$(this).closest("div.main").find(".pps > div:nth-child(1) .players input").each(function() {
		var dc = $(this).closest("div.main").find(".pps >div:nth-child(1) .picks span:nth-child(" + index + ") input").val().toLowerCase().KWS().split("/");
		var ps = "";
		for (i=0;i<dc.length;i++) {
			ps += ' <span c='+dc[i] +' />'
		}
		team1 += ', "' + $(this).val() + ps +'"';
		index++;
	});

	team1 += ']';

	team2 += '["' + t2val +'"';

	var index = 1;
	$(this).closest("div.main").find(".pps > div:nth-child(2) .players input").each(function() {
		var dc = $(this).closest("div.main").find(".pps > div:nth-child(2) .picks span:nth-child(" + index + ") input").val().toLowerCase().KWS().split("/");
		var ps = "";
		console.log(dc);
		console.log(dc.length);
		for (i=0;i<dc.length;i++) {
			ps += ' <span c='+dc[i] +' />'
		}
		team2 += ', "' + $(this).val() + ps +'"';
		index++;
	});

	team2 += ']';

	aux = $(this);

	$.post("../POLL/createPoll.php", {TJ1 : team1, TJ2: team2}).done(function(d) {
		aux.closest("div.main").find(".poll").val("http://lightbinding.net/poll/" + d);
	});
});


$.post("../php/getJSON.php", 
    {feed: "https://docs.google.com/spreadsheet/pub?key=0AneWTc0o_1bpdEVVczlDckt2aXpmX0tRUU01eUZMX3c&single=true&gid=8&output=csv"})
    .done(function(d) {

        var teamListArray = d;

        LB.PMTC.teamListObject = {};

        for (i=0;i<teamListArray.length;i++) {
            LB.PMTC.teamListObject[teamListArray[i].INITIALS] = teamListArray[i];
        }

        console.log(LB.PMTC.teamListObject);
});

$('#panels div.main:first-child .T1').blur(function() {
	var teamVal = $(this).val();
	console.log("Blue team has been set for the series result: " + teamVal);
	$('#series-result').data('blue-team', teamVal);
});

$('#panels div.main:first-child .T2').blur(function() {
	var teamVal = $(this).val();
	console.log("Red team has been set for the series result: " + teamVal);
	$('#series-result').data('red-team', teamVal);
});

$(".T1").blur(function() {
    var teamID      =       $(this).val();
	
	if (TEAMS[teamID]) {
		$(this).css('border-color', '#2ecc40');
		var selectElem = $(this).closest('div.main').find(".winner");
		var length = $(selectElem).children('option').length;
		if (length >= 3 ) {
			var option = $(this).closest('div.main').find(".winner option:nth-child(2)");
			option.text(teamID);
			option.val(teamID);
		} else {
			selectElem.append('<option value="'+teamID+'">'+teamID+'</option>');
		}
	} else {
		$(this).css('border-color', '#ff4136');
		return;
	}
	
    var index =  0;
    $(this).closest('div.main').find(".pps > div:nth-child(1) .players input").each(function() {
        playerName = TEAMS[teamID][LB.PMTC.roleId[index]];
		$(this).val(playerName);
		$(this).closest('div.main').find(".game-mvp").append('<option value="'+playerName+'">'+playerName+'</option>');
        index++;
    });
});

$(".T2").blur(function() {
    var teamID      =       $(this).val();
	
	if (TEAMS[teamID]) {
		$(this).css('border-color', '#2ecc40');
		var selectElem = $(this).closest('div.main').find(".winner");
		var length = $(selectElem).children('option').length;
		if (length >= 3 ) {
			var option = $(this).closest('div.main').find(".winner option:nth-child(3)");
			option.text(teamID);
			option.val(teamID);
		} else {
			selectElem.append('<option value="'+teamID+'">'+teamID+'</option>');
		}
	} else {
		$(this).css('border-color', '#ff4136');
		return;
	}
	
    var index =  0;
    $(this).closest('div.main').find(".pps > div:nth-child(2) .players input").each(function() {
        playerName = TEAMS[teamID][LB.PMTC.roleId[index]];
		$(this).val(playerName);
		$(this).closest('div.main').find(".game-mvp").append('<option value="'+playerName+'">'+playerName+'</option>');
        index++;
    });
});

/* Save data on focus */
$('.players input[type=text]').on("focus", function() {
  $(this).data("previous-value", $(this).val());
}); 

$('.players input[type=text]').on('blur', function() {
	var playerName = $(this).val();
	var toRemove = $(this).data("previous-value");
	var toChange = $(this).closest('div.main').find(".game-mvp option[value='"+toRemove+"']");
	toChange.val(playerName);
	toChange.text(playerName);
	/*$(this).closest('div.main').find(".game-mvp").append('<option value="'+playerName+'">'+playerName+'</option>');*/
});

function SearchReplace(match, replacer,  string) {

    var length      =       match.length;

    var position    =       string.search(match);

    var id          =       match.split("%")[1];

    var newstr      =       string;

    console.log(position);

    if(string.charAt(position + length) === "f") {
        newstr      =       string.replace(match + "f", replacer.value.Flarify());
    }

    var position    =       newstr.search(match);

    console.log(position);

    if(newstr.charAt(position + length) === "o") {
            newstr      =       newstr.replace(match + "o", replacer.value + " ^" + replacer.order);
    }

    return newstr.replace(new RegExp(match, "g"), replacer.value, "g");

}



LB.PMTC.loadAndParse = function(id, type) {

    var dataString = localStorage.getItem(id) || false;

    switch(type) {
        case "object": 
            return JSON.parse(dataString) || {};
			break;
        case "array":
            return JSON.parse(dataString) || [];
			break;
    }

}

/*
LB.PMTC.setSelect = function(saveData, JQdomID) {

    var list = [];

    for (var name in saveData) {

        list.push(""+name);
    }
    console.log(list);
    $(JQdomID).html("");

    for (var name=0;name<list.length; name++) {
        $(JQdomID).append("<option value="+ list[name] + ">" + list[name] + "</option>" );
    }
}

LB.PMTC.load    = function(name) {

    LB.PMTC.saveData = LB.PMTC.loadAndParse("saves", "object");

    $("#header").val(LB.PMTC.saveData[name].header)
    $("#main").val(LB.PMTC.saveData[name].main)
    $("#transition").val(LB.PMTC.saveData[name].transition)
    $("#end").val(LB.PMTC.saveData[name].end)

    $("#saveName").val(name);

    localStorage.setItem("default", name);
}
*/
datalist = document.createElement("datalist");

console.log(datalist);

datalist.id = "TeamDataList";

teamnames =  [];

for (i in TEAMS) {
    var o = document.createElement("option");

    o.value = i;

    datalist.appendChild(o);
    teamnames.push(i);

}
document.body.appendChild(datalist);

$(".picks").sortable();

LB.PMTC.saveData = LB.PMTC.loadAndParse("saves", "object");
/*
LB.PMTC.setSelect(LB.PMTC.saveData, "select");

var defaultTemplate = localStorage.getItem("default") || false;

console.log(defaultTemplate);

if(defaultTemplate) {
    LB.PMTC.load(defaultTemplate);

    $("select").not("#select-lolesports-link, #select-esportswikis-link").val(defaultTemplate);
}

$("#save").click(function() {

  //  var saveDataString = localStorage.getItem("saves") || false;
  //  saveData        = JSON.parse(saveDataString) || {};

    LB.PMTC.saveData = LB.PMTC.loadAndParse("saves", "object");

    if(typeof $("#saveName").val() != "undefined" && $("#saveName").val() != "") {
        LB.PMTC.saveData[$("#saveName").val()]  = {};

        console.log(LB.PMTC.saveData);
        LB.PMTC.saveData[$("#saveName").val()].header  = $("#header").val();
        LB.PMTC.saveData[$("#saveName").val()].main  = $("#main").val();
        LB.PMTC.saveData[$("#saveName").val()].transition  = $("#transition").val();
        LB.PMTC.saveData[$("#saveName").val()].end  = $("#end").val();




        localStorage.setItem("saves", JSON.stringify(LB.PMTC.saveData));

        LB.PMTC.setSelect(LB.PMTC.saveData, "select"),

        $("select").not("#select-lolesports-link, #select-esportswikis-link").val($("#saveName").val());
        $("#save").html("OK!");
    }

    else {
        $("#save").html("No name!")
    }

/*
    localStorage.setItem("header", $("#header").val());

    localStorage.setItem("main", $("#main").val());

    localStorage.setItem("transition", $("#transition").val());

    localStorage.setItem("end", $("#end").val());

});


$("#load").click(function() {
    LB.PMTC.load($("select :selected").val());
});

$("#save").mouseleave(function() {
    $(this).html("SAVE");
});
*/

$(".picks input, .bans span > input").blur(function() {
    $(this).parent().removeClass().addClass("flair flair-" + $(this).val().toLowerCase().KWS());
});

$("#fade").addClass('hidden');
$("#loading-teams-popup").addClass('hidden');