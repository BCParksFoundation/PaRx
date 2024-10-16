


var professionsSelect = document.getElementsByClassName("professionsSelect")[0];
var provinceSelect = document.getElementsByClassName("provinceSelect")[0];
var licensingBodySelect = document.getElementsByClassName("licensingBodySelect")[0];
var referralSelectors = document.getElementsByClassName("referralSelect");
var discoveryPassValue = document.getElementsByClassName("discoveryPass")[0];
const licensingBody = document.getElementById("00NJQ000000mnRf");

const addOptionsValueToProfessionsSelect = (professionsArray) => {
    var option = document.createElement("option");
    for (var i = 0; i < professionsArray.length; i++) {
        var option = document.createElement("option");
        option.value = professionsArray[i];
        option.text = professionsArray[i];
        professionsSelect.append(option);
    }
}

const addOptionsValueToLicensingBodySelect = (licensingBodyArray) => {
    var option = document.createElement("option");
    for (var i = 0; i < licensingBodyArray.length; i++) {
        var option = document.createElement("option");
        option.value = licensingBodyArray[i];
        option.text = licensingBodyArray[i];
        licensingBodySelect.append(option);
    }
}

const onChangeLicensingBodySelect = (evt) => {
    if (evt.target.value == "Association canadienne des loisirs thérapeutiques") {
        licensingBody.value = "Canadian Therapeutic Recreation Association";
    }
    else {
        licensingBody.value = evt.target.value;
    }
}

const onChangeProvincialSelect = (evt) => {
    let noneOfAboveMessage = "Thank you for your interest in becoming a PaRx prescriber! Our program is currently available for licensed healthcare professionals governed by a regulatory body or college in Canada only, which varies from province to province. Please sign up for our newsletter to stay up to date on the latest news about PaRx!";
    let notAvaliableMessage = "We haven't launched in your territory yet, but will be in touch with more information when we do.";
    let licensingArrayProvinceSpecifiedList = [];
    let professionsOptionsList = [];
    licensingBodySelect.innerHTML = "";
    professionsSelect.innerHTML = "";
    switch(evt.target.value) {
        case "None of the above" :
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
                "College and Association of Respiratory Therapists of Alberta",  
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
        case "BC": 
            licensingArrayProvinceSpecifiedList = ["BC Association of Clinical Counsellors",
                "BC Podiatric Medical Association",
                "British Columbia College of Nurses and Midwives", 
                "British Columbia College of Oral Health Professionals", 
                "British Columbia College of Social Workers",  
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
                "New Brunswick Dental Society",
                "New Brunswick Dental Technicians' Association",
                "New Brunswick Denturists' Society",
                "New Brunswick Pharmacists' Association",
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
                "Paramedic",
                "Pharmacist",
                "Pharmacy Technician",
                "Physician",
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
                "College of Psychologists of Ontario",
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
        case "YT" :
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
        case "NT" :
            licensingArrayProvinceSpecifiedList = ["Canadian Therapeutic Recreation Association",
                "Government of the Northwest Territories, Health and Social Services",
                "Registered Nurses Association of the Northwest Territories and Nunavut",
                "None of the above"];
             professionsOptionsList = ["Dental Hygienist",
                "Dental Therapist",
                "Dentist",
                "Denturist",
                "Licensed Practical Nurse",
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
        case "NU" :  
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
        case "":
            alert("Please select the Canadian province of your practice to continue.")
        default:
            break;
    }
    addOptionsValueToProfessionsSelect(professionsOptionsList);
    addOptionsValueToLicensingBodySelect(licensingArrayProvinceSpecifiedList);
    
}

const onClickSubmitRegister = () => {
    const firstNameField = document.getElementById("00NHu00000LLlW1");
    const lastNameField = document.getElementById("00NHu00000LLlW6");
    const email = document.getElementById("00NHu00000RV7Gh");
    const street = document.getElementById("00NHu00000LLlVX");
    const city = document.getElementById("00NHu00000LLlVc");
    const province = document.getElementById("00NHu00000LLlWB");

    if(firstNameField.value === null) {

    }
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
    if (discoveryPassValue.checked) {
        discoveryPassAddress.classList.remove("w-hidden");
    }
    else {
        discoveryPassAddress.classList.add("w-hidden");
    }
}
Array.prototype.forEach.call(referralSelectors, referralSelection => {
    referralSelection.addEventListener("change", onChangeReferralSelect);
});

provinceSelect.addEventListener("change", onChangeProvincialSelect);

licensingBodySelect.addEventListener("change", onChangeLicensingBodySelect);

if (discoveryPassValue) {
    discoveryPassValue.addEventListener("change", onChangeDiscoveryPass);
}
