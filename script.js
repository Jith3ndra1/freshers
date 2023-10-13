function generateInvitation() {
    const ticketCode = document.getElementById('ticketCode').value;
    const invitationContainer = document.getElementById('invitationContainer');
    const invitationContent = document.getElementById('invitationContent');

    // Clear previous content
    invitationContent.innerHTML = '';

    // Generate invitation content based on the ticket code
    const ticketDiv = document.createElement('div');
    ticketDiv.classList.add('ticket');

    // Adding an image to the ticket content
    const image = document.createElement('img');

    // Convert the image to a Data URL
    const imageSrc = 'FReShers PARTY (1)_page-0001.jpg';
    const imageDataUrl = getImageDataUrl(imageSrc);
    
    image.src = imageDataUrl;
    image.alt = 'Invitation Image Template';
    ticketDiv.appendChild(image);

    // Adding text to the ticket content
    const text = document.createElement('p');
    text.style.color = 'blue';  // Modify the color as needed
    text.textContent = `Invitation Ticket for ${ticketCode}`;
    ticketDiv.appendChild(text);

    invitationContent.appendChild(ticketDiv);

    // Show the invitation container
    invitationContainer.classList.remove('hidden');
}

function getImageDataUrl(imagePath) {
    // Read the image as a Data URL
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imagePath, false);
    xhr.responseType = 'blob';
    xhr.send();

    if (xhr.status === 200) {
        const blob = xhr.response;
        const reader = new FileReader();
        
        return new Promise((resolve) => {
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    } else {
        console.error('Failed to load image:', xhr.status, xhr.statusText);
        return null;
    }
}

function downloadPDF() {
    const invitationContainer = document.getElementById('invitationContainer');

    // Convert the entire HTML content inside invitationContainer to PDF
    html2pdf().from(invitationContainer).outputPdf().then(pdfBlob => {
        // Create a new Blob without the "Download PDF" button
        const modifiedPdfBlob = new Blob([pdfBlob], { type: 'application/pdf' });

        // Create a download link and trigger the download
        const downloadLink = document.createElement('a');
        const url = URL.createObjectURL(modifiedPdfBlob);
        downloadLink.href = url;
        downloadLink.download = 'invitation_ticket.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Release the object URL
        URL.revokeObjectURL(url);
    });
}
