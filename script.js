// Transition Animation 

AOS.init({
    offset: 100,
    duration: 900,
});

// Typing Effect Animation 

var typingEffect = new Typed(".anim", {
    strings: ["Hajara Sabnam", "A Tech Enthusiast", "A Coder"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1200
});

// Profile Box Animation 

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
    
// View Cetificate - Cetificate Modal in Work Experiences

function viewCertificate(certPath) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certImage");
    
    if (modal && modalImg && certPath) {
        modalImg.src = certPath;
        modal.style.display = "flex";
        
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
    }
}

function viewCertificateMultiple(certPaths) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certImage");

    if (!modal || !modalImg || !certPaths || certPaths.length === 0) return;

    currentCerts = certPaths;
    currentCertIndex = 0;
    modalImg.src = currentCerts[currentCertIndex];

    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);

    addCertNavButtons();
}

function addCertNavButtons() {
    const modal = document.getElementById("certModal");

    document.querySelectorAll(".cert-nav-btn").forEach(btn => btn.remove());

    if (currentCerts.length <= 1) return;

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.className = "cert-nav-btn prev";
    prevBtn.onclick = (e) => {
        e.stopPropagation(); 
        showCert(currentCertIndex - 1);
    };
    modal.appendChild(prevBtn);

    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.className = "cert-nav-btn next";
    nextBtn.onclick = (e) => {
        e.stopPropagation();  
        showCert(currentCertIndex + 1);
    };
    modal.appendChild(nextBtn);
}

function showCert(index) {
    const modalImg = document.getElementById("certImage");

    if (index < 0) index = currentCerts.length - 1;
    if (index >= currentCerts.length) index = 0;

    currentCertIndex = index;
    modalImg.src = currentCerts[currentCertIndex];
}

function closeCertModal() {
    const modal = document.getElementById("certModal");
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
            document.querySelectorAll(".cert-nav-btn").forEach(btn => btn.remove());
        }, 300);
    }
}

// function closeCertModal() {
//     const modal = document.getElementById("certModal");
//     if (modal) {
//         modal.classList.remove("show");
//         setTimeout(() => {
//             modal.style.display = "none";
//         }, 300); 
//     }
// }

document.addEventListener("click", function(e) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certImage");
    
    if (modal && e.target === modal) {
        closeCertModal();
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeCertModal();
    }
});

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
