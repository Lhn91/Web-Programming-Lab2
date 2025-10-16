// Đợi cho toàn bộ nội dung HTML được tải xong rồi mới chạy Javascript
document.addEventListener('DOMContentLoaded', function() {

    // 1. Lấy các phần tử HTML cần tương tác
    const inputSoA = document.getElementById('soA');
    const inputSoB = document.getElementById('soB');
    const divKetQua = document.getElementById('ketQua');
    
    // Lấy tất cả các nút có thuộc tính 'data-op'
    const buttons = document.querySelectorAll('button[data-op]');

    // 2. Gán sự kiện 'click' cho tất cả các nút phép tính
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Lấy loại phép tính từ thuộc tính 'data-op' của nút được nhấn
            const operation = this.getAttribute('data-op');
            
            // Gọi hàm xử lý tính toán
            calculate(operation);
        });
    });

    // 3. Hàm xử lý chính
    function calculate(op) {
        // Lấy giá trị từ input và chuyển đổi sang dạng số (float)
        const a = parseFloat(inputSoA.value);
        const b = parseFloat(inputSoB.value);

        // 4. Kiểm tra dữ liệu đầu vào (Validation)
        // isNaN() kiểm tra xem giá trị có phải là "Not a Number" hay không
        if (isNaN(a) || isNaN(b)) {
            showError("Vui lòng nhập đầy đủ và đúng định dạng số!");
            return; // Dừng hàm nếu dữ liệu không hợp lệ
        }

        // Kiểm tra chia cho 0
        if (op === 'divide' && b === 0) {
            showError("Lỗi: Không thể chia cho 0!");
            return; // Dừng hàm
        }

        // 5. Thực hiện tính toán
        let result = 0;
        let symbol = '';

        switch (op) {
            case 'add':
                result = a + b;
                symbol = '+';
                break;
            case 'subtract':
                result = a - b;
                symbol = '-';
                break;
            case 'multiply':
                result = a * b;
                symbol = '*';
                break;
            case 'divide':
                result = a / b;
                symbol = '/';
                break;
            case 'power':
                result = Math.pow(a, b); // Hoặc có thể dùng a ** b
                symbol = '^';
                break;
            default:
                showError("Phép tính không hợp lệ!");
                return;
        }

        // 6. Xuất kết quả
        showResult(`Kết quả: ${a} ${symbol} ${b} = <strong>${result}</strong>`);
    }

    // Hàm trợ giúp để hiển thị kết quả thành công
    function showResult(message) {
        divKetQua.innerHTML = message;
        divKetQua.className = 'alert alert-success mt-4'; // Đổi màu nền thành công
    }

    // Hàm trợ giúp để hiển thị lỗi
    function showError(message) {
        divKetQua.innerHTML = message;
        divKetQua.className = 'alert alert-danger mt-4'; // Đổi màu nền báo lỗi
    }
});