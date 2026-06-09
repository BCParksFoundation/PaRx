var prescriberForm = document.querySelector(".prescriber-form");
var cityInput = document.getElementById("00NJQ000000mnRS");
var licenceNumberInput = document.getElementById("00NJQ000000mnRe");
var provinceRequiredMessage = document.getElementById("provinceRequiredMessage");

const showProvinceMessage = () => {
    provinceRequiredMessage?.classList.remove("w-hidden");
};

const hideProvinceMessage = () => {
    provinceRequiredMessage?.classList.add("w-hidden");
};

const setDependentFieldsDisabled = (isDisabled) => {
    if (isDisabled) {
        professionsSelect.classList.add("is-disabled-select");
        licensingBodySelect.classList.add("is-disabled-select");

        professionsSelect.setAttribute("aria-disabled", "true");
        licensingBodySelect.setAttribute("aria-disabled", "true");
    } else {
        professionsSelect.classList.remove("is-disabled-select");
        licensingBodySelect.classList.remove("is-disabled-select");

        professionsSelect.removeAttribute("aria-disabled");
        licensingBodySelect.removeAttribute("aria-disabled");

        hideProvinceMessage();
    }
};

var professionsSelect = document.getElementById("00NJQ000000mnRn");
var provinceSelect = document.getElementById("00NJQ000000mnRo");
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

const onChangeProvincialSelect = (evt) => {

    let licensingArrayProvinceSpecifiedList = [];
    let professionsOptionsList = [];

    licensingBodySelect.innerHTML = "";
    professionsSelect.innerHTML = "";

    switch(evt.target.value) {

        case "BC":

            licensingArrayProvinceSpecifiedList = [
                "BC Association of Clinical Counsellors",
                "BC Podiatric Medical Association",
                "British Columbia College of Nurses and Midwives",
                "British Columbia College of Oral Health Professionals",
                "British Columbia College of Social Workers",
                "Canadian Counselling and Psychotherapy Association",
                "College of Complementary Health Professionals of BC",
                "College of Health and Care Professionals of BC",
                "College of Pharmacists of British Columbia",
                "College of Physicians and Surgeons of British Columbia",
                "BC Emergency Medical Assistants Licensing Board",
                "Canadian Therapeutic Recreation Association",
                "None of the above"
            ];

            professionsOptionsList = [
                ["Acupunctrice ou acupuncteur", "Acupuncturist"],
                ["Assistante ou assistant dentaire", "Dental Assistant"],
                ["Audiologiste", "Audiologist"],
                ["Auxiliaire médical", "Paramedic"],
                ["Chiropractrice ou chiropracteur", "Chiropractor"],
                ["Conseillère ou conseiller d'orientation", "Hearing Aid Practitioner"],
                ["Dentiste", "Dentist"],
                ["Denturologiste", "Denturist"],
                ["Diététiste", "Dietitian"],
                ["Ergothérapeute", "Occupational Therapist"],
                ["Hygiéniste dentaire", "Dental Hygienist"],
                ["Infirmière ou infirmier", "Nurse"],
                ["Loisirs thérapeute", "Recreation Therapist"],
                ["Massothérapeute", "Massage Therapist"],
                ["Médecin naturopathe", "Naturpathic Doctor"],
                ["Médecin", "Physician"],
                ["Opticienne ou opticien", "Optician"],
                ["Optométristes", "Optometrist"],
                ["Orthophoniste", "Speech and Hearing Health Professional"],
                ["Pharmacienne ou pharmacien", "Pharmacist"],
                ["Physiothérapeute", "Physiotherapist"],
                ["Podologue", "Podiatrist"],
                ["Praticienne en médecine traditionnelle chinoise", "Traditional Chinese Medicine Practitioner"],
                ["Psychologue", "Psychologist"],
                ["Psychothérapeute", "Psychotherapist or Counselling Therapist"],
                ["Sage-femme", "Midwife"],
                ["Technicienne ou technicien dentaire", "Dental Technician or Technologist"],
                ["Technicienne ou technicien en pharmacie", "Pharmacy Technician"],
                ["Thérapeute dentaire", "Dental Therapist"],
                ["Travailleuse sociale ou travailleur social", "Social Worker"],
                ["Aucun de ces éléments", "None of the above"]
            ];

        break;

        case "AB":

            licensingArrayProvinceSpecifiedList = [
                "Alberta College of Combined Laboratory and X-Ray Technologists",
                "Alberta College of Medical Diagnostic and Therapeutic Technologists",
                "Alberta College of Occupational Therapists",
                "Alberta College of Optometrists",
                "Alberta College of Paramedics",
                "Alberta College of Pharmacy",
                "College of Physicians and Surgeons of Alberta",
                "Canadian Therapeutic Recreation Association",
                "None of the above"
            ];

            professionsOptionsList = [
                ["Acupunctrice ou acupuncteur", "Acupuncturist"],
                ["Audiologiste", "Audiologist"],
                ["Dentiste", "Dentist"],
                ["Médecin", "Physician"],
                ["Physiothérapeute", "Physiotherapist"],
                ["Psychologue", "Psychologist"],
                ["Travailleuse sociale ou travailleur social", "Social Worker"],
                ["Aucun de ces éléments", "None of the above"]
            ];

        break;

        case "ON":

            licensingArrayProvinceSpecifiedList = [
                "College of Audiologists and Speech-Language Pathologists of Ontario",
                "College of Chiropractors of Ontario",
                "College of Physicians and Surgeons of Ontario",
                "Ontario College of Pharmacists",
                "Canadian Therapeutic Recreation Association",
                "None of the above"
            ];

            professionsOptionsList = [
                ["Acupunctrice ou acupuncteur", "Acupuncturist"],
                ["Audiologiste", "Audiologist"],
                ["Chiropractrice ou chiropracteur", "Chiropractor"],
                ["Dentiste", "Dentist"],
                ["Diététiste", "Dietitian"],
                ["Médecin", "Physician"],
                ["Pharmacienne ou pharmacien", "Pharmacist"],
                ["Physiothérapeute", "Physiotherapist"],
                ["Psychologue", "Psychologist"],
                ["Travailleuse sociale ou travailleur social", "Social Worker"],
                ["Aucun de ces éléments", "None of the above"]
            ];

        break;

        case "QC":

            licensingArrayProvinceSpecifiedList = [
                "Association canadienne des loisirs thérapeutiques",
                "Collège des médecins du Québec",
                "Ordre des Acupuncteurs du Québec",
                "Ordre des chiropraticiens du Québec",
                "Ordre des pharmaciens du Québec",
                "Ordre des psychologues du Québec",
                "Aucun de ces éléments"
            ];

            professionsOptionsList = [
                ["Acupunctrice ou acupuncteur", "Acupuncturist"],
                ["Audiologiste", "Audiologist"],
                ["Chiropractrice ou chiropracteur", "Chiropractor"],
                ["Dentiste", "Dentist"],
                ["Diététiste", "Dietitian"],
                ["Médecin", "Physician"],
                ["Pharmacienne ou pharmacien", "Pharmacist"],
                ["Physiothérapeute", "Physiotherapist"],
                ["Psychologue", "Psychologist"],
                ["Travailleuse sociale ou travailleur social", "Social Worker"],
                ["Aucun de ces éléments", "None of the above"]
            ];

        break;

        default:
        break;
    }

    addOptionsValueToProfessionsSelect(professionsOptionsList);
    addOptionsValueToLicensingBodySelect(licensingArrayProvinceSpecifiedList);

    const hasProvinceOptions = professionsOptionsList.length > 0 && licensingArrayProvinceSpecifiedList.length > 0;
    setDependentFieldsDisabled(!hasProvinceOptions);

    licensingBody.value = "";
}

