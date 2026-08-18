document.addEventListener('DOMContentLoaded', () => {
    const loanAmtInput = document.getElementById('loan-amt');
    const loanTenureInput = document.getElementById('loan-tenure');
    // Targets your interest rate input id (including 'loan-amount' or 'loan-interest')
    const interestRateInput = document.getElementById('loan-amount') || document.getElementById('loan-interest');
    
    const calculateBtn = document.querySelector('.calculator-btn');

    const emiSpan = document.querySelector('.loan_emi');
    const principleSpan = document.querySelector('.loan_principle');
    const interestSpan = document.querySelector('.loan_interest_rate');
    const totalSpan = document.querySelector('.loan_total');

    function formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
    }

    function calculateEMI() {
        const principal = parseFloat(loanAmtInput.value);
        const tenureYears = parseFloat(loanTenureInput.value);
        const annualInterestRate = parseFloat(interestRateInput.value);

        // Validation check
        if (isNaN(principal) || isNaN(tenureYears) || isNaN(annualInterestRate) ||
            principal <= 0 || tenureYears <= 0 || annualInterestRate < 0) {
            alert('Please enter valid, positive numbers for all fields.');
            return;
        }

        const tenureMonths = tenureYears * 12;
        const monthlyInterestRate = annualInterestRate / (12 * 100);

        let emi = 0;
        if (monthlyInterestRate === 0) {
            emi = principal / tenureMonths;
        } else {
            // Formula: EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
            const rateFactor = Math.pow(1 + monthlyInterestRate, tenureMonths);
            emi = (principal * monthlyInterestRate * rateFactor) / (rateFactor - 1);
        }

        const totalPayment = emi * tenureMonths;
        const totalInterest = totalPayment - principal;

        // Display results
        emiSpan.textContent = formatCurrency(emi);
        principleSpan.textContent = formatCurrency(principal);
        interestSpan.textContent = formatCurrency(totalInterest);
        totalSpan.textContent = formatCurrency(totalPayment);
    }

    calculateBtn.addEventListener('click', calculateEMI);

    // Optional: Allow calculating on pressing 'Enter' in any input
    [loanAmtInput, loanTenureInput, interestRateInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    calculateEMI();
                }
            });
        }
    });
});