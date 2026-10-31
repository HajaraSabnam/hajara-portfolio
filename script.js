const supabaseUrl = "https://jmxrcnxygyvbrbzxnher.supabase.co";
const supabaseKey = "sb_publishable_JU_CiBRevCBpJ4Twk7Jddg_10keBxy9";

const client = window.supabase ? supabase.createClient(supabaseUrl, supabaseKey) : null;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

$("#year").textContent = new Date().getFullYear();

// Header gets a hairline once the page scrolls

const header = $(".site-header");
const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Mobile menu

const menuBtn = $("#menuBtn");

function setMenu(open) {
    document.body.classList.toggle("nav-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("nav-open")));
$$(".nav a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => {
    if (e.key === "Escape") setMenu(false);
});

// Underline the nav link for the section in view

const navLinks = $$(".nav a");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        const active = navLinks.find(a => a.getAttribute("href") === "#" + id);
        navLinks.forEach(a => a.classList.toggle("is-active", a === active));
    });
}, { rootMargin: "-45% 0px -50% 0px" });

$$("main > section").forEach(s => sectionObserver.observe(s));

// Scroll reveal, staggered among siblings

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        entry.target.dispatchEvent(new Event("reveal"));
        revealObserver.unobserve(entry.target);
    });
}, { rootMargin: "0px 0px -8% 0px" });

$$("[data-reveal]").forEach(el => {
    const siblings = $$(":scope > [data-reveal]", el.parentElement);
    el.style.setProperty("--d", Math.min(siblings.indexOf(el), 5) * 0.08 + "s");
    revealObserver.observe(el);
});

// Research numbers count up the first time they appear

$(".counts").addEventListener("reveal", () => {
    $$(".counts [data-count]").forEach(num => {
        const target = Number(num.dataset.count);
        if (reduceMotion) return;
        const start = performance.now();
        const step = now => {
            const t = Math.min((now - start) / 1400, 1);
            num.textContent = Math.round(target * (1 - Math.pow(1 - t, 4)));
            if (t < 1) requestAnimationFrame(step);
        };
        num.textContent = "0";
        requestAnimationFrame(step);
    });
}, { once: true });

// Topic strip needs a second copy to loop seamlessly

const topics = $(".topics-track");
topics.innerHTML += topics.innerHTML;

// Achievements accordion; #a-<name> links open the matching entry

function setAward(award, open) {
    award.classList.toggle("is-open", open);
    $(".award-head", award).setAttribute("aria-expanded", open);
}

$$(".award").forEach(award => {
    $(".award-head", award).addEventListener("click", () => {
        setAward(award, !award.classList.contains("is-open"));
    });
});

function openFromHash() {
    const target = location.hash && $(location.hash);
    if (!target || !target.classList.contains("award")) return;
    setAward(target, true);
    target.classList.add("is-in");
    setTimeout(() => target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 100);
}

openFromHash();
window.addEventListener("hashchange", openFromHash);

// Image viewer for achievement and moment photos

const viewer = $("#viewer");
const viewerImg = $("#viewerImg");
const viewerCount = $("#viewerCount");
let gallery = [];
let galleryIndex = 0;

function showImage(index) {
    galleryIndex = (index + gallery.length) % gallery.length;
    viewerImg.classList.add("is-swapping");
    const next = new Image();
    next.onload = next.onerror = () => {
        viewerImg.src = gallery[galleryIndex];
        viewerImg.classList.remove("is-swapping");
    };
    next.src = gallery[galleryIndex];
    viewerCount.textContent = `${galleryIndex + 1} / ${gallery.length}`;
}

$$("[data-gallery]").forEach(btn => {
    btn.addEventListener("click", () => {
        gallery = btn.dataset.gallery.split("|");
        viewer.classList.toggle("single", gallery.length === 1);
        const award = btn.closest(".award");
        viewerImg.alt = award ? $(".award-title", award).textContent : $("img", btn).alt;
        viewer.showModal();
        showImage(Number(btn.dataset.index || 0));
    });
});

$("#viewerClose").addEventListener("click", () => viewer.close());
$("#viewerPrev").addEventListener("click", () => showImage(galleryIndex - 1));
$("#viewerNext").addEventListener("click", () => showImage(galleryIndex + 1));
viewer.addEventListener("click", e => {
    if (e.target === viewer) viewer.close();
});
viewer.addEventListener("keydown", e => {
    if (gallery.length < 2) return;
    if (e.key === "ArrowLeft") showImage(galleryIndex - 1);
    if (e.key === "ArrowRight") showImage(galleryIndex + 1);
});

// Contact form

const form = $("#contactForm");
const status = $("#formStatus");

function setError(id, message) {
    $(`#${id}-error`).textContent = message;
    $(`#${id}`).closest(".field").classList.toggle("has-error", Boolean(message));
}

function validateForm() {
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();
    let isValid = true;

    setError("name", "");
    setError("email", "");
    setError("message", "");

    if (name === "" || /\d/.test(name)) {
        setError("name", "Please enter your name properly.");
        isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("email", "Please enter a valid email address.");
        isValid = false;
    }
    if (message === "") {
        setError("message", "Please enter your message.");
        isValid = false;
    }

    return isValid ? { name, email, message } : null;
}

form.addEventListener("submit", async e => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    const values = validateForm();
    if (!values) return;

    const submit = $("#submit");
    submit.disabled = true;
    submit.textContent = "Sending...";

    const { error } = client
        ? await client.from("contact_form").insert([values])
        : { error: new Error("Supabase failed to load") };

    submit.disabled = false;
    submit.textContent = "Send message";

    if (error) {
        console.log(error);
        status.classList.add("fail");
        status.textContent = "Sorry, your message couldn't be sent. Please email me directly instead.";
    } else {
        status.classList.add("ok");
        status.textContent = "Thank you! Your message has been sent.";
        form.reset();
    }
});
