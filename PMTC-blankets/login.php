<div id="div-login">
	<p>Enter the password to login or login as guest</p>
	<form method="POST" action="index.php">
		<div class="inline-block">
			<label for="pass">Password:</label>
			<input type="password" name="pass"></input>
		</div>
		<div>
		<p>Attempts: <?php if (isset($_SESSION['tries'])) echo $_SESSION['tries']; ?></p>
		</div>
		<div class="inline-block">
			<input type="submit" name="login" value="Login"></input>
		</div>
		<div class="inline-block">
			<input type="submit" name="guest" value="Guest"></input>
		</div>
	 </form>
 </div>