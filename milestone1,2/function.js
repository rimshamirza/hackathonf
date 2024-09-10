function toggleList(listId) {
    const hiddenList = document.getElementById(listId);
    
    // Toggle the display property of the targeted list
    if (hiddenList.style.display === 'none') {
        hiddenList.style.display = 'block';  // Show the list
    } else {
        hiddenList.style.display = 'none';   // Hide the list
    }
}


function saveFormDataAndRedirect() {
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        degree: document.getElementById('degree').value,
        yearOfPassing: document.getElementById('yearOfPassing').value,
        institution: document.getElementById('institution').value,
        jobTitle: document.getElementById('jobTitle').value,
        company: document.getElementById('company').value,
        yearsWorked: document.getElementById('yearsWorked').value,
        skills: document.getElementById('skills').value
    };

    // Save form data to localStorage
    localStorage.setItem('resumeData', JSON.stringify(formData));

    // Redirect to the resume page
    window.location.href = 'resume.html';
}


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


