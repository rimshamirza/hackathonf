
// Select DOM elements
var resumeForm = document.getElementById('resume-form');
var addEducationBtn = document.getElementById('add-education');
var educationFields = document.getElementById('education-fields');
var addWorkBtn = document.getElementById('add-work');
var workFields = document.getElementById('work-fields');
var resumeContainer = document.getElementById('resume-container');
var editResumeBtn = document.getElementById('edit-resume');
var downloadPdfBtn = document.getElementById('download-pdf');
// Resume display elements
var resumeFullName = document.getElementById('resume-full-name');
var resumeEmail = document.getElementById('resume-email');
var resumePhone = document.getElementById('resume-phone');
var resumeProfilePic = document.getElementById('resume-profile-pic');
var educationList = document.getElementById('education-list');
var skillsList = document.getElementById('skills-list');
var workList = document.getElementById('work-list');
// State variables
var isEditing = false;
// Utility functions
// Function to create a new education entry in the form
function addEducationEntry(data) {
    var div = document.createElement('div');
    div.className = 'education-entry';
    var degreeInput = document.createElement('input');
    degreeInput.type = 'text';
    degreeInput.name = 'education[]';
    degreeInput.placeholder = 'Degree';
    degreeInput.required = true;
    degreeInput.value = (data === null || data === void 0 ? void 0 : data.degree) || '';
    var institutionInput = document.createElement('input');
    institutionInput.type = 'text';
    institutionInput.name = 'institution[]';
    institutionInput.placeholder = 'Institution';
    institutionInput.required = true;
    institutionInput.value = (data === null || data === void 0 ? void 0 : data.institution) || '';
    var yearInput = document.createElement('input');
    yearInput.type = 'text';
    yearInput.name = 'year[]';
    yearInput.placeholder = 'Year';
    yearInput.required = true;
    yearInput.value = (data === null || data === void 0 ? void 0 : data.year) || '';
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-education';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () {
        educationFields.removeChild(div);
    });
    div.appendChild(degreeInput);
    div.appendChild(institutionInput);
    div.appendChild(yearInput);
    div.appendChild(removeBtn);
    educationFields.appendChild(div);
}
// Function to create a new work experience entry in the form
function addWorkEntry(data) {
    var div = document.createElement('div');
    div.className = 'work-entry';
    var jobTitleInput = document.createElement('input');
    jobTitleInput.type = 'text';
    jobTitleInput.name = 'jobTitle[]';
    jobTitleInput.placeholder = 'Job Title';
    jobTitleInput.required = true;
    jobTitleInput.value = (data === null || data === void 0 ? void 0 : data.jobTitle) || '';
    var companyInput = document.createElement('input');
    companyInput.type = 'text';
    companyInput.name = 'company[]';
    companyInput.placeholder = 'Company';
    companyInput.required = true;
    companyInput.value = (data === null || data === void 0 ? void 0 : data.company) || '';
    var durationInput = document.createElement('input');
    durationInput.type = 'text';
    durationInput.name = 'duration[]';
    durationInput.placeholder = 'Duration';
    durationInput.required = true;
    durationInput.value = (data === null || data === void 0 ? void 0 : data.duration) || '';
    var jobDescriptionTextarea = document.createElement('textarea');
    jobDescriptionTextarea.name = 'jobDescription[]';
    jobDescriptionTextarea.rows = 3;
    jobDescriptionTextarea.placeholder = 'Job Description';
    jobDescriptionTextarea.required = true;
    jobDescriptionTextarea.value = (data === null || data === void 0 ? void 0 : data.jobDescription) || '';
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-work';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () {
        workFields.removeChild(div);
    });
    div.appendChild(jobTitleInput);
    div.appendChild(companyInput);
    div.appendChild(durationInput);
    div.appendChild(jobDescriptionTextarea);
    div.appendChild(removeBtn);
    workFields.appendChild(div);
}
// Initialize with one education and one work entry
addEducationEntry();
addWorkEntry();
// Event listeners to add new entries
addEducationBtn.addEventListener('click', function () {
    addEducationEntry();
});
addWorkBtn.addEventListener('click', function () {
    addWorkEntry();
});
// Handle form submission
resumeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Gather form data
    var formData = new FormData(resumeForm);
    var fullName = formData.get('fullName');
    var email = formData.get('email');
    var phone = formData.get('phone');
    var skills = formData.get('skills');
    var profilePicFile = formData.get('profilePic');
    // Gather education data
    var educationDegrees = formData.getAll('education[]');
    var educationInstitutions = formData.getAll('institution[]');
    var educationYears = formData.getAll('year[]');
    var education = [];
    for (var i = 0; i < educationDegrees.length; i++) {
        education.push({
            degree: educationDegrees[i],
            institution: educationInstitutions[i],
            year: educationYears[i],
        });
    }
    // Gather work experience data
    var jobTitles = formData.getAll('jobTitle[]');
    var companies = formData.getAll('company[]');
    var durations = formData.getAll('duration[]');
    var jobDescriptions = formData.getAll('jobDescription[]');
    var workExperiences = [];
    for (var i = 0; i < jobTitles.length; i++) {
        workExperiences.push({
            jobTitle: jobTitles[i],
            company: companies[i],
            duration: durations[i],
            jobDescription: jobDescriptions[i],
        });
    }
    // Update resume display
    resumeFullName.textContent = fullName;
    resumeEmail.textContent = email;
    resumePhone.textContent = phone;
    // Handle profile picture
    if (profilePicFile && profilePicFile.size > 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (e.target && e.target.result) {
                resumeProfilePic.src = e.target.result;
            }
        };
        reader.readAsDataURL(profilePicFile);
    }
    else {
        resumeProfilePic.src = 'assets/default-profile.png';
    }
    // Populate education
    educationList.innerHTML = '';
    education.forEach(function (edu) {
        var li = document.createElement('li');
        li.innerHTML = "<strong>".concat(edu.degree, "</strong>, ").concat(edu.institution, " (").concat(edu.year, ")");
        educationList.appendChild(li);
    });
    // Populate skills
    skillsList.textContent = skills.split(',').map(function (skill) { return skill.trim(); }).join(', ');
    // Populate work experience
    workList.innerHTML = '';
    workExperiences.forEach(function (work) {
        var li = document.createElement('li');
        li.innerHTML = "<strong>".concat(work.jobTitle, "</strong> at ").concat(work.company, " (").concat(work.duration, ")<br>").concat(work.jobDescription);
        workList.appendChild(li);
    });
    // Show resume and hide form
    resumeContainer.style.display = 'block';
    document.querySelector('.form-container').style.display = 'none';
});
// Edit resume functionality
editResumeBtn.addEventListener('click', function () {
    if (!isEditing) {
        enableEditing();
    }
    else {
        disableEditing();
    }
});
function enableEditing() {
    isEditing = true;
    editResumeBtn.textContent = 'Save';
    // Make resume sections editable
    resumeFullName.contentEditable = 'true';
    resumeEmail.contentEditable = 'true';
    resumePhone.contentEditable = 'true';
    skillsList.contentEditable = 'true';
    educationList.querySelectorAll('li').forEach(function (li) {
        li.contentEditable = 'true';
    });
    workList.querySelectorAll('li').forEach(function (li) {
        li.contentEditable = 'true';
    });
    // Allow profile picture to be changed
    resumeProfilePic.style.cursor = 'pointer';
    resumeProfilePic.addEventListener('click', changeProfilePic);
}
function disableEditing() {
    isEditing = false;
    editResumeBtn.textContent = 'Edit';
    // Make resume sections non-editable
    resumeFullName.contentEditable = 'false';
    resumeEmail.contentEditable = 'false';
    resumePhone.contentEditable = 'false';
    skillsList.contentEditable = 'false';
    educationList.querySelectorAll('li').forEach(function (li) {
        li.contentEditable = 'false';
    });
    workList.querySelectorAll('li').forEach(function (li) {
        li.contentEditable = 'false';
    });
    // Remove profile picture change event
    resumeProfilePic.style.cursor = 'default';
    resumeProfilePic.removeEventListener('click', changeProfilePic);
}
// Change profile picture during editing
function changeProfilePic() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (e) {
        var target = e.target;
        if (target.files && target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                if (event.target && event.target.result) {
                    resumeProfilePic.src = event.target.result;
                }
            };
            reader.readAsDataURL(target.files[0]);
        }
    };
    input.click();
}
// Download PDF functionality
downloadPdfBtn.addEventListener('click', function () {
    generatePDF();
});
// Function to generate PDF using html2pdf.js
function generatePDF() {
    var resume = document.querySelector('.resume');
    var opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(resume).save();
}






// Shareable Link
shareBtn.addEventListener('click', () => {
    const uniquePath = `https://resume-builder.com/${Math.random().toString(36).substring(2, 9)}`;
    alert(`Your shareable resume link: ${uniquePath}`);
});