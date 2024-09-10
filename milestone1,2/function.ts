interface ResumeData {
    name: string;
    email: string;
    phone: string;
    profile: string;
    degree: string;
    yearOfPassing: string;
    institution: string;
    jobTitle: string;
    company: string;
    yearsWorked: string;
    skills: string[];
    profilePicture: string; // URL of the profile picture
}

// Function to generate the resume based on user input
function generateResume(data: ResumeData) {
    const resumeSection = document.getElementById('resume') as HTMLElement;
    
    // Clear the previous resume (if any)
    resumeSection.innerHTML = '';

    // Create the resume elements dynamically
    const profilePictureElement = data.profilePicture ? `<img src="${data.profilePicture}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%;">` : '';
    const nameElement = `<h2>${data.name}</h2>`;
    const contactElement = `<p>Email: ${data.email} | Phone: ${data.phone}</p>`;
    const profileElement = data.profile ? `<p><strong>Profile:</strong> ${data.profile}</p>` : '';

    // Education Section
    const educationElement = `
        <h3>Education</h3>
        <p><strong>Degree:</strong> ${data.degree}</p>
        <p><strong>Year of Passing:</strong> ${data.yearOfPassing}</p>
        <p><strong>Institution:</strong> ${data.institution}</p>
    `;

    // Work Experience Section
    const workExperienceElement = `
        <h3>Work Experience</h3>
        <p><strong>Job Title:</strong> ${data.jobTitle}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Years Worked:</strong> ${data.yearsWorked}</p>
    `;

    // Skills Section
    const skillsElement = `
        <h3>Skills</h3>
        <p>${data.skills.join(', ')}</p>
    `;

    // Insert generated resume content into the resume section
    resumeSection.innerHTML = `
        ${profilePictureElement}
        ${nameElement}
        ${contactElement}
        ${profileElement}
        ${educationElement}
        ${workExperienceElement}
        ${skillsElement}
    `;
}

// Function to handle form submission
function handleFormSubmit(event: Event) {
    event.preventDefault();

    // Capture the form input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const profile = (document.getElementById('profile') as HTMLTextAreaElement).value;

    // Education Details
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const yearOfPassing = (document.getElementById('yearOfPassing') as HTMLInputElement).value;
    const institution = (document.getElementById('institution') as HTMLInputElement).value;

    // Work Experience Details
    const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const yearsWorked = (document.getElementById('yearsWorked') as HTMLInputElement).value;

    // Skills
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

    // Handle profile picture
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const profilePicture = profilePictureInput.files && profilePictureInput.files[0] 
        ? URL.createObjectURL(profilePictureInput.files[0]) 
        : '';

    // Create a data object with user input
    const resumeData: ResumeData = {
        name,
        email,
        phone,
        profile,
        degree,
        yearOfPassing,
        institution,
        jobTitle,
        company,
        yearsWorked,
        skills,
        profilePicture
    };

    // Generate the resume with the data
    generateResume(resumeData);
}

// Function to handle profile picture preview
function handleProfilePicturePreview() {
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const profilePicPreview = document.getElementById('profilePicPreview') as HTMLImageElement;

    profilePictureInput.addEventListener('change', () => {
        const file = profilePictureInput!.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePicPreview!.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
});}
