<script type="text/javascript" src="js/pmtc.js"></script>
<script type="text/javascript" src="js/jquery.inputmask.bundle.min.js"></script>
<script type="text/javascript" src="js/clipboard.min.js"></script>

<!-- Loading teams Pop up -->
<div id="loading-teams-popup" class="white_content hidden">
	<p class="bold font-size-large">Loading teams...</p>
	<p></p>
	<p>Note: You need to enable javascript to use this site.</p>
</div>

<?php include_once('menu.php'); ?>

<hr>

<form id="create">
	<div id="div-lck-warning" class="hidden">
		Add daily threads  from <a href="https://www.reddit.com/user/epicxkidzorz">/u/epicxkidzorz</a> or <a href="https://www.reddit.com/user/teekays">/u/teekays</a>
	</div>
	<div id="div-thread-info">
		<select id="select-event-name">
			<option value="" selected disabled="disabled">Region</option>
			<option value="eulcs">EU LCS</option>
			<option value="eulcs_promotion">EU Promotion</option>
			<option value="nalcs">NA LCS</option>
			<option value="nalcs_promotion">NA Promotion</option>
			<option value="lck">LCK</option>
			<option value="lpl">LPL</option>
			<option value="lms">LMS</option>
			<option value="tcl">TCL</option>
			<option value="eucs">EU CS</option>
			<option value="nacs">NA CS</option>
			<option value="msi">MSI</option>
			<option value="worlds">Worlds</option>
		</select>
		<div class="inline-block label-div" data-tooltip="Check to append 'Playoffs' to the title" data-tooltip-position="top">
			<label for="playoffs-checkbox">Playoffs</label>
			<input type="checkbox" id="playoffs-checkbox" name="playoffs-checkbox">
		</div>
		<input id="event-name" placeholder="Event Name" value=""> <!-- *** -->
		<input id="lolesports-link" placeholder="Lolesports" value=""> <!-- *** -->
		<input type="text" id="esportswikis-link" 	placeholder="EsportsWikis" value=""> <!-- *** -->
		<div class="inline-block label-div" data-tooltip="Use Live Thread in output?" data-tooltip-position="top">
			<label for="live-thread-checkbox">Live thread</label>
			<input type="checkbox" id="live-thread-checkbox" checked="checked">
		</div>
		<div class="inline-block" data-tooltip="Live Thread Link" data-tooltip-position="top">
			<input type="url" id="live-thread-link"	placeholder="Link" title="Live Thread Link" value=""> <!-- *** -->
		</div>
		<div class="inline-block" data-tooltip="Series Result in format 2-0" data-tooltip-position="top">
			<input type="text" id="series-result" placeholder="Result" data-inputmask="'mask': '9-9'" value="" /> <!-- *** -->
		</div>
	</div>
	<div id="div-tablist">
		<div id="div-old-style" class="inline-block" data-tooltip="Check to use old style without dragons" data-tooltip-position="left">
			<label for="checkbox-use-old-style">Use old style</label>
			<input type="checkbox" id="checkbox-use-old-style">
		</div>
		<div class="inline-block">
		<ul id="tabList">
			<li class="btn-game">Game 1</li>
			<li class="btn-game">Game 2</li>
			<li class="btn-game">Game 3</li>
			<li class="btn-game">Game 4</li>
			<li class="btn-game">Game 5</li>
			<li id="btn-output">Output</li>
		</ul>
		</div>
		<div id="div-reset-button" class="inline-block" data-tooltip="Reset all inputs" data-tooltip-position="right">
			<button id="btn-reset" class="btn" type="reset" value="Reset" onclick="return confirm('Do you really want to reset?')">Reset</button>
		</div>
	</div>

	<div id="panels">
		<div class="main"> 
			<div class="game-infos">
				<div class="inline-block">
					<select class="winner" tabindex="35">
						<option selected disabled="disabled">Game Winner</option>
					</select>
				</div>
				<div class="inline-block" data-tooltip="Game time in format 30:30" data-tooltip-position="bottom">
					<input type="text" class="game-time" tabindex="36" data-inputmask="'mask': '99:99'" placeholder="Game Time"> <!-- *** -->
				</div>
				<div class="inline-block" data-tooltip="Link of end game screenshot" data-tooltip-position="bottom">
					<input type="url" class="end-game-ss" tabindex="37" placeholder="End Game SS"> <!-- *** -->
				</div>
				<div class="inline-block" data-tooltip="Link of lolesports match history" data-tooltip-position="bottom">
					<input type="url" class="match-history" tabindex="38" value="" placeholder="Match History"> <!-- *** -->
				</div>
				<?php if ($validUser) { ?>
				<!-- standard poll/create poll -->
				<div class="game-infos-poll" style="display: inline-block;" data-tooltip="Before creating a poll select the teams and remove subs" data-tooltip-position="bottom">
					<input type="text" placeholder="Poll" class="poll" readonly="readonly"> <!-- *** -->
					<input type="button" value="Create" class="createPoll"> <!-- *** -->
				</div>
				<?php } ?>
				<!-- LCK: mvp -->
				<div class="game-infos-lck" style="display: none;">
					<!--<input type="text" placeholder="MVP" class="game-mvp">-->
					<div class="inline-block">
						<select class="game-mvp" tabindex="39">
							<option value="" selected disabled="disabled">Game MVP</option>
						</select>
					</div>
					<div class="inline-block">
						<input type="number" placeholder="Points" class="mvp-points" tabindex="40">
					</div>
					<div class="inline-block" data-tooltip="Link to total damage graph shown on stream after each game" data-tooltip-position="bottom">
						<input type="url" placeholder="Total damage" class="game-total-dmg-champs" tabindex="41">
					</div>
				</div>
			</div>
			
			<div class="teams"> <!-- *** -->
				<input type="hidden" class="drag-counter" value="" />
				<div>
					<div>
						<input type="text" class="T1" list="TeamDataList" tabindex="1" placeholder="Team 1"> <!-- *** -->
					</div>
					<!--<div class="div-drags-buttons">
						<button class="fire-drag" type="button"><img src="img/fire.png" alt="Fire" title="Fire" /></button>
						<button class="water-drag" type="button"><img src="img/water.png" alt="Ocean" title="Ocean" /></button>
						<button class="mountain-drag" type="button"><img src="img/mountain.png" alt="Mountain" title="Mountain" /></button>
						<button class="cloud-drag" type="button"><img src="img/cloud.png" alt="Cloud" title="Cloud" /></button>
						<button class="elder-drag" type="button"><img src="img/elder.png" alt="Elder" title="Elder" /></button>
					</div>-->
					<div class="inline-block"><!--data-tooltip="Click on the dragons icons to input the values. Clear this box on mistake" data-tooltip-position="bottom"-->
						<input class="blue-dragons" type="number" placeholder="Blue Dragons" value=""/>
					</div>
					<div class="inline-block">
						<input class="blue-barons" type="number" placeholder="Blue Barons" value=""/>
					</div>
				</div>
				<div>
					<div>
						<input type="text" class="T2" list="TeamDataList" tabindex="2" placeholder="Team 2"> <!-- *** -->
					</div>
					<!--<div class="div-drags-buttons">
						<button class="fire-drag" type="button"><img src="img/fire.png" alt="Fire" title="Fire" /></button>
						<button class="water-drag" type="button"><img src="img/water.png" alt="Ocean" title="Ocean" /></button>
						<button class="mountain-drag" type="button"><img src="img/mountain.png" alt="Mountain" title="Mountain" /></button>
						<button class="cloud-drag" type="button"><img src="img/cloud.png" alt="Cloud" title="Cloud" /></button>
						<button class="elder-drag" type="button"><img src="img/elder.png" alt="Elder" title="Elder" /></button>
					</div>-->
					<div class="inline-block"><!--data-tooltip="Click on the dragons icons to input the values. Clear this box on mistake" data-tooltip-position="bottom"-->
						<input class="red-dragons" type="number" placeholder="Red Dragons" value=""/>
					</div>
					<div class="inline-block">
						<input class="red-barons" type="number" placeholder="Red Barons" value=""/>
					</div>
				</div>
			</div>

			<div class="bans"> <!-- *** -->
				<div class="blue-bans">
					<div>
						<div><span>
							<input type="text" class="B1"  list="championz" tabindex="3" placeholder="Blue Ban 1"> <!-- *** -->
						</span></div>
						<div><input type="number" tabindex="19" class="btow"  value="" placeholder="Blue Tower"> <!-- *** --></div>
					</div>
					
					<div>
						<div><span>
							<input type="text" class="B3"  list="championz" tabindex="5" placeholder="Blue Ban 2"> <!-- *** -->
						</span></div>
						<div><input tabindex="20" class="bgold" data-inputmask="'mask': '99[9].9k'" value="" placeholder="Blue Gold"> <!-- *** -->
						</div>
					</div>
					
					<div>
						<div>
							<span>
							<input type="text" class="B5"  list="championz" tabindex="7" placeholder="Blue Ban 3"> <!-- *** -->
							</span>
						</div>
						<div><input type="number" tabindex="21" class="bkill"  value="" placeholder="Blue Kills"> <!-- *** --></div>
					</div>
				</div>
				<div class="red-bans">
					<div>
						<div><span>
						<input type="text" class="B2"   list="championz" tabindex="4" placeholder="Red Ban 1"> <!-- *** -->
						</span></div>
						<div><input type="number" tabindex="22" class="pkill" value="" placeholder="Red Kills"> <!-- *** --></div>
					</div>

					<div>
						<div>
							<span>
								<input class="B4"  list="championz" tabindex="6" placeholder="Red Ban 2"> <!-- *** -->
							</span>
						</div>
						<div><input tabindex="23" class="pgold" data-inputmask="'mask': '99[9].9k'" value="" placeholder="Red Gold"> <!-- *** --></div>
					</div>
					<div>
						<div>
							<span>
							<input type="text" class="B6"  list="championz" tabindex="8" placeholder="Red Ban 3"> <!-- *** -->
							</span>
						</div>
						<div>
							<input type="number" tabindex="24" class="ptow" value="" placeholder="Red Tower"> <!-- *** -->
						</div>
					</div>
				</div>
			</div>

			<div class="pps"> <!-- *** -->
				<div>
					<div class="players"> <!-- *** -->
						<div><input type="text" class="P1" placeholder="Player 1"></div> <!-- *** -->
						<div><input type="text" class="P2" placeholder="Player 2"></div> <!-- *** -->
						<div><input type="text" class="P3" placeholder="Player 3"></div> <!-- *** -->
						<div><input type="text" class="P4" placeholder="Player 4"></div> <!-- *** -->
						<div><input type="text" class="P5" placeholder="Player 5"></div> <!-- *** -->
					</div>
					
					<div class="picks"> <!-- *** -->
						<span>
							<input type="text" class="C1"   list="championz" tabindex="9" o=1     placeholder="Champ 1"> <!-- *** -->
						</span>
					 
						<span>
							<input type="text" class="C2"   list="championz" tabindex="12" o=2    placeholder="Champ 4"> <!-- *** -->
						</span>
						
						<span>    
							<input type="text" class="C3"   list="championz" tabindex="13" o=2    placeholder="Champ 5"> <!-- *** -->
						</span>
						
						<span>
							<input type="text" class="C4"   list="championz" tabindex="16" o=3    placeholder="Champ 8"> <!-- *** -->
						</span>
						
						<span>
							<input type="text" class="C5"   list="championz" tabindex="17" o=3    placeholder="Champ 9"> <!-- *** -->
						</span>
					</div>

					<div class="scores">
						<div><input type="text" tabindex="25" class="S1" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score Top"></div> <!-- *** -->
						<div><input type="text" tabindex="26" class="S2" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score Jungle"></div> <!-- *** -->
						<div><input type="text" tabindex="27" class="S3" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score Mid"></div> <!-- *** -->
						<div><input type="text" tabindex="28" class="S4" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score AD"></div> <!-- *** -->
						<div><input type="text" tabindex="29" class="S5" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score Support"></div> <!-- *** -->

					</div>
				</div>

				<div>
					<div class="players"> <!-- *** -->
						<div><input type="text" class="P6"   placeholder="Player 6"></div> <!-- *** -->
						<div><input type="text" class="P7"   placeholder="Player 7"></div> <!-- *** -->
						<div><input type="text" class="P8"   placeholder="Player 8"></div> <!-- *** -->
						<div><input type="text" class="P9"   placeholder="Player 9"></div> <!-- *** -->
						<div><input type="text" class="PX"   placeholder="Player 10"></div> <!-- *** -->
					</div>
					
					<div class="picks"> <!-- *** -->
						<span>
						<input type="text" class="C6"  list="championz" tabindex="10" o=1  placeholder="Champ 2"> <!-- *** -->
						</span>
						<span>    
						<input type="text" class="C7"  list="championz" tabindex="11" o=1  placeholder="Champ 3"> <!-- *** -->
						</span>
						<span>
						<input type="text" class="C8"  list="championz" tabindex="14" o=2 placeholder="Champ 6"> <!-- *** -->
						</span>
						<span>
						<input type="text" class="C9"  list="championz" tabindex="15" o=2 placeholder="Champ 7"> <!-- *** -->
						</span>
						<span>
						
						<input type="text" class="CX"  list="championz" tabindex="18" o=3 placeholder="Champ 10"> <!-- *** -->
						</span>
					</div>

					<div class="scores">
						<div><input type="text" tabindex="30" class="S6" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score Top"></div> <!-- *** -->
						<div><input type="text" tabindex="31" class="S7" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score Jungle"></div> <!-- *** -->
						<div><input type="text" tabindex="32" class="S8" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score Mid"></div> <!-- *** -->
						<div><input type="text" tabindex="33" class="S9" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score AD"></div> <!-- *** -->
						<div><input type="text" tabindex="34" class="SX" data-inputmask="'mask': '9[9]-9[9]-9[9]'" placeholder="Score Support"></div> <!-- *** -->
					</div>
				</div>
			</div>
		</div>
		<div id="output-tab">
			<div>
				<button class="btn" type="button" data-clipboard-target="#output-textarea">Copy!</button>
			</div>
			<div>
				<textarea id="output-textarea"></textarea>
			</div>
		</div>
	</div>
