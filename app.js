// Populate dropdown on page load
document.addEventListener("DOMContentLoaded", function () {
  const townSelect = document.getElementById("town");

  if (typeof townsdata === "undefined") {
    console.error("❌ townsdata is not defined. Check if townsdata.js is loaded correctly.");
    return;
  }

  const towns = Object.keys(townsdata).sort();
  townSelect.innerHTML = `<option value="">Select your town or city</option>`;

  towns.forEach(town => {
    const option = document.createElement("option");
    option.value = town;
    option.textContent = town;
    townSelect.appendChild(option);
  });
});

// Handle form submission
document.getElementById("calculator").addEventListener("submit", function (e) {
  e.preventDefault();

  const town = document.getElementById("town").value;
  const currentAge = parseInt(document.getElementById("age").value);
  const targetAge = parseInt(document.getElementById("targetAge").value);
  const savings = parseFloat(document.getElementById("savings").value) || 0;
  const depositPercentage = parseFloat(document.getElementById("depositPercentage").value);

  const townData = townsdata[town];

  if (!townData) {
    document.getElementById("result").innerHTML = `<p style="color:red;">No data for town ${town}.</p>`;
    return;
  }

  const currentYear = 2025;
  let targetYear = currentYear + (targetAge - currentAge);

  if (targetYear > 2042) {
    targetYear = 2042;
  }

  const projection = townData[targetYear];

  if (!projection) {
    document.getElementById("result").innerHTML = `<p style="color:red;">No data for year ${targetYear} in ${town}.</p>`;
    return;
  }

  const housePrice = projection.price;
  const deposit = housePrice * (depositPercentage / 100);
  const monthsToSave = (targetYear - currentYear) * 12;
  const remaining = deposit - savings;
  const monthlyTarget = Math.max(remaining / monthsToSave, 0).toFixed(2);
  const mortgageAmount = housePrice - deposit;
  const requiredSalary = (mortgageAmount / 4.5).toFixed(0);

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";

  resultDiv.innerHTML = `
    <h2>Projection for ${town}</h2>
    <p>Projected house price at year ${targetYear}: £${housePrice.toLocaleString()}</p>
    <p>Deposit needed (${depositPercentage}%): £${deposit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
    <p>Your current savings: £${savings.toLocaleString()}</p>
    <p>Months left until ${targetYear}: ${monthsToSave}</p>
    <p><strong>Remaining deposit to save: £${remaining.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></p>
    <p><strong>You need to save £${monthlyTarget} per month to reach your deposit goal by ${targetYear} (£${remaining.toLocaleString(undefined, { maximumFractionDigits: 0 })}/${monthsToSave})</strong></p>
    <p><strong>Estimated salary needed to afford this home: £${Number(requiredSalary).toLocaleString()}</strong> <br><small>(i.e. (£${mortgageAmount.toLocaleString()} ÷ 4.5))</small></p>
  `;
});
