# Truck-Insurance-Calculator
Original and Additional Premiums pro-Rate calculator


INPUT fields:

Original Effective Date: (Required Field)
Original Expiration Date: (Required Field)
Endorsement Date: (Required Field)
Remaining No. of Payments (Required Field)
Original No. of Payments: (Required Field)
Original Premium: (Required Field)
Original DownPayment (%): (Required Field)
Additional DownPayment (%): (Required Field)
Client: (Optional Field, if entered should be printed under Results section)

"Truck Insurance Calculator" above inputs will calculate:

Additional Premium:
The Truck Insurance Calculator determines the Additional Premium based on date inputs and leap year considerations. It calculates the daily rate by dividing the Original Premium by the number of days in the policy period, considering whether the year has 365 or 366 days. When the Original Effective Date is selected, the calculator automatically sets the Original Expiration Date to one year later while allowing it to be manually edited if needed. The remaining days in the policy are determined by subtracting the Endorsement Date from the Original Expiration Date. Finally, the Additional Premium is calculated by multiplying the daily rate by the remaining days, providing an accurate prorated premium adjustment.

Daily Rate Calculation:
Divide Original Premium by the number of days in the policy period (365 or 366, based on leap year).

Auto-Fill Expiration Date:
When Original Effective Date is set, auto-fill Original Expiration Date to one year later (editable).

Remaining Days Calculation:
Original Expiration Date -Endorsement Date

Additional Premium Calculation:
Multiply daily rate by the remaining days to get the Additional Premium (USD).



Additional Down Payment:
The Additional Down Payment is determined by applying the Additional Down Payment (%) to the calculated Additional Premium. This means the system will first compute the Additional Premium based on the prorated daily rate and remaining policy days. Then, the specified percentage from the Additional Down Payment (%) input will be applied to this amount to determine the final Additional Down Payment value.

Apply Additional Down Payment Percentage:
Multiply the Additional Premium by the Additional Down Payment (%)

Final Output:
The result is the Additional Down Payment (USD) based on the calculated prorated premium and the specified percentage.



Additional Amount Financed:
The Additional Amount Financed is calculated as the difference between the Additional Premium and the Additional Down Payment. This represents the remaining amount that needs to be financed after applying the required down payment. The calculation follows this formula:

Additional Amount Financed=Additional Premium−Additional Down Payment



Additional Monthly Payment:
The Additional Monthly Payment is calculated based on the Additional Amount Financed, the Remaining Number of Payments, and the APR% (Annual Percentage Rate). Since the insurance policy term is for 12 months but financing is typically structured over 9 or 10 months, the Remaining Number of Payments cannot exceed 10 and less than 0. The monthly payment is determined by distributing the Additional Amount Financed over the allowed payment period while incorporating the interest rate (APR%) to reflect financing costs.

Determine the Remaining Number of Payments:
The maximum allowed payments are 10 months, even though the policy is for 12 months.
Ensure the Remaining Number of Payments does not exceed 10.

Apply APR% and Compute the Monthly Payment:
Using the standard loan payment formula.

Additional Monthly Payment
The result is the Additional Monthly Payment (USD), ensuring it aligns with the financing term and interest rate.



Current Monthly Payment:
The Current Monthly Payment follows the same logic as the Additional Monthly Payment, but it is based on the Original Premium, the Original Number of Payments, and the APR% (Annual Percentage Rate). Since the insurance policy is structured for 9 or 10 payments, the financing term follows this limit. The monthly payment is determined by distributing the Original Premium over the allowed payment period while incorporating the interest rate (APR%) to reflect financing costs.

Set the Original Number of Payments:
Typically 9 or 10 payments, ensuring it does not exceed 10.

Apply APR% and Compute the Current Monthly Payment::
Using the standard loan payment formula:

Final Output:
The result is the Current Monthly Payment: (USD), ensuring it aligns with the financing structure and interest rate.



Financed Original Premium:
The Financed Original Premium is the portion of the Original Premium that remains after deducting the Original Down Payment. The Original Down Payment is determined by applying the Original Down Payment (%) to the Original Premium. This ensures that only the remaining balance is financed over the allowed payment period.

Determine the Financed Original Premium:
Financed Original Premium = Original Premium − Original Down Payment

Final Output:
The result is the Financed Original Premium (USD), which represents the amount to be financed after applying the required down payment.



Additional Monthly Payment:
The New Monthly Payment is calculated by adding the Current Monthly Payment to the Additional Monthly Payment. This ensures that the updated total reflects both the original financing and the newly added premium adjustment.

New Monthly Payment=Current Monthly Payment+Additional Monthly Payment



Remaining Payments:
To be printed in results value is the same which was inputted Remaining No. of Payments




Results section includes:

Additional Premium:
Additional Down Payment:
Additional Amount Financed:
Additional Monthly Payment:
Remaining Payments:

Current Monthly Payment:
Financed Original Premium:

