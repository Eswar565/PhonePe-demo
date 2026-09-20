# UPI Money Transfer Demo (PhonePe Theme)

A clean, responsive UPI money transfer web application built with **HTML5, CSS3, and Vanilla JavaScript** — with **zero dependencies, no backend, and no database**.

---

## 🚀 Features

- **Live Balance Management:** Starts with a demo balance of ₹10,000 and dynamically deducts amounts in real-time with Indian currency formatting (`₹`).
- **Input Validation:** Ensures entered mobile numbers are valid 10-digit numbers and transfer amounts are positive and within available balance limits.
- **Official Banking SMS Generation:** Automatically generates a realistic UPI confirmation message containing:
  - Credited amount
  - Recipient mobile number
  - Formatted date and time
  - Unique 12-digit UPI transaction reference ID (`UPI Ref: ...`)
- **Native Device SMS Integration (`sms:` Protocol):** Triggers your phone's native Messaging app with the recipient number and full banking message pre-filled without requiring any external API key, server, or database.
- **On-Screen SMS Confirmation Card:** Displays a slide-down confirmation card with recipient info, full SMS text, and a direct link to open the SMS app.
- **Audio Feedback:** Synthesizes an authentic banking payment chime using the browser's built-in Web Audio API (pure JavaScript, no external audio files).
- **Transaction History:** Displays a timeline of debit and simulated credit notifications with timestamps.

---

## 📁 Project Structure

```text
demo/
├── demo.html    # Main user interface & PhonePe layout
├── demo.css     # Styling, modern card UI, animations & color tokens
├── demo.js      # Core logic, validation, Web Audio chime & SMS trigger
└── README.md    # Documentation and usage guide
```

---

## 🛠️ How to Run

1. **On PC / Laptop:**
   - Double-click [demo.html](file:///d:/IST/demo/demo.html) or open it directly in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).

2. **On Mobile Phone (Recommended for Direct SMS):**
   - Open [demo.html](file:///d:/IST/demo/demo.html) in your mobile browser (e.g., Chrome on Android or Safari on iOS).
   - Enter a 10-digit mobile number and transfer amount.
   - Tap **Pay & Send SMS**.
   - Your phone will automatically launch its native **Messages** app with the recipient and text ready to send.

---

## 📱 How the SMS Delivery Works

Because the project uses pure client-side code without an external SMS gateway or database, it utilizes the **Native Device SMS URI Scheme (`sms:`)**:

```javascript
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const smsUri = `sms:+91${mobile}${isIOS ? "&" : "?"}body=${encodeURIComponent(smsMessage)}`;
window.location.href = smsUri;
```

- **Zero API Keys:** Uses the device's built-in cellular SIM capabilities.
- **Zero Costs:** Requires no paid third-party SMS gateway.
- **Cross-Platform:** Works on Android, iOS, and PC (when connected via Windows Phone Link).

---

## 💻 Tech Stack

- **HTML5:** Semantic structure and accessible form controls.
- **CSS3:** Responsive layout, PhonePe brand theme (`#5f259f`), flexbox, and smooth CSS transitions.
- **Vanilla JavaScript:** DOM manipulation, regex validation, Web Audio API, and URI schemes.
