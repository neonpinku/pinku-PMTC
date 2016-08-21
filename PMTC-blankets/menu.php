<?php if ($guest) { ?>
	<h2 class="centered">Welcome pleb!</h2>
<?php } else if (!$guest && !$validUser) { ?>
	<h2>Welcome to the LoL Post Match Creator</h2>
<?php } ?>

<div id="match-history-popup" class="white_content hidden">
	<h2>Match History Links</h2>
	<a class="close" href="javascript:void(0)" onclick="closePopup('match-history-popup')">×</a>
	<ul>
		<li><a target="_blank" href="http://www.lolesports.com/en_US/eu-lcs/eu_2016_summer/schedule/default">EU LCS</a></li>
		<li><a target="_blank" href="http://www.lolesports.com/en_US/na-lcs/na_2016_summer/schedule/default">NA LCS</a></li>
		<li><a target="_blank" href="http://www.lolesports.com/en_US/lck/lck_2016_summer/schedule/default">OGN</a></li>
		<li>LPL
			<a target="_blank" href="http://www.lolesports.com/en_US/lpl-china/lpl_2016_summer/schedule/default">1</a> /
			<a target="_blank" href="http://lol.766.com/match">2</a>
		</li>
		<li><a target="_blank" href="http://www.lolesports.com/en_US/lms/lms_2016_summer/schedule/default">LMS</a></li>
		<li><a target="_blank" href="http://www.lolesports.com/en_US/eu-cs/eucs_2016_summer/schedule/default">EU CS</a></li>
		<li><a target="_blank" href="http://www.lolesports.com/en_US/na-cs/nacs_2016_summer/schedule/default">NA CS</a></li>
	</ul>
</div>

<?php if ($validUser) { ?>
<div id="instructions-popup" class="white_content hidden">
	<h2>Instructions</h2>
	<a class="close" href="javascript:void(0)" onclick="closePopup('instructions-popup')">×</a>
	<div>
	<p class="bold">Golden rules</p>
	<ul>
	<li>Use the most recent pmtc (-lolpmtc).</li>
	<li>Submit threads as soon as the series end.</li>
	<li>Copy title from the schedule (-lolschedule).</li>
	</ul>
	<p class="bold">Silver rules</p>
	<ul>
	<li>Edit changes later (ideally you would just need to fill last game of the series)</li>
	<li>Have links on the thread before last game ends (if possible)</li>
	<li>After filling the teams and p/b for each game (fix subs) hit "Create" after "Poll"</li>
	</ul>
	<p class="bold">Normal procedure (EU LCS):</p>
	<ul>
	<li>Screenshot of the draft of game 1 (once they lock in the champions so you know the pick order) and at the end of the game.</li>
	<li>Start filling it in after the Game 2 draft.</li>
	<li>So you should have the title ready + all info the the thread filled up + game 1 stats.</li>
	<li>You can leave only the champion picks on game 2 and leave everything at 0, but after like ~10 min fill them up and add the match history from lolesports.</li>
	</ul>
	<p>If you have any question just ask #league</p>
	</div>
</div>
<?php } ?>

<div id="top-div">
	<ul class="top-list inline">
		<!--<li><strong id=createButton>Create</strong></li>-->
		<!--<li><strong id="editButton">Edit</strong></li>-->
		<?php if ($validUser) { ?>
		<li>
			<strong id="instructions-btn" onclick="showPopup('instructions-popup')">
			Instructions
			</strong>
		</li>
		<?php } ?>
		<?php if ($guest || $validUser) { ?>
		<li>
		<strong class="about-btn" onclick="showPopup('match-history-popup');">
			Match History
		</strong>
		</li>
		<?php } ?>
		<li>
			<strong class="about-btn" onclick="showPopup('about-popup');">
			About
			</strong>
		</li>
		<li>
			<strong id="themeButton" onclick="changeTheme();">
			Switch Theme
			</strong>
		</li>
		<?php if ($guest || $validUser) { ?>
		<li>
			<strong>
				<a target="_blank" href="https://docs.google.com/spreadsheets/d/1679hqMFkHP1fooaQw9jFb1RUNPlxGNvvtvdV5F-W5s0">Schedule</a>
			</strong>
		</li>
		<li>
			<form method="POST" action="index.php">
				<input id="btn-logout" type="submit" name="logout" value="" title="Logout"></input>
			</form>
		</li>
		<?php } ?>
	</ul>
</div>