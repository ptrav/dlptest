# dlptest: *a better DLP testing platform*

This platform provides a toolkit to test data loss prevention (DLP) software functionality with numerous quality-of-life improvements over other available testing tools found on the web. Launch test cases with common types of personally identifiable information (PII) with only one click!

**The data is ficticious, but real where it counts.** Some good things to know:

* Credit Card Numbers are algorithmically valid and pass integrity checks

* Driver's License numbers are generated on-the-fly to conform with actual state issuing guidelines and paired to names

* ABA routing numbers are valid and assigned to real banks

* 30 records are randomly generated at each run and checked for duplicates. Refresh the page for a different combination of 30 records

* All data fields are properly labelled in source

* Visual design prioritizes accessibility and UX with elements that dynamically adjust to your screen. You've got a widescreen. Why constrain data tables to 500px wide?

* Autodetection of OS dark mode / light mode with an override toggle that remembers your theme preference

* **No advertisements, no "news", no filler -- just valid test PII all day long**

---

## Predefined 1-click Test Suites

1: Name + US Street Address + Credit Card Number (CCN)

2: Name + Date of Birth + US Social Security Number (SSN)

3: Name + Date of Birth + US Driver's License Number (DL)

4: Name + US Street Address + Date of Birth + SSN + DL + CCN

---

## Custom Test Builder

Want *even moar* PII or perhaps *a little less*? **No problem!**

Select from several available categories of PII and build your own test suite with any combination of the below:

* US Social Security Number

* US Driver's License

* Telephone number

* Date of Birth

* Credit Card Number

* Street Address

* ACH banking info (ABA routing number + account number)

---

## For the Developers

*Did I already mention dark mode?*

**All the source code is commented and the program is designed with an extensible architecture that welcomes modifications.** Add a new category of PII with minimal changes. Add/remove preseeded data (names, CCNs, etc) by making quick edits to the JSONs within. 

The DOM is your oyster.

---

Disclaimer for trolls: any similarity in this data to actual persons living or dead is purely coincidental. Refresh the results a few times. Can John Doe really have two different social security numbers? Can you use any credit card without an expiration date or CVV?

---

> Made with <3 in Chicago
