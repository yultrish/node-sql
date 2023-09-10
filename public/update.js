console.log('update.js is working fine')
const params = new URLSearchParams(window.location.search);

window.addEventListener('load', () => {

    
    if(params.has("name")){
        const employeeName = document.querySelector('input.name');
        const employeeEmail= document.querySelector('input.email');
        const employeeTitle = document.querySelector('input.title');
        
       
        //put response into the form input
        employeeName.value = params.get('name');
        employeeEmail.value = params.get('email');
        employeeTitle.value = params.get('job_title');   
    }

    const btnUpdate = document.querySelector('.update-btn')
    
    btnUpdate.addEventListener('click', async (e) => {
    e.preventDefault();
    

    const employeeName = document.querySelector('input.name')
    const email = document.querySelector('input.email')
    const employeeTitle = document.querySelector('input.email')
    

    let btnId = params.get('id');
    
    const result = await fetch(`http://localhost:7070/api/employee/${btnId}`,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: employeeName.value,
            email: employeeEmail.value,
            job_title: employeeTitle.value,
           
        })
     })

     const res = await result.json();

     if(result.status == 200 || result.status == 201){
        alert('profile updated successfully..!')
        setTimeout(()=>{
            window.location.href = './dashboard.html'
        }, 1500)
    }


    })
    
    
    
})

