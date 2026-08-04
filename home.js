(() => {
const loadRecaptchaOnce = () => {
    if (document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.head.append(script);
};

window.recaptchaCallbackPrescriberEn = () => {
    document.querySelector('.prescriber-form.show-en [type="submit"]')?.removeAttribute("disabled");
};
window.recaptchaCallbackPrescriberFr = () => {
    document.querySelector('.prescriber-form.show-fr [type="submit"]')?.removeAttribute("disabled");
};

if (!window.__parxCaptchaTimestampInterval) window.__parxCaptchaTimestampInterval = setInterval(() => {
    document.querySelectorAll('input[name="captcha_settings"]').forEach(input => {
        const form = input.closest("form");
        const response = form?.querySelector('[name="g-recaptcha-response"]');
        if (response && response.value.trim()) return;
        try {
            const settings = JSON.parse(input.value);
            settings.ts = JSON.stringify(Date.now());
            input.value = JSON.stringify(settings);
        } catch (error) {
            console.warn("Invalid Salesforce captcha settings", error);
        }
    });
}, 500);

const messagesByLocale = {
    en: {
        professionPlaceholder: "Select a profession",
        licensingPlaceholder: "Select a licensing body",
        provinceRequired: "Please select your province or territory before continuing.",
        cityRequired: "Please enter your city.",
        professionRequired: "Please select your profession.",
        licensingRequired: "Please select your licensing body.",
        licenceRequired: "Please enter your licence number."
    },
    fr: {
        professionPlaceholder: "Sélectionner une profession",
        licensingPlaceholder: "Sélectionner un ordre professionnel",
        provinceRequired: "Veuillez sélectionner votre province ou territoire avant de continuer.",
        cityRequired: "Veuillez entrer votre ville.",
        professionRequired: "Veuillez sélectionner votre profession.",
        licensingRequired: "Veuillez sélectionner votre organisme de réglementation.",
        licenceRequired: "Veuillez entrer votre numéro de licence."
    }
};

const frenchProfessionLabels = {
    "Acupuncturist": "Acupunctrice ou acupuncteur",
    "Audiologist": "Audiologiste",
    "Chiropractor": "Chiropractrice ou chiropracteur",
    "Dental Assistant": "Assistante ou assistant dentaire",
    "Dental Hygienist": "Hygiéniste dentaire",
    "Dental Technician or Technologist": "Technicienne ou technicien dentaire",
    "Dental Therapist": "Thérapeute dentaire",
    "Dentist": "Dentiste",
    "Denturist": "Denturologiste",
    "Dietitian": "Diététiste",
    "Hearing Aid Practitioner": "Conseillère ou conseiller d'orientation",
    "Massage Therapist": "Massothérapeute",
    "Midwife": "Sage-femme",
    "Naturopathic Doctor": "Médecin naturopathe",
    "Occupational Therapist": "Ergothérapeute",
    "Optician": "Opticienne ou opticien",
    "Optometrist": "Optométriste",
    "Paramedic": "Auxiliaire médical",
    "Pharmacist": "Pharmacienne ou pharmacien",
    "Pharmacy Technician": "Technicienne ou technicien en pharmacie",
    "Physician": "Médecin",
    "Physiotherapist": "Physiothérapeute",
    "Podiatrist": "Podologue",
    "Psychologist": "Psychologue",
    "Psychotherapist or Counselling Therapist": "Psychothérapeute",
    "Recreation Therapist": "Loisirs thérapeute",
    "Registered Nurse": "Infirmière ou infirmier",
    "Social Worker": "Travailleuse sociale ou travailleur social",
    "Speech and Hearing Health Professional": "Orthophoniste",
    "Speech-Language Pathologist": "Orthophoniste",
    "Traditional Chinese Medicine Practitioner": "Praticienne en médecine traditionnelle chinoise",
    "None of the above": "Aucun de ces éléments"
};

const initializeForm = (form) => {
if (form.dataset.parxInitialized === "true") return;
form.dataset.parxInitialized = "true";
var locale = form.dataset.locale === "fr" || form.classList.contains("show-fr") ? "fr" : "en";
var messages = messagesByLocale[locale];
var professionsSelect = form.querySelector(".professionsSelect");
var provinceSelect = form.querySelector(".provinceSelect");
var licensingBodySelect = form.querySelector(".licensingBodySelect");
var referralSelectors = form.getElementsByClassName("referralSelect");
var discoveryPassValue = form.querySelector(".discoveryPass");
var licensingBody = form.querySelector('[name="00NJQ000000mnRf"]');

var prescriberForm = form.matches(".prescriber-form") ? form : null;
var cityInput = form.querySelector('[name="00NJQ000000mnRS"]');
var licenceNumberInput = form.querySelector('[name="00NJQ000000mnRe"]');

var provinceRequiredMessage = form.querySelector(".province-required-message");

const showProvinceMessage = () => {
    provinceRequiredMessage?.classList.remove("w-hidden");
};

const hideProvinceMessage = () => {
    provinceRequiredMessage?.classList.add("w-hidden");
};

const addPlaceholderOption = (select, text) => {
    const option = document.createElement("option");
    option.value = "";
    option.text = text;
    option.disabled = true;
    option.selected = true;
    select.append(option);
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

const addOptionsValueToProfessionsSelect = (professionsArray) => {
    addPlaceholderOption(professionsSelect, messages.professionPlaceholder);

    for (var i = 0; i < professionsArray.length; i++) {
        var option = document.createElement("option");
        option.value = professionsArray[i];
        option.text = locale === "fr" ? (frenchProfessionLabels[professionsArray[i]] || professionsArray[i]) : professionsArray[i];
        professionsSelect.append(option);
    }
};

const addOptionsValueToLicensingBodySelect = (licensingBodyArray) => {
    addPlaceholderOption(licensingBodySelect, messages.licensingPlaceholder);

    for (var i = 0; i < licensingBodyArray.length; i++) {
        var option = document.createElement("option");
        option.value = licensingBodyArray[i];
        option.text = licensingBodyArray[i];
        licensingBodySelect.append(option);
    }
};

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
};

const onChangeProvincialSelect = (evt) => {
    let licensingArrayProvinceSpecifiedList = [];
    let professionsOptionsList = [];

    licensingBodySelect.innerHTML = "";
    professionsSelect.innerHTML = "";
    licensingBody.value = "";

    switch(evt.target.value) {
        case "None of the above":
            break;

        case "AB":
            licensingArrayProvinceSpecifiedList = ["Alberta College of Combined Laboratory and X-Ray Technologists",
                "Alberta College of Medical Diagnostic and Therapeutic Technologists",
                "Alberta College of Occupational Therapists",
                "Alberta College of Optometrists",
                "Alberta College of Paramedics",
                "Alberta College of Pharmacy",
                "Alberta College of Social Workers",
                "Alberta College of Speech-Language Pathologists and Audiologists",
                "Association of Counselling Therapy of Alberta",
                "Canadian Counselling and Psychotherapy Association",
                "College of Acupuncturists of Alberta",
                "College of Alberta Dental Assistants",
                "College of Alberta Denturists",
                "College of Alberta Psychologists",
                "College of Chiropractors of Alberta",
                "College of Dental Surgeons of Alberta",
                "College of Dental Technologists of Alberta",
                "College of Dietitians of Alberta",
                "College of Hearing Aid Practitioners of Alberta",
                "College of Licensed Practical Nurses of Alberta",
                "College of Medical Laboratory Technologists of Alberta",
                "College of Midwives of Alberta",
                "College of Naturopathic Doctors of Alberta",
                "College of Opticians of Alberta",
                "College of Physicians and Surgeons of Alberta",
                "College of Physiotherapists of Alberta",
                "College of Podiatric Physicians of Alberta",
                "College of Registered Dental Hygienists of Alberta",
                "College of Registered Nurses of Alberta",
                "College of Registered Psychiatric Nurses of Alberta",
                "College of Respiratory Therapists of Alberta",
                "Canadian Therapeutic Recreation Association",
                "None of the above"];
            professionsOptionsList = ["Acupuncturist",
                "Audiologist",
                "Chiropractor",
                "Combined Laboratory and X-Ray Technologist",
                "Dental Assistant",
                "Dental Hygienist",
                "Dental Technician or Technologist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Hearing Aid Practitioner",
                "Licensed Practical Nurse",
                "Medical Laboratory Technologist",
                "Medical Radiation Technologist",
                "Midwife",
                "Naturopathic Doctor",
                "Nurse Practitioner",
                "Nutritionist",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Paramedic",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physician Assistant",
                "Physiotherapist",
                "Podiatrist",
                "Psychologist",
                "Psychotherapist or Counselling Therapist",
                "Recreation Therapist",
                "Registered Nurse",
                "Registered Psychiatric Nurse",
                "Respiratory Therapist",
                "Social Worker",
                "Speech-Language Pathologist",
                "None of the above"];
            break;

        case "BC":
            licensingArrayProvinceSpecifiedList = ["BC Association of Clinical Counsellors",
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
                "None of the above"];
            professionsOptionsList = ["Acupuncturist",
                "Audiologist",
                "Chiropractor",
                "Dental Assistant",
                "Dental Hygienist",
                "Dental Technician or Technologist",
                "Dental Therapist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Hearing Aid Practitioner",
                "Licensed Practical Nurse",
                "Massage Therapist",
                "Midwife",
                "Naturopathic Doctor",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Paramedic",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physiotherapist",
                "Podiatrist",
                "Psychologist",
                "Psychotherapist or Counselling Therapist",
                "Recreation Therapist",
                "Registered Nurse",
                "Registered Psychiatric Nurse",
                "Social Worker",
                "Speech and Hearing Health Professional",
                "Traditional Chinese Medicine Practitioner",
                "None of the above"];
            break;

        case "MB":
            licensingArrayProvinceSpecifiedList = ["College of Audiologists and Speech-Language Pathologists of Manitoba",
                "College of Dental Hygienists of Manitoba",
                "College of Dietitians of Manitoba",
                "College of Licensed Practical Nurses of Manitoba",
                "College of Medical Laboratory Technologists of Manitoba",
                "College of Midwives of Manitoba",
                "College of Occupational Therapists of Manitoba",
                "College of Paramedics of Manitoba",
                "College of Pharmacists of Manitoba",
                "College of Physicians and Surgeons of Manitoba",
                "College of Physiotherapists of Manitoba",
                "College of Podiatrists of Manitoba",
                "College of Registered Nurses of Manitoba",
                "College of Registered Psychiatric Nurses of Manitoba",
                "Denturist Association of Manitoba",
                "Manitoba Association of Optometrists",
                "Manitoba Association of Registered Respiratory Therapists",
                "Manitoba Chiropractors Association",
                "Manitoba College of Social Workers",
                "Manitoba Dental Association",
                "Manitoba Naturopathic Association",
                "Opticians of Manitoba",
                "Psychological Association of Manitoba",
                "Canadian Therapeutic Recreation Association",
                "None of the above"];
            professionsOptionsList = ["Audiologist",
                "Chiropractor",
                "Dental Assistant",
                "Dental Hygienist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Licensed Practical Nurse",
                "Medical Laboratory Technologist",
                "Midwife",
                "Naturopathic Doctor",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Paramedic",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physician Assistant",
                "Physiotherapist",
                "Podiatrist",
                "Psychologist",
                "Recreation Therapist",
                "Registered Nurse",
                "Registered Psychiatric Nurse",
                "Respiratory Therapist",
                "Social Worker",
                "Speech-Language Pathologist",
                "None of the above"];
            break;

        case "NB":
            licensingArrayProvinceSpecifiedList = ["Association of New Brunswick Licensed Practical Nurses",
                "College of Counselling Therapists of New Brunswick",
                "College of Massage Therapy New Brunswick",
                "College of Osteopaths of New Brunswick",
                "College of Physicians and Surgeons of New Brunswick",
                "College of Physiotherapists of New Brunswick",
                "College of Psychologists of New Brunswick",
                "Midwifery Council of New Brunswick",
                "New Brunswick Association of Dietitians",
                "New Brunswick Association of Medical Radiation Technologists",
                "New Brunswick Association of Occupational Therapists",
                "New Brunswick Association of Optometrists",
                "New Brunswick Association of Respiratory Therapists",
                "New Brunswick Association of Social Workers",
                "New Brunswick Chiropractors' Association",
                "New Brunswick College of Dental Hygienists",
                "New Brunswick College of Pharmacists",
                "New Brunswick Dental Society",
                "New Brunswick Dental Technicians' Association",
                "New Brunswick Denturists' Society",
                "New Brunswick Podiatry Association",
                "New Brunswick Society of Cardiology Technologists",
                "New Brunswick Society of Medical Laboratory Technologists",
                "New Brunswick Association of Speech-Language Pathologists and Audiologists",
                "Nurses' Association of New Brunswick",
                "Opticians' Association of New Brunswick",
                "Paramedic Association of New Brunswick",
                "Canadian Therapeutic Recreation Association",
                "None of the above"];
            professionsOptionsList = ["Audiologist",
                "Cardiology Technologist",
                "Chiropractor",
                "Dental Assistant",
                "Dental Hygienist",
                "Dental Technician or Technologist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Licensed Practical Nurse",
                "Massage Therapist",
                "Medical Laboratory Technologist",
                "Medical Radiation Technologist",
                "Midwife",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Osteopath",
                "Paramedic",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physician Assistant",
                "Physiotherapist",
                "Podiatrist",
                "Psychologist",
                "Recreation Therapist",
                "Psychotherapist or Counselling Therapist",
                "Registered Nurse",
                "Respiratory Therapist",
                "Social Worker",
                "Speech-Language Pathologist",
                "None of the above"];
            break;

        case "NS":
            licensingArrayProvinceSpecifiedList = ["College of Dental Hygienists of Nova Scotia",
                "College of Occupational Therapists of Nova Scotia",
                "College of Paramedics of Nova Scotia",
                "College of Physicians and Surgeons of Nova Scotia",
                "Denturist Licensing Board",
                "Midwifery Regulatory Council of Nova Scotia",
                "Nova Scotia Association of Medical Radiation Technologists",
                "Nova Scotia Association of Naturopathic Doctors",
                "Nova Scotia Board of Examiners in Psychology",
                "Nova Scotia College of Audiologists and Speech-Language Pathologists",
                "Nova Scotia College of Chiropractors",
                "Nova Scotia College of Counselling Therapists",
                "Nova Scotia College of Dispensing Opticians",
                "Nova Scotia College of Medical Laboratory Technologists",
                "Nova Scotia College of Nursing",
                "Nova Scotia College of Optometrists",
                "Nova Scotia College of Pharmacists",
                "Nova Scotia College of Physiotherapists",
                "Nova Scotia College of Respiratory Therapists",
                "Nova Scotia College of Social Workers",
                "Nova Scotia Dental Technicians Association",
                "Nova Scotia College of Dietitians and Nutritionists",
                "Provincial Dental Board of Nova Scotia",
                "Canadian Therapeutic Recreation Association",
                "None of the above"];
            professionsOptionsList = ["Audiologist",
                "Chiropractor",
                "Dental Assistant",
                "Dental Hygienist",
                "Dental Technician or Technologist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Licensed Practical Nurse",
                "Medical Laboratory Technologist",
                "Medical Radiation Technologist",
                "Midwife",
                "Naturopathic Doctor",
                "Nurse Practitioner",
                "Nutritionist",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physician Assistant",
                "Physiotherapist",
                "Psychologist",
                "Psychotherapist or Counselling Therapist",
                "Recreation Therapist",
                "Registered Nurse",
                "Respiratory Therapist",
                "Social Worker",
                "None of the above"];
            break;

        case "NL":
            licensingArrayProvinceSpecifiedList = ["College of Audiology and Speech-Language Pathology of Newfoundland and Labrador",
                "College of Licensed Practical Nurses of Newfoundland and Labrador",
                "College of Massage Therapists Newfoundland",
                "College of Midwives of Newfoundland and Labrador",
                "College of Physicians and Surgeons of Newfoundland and Labrador",
                "College of Registered Nurses of Newfoundland and Labrador",
                "College of Traditional Chinese Medicine Practitioners and Acupuncturists of Newfoundland and Labrador",
                "Denturist Association of Newfoundland and Labrador",
                "Hearing Aid Practitioners Board of Newfoundland and Labrador",
                "Newfoundland and Labrador Chiropractic Board",
                "Newfoundland and Labrador College of Dental Hygienists",
                "Newfoundland and Labrador College of Dietitians",
                "Newfoundland and Labrador College of Medical Laboratory Sciences",
                "Newfoundland and Labrador College of Optometrists",
                "Newfoundland and Labrador College of Physiotherapists",
                "Newfoundland and Labrador College of Respiratory Therapists",
                "Newfoundland and Labrador College of Social Workers",
                "Newfoundland and Labrador Dental Board",
                "Newfoundland and Labrador Department of Health and Community Services, Paramedicine and Medical Transport",
                "Newfoundland and Labrador Pharmacy Board",
                "Newfoundland and Labrador Psychology Board",
                "Newfoundland Labrador Occupational Therapy Board",
                "The Dispensing Opticians Board of Newfoundland and Labrador",
                "Canadian Therapeutic Recreation Association",
                "None of the above"];
            professionsOptionsList = ["Acupuncturist",
                "Audiologist",
                "Chiropractor",
                "Dental Assistant",
                "Dental Hygienist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Licensed Practical Nurse",
                "Massage Therapist",
                "Medical Laboratory Technologist",
                "Midwife",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physiotherapist",
                "Psychologist",
                "Recreation Therapist",
                "Registered Nurse",
                "Respiratory Therapist",
                "Social Worker",
                "Speech-Language Pathologist",
                "Traditional Chinese Medicine Practitioner",
                "None of the above"];
            break;

        case "PE":
            licensingArrayProvinceSpecifiedList = ["College of Allied Health Professionals of Prince Edward Island",
                "College of Counselling Therapy PEI",
                "College of Dental Hygienists of Prince Edward Island",
                "College of Dietitians of Prince Edward Island",
                "College of Licensed Practical Nurses of Prince Edward Island",
                "College of Massage Therapists of Prince Edward Island",
                "College of Physicians and Surgeons of Prince Edward Island",
                "Denturist Society of Prince Edward Island",
                "P.E.I. Board of Dispensing Opticians",
                "Prince Edward Island Chiropractic Association",
                "Prince Edward Island College of Optometrists",
                "Prince Edward Island College of Pharmacists",
                "Prince Edward Island College of Physiotherapists",
                "Prince Edward Island Dental Council",
                "Prince Edward Island Emergency Medical Services Board",
                "Prince Edward Island Occupational Therapists Registration Board",
                "Prince Edward Island Psychologists Registration Board",
                "Prince Edward Island Social Work Registration Board",
                "College of Registered Nurses and Midwives of Prince Edward Island",
                "Canadian Therapeutic Recreation Association",
                "None of the above"];
            professionsOptionsList = ["Chiropractor",
                "Dental Assistant",
                "Dental Hygienist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Licensed Practical Nurse",
                "Massage Therapist",
                "Medical Laboratory Technologist",
                "Medical Radiation Technologist",
                "Midwife",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Paramedic",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physiotherapist",
                "Psychologist",
                "Psychotherapist or Counselling Therapist",
                "Recreation Therapist",
                "Registered Nurse",
                "Respiratory Therapist",
                "Social Worker",
                "None of the above"];
            break;

        case "SK":
            licensingArrayProvinceSpecifiedList = ["Chiropractors' Association of Saskatchewan",
                "College of Dental Surgeons of Saskatchewan",
                "College of Physicians and Surgeons of Saskatchewan",
                "College of Registered Nurses of Saskatchewan",
                "Dental Technicians Association of Saskatchewan",
                "Denturist Society of Saskatchewan",
                "Registered Psychiatric Nurses Association of Saskatchewan",
                "Saskatchewan Association of Licensed Practical Nurses",
                "Saskatchewan Association of Medical Radiation Technologists",
                "Saskatchewan Association of Naturopathic Practitioners",
                "Saskatchewan Association of Optometrists",
                "Saskatchewan Association of Social Workers",
                "Saskatchewan Association of Speech-Language Pathologists and Audiologists",
                "Saskatchewan College of Midwives",
                "Saskatchewan College of Opticians",
                "Saskatchewan College of Paramedics",
                "Saskatchewan College of Pharmacy Professionals",
                "Saskatchewan College of Physical Therapists",
                "Saskatchewan College of Podiatrists",
                "Saskatchewan College of Psychologists",
                "Saskatchewan College of Respiratory Therapists",
                "Saskatchewan Dental Assistants' Association",
                "Saskatchewan Dental Hygienists' Association",
                "Saskatchewan Dental Therapists Association",
                "Saskatchewan Dietitians Association",
                "Saskatchewan Ministry of Health",
                "Saskatchewan Society of Medical Laboratory Technologists",
                "Saskatchewan Society of Occupational Therapists",
                "Canadian Therapeutic Recreation Association",
                "None of the above"];
            professionsOptionsList = ["Audiologist",
                "Chiropractor",
                "Dental Assistant",
                "Dental Hygienist",
                "Dental Technician or Technologist",
                "Dental Therapist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Hearing Aid Practitioner",
                "Licensed Practical Nurse",
                "Medical Laboratory Technologist",
                "Medical Radiation Technologist",
                "Midwife",
                "Naturopathic Doctor",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Paramedic",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physician Assistant",
                "Physiotherapist",
                "Podiatrist",
                "Psychologist",
                "Recreation Therapist",
                "Registered Nurse",
                "Registered Psychiatric Nurse",
                "Respiratory Therapist",
                "Social Worker",
                "Speech-Language Pathologist",
                "None of the above"];
            break;

        case "ON":
            licensingArrayProvinceSpecifiedList = ["College of Audiologists and Speech-Language Pathologists of Ontario",
                "College of Chiropodists of Ontario",
                "College of Chiropractors of Ontario",
                "College of Dental Hygienists of Ontario",
                "College of Dental Technologists of Ontario",
                "College of Denturists of Ontario",
                "College of Dietitians of Ontario",
                "College of Homeopaths of Ontario",
                "College of Kinesiologists of Ontario",
                "College of Massage Therapists of Ontario",
                "College of Medical Laboratory Technologists of Ontario",
                "College of Medical Radiation Technologists of Ontario",
                "College of Midwives of Ontario",
                "College of Naturopaths of Ontario",
                "College of Nurses of Ontario",
                "College of Occupational Therapists of Ontario",
                "College of Opticians of Ontario",
                "College of Optometrists of Ontario",
                "College of Physicians and Surgeons of Ontario",
                "College of Physiotherapists of Ontario",
                "College of Psychologists and Behaviour Analysts of Ontario",
                "College of Registered Psychotherapists and Registered Mental Health Therapists of Ontario",
                "College of Respiratory Therapists in Ontario",
                "College of Traditional Chinese Medicine Practitioners and Acupuncturists of Ontario",
                "Ontario College of Pharmacists",
                "Ontario College of Social Workers and Social Service Workers",
                "Ontario Paramedic Association",
                "Royal College of Dental Surgeons of Ontario",
                "Canadian Therapeutic Recreation Association",
                "None of the above"];
            professionsOptionsList = ["Acupuncturist",
                "Audiologist",
                "Behaviour Analyst",
                "Chiropodist",
                "Chiropractor",
                "Dental Hygienist",
                "Dental Technician or Technologist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Homeopath",
                "Kinesiologist",
                "Licensed Practical Nurse",
                "Massage Therapist",
                "Medical Laboratory Technologist",
                "Medical Radiation Technologist",
                "Midwife",
                "Naturopathic Doctor",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Paramedic",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
                "Physician Assistant",
                "Physiotherapist",
                "Podiatrist",
                "Psychologist",
                "Psychotherapist or Counselling Therapist",
                "Recreation Therapist",
                "Registered Nurse",
                "Respiratory Therapist",
                "Social Worker",
                "Speech-Language Pathologist",
                "Traditional Chinese Medicine Practitioner",
                "None of the above"];
            break;

        case "QC":
            licensingArrayProvinceSpecifiedList = ["Association canadienne des loisirs thérapeutiques",
                "Collège des médecins du Québec",
                "Fédération des kinésiologues du Québec",
                "Ordre des Acupuncteurs du Québec",
                "Ordre des audioprothésistes du Québec",
                "Ordre des chiropraticiens du Québec",
                "Ordre des conseillers et conseillères d'orientation du Québec",
                "Ordre des dentistes du Québec",
                "Ordre des denturologistes du Québec",
                "Ordre des diététistes-nutritionnistes du Québec",
                "Ordre des ergothérapeutes du Québec",
                "Ordre des Hygiénistes Dentaires du Québec",
                "Ordre des infirmières et infirmiers auxiliaires du Québec",
                "Ordre des infirmières et infirmiers du Québec",
                `Ordre des opticiens d'ordonnances du Québec`,
                "Ordre des optométristes du Québec",
                "Ordre des orthophonistes et audiologistes du Québec",
                "Ordre des pharmaciens du Québec",
                "Ordre des podiatres du Québec",
                "Ordre des psychoéducateurs et psychoéducatrices du Québec",
                "Ordre des psychologues du Québec",
                "Ordre des sages-femmes du Québec",
                "Ordre des technologues en imagerie médicale, en radio-oncologie et en électrophysiologie médicale du Québec",
                "Ordre des technologues en prothèses et appareils dentaires du Québec",
                "Ordre des travailleurs sociaux et des thérapeutes conjugaux et familiaux du Québec",
                "Ordre professionnel de la physiothérapie du Québec",
                "Ordre professionnel des inhalothérapeutes du Québec",
                "Ordre professionnel des sexologues du Québec",
                "Ordre professionnel des technologistes médicaux du Québec",
                "None of the above"];
            professionsOptionsList = ["Acupuncturist",
                "Audiologist",
                "Chiropractor",
                "Dental Hygienist",
                "Dental Technician or Technologist",
                "Dentist",
                "Denturist",
                "Dietitian",
                "Dietitian-Nutritionist",
                "Guidance Counsellor",
                "Hearing Aid Practitioner",
                "Kinesiologist",
                "Licensed Practical Nurse",
                "Medical Laboratory Technologist",
                "Medical Radiation Technologist",
                "Midwife",
                "Nutritionist",
                "Nurse Practitioner",
                "Nursing Assistant",
                "Occupational Therapist",
                "Optician",
                "Optometrist",
                "Pharmacist",
                "Psychoeducator",
                "Physician",
                "Physiotherapist",
                "Physiotherapy Technologist",
                "Podiatrist",
                "Psychologist",
                "Psychotherapist or Counselling Therapist",
                "Recreation Therapist",
                "Registered Nurse",
                "Registered Practical Nurse",
                "Respiratory Therapist",
                "Sexologist",
                "Social Worker",
                "Speech-Language Pathologist",
                "None of the above"];
            break;

        case "YT":
            licensingArrayProvinceSpecifiedList = ["Canadian Therapeutic Recreation Association",
                "Government of Yukon, Professional Licensing",
                "Yukon Medical Council",
                "Yukon Registered Nurses Association",
                "None of the above"];
            professionsOptionsList = ["Chiropractor",
                "Dental Hygienist",
                "Dental Therapist",
                "Dentist",
                "Denturist",
                "Licensed Practical Nurse",
                "Nurse Practitioner",
                "Nursing Assistant",
                "Occupational Therapist",
                "Optometrist",
                "Pharmacist",
                "Physician",
                "Physiotherapist",
                "Recreation Therapist",
                "Registered Nurse",
                "Registered Psychiatric Nurse",
                "None of the above"];
            break;

        case "NT":
            licensingArrayProvinceSpecifiedList = ["Chiropractors' Association of Saskatchewan",
                "College of Chiropractors of Alberta",
                "College of Chiropractors of Ontario",
                "Canadian Therapeutic Recreation Association",
                "College of Complementary Health Professionals of BC",
                "College of Massage Therapy New Brunswick",
                "College of Massage Therapists Newfoundland",
                "College of Massage Therapists of Ontario",
                "College of Massage Therapists of Prince Edward Island",
                "Government of the Northwest Territories, Health and Social Services",
                "Manitoba Chiropractors Association",
                "New Brunswick Chiropractors' Association",
                "Newfoundland and Labrador Chiropractic Board",
                "Nova Scotia College of Chiropractors",
                "Ordre des chiropraticiens du Québec",
                "Prince Edward Island Chiropractic Association",
                "Registered Nurses Association of the Northwest Territories and Nunavut",
                "None of the above"];
            professionsOptionsList = ["Dental Hygienist",
                "Dental Therapist",
                "Dentist",
                "Denturist",
                "Licensed Practical Nurse",
                "Massage Therapist",
                "Midwife",
                "Naturopathic Doctor",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optometrist",
                "Pharmacist",
                "Physician",
                "Psychologist",
                "Recreation Therapist",
                "Registered Nurse",
                "Social Worker",
                "None of the above"];
            break;

        case "NU":
            licensingArrayProvinceSpecifiedList = ["Canadian Therapeutic Recreation Association",
                "Government of Nunavut, Department of Health",
                "Registered Nurses Association of the Northwest Territories and Nunavut",
                "None of the above"];
            professionsOptionsList = ["Dental Hygienist",
                "Dental Therapist",
                "Dentist",
                "Denturist",
                "Licensed Practical Nurse",
                "Midwife",
                "Nurse Practitioner",
                "Occupational Therapist",
                "Optometrist",
                "Pharmacist",
                "Physician",
                "Recreation Therapist",
                "Registered Nurse",
                "None of the above"];
            break;

        default:
            break;
    }

    addOptionsValueToProfessionsSelect(professionsOptionsList);
    addOptionsValueToLicensingBodySelect(licensingArrayProvinceSpecifiedList);

    const hasProvinceOptions = professionsOptionsList.length > 0 && licensingArrayProvinceSpecifiedList.length > 0;
    const isNoneOfTheAbove = evt.target.value === "None of the above";
    professionsSelect.required = !isNoneOfTheAbove;
    licensingBodySelect.required = !isNoneOfTheAbove;
    licensingBody.required = !isNoneOfTheAbove;
    setDependentFieldsDisabled(!hasProvinceOptions && !isNoneOfTheAbove);

    hideProvinceMessage();
};

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
};

const initializeMapboxAutocomplete = () => {
    const addressInput = form.querySelector("[data-mapbox-autocomplete]");
    if (!addressInput) return;

    const token = form.dataset.mapboxToken || document.querySelector('meta[name="mapbox-token"]')?.content;
    if (!token) {
        console.warn("Mapbox autocomplete is enabled but no token was provided.");
        return;
    }

    const list = document.createElement("div");
    list.id = `${form.id || `parx-${locale}`}-mapbox-addresses`;
    list.className = "parx-address-suggestions";
    list.setAttribute("role", "listbox");
    list.hidden = true;
    addressInput.setAttribute("aria-controls", list.id);
    addressInput.setAttribute("aria-autocomplete", "list");
    addressInput.setAttribute("autocomplete", "off");
    addressInput.insertAdjacentElement("afterend", list);

    if (!document.getElementById("parx-address-suggestion-styles")) {
        const style = document.createElement("style");
        style.id = "parx-address-suggestion-styles";
        style.textContent = `
            .parx-address-suggestions { position: absolute; z-index: 1000; left: 0; right: 0; max-height: 18rem; overflow-y: auto; background: #fff; border: 1px solid #767676; box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.15); }
            .parx-address-suggestion { display: block; width: 100%; padding: .65rem .75rem; border: 0; border-bottom: 1px solid #ddd; background: #fff; color: #222; text-align: left; cursor: pointer; }
            .parx-address-suggestion:hover, .parx-address-suggestion[aria-selected="true"] { background: #eef5f0; }
        `;
        document.head.append(style);
    }
    const inputContainer = addressInput.parentElement;
    if (inputContainer && getComputedStyle(inputContainer).position === "static") {
        inputContainer.style.position = "relative";
    }

    let suggestions = new Map();
    let debounceTimer;
    let activeRequest;

    const parseCanadianUnitAddress = value => {
        const designatorMatch = value.match(/^\s*(?:unit|suite|apt\.?|apartment|#)\s*([a-z0-9-]+)[,\s]+(.+)$/i);
        if (designatorMatch) {
            return { unit: designatorMatch[1], address: designatorMatch[2].trim() };
        }

        const hyphenMatch = value.match(/^\s*([a-z0-9]+)\s*-\s*(\d{2,6}\s+.+)$/i);
        if (hyphenMatch) {
            return { unit: hyphenMatch[1], address: hyphenMatch[2].trim() };
        }

        return { unit: "", address: value };
    };

    const applySuggestion = suggestion => {
        if (!suggestion) return false;
        const { feature, unit } = suggestion;
        const properties = feature.properties || {};
        const context = properties.context || {};
        const city = form.querySelector('[name="00NJQ000000mnRS"]');
        const province = form.querySelector('[name="00NJQ000000mnRo"]');
        const postcode = form.querySelector('[name="00NJQ000000mnRj"]');
        const streetAddress = properties.name_preferred || properties.name || addressInput.value;
        addressInput.value = unit ? `${unit}-${streetAddress}` : streetAddress;
        if (city) city.value = context.place?.name || context.locality?.name || "";
        if (postcode) postcode.value = context.postcode?.name || properties.postcode || "";
        if (province) {
            const provinceCode = (context.region?.region_code || "").split("-").pop();
            if (provinceCode) {
                province.value = provinceCode;
                province.dispatchEvent(new Event("change", { bubbles: true }));
            }
        }
        list.hidden = true;
        addressInput.setAttribute("aria-expanded", "false");
        return true;
    };

    const renderSuggestions = () => {
        list.replaceChildren();
        suggestions.forEach(suggestion => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "parx-address-suggestion";
            option.setAttribute("role", "option");
            option.textContent = suggestion.label;
            option.addEventListener("mousedown", event => event.preventDefault());
            option.addEventListener("click", () => applySuggestion(suggestion));
            list.append(option);
        });
        list.hidden = suggestions.size === 0;
        addressInput.setAttribute("aria-expanded", String(suggestions.size > 0));
    };

    addressInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        const query = addressInput.value.trim();
        if (query.length < 3) {
            activeRequest?.abort();
            list.replaceChildren();
            list.hidden = true;
            suggestions.clear();
            return;
        }

        debounceTimer = setTimeout(async () => {
            activeRequest?.abort();
            activeRequest = new AbortController();
            const parsedAddress = parseCanadianUnitAddress(query);
            const params = new URLSearchParams({
                q: parsedAddress.address,
                access_token: token,
                country: "ca",
                autocomplete: "true",
                types: "address",
                limit: "10",
                language: locale
            });
            try {
                const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?${params}`, {
                    signal: activeRequest.signal
                });
                if (!response.ok) throw new Error(`Mapbox request failed (${response.status})`);
                const payload = await response.json();
                suggestions = new Map();
                (payload.features || []).forEach(feature => {
                    const mapboxLabel = feature.properties?.full_address || feature.properties?.place_formatted;
                    if (!mapboxLabel) return;
                    const unitLabel = locale === "fr" ? "Unité" : "Unit";
                    const label = parsedAddress.unit ? `${unitLabel} ${parsedAddress.unit} — ${mapboxLabel}` : mapboxLabel;
                    suggestions.set(label, { feature, unit: parsedAddress.unit, label });
                });
                renderSuggestions();
            } catch (error) {
                if (error.name === "AbortError") return;
                console.warn("Mapbox autocomplete unavailable", error);
            }
        }, 300);
    });

    document.addEventListener("click", event => {
        if (event.target !== addressInput && !list.contains(event.target)) {
            list.hidden = true;
            addressInput.setAttribute("aria-expanded", "false");
        }
    });
};

const onChangeDiscoveryPass = () => {
    var discoveryPassAddress = form.querySelector(".discovery-pass-address");

    var discoveryPassAddressFields = [
        form.querySelector('[name="00NJQ000000mnRp"]'),
        form.querySelector('[name="00NJQ000000mnRS"]'),
        form.querySelector('[name="00NJQ000000mnRj"]'),
        form.querySelector('[name="00NJQ000000mnRo"]')
    ];

    if (!discoveryPassValue || !discoveryPassAddress) return;

    var isChecked = discoveryPassValue.checked;

    discoveryPassAddress.classList.toggle("w-hidden", !isChecked);

    discoveryPassAddressFields.forEach(field => {
        if (field) {
            field.required = isChecked;
        }
    });
};

const validatePrescriberForm = (evt) => {
    onChangeLicensingBodySelect();

    if (!provinceSelect.value) {
        evt.preventDefault();
        provinceSelect.focus();
        alert(messages.provinceRequired);
        return;
    }

    if (!cityInput.value.trim()) {
        evt.preventDefault();
        cityInput.focus();
        alert(messages.cityRequired);
        return;
    }

    const isNoneOfTheAbove = provinceSelect.value === "None of the above";

    if (!isNoneOfTheAbove && !professionsSelect.value) {
        evt.preventDefault();
        professionsSelect.focus();
        alert(messages.professionRequired);
        return;
    }

    if (!isNoneOfTheAbove && (!licensingBodySelect.value || !licensingBody.value.trim())) {
        evt.preventDefault();
        licensingBodySelect.focus();
        alert(messages.licensingRequired);
        return;
    }

    if (!licenceNumberInput.value.trim()) {
        evt.preventDefault();
        licenceNumberInput.focus();
        alert(messages.licenceRequired);
        return;
    }
};

if (professionsSelect && licensingBodySelect) {
    setDependentFieldsDisabled(true);
}

// Prescriber form functionality
if (
    professionsSelect &&
    provinceSelect &&
    licensingBodySelect &&
    licensingBody
) {
    setDependentFieldsDisabled(true);

    provinceSelect.addEventListener("change", onChangeProvincialSelect);
    licensingBodySelect.addEventListener("change", onChangeLicensingBodySelect);

    prescriberForm?.addEventListener("submit", validatePrescriberForm);

    professionsSelect.addEventListener("focus", function () {
        if (!provinceSelect.value) {
            showProvinceMessage();
        }
    });

    licensingBodySelect.addEventListener("focus", function () {
        if (!provinceSelect.value) {
            showProvinceMessage();
        }
    });

    const blockDependentFieldUntilProvince = (evt) => {
        if (!provinceSelect.value) {
            evt.preventDefault();
            showProvinceMessage();
            provinceSelect.focus();
        }
    };

    professionsSelect.addEventListener(
        "mousedown",
        blockDependentFieldUntilProvince
    );

    licensingBodySelect.addEventListener(
        "mousedown",
        blockDependentFieldUntilProvince
    );

    professionsSelect.addEventListener(
        "keydown",
        blockDependentFieldUntilProvince
    );

    licensingBodySelect.addEventListener(
        "keydown",
        blockDependentFieldUntilProvince
    );

    professionsSelect.addEventListener(
        "touchstart",
        blockDependentFieldUntilProvince
    );

    licensingBodySelect.addEventListener(
        "touchstart",
        blockDependentFieldUntilProvince
    );
}

// Referral dropdown functionality
Array.prototype.forEach.call(referralSelectors, referralSelection => {
    referralSelection.addEventListener("change", onChangeReferralSelect);
});

// Discovery Pass functionality
if (discoveryPassValue) {
    discoveryPassValue.addEventListener("change", onChangeDiscoveryPass);
    onChangeDiscoveryPass();
}
initializeMapboxAutocomplete();
};

loadRecaptchaOnce();
document.querySelectorAll("form[data-parx-form]").forEach(initializeForm);
})();
