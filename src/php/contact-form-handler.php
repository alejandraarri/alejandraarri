<?php 
$errors = array();
$myemail = 'me@alejandraarri.com';

if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['message']))
{
   // $errors .= "\n Error: all fields are required";
    $status = "01";
    $statusText = "Mail not sent. Please, make sure you fill all the fields.";
    array_push($errors,array("status"=>$status,"statusText"=>$statusText));
}

$name = $_POST['name']; 
$email_address = $_POST['email']; 
$message = $_POST['message']; 

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    //$errors .= "\n Error: Invalid email address";
    $status = "02";
    $statusText = "Mail not sent. It seems like the email address was invalid.";
    array_push($errors,array("status"=>$status,"statusText"=>$statusText));
}

if( empty($errors))
{
	
	$to = $myemail; 
	$email_subject = "Contact form submission: $name";
	$email_body = "You have received a new message. ".
	" Here are the details:\n Name: $name \n Email: $email_address \n Message \n $message"; 
	
	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";

	mail($to,$email_subject,$email_body,$headers);

	$status = "00";
	$statusText = "Mail sent. Thank you so much for contacting me.";
	array_push($errors,array("status"=>$status,"statusText"=>$statusText));

	
} 

header('Content-type: application/json; charset=utf-8');
echo json_encode($errors);


?>