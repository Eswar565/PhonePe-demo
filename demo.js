let balance = 10000;

function transfer() {
    const mobileInput = document.getElementById("mobile");
    const amountInput = document.getElementById("amount");
    const balanceElement = document.getElementById("balance");

    const mobile = mobileInput.value.trim();
    const amount = Number(amountInput.value);

    // Validate 10-digit mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number");
        return;
    }

    // Validate positive numeric amount
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    // Check balance
    if (amount > balance) {
        alert("Insufficient balance");
        return;
    }

    // Deduct amount
    balance -= amount;
    balanceElement.innerText = "₹" + balance.toLocaleString("en-IN");

    // Clear inputs
    mobileInput.value = "";
    amountInput.value = "";

    // 1. Add debit notification to list
    addNotification("Money Debited", mobile, amount, "debit");

    // 2. Generate official UPI money received SMS message
    const upiRef = Math.floor(100000000000 + Math.random() * 900000000000);
    const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const smsMessage = `Dear Customer, ₹${amount.toLocaleString("en-IN")} has been credited to your Account via UPI on ${dateStr} at ${timeStr}. (UPI Ref: ${upiRef}). - PhonePe`;

    // 3. Create universal SMS link for Android, iOS, and PC (Phone Link)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const smsUri = `sms:+91${mobile}${isIOS ? "&" : "?"}body=${encodeURIComponent(smsMessage)}`;

    // 4. Trigger SMS App directly
    window.location.href = smsUri;

    // 5. Show on-screen SMS confirmation card
    showSmsModal(mobile, smsMessage, smsUri);

    // 6. Play audio tone
    playNotificationTone();

    // 7. Add credit notification to transaction list
    setTimeout(() => {
        addNotification("Money Credited", mobile, amount, "credit");
    }, 1200);
}

// Display on-screen SMS modal
function showSmsModal(mobile, message, smsUri) {
    const modal = document.getElementById("smsModal");
    const smsRecipient = document.getElementById("smsRecipient");
    const smsText = document.getElementById("smsText");
    const smsTime = document.getElementById("smsTime");
    const openSmsBtn = document.getElementById("openSmsBtn");

    smsRecipient.innerText = `To: +91 ${mobile}`;
    smsText.innerText = message;
    smsTime.innerText = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    openSmsBtn.href = smsUri;

    modal.classList.remove("hidden");
    void modal.offsetWidth; // Force layout reflow
    modal.classList.add("show");
}

function closeSmsModal() {
    const modal = document.getElementById("smsModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}

// Web Audio tone for transaction
function playNotificationTone() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5

        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
}

function addNotification(title, mobile, amount, type) {
    const notificationList = document.getElementById("notifications");
    const notification = document.createElement("div");
    notification.className = "notification";

    const sign = type === "credit" ? "+" : "-";
    const maskedMobile = "XXXXXX" + mobile.slice(-4);
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    notification.innerHTML = `
        <div>
            <b>${title}</b>
            <p>${type === "debit" ? "Sent to" : "Received from"}: ${maskedMobile}</p>
            <p style="font-size: 11px; color: #999;">${time}</p>
        </div>
        <div class="${type}">
            ${sign} ₹${amount.toLocaleString("en-IN")}
        </div>
    `;

    notificationList.prepend(notification);
}