const onChangeReferralSelect = (evt) => {
    var select = evt.target;
    var other = select.nextElementSibling;

    if (select.value == "Other") {
        other.value = "";
        other.classList.remove("w-hidden");
    }
    else {
        other.classList.add("w-hidden");
        other.value = "";
    }
}

const onChangeDiscoveryPass = (evt) => {

    var discoveryPassAddress = document.getElementById("discoveryPassAddress");

    if (discoveryPassValue?.checked) {
        discoveryPassAddress?.classList.remove("w-hidden");
    }
    else {
        discoveryPassAddress?.classList.add("w-hidden");
    }
}

Array.prototype.forEach.call(referralSelectors, referralSelection => {
    referralSelection.addEventListener("change", onChangeReferralSelect);
});

provinceSelect.addEventListener("change", onChangeProvincialSelect);
licensingBodySelect.addEventListener("change", onChangeLicensingBodySelect);

discoveryPassValue?.addEventListener("change", onChangeDiscoveryPass);

const blockDependentFieldUntilProvince = (evt) => {
    if (!provinceSelect.value) {
        evt.preventDefault();
        showProvinceMessage();
        provinceSelect.focus();
    }
};

const validatePrescriberForm = (evt) => {
    onChangeLicensingBodySelect();

    if (!provinceSelect.value) {
        evt.preventDefault();
        provinceSelect.focus();
        showProvinceMessage();
        alert("Veuillez sélectionner votre province ou territoire avant de continuer.");
        return;
    }

    if (!cityInput.value.trim()) {
        evt.preventDefault();
        cityInput.focus();
        alert("Veuillez entrer votre ville.");
        return;
    }

    if (!professionsSelect.value) {
        evt.preventDefault();
        professionsSelect.focus();
        alert("Veuillez sélectionner votre profession.");
        return;
    }

    if (!licensingBodySelect.value || !licensingBody.value.trim()) {
        evt.preventDefault();
        licensingBodySelect.focus();
        alert("Veuillez sélectionner votre organisme de réglementation.");
        return;
    }

    if (!licenceNumberInput.value.trim()) {
        evt.preventDefault();
        licenceNumberInput.focus();
        alert("Veuillez entrer votre numéro de licence.");
        return;
    }
};

setDependentFieldsDisabled(false);

professionsSelect?.addEventListener("mousedown", blockDependentFieldUntilProvince);
licensingBodySelect?.addEventListener("mousedown", blockDependentFieldUntilProvince);

professionsSelect?.addEventListener("keydown", blockDependentFieldUntilProvince);
licensingBodySelect?.addEventListener("keydown", blockDependentFieldUntilProvince);

professionsSelect?.addEventListener("touchstart", blockDependentFieldUntilProvince);
licensingBodySelect?.addEventListener("touchstart", blockDependentFieldUntilProvince);

prescriberForm?.addEventListener("submit", validatePrescriberForm);