<script>
    document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submission initiated...');
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Blocked email addresses
        const blockedEmails = [
            'abc@gmail.com',
            'xyz@gmail.com',
            '123@gmail.com',
            '1234@gmail.com',
            'aarogyaaahar4@gmail.com'
            // Add more emails to block as needed
        ];
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value.replace(/\D/g, ''),
            email: document.getElementById('email').value.trim().toLowerCase(),
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            problem: document.getElementById('problem').value.toLowerCase()
        };
        
        console.log('Form data collected:', formData);
        
        // Banned words list
        const bannedWords = ['bc', 'mc', 'mdl', 'pyaar', 'pyar', 'love', 'lun'];
        // Add more words you want to block
        
        // Validation flags
        let isValid = true;
        
        // Name validation
        if (!formData.name) {
            showError('name', 'Full name is required');
            isValid = false;
            console.warn('Validation failed: Name is required');
        }
        
        // Age validation
        if (!formData.age || formData.age < 1 || formData.age > 120) {
            showError('age', 'Please enter valid age (1-120)');
            isValid = false;
            console.warn(`Validation failed: Invalid age (${formData.age})`);
        }
        
        // Phone validation (exactly 10 digits)
        if (!/^\d{10}$/.test(formData.phone)) {
            showError('phone', 'Phone must be 10 digits');
            isValid = false;
            console.warn(`Validation failed: Invalid phone (${formData.phone})`);
        }
        
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showError('email', 'Invalid email format');
            isValid = false;
            console.warn(`Validation failed: Invalid email format (${formData.email})`);
        } else if (blockedEmails.includes(formData.email)) {
            showError('email', 'This email is not allowed');
            isValid = false;
            console.warn(`Validation failed: Blocked email (${formData.email})`);
        }
        
        // Problem description validation
        const hasBannedWord = bannedWords.some(word => formData.problem.includes(word));
        if (hasBannedWord) {
            showError('problem', 'Description contains inappropriate language');
            isValid = false;
            console.warn('Validation failed: Banned word detected in problem description');
        }
        
        if (isValid) {
            console.log('All validations passed. Preparing to submit...');
            
            // Form is valid - proceed with submission
            fetch('https://formsubmit.co/ajax/your-email@example.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: 'New Patient Form Submission',
                    _template: 'table'
                })
            })
            .then(response => {
                console.log('Server response received. Status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Submission successful! Server response:', data);
                alert('Thank you! Your information has been submitted successfully.');
                document.getElementById('patientForm').reset();
            })
            .catch(error => {
                console.error('Submission failed:', error);
                alert('There was an error submitting your form. Please try again later.');
            });
        } else {
            console.log('Form submission halted due to validation errors');
        }
    });
    
    // Phone number formatting (auto-format to digits only)
    document.getElementById('phone').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
    
    // Helper function to show errors
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        field.parentNode.insertBefore(error, field.nextSibling);
        field.focus();
    }
</script>
