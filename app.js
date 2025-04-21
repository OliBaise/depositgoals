document.addEventListener("DOMContentLoaded", function () {
  if (typeof townsdata === 'undefined') {
    alert("⚠️ townsdata is not defined! Check townsData.js syntax or script order.");
    return;
  }

  const townSelect = document.getElementById("town");
  const towns = Object.keys(townsdata).sort();

  townSelect.innerHTML = `<option value="">Select your town or city</option>`;
  towns.forEach(town => {
    const option = document.createElement("option");
    option.value = town;
    option.textContent = town;
    townSelect.appendChild(option);
  });
});


