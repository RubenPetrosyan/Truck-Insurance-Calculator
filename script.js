function calculateInsurance() {
    const effectiveDate = new Date(document.getElementById('effectiveDate').value);
    const expirationDate = new Date(document.getElementById('expirationDate').value);
    const endorsementDate = new Date(document.getElementById('endorsementDate').value);
    const remainingPayments = parseInt(document.getElementById('remainingPayments').value);
    const originalPayments = parseInt(document.getElementById('originalPayments').value);
    const originalPremium = parseFloat(document.getElementById('originalPremium').value);
    const originalDownPaymentPct = parseFloat(document.getElementById('originalDownPayment').value) / 100;
    const additionalDownPaymentPct = parseFloat(document.getElementById('additionalDownPayment').value) / 100;
    const apr = parseFloat(document.getElementById('apr').value) / 100;
    const client = document.getElementById('client').value;

    const daysInYear = (effectiveDate.getFullYear() % 4 === 0) ? 366 : 365;
    const policyPeriodDays = Math.ceil((expirationDate - effectiveDate) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.ceil((expirationDate - endorsementDate) / (1000 * 60 * 60 * 24));

    const dailyRate = originalPremium / daysInYear;
    const additionalPremium = dailyRate * remainingDays;
    const additionalDownPayment = additionalPremium * additionalDownPaymentPct;
    const additionalAmountFinanced = additionalPremium - additionalDownPayment;
    const additionalMonthlyPayment = (additionalAmountFinanced * apr / 12) / (1 - Math.pow(1 + apr / 12, -remainingPayments));

    const financedOriginalPremium = originalPremium - (originalPremium * originalDownPaymentPct);
    const currentMonthlyPayment = (financedOriginalPremium * apr / 12) / (1 - Math.pow(1 + apr / 12, -originalPayments));
    const newMonthlyPayment = currentMonthlyPayment + additionalMonthlyPayment;

    document.getElementById('results').innerHTML = `
        <p><strong>Client:</strong> ${client || 'N/A'}</p>
        <p><strong>Additional Premium:</strong> $${additionalPremium.toFixed(2)}</p>
        <p><strong>Additional Down Payment:</strong> $${additionalDownPayment.toFixed(2)}</p>
        <p><strong>Additional Amount Financed:</strong> $${additionalAmountFinanced.toFixed(2)}</p>
        <p><strong>Additional Monthly Payment:</strong> $${additionalMonthlyPayment.toFixed(2)}</p>
        <p><strong>Remaining Payments:</strong> ${remainingPayments}</p>
        <p><strong>Current Monthly Payment:</strong> $${currentMonthlyPayment.toFixed(2)}</p>
        <p><strong>Financed Original Premium:</strong> $${financedOriginalPremium.toFixed(2)}</p>
        <p><strong>New Monthly Payment:</strong> $${newMonthlyPayment.toFixed(2)}</p>
    `;
}
