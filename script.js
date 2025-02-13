document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("button").addEventListener("click", calculateInsurance);
    document.getElementById("effectiveDate").addEventListener("change", autoFillExpirationDate);
});

function autoFillExpirationDate() {
    const effectiveDate = new Date(document.getElementById('effectiveDate').value);
    if (effectiveDate) {
        const expirationDate = new Date(effectiveDate);
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        document.getElementById('expirationDate').value = expirationDate.toISOString().split('T')[0];
    }
}

function calculateInsurance() {
    const effectiveDate = new Date(document.getElementById('effectiveDate').value);
    const expirationDate = new Date(document.getElementById('expirationDate').value);
    const endorsementDate = new Date(document.getElementById('endorsementDate').value);
    const remainingPayments = parseInt(document.getElementById('remainingPayments').value);
    const originalPayments = parseInt(document.getElementById('originalPayments').value);
    const originalPremium = parseFloat(document.getElementById('originalPremium').value);
    const originalDownPaymentPct = parseFloat(document.getElementById('originalDownPayment').value);
    const additionalDownPaymentPct = parseFloat(document.getElementById('additionalDownPayment').value);
    const apr = parseFloat(document.getElementById('apr').value) / 100;
    const client = document.getElementById('client').value.trim();

    // Validation checks
    if (!effectiveDate || !expirationDate || !endorsementDate || isNaN(originalPremium) || isNaN(originalDownPaymentPct) || isNaN(additionalDownPaymentPct) || isNaN(apr) || isNaN(remainingPayments) || isNaN(originalPayments)) {
        alert("Please fill in all required fields correctly.");
        return;
    }
    if (remainingPayments < 1 || remainingPayments > 10 || remainingPayments > originalPayments) {
        alert("Remaining Payments must be between 1 and 10 and cannot be greater than Original Number of Payments.");
        return;
    }
    if (originalPayments < 1 || originalPayments > 10) {
        alert("Original Payments must be between 1 and 10.");
        return;
    }
    if (endorsementDate < effectiveDate || expirationDate < effectiveDate) {
        alert("Invalid date selection. Ensure dates follow the correct sequence.");
        return;
    }
    if (originalDownPaymentPct < 0 || originalDownPaymentPct > 100) {
        alert("Original DownPayment (%) must be between 0 and 100.");
        return;
    }
    if (additionalDownPaymentPct < 0 || additionalDownPaymentPct > 100) {
        alert("Additional DownPayment (%) must be between 0 and 100.");
        return;
    }

    const daysInYear = (effectiveDate.getFullYear() % 4 === 0) ? 366 : 365;
    const policyPeriodDays = Math.ceil((expirationDate - effectiveDate) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.ceil((expirationDate - endorsementDate) / (1000 * 60 * 60 * 24));

    const daily
