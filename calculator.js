"use strict";

const validResults = [];

function createTable(captionText, headings) {
  const table = document.createElement("table");
  table.createCaption().textContent = captionText;
  const headerRow = table.createTHead().insertRow();
  for (const heading of headings) {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = heading;
    headerRow.appendChild(cell);
  }
  const body = table.createTBody();
  document.body.appendChild(table);
  return body;
}

function addRow(tableBody, values) {
  const row = tableBody.insertRow();
  for (const value of values) {
    row.insertCell().textContent = String(value);
  }
}

const calculations = createTable("Calculations", ["Number 1", "Operator", "Number 2", "Result"]);

while (true) {
  const xInput = window.prompt("Enter the first number (x), or click Cancel to finish:");
  if (xInput === null) break;

  const yInput = window.prompt("Enter the second number (y), or click Cancel to finish:");
  if (yInput === null) break;

  const operatorInput = window.prompt("Enter an operator (+, -, %, /, *), or click Cancel to finish:");
  if (operatorInput === null) break;

  const x = Number(xInput);
  const y = Number(yInput);
  const operator = operatorInput.trim();
  let result;

  if (xInput.trim() === "" || yInput.trim() === "" || isNaN(x) || isNaN(y) || !Number.isFinite(x) || !Number.isFinite(y)) {
    result = "Error: enter two valid numbers.";
  } else {
    switch (operator) {
      case "+": result = x + y; break;
      case "-": result = x - y; break;
      case "*": result = x * y; break;
      case "/": result = y === 0 ? "Error: cannot divide by zero." : x / y; break;
      case "%": result = y === 0 ? "Error: cannot take modulus by zero." : x % y; break;
      default: result = "Error: invalid operator.";
    }
    if (typeof result === "number" && !Number.isFinite(result)) {
      result = "Error: result is outside the supported numeric range.";
    }
  }

  addRow(calculations, [xInput, operatorInput, yInput, result]);
  if (typeof result === "number") validResults.push(result);
}

const summary = createTable("Summary", ["Minimum", "Maximum", "Average", "Total"]);
if (validResults.length === 0) {
  addRow(summary, ["N/A", "N/A", "N/A", 0]);
} else {
  let minimum = validResults[0];
  let maximum = validResults[0];
  let total = 0;
  for (const result of validResults) {
    minimum = Math.min(minimum, result);
    maximum = Math.max(maximum, result);
    total += result;
  }
  addRow(summary, [minimum, maximum, total / validResults.length, total]);
}
