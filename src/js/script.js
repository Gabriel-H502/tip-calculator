const $billInput = document.querySelector("#bill");
const $tipSelect = document.querySelectorAll(".tip-select");
const $customTip = document.querySelector("#XX");
const $peopleInput = document.querySelector("#people");
const $resetButton = document.querySelector("#reset");
const $tipAmount = document.querySelector("#tip-amount");
const $totalAmount = document.querySelector("#total-amount");

let tipBoxIsSelected = false;
let tipPorcentage = 0;

$billInput.addEventListener("input", () => {
    if ($billInput.value.length != 0) {
        toggleResetButton("enabled");
    } else {
        $tipAmount.innerHTML = "$0.00";
        $totalAmount.innerHTML = "$0.00";
        verifyIfTheresNoValues();
    };

    let formattedNumber = $billInput.value.replace(/\D/g, "");
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    $billInput.value = formattedNumber;

    verifyIfAllowedToCalculate();
});

$tipSelect.forEach(tipBox => {
    tipBox.addEventListener("click", () => {
        if ($customTip.value.length != 0) {
            $customTip.value = "";
        } else {
            $tipAmount.innerHTML = "$0.00";
            $totalAmount.innerHTML = "$0.00";     
        };

        tipPorcentage = tipBox.id;

        removeActualSelectedBox();
        selectNewActualBox(tipBox);

        toggleResetButton("enabled");
        verifyIfAllowedToCalculate();
    });
});

$customTip.addEventListener("input", () => {
    if ($customTip.value.length != 0) {
        tipPorcentage = $customTip.value;
        toggleResetButton("enabled")
    } else {
        $tipAmount.innerHTML = "$0.00";
        $totalAmount.innerHTML = "$0.00";
        verifyIfTheresNoValues();
    };

    removeActualSelectedBox();
    verifyIfAllowedToCalculate();
});

$peopleInput.addEventListener("input", () => {
    if ($peopleInput.value.length != 0) {
        toggleResetButton("enabled")
    } else {
        $tipAmount.innerHTML = "$0.00";
        $totalAmount.innerHTML = "$0.00";
        verifyIfTheresNoValues();
    };

    verifyIfAllowedToCalculate();
});

$resetButton.addEventListener("click", () => {
    $billInput.value = "";
    removeActualSelectedBox()
    tipBoxIsSelected = false;
    $customTip.value = "";
    tipPorcentage = 0;
    $peopleInput.value = "";
    $tipAmount.innerHTML = "$0.00";
    $totalAmount.innerHTML = "$0.00";
    toggleResetButton("disabled");
});

/* FUNCTIONS */

function verifyIfAllowedToCalculate() {
    if (billInputHasANumber() && peopleInputHasANumber() &&
        (customInputHasANumber() || tipBoxIsSelected)
    ) { // CALCULATION

        if ($peopleInput.value == 0) {

            $tipAmount.innerHTML = "CAN'T";
            $totalAmount.innerHTML = "BE ZERO!";

        } else {
            const bill = Number($billInput.value.replace(/\D/g, ""));
            const people = Number($peopleInput.value);
            const tipAmount = bill * (tipPorcentage / 100) / people;
            const totalPerPerson = (bill + (tipPorcentage / 100) * bill) / people;   
            
            $tipAmount.innerHTML = `$${tipAmount.toFixed(2)}`;
            $totalAmount.innerHTML = `$${totalPerPerson.toFixed(2)}`
        };
    };
};

function verifyIfTheresNoValues() {
    if (!billInputHasANumber() &&
        !peopleInputHasANumber() &&
        (!customInputHasANumber() && !tipBoxIsSelected)
    ) {
        tipPorcentage = 0;
        toggleResetButton("disabled");
    };
}

function toggleResetButton(button) {
    if (button == "enabled") {
        $resetButton.classList.add("enabled");
    } else {
        $resetButton.classList.remove("enabled")
    };
};

function selectNewActualBox(tipBox) {
    tipBox.classList.add("selected");
    tipBoxIsSelected = true;
};

function removeActualSelectedBox() {
    $tipSelect.forEach(box => {
        if (box.classList.contains("selected")) {
            box.classList.remove("selected");
            tipBoxIsSelected = false;
        };
    });
};

function peopleInputHasANumber() {
    return $peopleInput.value.length > 0;
};

function customInputHasANumber() {
    return $customTip.value.length > 0;
};

function billInputHasANumber() {
    return $billInput.value.length > 0;
};