

// Event listener for the Download PDF button
declare var html2pdf: any;


if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
        // Your PDF generation logic here
        const resumeElement = document.getElementById('resume') as HTMLElement;
        const opt = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(resumeElement).save();
    });
}
