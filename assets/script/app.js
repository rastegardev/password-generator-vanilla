const generateBtn = document.getElementById("generate");
const passwordText = document.getElementById("password-text");
const passwordDisplay = document.getElementById("password-display");
const copyBtn = document.getElementById("copy-btn");
const warning = document.getElementById("warning");

const levelSelector = document.getElementById("security-level");
const lowercaseCB = document.getElementById("lowercase");
const uppercaseCB = document.getElementById("uppercase");
const numbersCB = document.getElementById("numbers");
const symbolsCB = document.getElementById("symbols");
const ambiguousCB = document.getElementById("ambiguous");

function applySecurityLevel(level) {
  if (level === "medium") {
    lowercaseCB.checked = true;
    uppercaseCB.checked = false;
    numbersCB.checked = true;
    symbolsCB.checked = false;
    ambiguousCB.checked = false;
  } else if (level === "strong") {
    lowercaseCB.checked = true;
    uppercaseCB.checked = true;
    numbersCB.checked = true;
    symbolsCB.checked = false;
    ambiguousCB.checked = false;
  } else if (level === "advanced") {
    lowercaseCB.checked = true;
    uppercaseCB.checked = true;
    numbersCB.checked = true;
    symbolsCB.checked = true;
    ambiguousCB.checked = true;
  }
  updateLocalStorage();
}

function detectCustomLevel() {
  const isMedium =
    lowercaseCB.checked &&
    !uppercaseCB.checked &&
    numbersCB.checked &&
    !symbolsCB.checked &&
    !ambiguousCB.checked;
  const isStrong =
    lowercaseCB.checked &&
    uppercaseCB.checked &&
    numbersCB.checked &&
    !symbolsCB.checked &&
    !ambiguousCB.checked;
  const isAdvanced =
    lowercaseCB.checked &&
    uppercaseCB.checked &&
    numbersCB.checked &&
    symbolsCB.checked &&
    ambiguousCB.checked;

  if (isMedium) levelSelector.value = "medium";
  else if (isStrong) levelSelector.value = "strong";
  else if (isAdvanced) levelSelector.value = "advanced";
  else levelSelector.value = "custom";

  updateLocalStorage();
}

function getCharset() {
  return (
    (lowercaseCB.checked ? "abcdefghijklmnopqrstuvwxyz" : "") +
    (uppercaseCB.checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
    (numbersCB.checked ? "0123456789" : "") +
    (symbolsCB.checked ? "!@#$%^&*" : "") +
    (ambiguousCB.checked ? "{}[]()/\\'\"~,;:.<>`" : "")
  );
}

function generatePassword(length, charset) {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * charset.length);
    result += charset[randIndex];
  }
  return result;
}

generateBtn.addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value, 10);
  const charset = getCharset();
  copyBtn.innerHTML = "کپی";

  if (!charset || isNaN(length) || length < 1 || length > 99) {
    warning.classList.remove("hidden");
    passwordDisplay.classList.add("hidden");
    return;
  }

  warning.classList.add("hidden");
  const password = generatePassword(length, charset);
  passwordText.textContent = password;
  passwordDisplay.classList.remove("hidden");
});

copyBtn.addEventListener("click", () => {
  const text = passwordText.textContent;
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.innerHTML = "کپی شد";
    });
  }
});

levelSelector.addEventListener("change", (e) => {
  const level = e.target.value;
  if (level !== "custom") applySecurityLevel(level);
});

function updateLocalStorage() {
  const settings = {
    securityLevel: levelSelector.value,
    length: parseInt(document.getElementById("length").value, 10),
    lowercase: lowercaseCB.checked,
    uppercase: uppercaseCB.checked,
    numbers: numbersCB.checked,
    symbols: symbolsCB.checked,
    ambiguous: ambiguousCB.checked,
  };
  localStorage.setItem("passwordSettings", JSON.stringify(settings));
}

document
  .querySelectorAll("input[type='checkbox']")
  .forEach((el) => el.addEventListener("change", detectCustomLevel));

window.addEventListener("load", () => {
  const saved = localStorage.getItem("passwordSettings");

  if (saved) {
    const data = JSON.parse(saved);
    levelSelector.value = data.securityLevel || "strong";
    document.getElementById("length").value = data.length || 12;
    lowercaseCB.checked = data.lowercase;
    uppercaseCB.checked = data.uppercase;
    numbersCB.checked = data.numbers;
    symbolsCB.checked = data.symbols;
    ambiguousCB.checked = data.ambiguous;
    detectCustomLevel();
  } else {
    levelSelector.value = "strong";
    applySecurityLevel("strong");
    document.getElementById("length").value = 12;
  }

  passwordDisplay.classList.add("hidden");
});
