const callBtn = document.getElementById("callBtn");

if (callBtn) {
  callBtn.addEventListener("click", function () {
    alert("Calling Maria Binte Haque at +880 1712-334455");
  });
}

const form = document.getElementById("otpForm");

if (form) {
  let randomOtp = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("demoOtp").innerHTML = randomOtp;

  let wrongAttempts = 0;
  let isLocked = false;

  const d1 = document.getElementById("d1");
  const d2 = document.getElementById("d2");
  const d3 = document.getElementById("d3");
  const d4 = document.getElementById("d4");

  const resendBtn = document.getElementById("resendBtn");
  resendBtn.addEventListener("click", function () {
    if (isLocked) {
      document.getElementById("otpError").innerHTML =
        "OTP is locked. Try again after 1 minute.";
      return;
    }

    randomOtp = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("demoOtp").innerHTML = randomOtp;
    form.reset();
    clearErrors();
    alert("New OTP sent: " + randomOtp);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    if (isLocked) {
      document.getElementById("otpError").innerHTML =
        "OTP is locked. Try again after 1 minute.";
      return;
    }

    let enteredOtp =
      d1.value.trim() +
      d2.value.trim() +
      d3.value.trim() +
      d4.value.trim();

    if (enteredOtp === "") {
      showError(d1, "otpError", "OTP is required.");
      showError(d2, "otpError", "OTP is required.");
      showError(d3, "otpError", "OTP is required.");
      showError(d4, "otpError", "OTP is required.");
    } else if (!/^[0-9]{4}$/.test(enteredOtp)) {
      showError(d1, "otpError", "Only 4-digit numbers are allowed.");
      showError(d2, "otpError", "Only 4-digit numbers are allowed.");
      showError(d3, "otpError", "Only 4-digit numbers are allowed.");
      showError(d4, "otpError", "Only 4-digit numbers are allowed.");
    } else if (enteredOtp !== "" + randomOtp) {
      wrongAttempts++;
      showError(
        d1,
        "otpError",
        "Wrong OTP! Attempt " + wrongAttempts + " of 3."
      );
      showError(
        d2,
        "otpError",
        "Wrong OTP! Attempt " + wrongAttempts + " of 3."
      );
      showError(
        d3,
        "otpError",
        "Wrong OTP! Attempt " + wrongAttempts + " of 3."
      );
      showError(
        d4,
        "otpError",
        "Wrong OTP! Attempt " + wrongAttempts + " of 3."
      );

      if (wrongAttempts >= 3) {
        isLocked = true;
        document.getElementById("otpError").innerHTML =
          "Too many wrong attempts, locked for 1 minute.";
        d1.disabled = true;
        d2.disabled = true;
        d3.disabled = true;
        d4.disabled = true;

        setTimeout(function () {
          isLocked = false;
          wrongAttempts = 0;
          d1.disabled = false;
          d2.disabled = false;
          d3.disabled = false;
          d4.disabled = false;
          document.getElementById("otpError").innerHTML =
            "OTP unlocked. Try again.";
        }, 60000);
      }
    } else {
      wrongAttempts = 0;
      showSuccess(d1);
      showSuccess(d2);
      showSuccess(d3);
      showSuccess(d4);
      alert("Delivery Confirmed Successfully!");
      document.getElementById("otpSection").innerHTML =
        '<div class="msg-success">Delivery Confirmed Successfully!</div>' +
        '<div class="card center-text">' +
        '<div class="slip-title">ORDER DELIVERED</div>' +
        '<div class="customer-name">Maria Binte Haque</div>' +
        '<div class="order-code">#ORD-10475</div>' +
        '<div class="dashed-line"></div>' +
        '<div class="address-text">Status updated to Delivered</div>' +
        '</div>' +
        '<a href="index.html" class="btn-green">Back to Today\'s Queue</a>';
    }
  });
}

function showError(input, errorId, message) {
  input.classList.add("errorBorder");
  input.classList.remove("successBorder");
  document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input) {
  input.classList.remove("errorBorder");
  input.classList.add("successBorder");
}

function clearErrors() {
  let errors = document.querySelectorAll(".error");
  errors.forEach(function (item) {
    item.innerHTML = "";
  });

  let fields = document.querySelectorAll("input");
  fields.forEach(function (field) {
    field.classList.remove("errorBorder");
    field.classList.remove("successBorder");
  });
}
