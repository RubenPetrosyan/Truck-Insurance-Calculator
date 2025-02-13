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

    const dailyRate = originalPremium / daysInYear;
    const additionalPremium = dailyRate * remainingDays;
    const additionalDownPayment = additionalPremium * (additionalDownPaymentPct / 100);
    const additionalAmountFinanced = additionalPremium - additionalDownPayment;
    const additionalMonthlyPayment = (additionalAmountFinanced * apr / 12) / (1 - Math.pow(1 + apr / 12, -remainingPayments));

    const financedOriginalPremium = originalPremium - (originalPremium * (originalDownPaymentPct / 100));
    const currentMonthlyPayment = (financedOriginalPremium * apr / 12) / (1 - Math.pow(1 + apr / 12, -originalPayments));
    const newMonthlyPayment = currentMonthlyPayment + additionalMonthlyPayment;

    let resultHTML = `
        <p><strong>Additional Premium:</strong> $${additionalPremium.toFixed(2)}</p>
        <p><strong>Additional Down Payment:</strong> $${additionalDownPayment.toFixed(2)}</p>
        <p><strong>Additional Amount Financed:</strong> $${additionalAmountFinanced.toFixed(2)}</p>
        <p><strong>Additional Monthly Payment:</strong> $${additionalMonthlyPayment.toFixed(2)}</p>
        <p><strong>Remaining Payments:</strong> ${remainingPayments}</p>
        <p><strong>Current Monthly Payment:</strong> $${currentMonthlyPayment.toFixed(2)}</p>
        <p><strong>Financed Original Premium:</strong> $${financedOriginalPremium.toFixed(2)}</p>
        <p><strong>New Monthly Payment:</strong> $${newMonthlyPayment.toFixed(2)}</p>
    `;

    if (client) {
        resultHTML = `<p><strong>Client:</strong> ${client}</p>` + resultHTML;
    }

    document.getElementById('results').innerHTML = resultHTML;
}
