<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $review = $_POST["review"];
    $conn = mysqli_connect("localhost", "root", "", "form_input") or die("connection failed");
    $sql = "INSERT INTO review_form(name, email, review) VALUES ('{$name}','{$email}','{$review}')";
    $result = mysqli_query($conn, $sql) or die("Query Failed!");
    header("location: poetry.html"); 
    mysqli_close($conn);
?>
