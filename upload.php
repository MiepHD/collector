<?php
    $target_dir = "uploads/";
    $target_file = $target_dir . $_POST["username"] . $_POST["id"];
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    if(isset($_POST["submit"])) {
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        } else {
            if (! move_uploaded_file($_FILES["uploadedimage"]["tmp_name"], $target_file)) {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }
?>