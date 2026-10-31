const supabaseUrl = "https://jmxrcnxygyvbrbzxnher.supabase.co";
const supabaseKey = "sb_publishable_JU_CiBRevCBpJ4Twk7Jddg_10keBxy9";

const client = window.supabase ? supabase.createClient(supabaseUrl, supabaseKey) : null;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

$("#year").textContent = new Date().getFullYear();

// Header turns solid once the hero has scrolled away

const header = $(".site-header");
const hero = $(".hero");

new IntersectionObserver(([entry]) => {
    header.classList.toggle("is-solid", !entry.isIntersecting);
}, { rootMargin: "-72px 0px 0px 0px" }).observe(hero);

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

// Active section indicator in the nav

const navLinks = $$(".nav a");
const indicator = $(".nav-indicator");

function moveIndicator(link) {
    if (!link) {
        indicator.classList.remove("is-on");
        return;
    }
    indicator.style.setProperty("--x", link.offsetLeft + 12 + "px");
    indicator.style.setProperty("--w", (link.offsetWidth - 24) / 100);
    indicator.classList.add("is-on");
}

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        const active = navLinks.find(a => a.getAttribute("href") === "#" + id);
        navLinks.forEach(a => a.classList.toggle("is-active", a === active));
        moveIndicator(active);
    });
}, { rootMargin: "-45% 0px -50% 0px" });

$$("main > section").forEach(s => sectionObserver.observe(s));
window.addEventListener("resize", () => moveIndicator($(".nav a.is-active")));

// Scroll reveal, staggered among siblings

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
    });
}, { rootMargin: "0px 0px -8% 0px" });

$$("[data-reveal]").forEach(el => {
    const siblings = $$(":scope > [data-reveal]", el.parentElement);
    el.style.setProperty("--d", Math.min(siblings.indexOf(el), 5) * 0.08 + "s");
    revealObserver.observe(el);
});

// Typing effect

const typed = $("#typed");
const words = ["Android apps", "machine learning models", "AI & IoT research", "poetry"];

if (!reduceMotion) {
    let word = 0;
    let chars = words[0].length;
    let deleting = true;
    const pause = { typed: 1600, deleted: 350 };

    setTimeout(function tick() {
        const current = words[word];
        chars += deleting ? -1 : 1;
        typed.textContent = current.slice(0, chars);

        let delay = deleting ? 40 : 75;
        if (!deleting && chars === current.length) {
            deleting = true;
            delay = pause.typed;
        } else if (deleting && chars === 0) {
            deleting = false;
            word = (word + 1) % words.length;
            delay = pause.deleted;
        }
        setTimeout(tick, delay);
    }, 2600);
}

// Gentle parallax on the portrait

const portrait = $(".hero-photo img");

if (!reduceMotion) {
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = Math.min(window.scrollY, window.innerHeight);
            portrait.style.setProperty("--s", 1 + y / 4000);
            portrait.style.setProperty("--py", y * 0.06 + "px");
            ticking = false;
        });
    }, { passive: true });
}

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

// Poem reader tabs

const tabs = $$('.poem-list [role="tab"]');

function selectPoem(tab, focus) {
    tabs.forEach(t => {
        const selected = t === tab;
        t.setAttribute("aria-selected", selected);
        t.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        panel.hidden = !selected;
        if (selected) {
            panel.classList.remove("is-entering");
            void panel.offsetWidth;
            panel.classList.add("is-entering");
        }
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
}

tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectPoem(tab));
    tab.addEventListener("keydown", e => {
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!step) return;
        e.preventDefault();
        selectPoem(tabs[(i + step + tabs.length) % tabs.length], true);
    });
});

// Image viewer for certificates and achievement photos

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
        viewerImg.alt = btn.closest(".award") ? $(".award-title", btn.closest(".award")).textContent : "Certificate";
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