</form>

<section style="display: none" id="edit">

<textarea id="header">
###%event-name
* [Lolesports](%lolesports-link)
* [EsportsWikis](%esportswikis-link)

&amp;nbsp;

* [Daily/Live Discussion Thread](%live-thread-link)  
* [Event VODs Subreddit](http://www.reddit.com/r/LoLeventVoDs/)  
* [New to League of Legends](http://lol.esportswikis.com/wiki/New_To_League/Welcome)  

&amp;nbsp;

-----  

&amp;nbsp;

###%T1 %series-result %T2    

&amp;nbsp;

%team1info  
%team2info  

</textarea>

<textarea id="header-no-live-thread">
###%event-name
* [Lolesports](%lolesports-link)
* [EsportsWikis](%esportswikis-link)

&amp;nbsp;

* [Event VODs Subreddit](http://www.reddit.com/r/LoLeventVoDs/)  
* [New to League of Legends](http://lol.esportswikis.com/wiki/New_To_League/Welcome)  

&amp;nbsp;

-----  

&amp;nbsp;

###%T1 %series-result %T2    

&amp;nbsp;

%team1info  
%team2info  

</textarea>

<textarea id="header-lpl">
###%event-name
* [Lolesports](%lolesports-link)
* [EsportsWikis](%esportswikis-link)

&amp;nbsp;

* [Daily/Live Discussion Thread](%live-thread-link)  
* [Event VODs Subreddit](http://www.reddit.com/r/LoLeventVoDs/)  
* [New to League of Legends](http://lol.esportswikis.com/wiki/New_To_League/Welcome)  

&amp;nbsp;

-----  

&amp;nbsp;

###%T1 %series-result %T2    

&amp;nbsp;

* [Lolesports Match History](%match-history)  

&amp;nbsp;

%team1info  
%team2info  

</textarea>

<textarea id="header-lpl-no-live-thread">
###%event-name
* [Lolesports](%lolesports-link)
* [EsportsWikis](%esportswikis-link)

&amp;nbsp;

* [Event VODs Subreddit](http://www.reddit.com/r/LoLeventVoDs/)  
* [New to League of Legends](http://lol.esportswikis.com/wiki/New_To_League/Welcome)  

&amp;nbsp;

-----  

&amp;nbsp;

###%T1 %series-result %T2    

&amp;nbsp;

* [Lolesports Match History](%match-history)  

&amp;nbsp;

%team1info  
%team2info  
</textarea>

<textarea id="main-match-details">
###MATCH %gameX: %T1 (Blue) vs %T2 (Red)  
**Winner:** %winner  
**Game Time:** %game-time  
</textarea>

<textarea id="main-match-details-lck">
###MATCH %gameX: %T1 (Blue) vs %T2 (Red)  
**Winner:** %winner  
**MVP:** %game-mvp (%mvp-points)  
**Game Time:** %game-time  
</textarea>

<textarea id="main-match-details-lpl">
###MATCH %gameX: %T1 (Blue) vs %T2 (Red)  
**Winner:** %winner  
**MVP:** %game-mvp  
**Game Time:** %game-time  
</textarea>

<textarea id="main-bans">

&amp;nbsp;

**BANS**  

|%T1|%T2
|:--|:--|
|%B1f %B1|%B2f %B2|
|%B3f %B3|%B4f %B4|
|%B5f %B5|%B6f %B6|

&amp;nbsp;

</textarea>

<textarea id="main-scoreboard-infos">
**FINAL SCOREBOARD**  

* [End-game screenshot](%end-game-ss)  
* [Lolesports Match History](%match-history)  
* [Who was the match MVP?](%poll)  
</textarea>

<textarea id="main-scoreboard-infos-lck">
**FINAL SCOREBOARD**  

* [End-game screenshot](%end-game-ss)  
* [Lolesports Match History](%match-history)  
* [Total Damage to Champions](%game-total-dmg-champs)  
</textarea>

<textarea id="main-scoreboard-infos-lpl">
**FINAL SCOREBOARD**  

* [End-game screenshot](%end-game-ss)  
</textarea>

<textarea id="main-scoreboard-stats">

| |G|K|T|D|B|
|:--|:--:|:--:|:--:|:--:|:--|
|**%T1**|%bgold|%bkill|%btow|%blue-dragons|%blue-barons|
|**%T2**|%pgold|%pkill|%ptow|%red-dragons|%red-barons|

|**%T1**|**Champion**|**KDA**|
|:--|:--|:--:|
|%P1|%C1f %C1o|%S1|
|%P2|%C2f %C2o|%S2|
|%P3|%C3f %C3o|%S3|
|%P4|%C4f %C4o|%S4|
|%P5|%C5f %C5o|%S5|
|**%T2**|**Champion**|**KDA**|
|%P6|%C6f %C6o|%S6|
|%P7|%C7f %C7o|%S7|
|%P8|%C8f %C8o|%S8|
|%P9|%C9f %C9o|%S9|
|%PX|%CXf %CXo|%SX|
^1,2,3 Number indicates the pick order for each champion.  
Key: **G**=Gold ; **K**=Kills ; **T**=Towers ; **D**=Dragons ; **B**=Barons
</textarea>

<textarea id="main-scoreboard-stats-old">

|**%T1**| | |
|:--|:--|:--:|
|**Towers**: %btow|**Gold**: %bgold|**Kills**: %bkill|
|%P1|%C1f %C1o|%S1|
|%P2|%C2f %C2o|%S2|
|%P3|%C3f %C3o|%S3|
|%P4|%C4f %C4o|%S4|
|%P5|%C5f %C5o|%S5|
|**%T2**| | |
|**Towers**: %ptow|**Gold**: %pgold|**Kills**: %pkill|
|%P6|%C6f %C6o|%S6|
|%P7|%C7f %C7o|%S7|
|%P8|%C8f %C8o|%S8|
|%P9|%C9f %C9o|%S9|
|%PX|%CXf %CXo|%SX|
^1,2,3 Number indicates where in the pick phase the champion was taken.  
</textarea>

<textarea id="transition">

&amp;nbsp;

---

&amp;nbsp;

</textarea>

<textarea id="end-new-style">
**Feedback:** We are trying a new format with the scoreboard results. We're looking at adding nice icons for the gold/kill/towers/dragons/barons. If you have any suggestions to improve it [contact us!](https://docs.google.com/forms/d/e/1FAIpQLSeCc3g1Gr5uJWZuxcYctHS7779Zvc7e8vM15mNTSCyCYh-8CA/viewform)  
</textarea>

<textarea id="end-poll">
**Note:** We do one MVP poll per game, so make sure to vote on each poll!  
</textarea>

<textarea id="end">

[This thread was created using lightbinding](http://lightbinding.net/PMTC-LOL/).
</textarea>

	</section>

<datalist id="championz">
	<option value='Aatrox'>
	<option value='Ahri'>
	<option value='Akali'>
	<option value='Alistar'>
	<option value='Amumu'>
	<option value='Anivia'>
	<option value='Annie'>
	<option value='Ashe'>
	<option value='AurelionSol'>
	<option value='Azir'>
	<option value='Bard'>
	<option value='Blitzcrank'>
	<option value='Brand'>
	<option value='Braum'>
	<option value='Caitlyn'>
	<option value='Cassiopeia'>
	<option value='Chogath'>
	<option value='Corki'>
	<option value='Darius'>
	<option value='Diana'>
	<option value='DrMundo'>
	<option value='Draven'>
	<option value='Ekko'>
	<option value='Elise'>
	<option value='Evelynn'>
	<option value='Ezreal'>
	<option value='Fiddlesticks'>
	<option value='Fiora'>
	<option value='Fizz'>
	<option value='Galio'>
	<option value='Gangplank'>
	<option value='Garen'>
	<option value='Gnar'>
	<option value='Gragas'>
	<option value='Graves'>
	<option value='Hecarim'>
	<option value='Heimerdinger'>
	<option value='Illaoi'>
	<option value='Irelia'>
	<option value='Janna'>
	<option value='JarvanIV'>
	<option value='Jax'>
	<option value='Jayce'>
	<option value='Jhin'>
	<option value='Jinx'>
	<option value='Kalista'>
	<option value='Karma'>
	<option value='Karthus'>
	<option value='Kassadin'>
	<option value='Katarina'>
	<option value='Kayle'>
	<option value='Kennen'>
	<option value='KhaZix'>
	<option value='Kindred'>
	<option value='KogMaw'>
	<option value='LeBlanc'>
	<option value='Lee Sin'>
	<option value='Leona'>
	<option value='Lissandra'>
	<option value='Lucian'>
	<option value='Lulu'>
	<option value='Lux'>
	<option value='Malphite'>
	<option value='Malzahar'>
	<option value='Maokai'>
	<option value='Master Yi'>
	<option value='Miss Fortune'>
	<option value='MonkeyKing'>
	<option value='Mordekaiser'>
	<option value='Morgana'>
	<option value='Nami'>
	<option value='Nasus'>
	<option value='Nautilus'>
	<option value='Nidalee'>
	<option value='Nocturne'>
	<option value='Nunu'>
	<option value='Olaf'>
	<option value='Orianna'>
	<option value='Pantheon'>
	<option value='Poppy'>
	<option value='Quinn'>
	<option value='Rammus'>
	<option value='RekSai'>
	<option value='Renekton'>
	<option value='Rengar'>
	<option value='Riven'>
	<option value='Rumble'>
	<option value='Ryze'>
	<option value='Sejuani'>
	<option value='Shaco'>
	<option value='Shen'>
	<option value='Shyvana'>
	<option value='Singed'>
	<option value='Sion'>
	<option value='Sivir'>
	<option value='Skarner'>
	<option value='Sona'>
	<option value='Soraka'>
	<option value='Swain'>
	<option value='Syndra'>
	<option value='TahmKench'>
	<option value='Taliyah'>
	<option value='Talon'>
	<option value='Taric'>
	<option value='Teemo'>
	<option value='Thresh'>
	<option value='Tristana'>
	<option value='Trundle'>
	<option value='Tryndamere'>
	<option value='Twisted Fate'>
	<option value='Twitch'>
	<option value='Udyr'>
	<option value='Urgot'>
	<option value='Varus'>
	<option value='Vayne'>
	<option value='Veigar'>
	<option value='VelKoz'>
	<option value='Vi'>
	<option value='Viktor'>
	<option value='Vladimir'>
	<option value='Volibear'>
	<option value='Warwick'>
	<option value='Xerath'>
	<option value='Xin Zhao'>
	<option value='Yasuo'>
	<option value='Yorick'>
	<option value='Zac'>
	<option value='Zed'>
	<option value='Ziggs'>
	<option value='Zilean'>
	<option value='Zyra'>
</datalist>
<?php 
/*} else {
echo '<p>How did you get here?</p>';
}*/
?>