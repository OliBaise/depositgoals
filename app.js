document.getElementById("calculator").addEventListener("submit", function (e) {
  e.preventDefault();

  const town = document.getElementById("town").value;
  const currentAge = parseInt(document.getElementById("age").value);
  const targetAge = parseInt(document.getElementById("targetAge").value);
  const savings = parseFloat(document.getElementById("savings").value) || 0;
  const depositPercentage = parseFloat(document.getElementById("depositPercentage").value);

const townData = townsdata[town];

  if (!townsdata) {
    document.getElementById("result").innerHTML = `<p style="color:red;">No data for town ${town}.</p>`;
    return;
  }

  const currentYear = 2025;
  let targetYear = currentYear + (targetAge - currentAge);

  if (targetYear > 2042) {
    targetYear = 2042;
  }

  const projection = townsdata[targetYear]; // ✅ corrected reference

  if (!projection) {
    document.getElementById("result").innerHTML = `<p style="color:red;">No data for year ${targetYear} in ${town}.</p>`;
    return;
  }

  const housePrice = projection.price;
  const deposit = housePrice * (depositPercentage / 100);
  const monthsToSave = (targetYear - currentYear) * 12;
  const remaining = deposit - savings;
  const monthlyTarget = Math.max(remaining / monthsToSave, 0).toFixed(2);

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
  `;
});
