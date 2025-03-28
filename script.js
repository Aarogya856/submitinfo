<script>
    document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
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
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value.replace(/\D/g, '');
        const email = document.getElementById('email').value.trim().toLowerCase();
        const problem = document.getElementById('problem').value.toLowerCase();
        
        // Banned words list
        const bannedWords = ['bc', 'mdl', 'benchod', 'teri maa di', 'love you', 'love', 'pyaar'];
        // Add more words you want to block
        
        // Validation flags
        let isValid = true;
        
        // Name validation
        if (!name) {
            showError('name', 'Full name is required');
            isValid = false;
        }
        
        // Age validation
        if (!age || age < 1 || age > 120) {
            showError('age', 'Please enter valid age (1-120)');
            isValid = false;
        }
        
        // Phone validation (exactly 10 digits)
        if (!/^\d{10}$/.test(phone)) {
            showError('phone', 'Phone must be 10 digits');
            isValid = false;
        }
        
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email', 'Invalid email format');
            isValid = false;
        } else if (blockedEmails.includes(email)) {
            showError('email', 'This email is not allowed');
            isValid = false;
        }
        
        // Problem description validation
        const hasBannedWord = bannedWords.some(word => problem.includes(word));
        if (hasBannedWord) {
            showError('problem', 'Description contains inappropriate language');
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid - proceed with submission
            alert('Form submitted successfully!');
            document.getElementById('patientForm').reset();
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
