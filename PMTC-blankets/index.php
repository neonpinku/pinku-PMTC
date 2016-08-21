<?php
/** Note: server uses Apache/2.2.22 **/
error_reporting(E_ALL ^ E_NOTICE);
ini_set('display_errors', 1);

session_start();

if (isset($_POST['logout'])) {
	session_destroy();
	$_SESSION = array(); // Clears the $_SESSION variable
	session_start();
}

$validUser 	= FALSE;
$guest 		= FALSE;
if (isset($_SESSION['user'])) {
	$user = $_SESSION['user'];
	if ($user == "logged") {
		$validUser = TRUE;
	} else if ($user == "guest") {
		$guest = TRUE;
	} else {
		exit('ERROR!!!!');
	}
}

if (!isset($_SESSION['tries'])) {
	$_SESSION['tries'] = 0;
} else if (!$validUser && !$guest && $_SESSION['tries'] > 1) {
	sleep(2*$_SESSION['tries']);
}

include('head.html');

if ($validUser || $guest) {
	include('pmtc.php');
} else if (!empty($_POST) && !isset($_POST['logout'])) {
	// user tried to log in or entered as guest
	if (isset($_POST['login'])) {
		// user clicked on the button 'login'
		$pass = "";
		if (isset($_POST['pass'])) { // so that they don't return errors
			$pass = $_POST['pass'];
		}

		$pwoptions   = ['cost' => 8,]; // all up to you
		$passhash    = password_hash($pass, PASSWORD_BCRYPT, $pwoptions);  // hash entered pw
		$hashedpass  = file_get_contents("../secured/pass.txt"); // and our stored password

		if (password_verify($pass,$hashedpass)) {
			// the password verify is how we actually login here
			// the $userhash and $passhash are the hashed user-entered credentials
			// password verify now compares our stored user and pw with entered user and pw
			$_SESSION['user'] = "logged";
			$validUser = TRUE;
			include('pmtc.php');
		} else {
			echo 'Invalid password!';
			$_SESSION['tries']++;
		}
	} else if (isset($_POST['guest'])) {
		// user clicked on the button 'guest'
		$_SESSION['user'] = "guest";
		$guest = TRUE;
		include('pmtc.php');
	} else {
		echo 'How did you get here?';
	}
} else {
	include_once('menu.php');
	include('login.php');
}

include('end.html');