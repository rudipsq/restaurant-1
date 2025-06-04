<?php
// Set the URL to redirect to
$redirect_url = 'https://flammaurant.de/index.html';

// Perform the redirection
header('Location: ' . $redirect_url);
// Optional: Stop further script execution
exit();
?>
