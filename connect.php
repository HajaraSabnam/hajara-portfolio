<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $conn = mysqli_connect("localhost", "root", "", "form_input") or die("connection failed");
    
    $sql = "INSERT INTO contact_form(name,email, message) VALUES ('{$name}','{$email}','{$message}' )";
    $result = mysqli_query($conn, $sql) or die("Query Failed!");
    header("location: contactme.html");
    mysqli_close($conn);
?>