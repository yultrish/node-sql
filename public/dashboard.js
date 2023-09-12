

window.addEventListener('load', () => {

    console.log('variable.js is working');

    const switched = document.querySelector('.content .header .switch');
    
    switched.addEventListener('click', function(e) {
        e.preventDefault();

        document.body.classList.toggle('theme-dark');
    });

    setInterval(() => {
    const width = window.innerWidth;
    if(width <= 480) {
        console.log('width is less than 480');
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('sidebar-short');
    }
    }, 4000);

    const showBtn = document.querySelector('.show span');
    const sidebar = document.querySelector('.sidebar');

    showBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.remove('sidebar-short');
        sidebar.classList.toggle('sidebar-full');
    });

    //employess
   
     async function getAllEmployees() {
        const result = await fetch('http://localhost:7070/api/employees')
        console.log(result)
        const response = await result.json();
        console.log(response); //Fetch ends here
        const tbody = document.querySelector('.users-tbody')
        users = ''
        response.forEach(res=>{
        users += `
                 <tr>
                        <td scope="row">${res.name}</td>
                        <td>${res.email}</td>
                        <td>${res.job_title}</td>
                        <td> <div class="action">
                         <span class="material-symbols-outlined edit" id=${res.id}>
                            edit
                          </span>
                          <span class="material-symbols-outlined delete" id=${res.id}>
                            delete
                          </span>
                        </div></td>
                    </tr>
        `
        tbody.innerHTML = users
        tbody.classList.add('item')
        })
        const deleteBtn = document.querySelectorAll('.delete') 
        console.log(deleteBtn) 
        deleteBtn.forEach(btn=>{
            console.log(btn)
            btn.addEventListener('click', async(e)=>{
            e.preventDefault()
            console.log(btn.id)
            const btnId = btn.id
            confirmed = confirm(`Are you sure you want to delete with id ${btnId}?`)
            if (confirmed === true) {
                   const result = await fetch(`http://localhost:7070/api/employee/${btnId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }); 
                        console.log(result)
                    if(result.status === 200 || result.status === 201){
                        res = await result.json()
                        console.log(res)
                    btn.classList.add('transition');
            // Listen for the 'transitionend' event and remove the row after the transition is complete
            
                            //   const employeeElement = e.target.parentElement;
                      // CSS class to trigger the fading-out effect
                           newRow.classList.add('item-deleting-transition');

                        // Wait for the transition to complete and then remove the row
                        newRow.addEventListener('transitionend', () => {
                            newRow.remove();
                            console.log('Employee deleted successfully');
                        });
                        alert('deleted successfully')
                        return
                    }
            }
            })
        })
        
       const editBtn = document.querySelectorAll('.edit');
console.log(editBtn);
editBtn.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        console.log('edit');
        const btnId = btn.id;
        const confirmed = confirm(`Are you sure you want to edit employee with id ${btnId}`);
        if (confirmed === true) {
            try {
                const editResult = await fetch(`http://localhost:7070/api/employee/${btnId}`);
                if (editResult != 200 || 201) {
                 const   response = await editResult.json();
                }else{
                      response = await editResult.json();
                console.log(response);
                }
               

                // Redirect to the edit page
                window.location.href = `./update.html?id=${response.id}&name=${response.name}&email=${response.email}&job_title=${response.job_title}`;
            } catch (error) {
                console.error('Error editing employee:', error);
            }
        }
    });
});



    }
    getAllEmployees()

   
});

