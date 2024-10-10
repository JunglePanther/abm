document.addEventListener('DOMContentLoaded', function() {
    loadUsers();

    document.getElementById('data-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email})
        })
        .then(response => response.json())
        .then(data => {
            console.log('User added with ID:', data.id);
            loadUsers();
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
    });
});

function loadUsers() {
    fetch('/users')
    .then(response => response.json())
    .then(users => {
        const dataList = document.getElementById('data-list');
        dataList.innerHTML = '';
        users.forEach(user => {
            const div = document.createElement('div');
            div.textContent = `${user.name} - ${user.email}`;

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Editar';
            updateButton.onclick = () => {
                console.log(`Edit user ID: ${user.id}`);
                updateUser(user.id);
            };
            div.appendChild(updateButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => {
                console.log(`Delete user ID: ${user.id}`);
                deleteUser(user.id);
            };
            div.appendChild(deleteButton);

            dataList.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Error loading users:', error);
    });
}

function updateUser(id) {
    const name = prompt("Nuevo nombre:");
    const email = prompt("Nuevo email:");
    
    if (!name || !email) {
        console.error('El nombre o email no pueden estar vacíos');
        return;
    }

    fetch(`/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, email: email})
    })
    .then(response => response.json())
    .then(data => {
        console.log('User updated with ID:', data.id);
        loadUsers();
    })
    .catch(error => {
        console.error('Error updating user:', error);
    });
}

function deleteUser(id) {
    console.log(`Deleting user with ID: ${id}`);
    
    fetch(`/delete/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('User deleted with ID:', data.id);
        loadUsers();
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
}
