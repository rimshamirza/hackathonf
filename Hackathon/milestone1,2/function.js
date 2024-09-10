// Function to generate the resume based on user input
function generateResume(data) {
    var resumeSection = document.getElementById('resume');
    // Clear the previous resume (if any)
    resumeSection.innerHTML = '';
    // Create the resume elements dynamically
    var profilePictureElement = data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" alt=\"Profile Picture\" style=\"width: 150px; height: 150px; border-radius: 50%;\">") : '';
    var nameElement = "<h2>".concat(data.name, "</h2>");
    var contactElement = "<p>Email: ".concat(data.email, " | Phone: ").concat(data.phone, "</p>");
    var profileElement = data.profile ? "<p><strong>Profile:</strong> ".concat(data.profile, "</p>") : '';
    // Education Section
    var educationElement = "\n        <h3>Education</h3>\n        <p><strong>Degree:</strong> ".concat(data.degree, "</p>\n        <p><strong>Year of Passing:</strong> ").concat(data.yearOfPassing, "</p>\n        <p><strong>Institution:</strong> ").concat(data.institution, "</p>\n    ");
    // Work Experience Section
    var workExperienceElement = "\n        <h3>Work Experience</h3>\n        <p><strong>Job Title:</strong> ".concat(data.jobTitle, "</p>\n        <p><strong>Company:</strong> ").concat(data.company, "</p>\n        <p><strong>Years Worked:</strong> ").concat(data.yearsWorked, "</p>\n    ");
    // Skills Section
    var skillsElement = "\n        <h3>Skills</h3>\n        <p>".concat(data.skills.join(', '), "</p>\n    ");
    // Insert generated resume content into the resume section
    resumeSection.innerHTML = "\n        ".concat(profilePictureElement, "\n        ").concat(nameElement, "\n        ").concat(contactElement, "\n        ").concat(profileElement, "\n        ").concat(educationElement, "\n        ").concat(workExperienceElement, "\n        ").concat(skillsElement, "\n    ");
}
// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    // Capture the form input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var profile = document.getElementById('profile').value;
    // Education Details
    var degree = document.getElementById('degree').value;
    var yearOfPassing = document.getElementById('yearOfPassing').value;
    var institution = document.getElementById('institution').value;
    // Work Experience Details
    var jobTitle = document.getElementById('jobTitle').value;
    var company = document.getElementById('company').value;
    var yearsWorked = document.getElementById('yearsWorked').value;
    // Skills
    var skills = document.getElementById('skills').value.split(',');
    // Handle profile picture
    var profilePictureInput = document.getElementById('profilePicture');
    var profilePicture = profilePictureInput.files && profilePictureInput.files[0]
        ? URL.createObjectURL(profilePictureInput.files[0])
        : '';
    // Create a data object with user input
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        profile: profile,
        degree: degree,
        yearOfPassing: yearOfPassing,
        institution: institution,
        jobTitle: jobTitle,
        company: company,
        yearsWorked: yearsWorked,
        skills: skills,
        profilePicture: profilePicture
    };
    // Generate the resume with the data
    generateResume(resumeData);
}
// Function to handle profile picture preview
function handleProfilePicturePreview() {
    var profilePictureInput = document.getElementById('profilePicture');
    var profilePicPreview = document.getElementById('profilePicPreview');
    profilePictureInput.addEventListener('change', function () {
        var _a;
        var file = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
