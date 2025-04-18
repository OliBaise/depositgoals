
 document.addEventListener("DOMContentLoaded", function () {
  const townSelect = document.getElementById("town");
  const towns = Object.keys(townsData).sort();

  // Clear existing options and add towns
  townSelect.innerHTML = `<option value="">Select your town or city</option>`;
  towns.forEach(town => {
    const option = document.createElement("option");
    option.value = town;
    option.textContent = town;
    townSelect.appendChild(option);
  });
});

document.getElementById("calculator").addEventListener("submit", function (e) {
  e.preventDefault();

  const town = document.getElementById("town").value;
  const currentAge = parseInt(document.getElementById("age").value);
  const targetAge = parseInt(document.getElementById("targetAge").value);
  const savings = parseFloat(document.getElementById("savings").value) || 0;

  const townData = townsData[town];

  if (!townData) {
    document.getElementById("result").innerHTML = `<p style="color:red;">No data for town ${town}.</p>`;
    return;
  }

  // Calculate the current year based on the current age (assuming 2025 as the reference for age 18)
  const currentYear = 2025
  
  // Calculate the target year based on the current and target age
  const targetYear = currentYear + (targetAge - currentAge);

  // If the target year is beyond the available data (e.g., beyond 2042), set it to 2042
  if (targetYear > 2042) {
    targetYear = 2042;
  }

  const projection = townData[targetYear];

  if (!projection) {
    document.getElementById("result").innerHTML = `<p style="color:red;">No data for year ${targetYear} in ${town}.</p>`;
    return;
  }

  const deposit = projection.deposit;
  const monthsToSave = (targetYear - currentYear) * 12;  // Time to save until the target year
  const remaining = deposit - savings;
  const monthlyTarget = Math.max(remaining / monthsToSave, 0).toFixed(2);

  // Show results
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";  // Show the result div

  resultDiv.innerHTML = `
    <h2>Projection for ${town}</h2>
    <p>Projected house price at year ${targetYear}: £${projection.price.toLocaleString()}</p>
    <p>Deposit needed (20%): £${deposit.toLocaleString()}</p>
    <p>Your current savings: £${savings.toLocaleString()}</p>
    <p>Months left until ${targetYear}: ${monthsToSave}</p>
    <p><strong>Remaining deposit to save: £${remaining.toLocaleString()}</strong></p>
    <p><strong>You need to save £${monthlyTarget} per month to reach your deposit goal by ${targetYear} (£${remaining.toLocaleString()}/${monthsToSave})</strong></p>
  `;
});


  
 
  

 
  
 
 
 
  



  
  
 

  
  
 
  
 
  


 




 
 
 
 
  
 

 

  
