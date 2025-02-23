//Transition Animation//

AOS.init({
    offset: 100,
    duration: 900,
});

//Typing Effect Animation//

var typingEffect = new Typed(".anim", {
    strings: ["Hajara Sabnam", "A Tech Enthusiast", "A Coder"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1200
});

//Profile Box Animation//

function openProfileBox() {
    var profileBox = document.getElementById("myProfileBox");
    profileBox.style.right = "3%";
}
    
function closeProfileBox() {
    var profileBox = document.getElementById("myProfileBox");
    profileBox.style.right = "-600px"; 
}
    
function openmenu() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
    
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    
    if (screenWidth <= 950) {
        navbar.classList.toggle("vertical");
    } else {
        navbar.classList.remove("vertical");
    }
}
    
// Form Validation

function validateForm(event) {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    if (name === "" || /\d/.test(name)) {
        nameError.textContent = "Please enter your name properly.";
        isValid = false;
    }

    if (email === "" || !email.includes("@")) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    if (message === "") {
        messageError.textContent = "Please enter your message.";
        isValid = false;
    }

    if (isValid) {
        alert('Thank you for your message!');
    }

    return isValid;  
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    
    if (!validateForm(event)) {
        event.preventDefault();  
    }
});
