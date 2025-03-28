document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form validation
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!name || !age || !phone || !email) {
        alert('Please fill all required fields');
        return;
    }
    
    if (isNaN(age) || age < 1 || age > 120) {
        alert('Please enter a valid age between 1 and 120');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // If validation passes, collect all data
    const formData = {
        name: name,
        age: age,
        phone: phone,
        email: email,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        problem: document.getElementById('problem').value.trim()
    };
    
    // Send data to server (we'll use FormSubmit.co as a simple solution)
    fetch('https://formsubmit.co/aarogyaaahar4@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            age: formData.age,
            phone: formData.phone,
            email: formData.email,
            height: formData.height,
            weight: formData.weight,
            problem: formData.problem,
            _subject: 'New Patient Consultation Request',
            _template: 'table'
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you! Your information has been submitted successfully.');
        document.getElementById('patientForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again later.');
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Simple phone validation - adjust as needed
    const re = /^[\d\s\-\(\)]{10,}$/;
    return re.test(phone);
}
