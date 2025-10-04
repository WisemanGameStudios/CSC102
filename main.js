// Dain Wiseman | 10/04/2025

let moveInterval = null;

// Shortcuts to elements
let memeEl, startForm, stopForm, startBtn, stopBtn, statusMsg, speedInput;

// Status Messages
function setStatus(msg) {
    if (statusMsg) statusMsg.innerHTML = msg;
}

// Ensure the image can move with top/left
function ensurePositioning() {
    memeEl.style.position = "absolute";
    if (!memeEl.style.left) memeEl.style.left = "220px"; //
    if (!memeEl.style.top)  memeEl.style.top  = "60px";
    memeEl.style.margin = "0";
}

// Start movement at a given speed
function startMoving(speedMs) {
    if (moveInterval !== null) {
        clearInterval(moveInterval);
        moveInterval = null;
    }

    ensurePositioning();

    // Toggle buttons
    startBtn.disabled = true;
    stopBtn.disabled  = false;

    setStatus("Moving every " + speedMs + " ms. Click Stop to halt.");

    const navOffsetX = 220; // stay to the right of the nav

    moveInterval = setInterval(function () {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const imgW = memeEl.offsetWidth  || 250;
        const imgH = memeEl.offsetHeight || 250;

        const maxX = Math.max(navOffsetX, vw - imgW);
        const x = Math.floor(Math.random() * (maxX - navOffsetX)) + navOffsetX;

        const maxY = Math.max(0, vh - imgH - 20);
        const y = Math.floor(Math.random() * (maxY + 1));

        memeEl.style.left = x + "px";
        memeEl.style.top  = y + "px";
    }, speedMs);
}

// Stop movement
function stopMoving() {
    if (moveInterval !== null) {
        clearInterval(moveInterval);
        moveInterval = null;
    }
    startBtn.disabled = false;
    stopBtn.disabled  = true;
    setStatus("Movement stopped. You can Start again.");
}

// Get elements
window.onload = function () {
    memeEl     = document.getElementById("meme");
    startForm  = document.getElementById("startForm");
    stopForm   = document.getElementById("stopForm");
    startBtn   = document.getElementById("startBtn");
    stopBtn    = document.getElementById("stopBtn");
    statusMsg  = document.getElementById("statusMsg");
    speedInput = document.getElementById("speedInput");

    // Fail-fast diagnostics shown on the page
    if (!memeEl)    { document.body.insertAdjacentHTML("afterbegin","<p style='color:red'>ERROR: #meme not found.</p>"); return; }
    if (!startForm) { document.body.insertAdjacentHTML("afterbegin","<p style='color:red'>ERROR: #startForm not found.</p>"); return; }
    if (!stopForm)  { document.body.insertAdjacentHTML("afterbegin","<p style='color:red'>ERROR: #stopForm not found.</p>"); return; }
    if (!startBtn || !stopBtn) { document.body.insertAdjacentHTML("afterbegin","<p style='color:red'>ERROR: Start/Stop buttons missing IDs.</p>"); return; }

    setStatus("Ready. Enter a speed (50–2000 ms) and press Start.");

    // Form submit
    startForm.onsubmit = function (evt) {
        if (evt && evt.preventDefault) evt.preventDefault();
        let speed = parseInt(speedInput.value, 10);
        if (isNaN(speed)) { setStatus("⚠️ Please enter a number for speed."); return false; }
        if (speed < 50 || speed > 2000) { setStatus("⚠️ Speed must be between 50 and 2000 ms."); return false; }
        startMoving(speed);
        return false;
    };

    stopForm.onsubmit = function (evt) {
        if (evt && evt.preventDefault) evt.preventDefault();
        stopMoving();
        return false;
    };
};
