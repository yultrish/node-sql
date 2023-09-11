console.log('update.js is working fine')
const params = new URLSearchParams(window.location.search);

window.addEventListener('load', () => {
    if (params.has("name")) {
        const employeeName = document.querySelector('input.name');
        const employeeEmail = document.querySelector('input.email');
        const employeeTitle = document.querySelector('input.title');

        // Put response into the form input
        employeeName.value = params.get('name');
        employeeEmail.value = params.get('email');
        employeeTitle.value = params.get('job_title');
    }

    const btnUpdate = document.querySelector('.update-btn')

    btnUpdate.addEventListener('click', async (e) => {
        e.preventDefault();

        const name = document.querySelector('input.name')
        const employeeEmail = document.querySelector('input.email')
        const employeeTitle = document.querySelector('input.title')

        let btnId = params.get('id');

        try {
            const result = await fetch(`http://localhost:7070/api/employee/${btnId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: employeeName.value,
                    email: employeeEmail.value,
                    job_title: employeeTitle.value,
                })
            });
            
            console.log(result);

            if (result.status == 200 || result.status == 201) {
                const res = await result.json();
                console.log(res);
                alert('Profile updated successfully..!');
                setTimeout(() => {
                    window.location.href = './dashboard.html';
                }, 1500);
            } else {
                // Handle errors when the API request does not return a success status code
                console.error('Failed to update profile');
                alert('Profile update failed. Please try again later.');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error updating profile:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});





