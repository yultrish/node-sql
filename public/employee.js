window.addEventListener('load', () => {
    console.log('js is working')
    const createEmployeeButton = document.querySelector('.create-employee');
    createEmployeeButton.addEventListener('click', async(e)=>{
        e.preventDefault()
         const nameInput = document.querySelector('#name');
         const emailInput = document.querySelector('#email');
        const jobTitleInput = document.querySelector('#title');
         const error = document.querySelector('.error');
                const message = document.querySelector('.error-message');
                console.log(message)
        console.log('btn')
        
            result = await fetch('http://localhost:7070/api/employee',{
                    method: 'POST',
                    headers : {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailInput.value,
                        name: nameInput.value,
                         job_title: jobTitleInput.value
                    })
                   }) 
                   console.log(result)
            if (result.status !=201){
                res = await result.json()
                console.log(res)
                 error.style.display = "block"
                message.textContent = res.error || res.message

                 setTimeout(() => {
                error.remove();
            }, 3000);

            return
               
            } else{
                res = await result.json()
                alert(res.message)
            }   
            
            window.location.href = './dashboard.html'
  
    })

});






