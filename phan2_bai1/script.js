document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function addTask(){
        const taskText = taskInput.value.trim();
        if(taskText ===''){
            alert('Vui lòng nhập công việc');
            return;
        }
        const li = document.createElement('li');
        li.textContent = taskText;
        li.className = 'list-group-item';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Xóa';

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = '';
        taskInput.focus();
    }
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        // Kiểm tra nếu phím được nhấn là "Enter"
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (event) => {
        
        // --- Xử lý chức năng Xóa Công Việc ---
        // Kiểm tra xem phần tử được click có phải là nút "Xóa" không
        if (event.target.tagName === 'BUTTON') {
            
            // Dùng event.stopPropagation() để ngăn sự kiện click lan ra thẻ <li> cha
            // Nếu không có dòng này, khi bấm nút Xóa, nó sẽ vừa Xóa, vừa gạch ngang công việc.
            event.stopPropagation();
            
            // Lấy phần tử <li> cha của nút "Xóa"
            const taskItem = event.target.parentElement;
            
            // Dùng element.remove() để xóa công việc khỏi DOM
            taskItem.remove();
        }
        
        // --- Xử lý chức năng Đánh Dấu Hoàn Thành ---
        // Kiểm tra xem phần tử được click có phải là một công việc (thẻ <li>) không
        else if (event.target.tagName === 'LI') {
            
            // Dùng classList.toggle('completed') để thêm/xóa class 'completed'
            // Giúp thay đổi trạng thái (gạch ngang / bình thường) mỗi khi click
            event.target.classList.toggle('completed');
        }
    });
});