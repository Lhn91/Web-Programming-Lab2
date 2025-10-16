document.addEventListener('DOMContentLoaded', function() {
    
    // --- POPULATE DATE DROPDOWNS ---
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    
    daySelect.innerHTML = '<option value="">Ngày</option>';
    for (let i = 1; i <= 31; i++) {
        daySelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    monthSelect.innerHTML = '<option value="">Tháng</option>';
    for (let i = 1; i <= 12; i++) {
        monthSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    yearSelect.innerHTML = '<option value="">Năm</option>';
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
        yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
    
    // --- FORM VALIDATION ---
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(event) {
        // Ngăn form submit theo cách mặc định
        event.preventDefault();
        
        // Gọi hàm kiểm tra tổng
        if (validateForm()) {
            alert('Complete!');
            // Tại đây bạn có thể thêm logic để gửi dữ liệu đi, ví dụ: form.submit();
        }
    });

    function validateForm() {
        let isValid = true;
        // Reset tất cả lỗi trước khi kiểm tra
        clearAllErrors();

        // 1. First Name
        isValid &= validateTextField('firstName', 'firstNameError', 2, 30, 'First Name');
        // 2. Last Name
        isValid &= validateTextField('lastName', 'lastNameError', 2, 30, 'Last Name');
        // 3. Email
        isValid &= validateEmail('email', 'emailError');
        // 4. Password
        isValid &= validateTextField('password', 'passwordError', 2, 30, 'Password');
        // 5. Birthday
        isValid &= validateSelect('day', 'dayError', 'Ngày');
        isValid &= validateSelect('month', 'monthError', 'Tháng');
        isValid &= validateSelect('year', 'yearError', 'Năm');
        // 6. Gender
        isValid &= validateRadio('gender', 'genderError', 'Gender');
        // 7. Country
        isValid &= validateSelect('country', 'countryError', 'Country');
        // 8. About
        isValid &= validateTextarea('about', 'aboutError', 10000, 'About');
        // 9. Terms
        isValid &= validateCheckbox('terms', 'termsError', 'Điều khoản');
        
        return !!isValid; // Chuyển đổi kết quả (0 hoặc 1) thành boolean (false hoặc true)
    }

    // --- HELPER FUNCTIONS ---

    function validateTextField(inputId, errorId, min, max, fieldName) {
        const input = document.getElementById(inputId);
        const value = input.value.trim();
        if (value.length < min || value.length > max) {
            showError(errorId, `${fieldName} phải có từ ${min} đến ${max} kí tự.`);
            input.classList.add('is-invalid');
            return false;
        }
        input.classList.remove('is-invalid');
        return true;
    }

    function validateEmail(inputId, errorId) {
        const input = document.getElementById(inputId);
        const value = input.value.trim();
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(value)) {
            showError(errorId, 'Email không hợp lệ. Vui lòng nhập đúng định dạng (e.g., ten@email.com).');
            input.classList.add('is-invalid');
            return false;
        }
        input.classList.remove('is-invalid');
        return true;
    }

    function validateSelect(selectId, errorId, fieldName) {
        const select = document.getElementById(selectId);
        if (select.value === "") {
            showError(errorId, `Vui lòng chọn ${fieldName}.`);
            select.classList.add('is-invalid');
            return false;
        }
        select.classList.remove('is-invalid');
        return true;
    }
    
    function validateRadio(radioName, errorId, fieldName) {
        const radio = document.querySelector(`input[name="${radioName}"]:checked`);
        if (!radio) {
            showError(errorId, `Vui lòng chọn ${fieldName}.`);
            return false;
        }
        return true;
    }
    
    function validateTextarea(textareaId, errorId, max, fieldName) {
        const textarea = document.getElementById(textareaId);
        const value = textarea.value.trim();
        if (value.length > max) {
            showError(errorId, `${fieldName} không được vượt quá ${max} kí tự.`);
            textarea.classList.add('is-invalid');
            return false;
        }
        textarea.classList.remove('is-invalid');
        return true;
    }

    function validateCheckbox(checkboxId, errorId, fieldName) {
        const checkbox = document.getElementById(checkboxId);
        if (!checkbox.checked) {
            showError(errorId, `Bạn phải đồng ý với ${fieldName}.`);
            checkbox.classList.add('is-invalid');
            return false;
        }
        checkbox.classList.remove('is-invalid');
        return true;
    }

    function showError(errorId, message) {
        const errorDiv = document.getElementById(errorId);
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    function clearAllErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });

        const invalidInputs = document.querySelectorAll('.is-invalid');
        invalidInputs.forEach(el => el.classList.remove('is-invalid'));
    }
});