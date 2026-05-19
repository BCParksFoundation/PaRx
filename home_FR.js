var professionsSelect = document.getElementsByClassName("professionsSelect")[0];
var provinceSelect = document.getElementsByClassName("provinceSelect")[0];
var licensingBodySelect = document.getElementsByClassName("licensingBodySelect")[0];
var referralSelectors = document.getElementsByClassName("referralSelect");
var discoveryPassValue = document.getElementsByClassName("discoveryPass")[0];
var licensingBody = document.getElementById("00NJQ000000mnRf");

professionsSelect.required = true;
licensingBodySelect.required = true;

const addPlaceholderOption = (select, text) => {
    const option = document.createElement("option");
    option.value = "";
    option.text = text;
    option.disabled = true;
    option.selected = true;
    select.append(option);
}

const addOptionsValueToProfessionsSelect = (professionsArray) => {
    addPlaceholderOption(professionsSelect, "Sélectionner une profession");

    for (var i = 0; i < professionsArray.length; i++) {
        var option = document.createElement("option");
        option.value = professionsArray[i][1];
        option.text = professionsArray[i][0];
        professionsSelect.append(option);
    }
}

const addOptionsValueToLicensingBodySelect = (licensingBodyArray) => {
    addPlaceholderOption(licensingBodySelect, "Sélectionner un ordre professionnel");

    for (var i = 0; i < licensingBodyArray.length; i++) {
        var option = document.createElement("option");
        option.value = licensingBodyArray[i];
        option.text = licensingBodyArray[i];
        licensingBodySelect.append(option);
    }
}

const onChangeLicensingBodySelect = () => {
    if (!licensingBodySelect.value) {
        licensingBody.value = "";
        return;
    }

    if (licensingBodySelect.value == "Association canadienne des loisirs thérapeutiques") {
        licensingBody.value = "Canadian Therapeutic Recreation Association";
    }
    else if (licensingBodySelect.value == "Aucun de ces éléments") {
        licensingBody.value = "None of the above";
    }
    else {
        licensingBody.value = licensingBodySelect.value;
    }
}