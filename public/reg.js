// const json = require("body-parser/lib/types/json")
// const { header } = require("express/lib/response")

window.addEventListener('load', ()=>{
    const signUp = document.querySelector('.sign-up')
    console.log(signUp)
    signUp.addEventListener('click', async(e)=>{
      e.preventDefault()
      Username = document.querySelector('#name')
      email = document.querySelector('#email')
      password = document.querySelector('#password')
      passwordConfirm = document.querySelector('#password_confirm')
      error = document.querySelector('.error')
      errorMessage = document.querySelector('.error-message')
      

    //   postData = {
    //     name: Username,
    //     password: password, 
    //     email: email
    //   }

      if (password.value != passwordConfirm.value) {
           error.style.display = 'block'
            errorMessage.textContent = 'Passwords do not match';
            console.log(password)
            console.log(passwordConfirm)
            console.log('wrong')
            return; 
      }

      try {
        result = await fetch(`http://localhost:7070/api/user`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                name: Username.value,
                password: password.value,
                email: email.value
            }) 
        })
        console.log(result)
        
        if (result.status != 200 || result.status != 201){
          res = await result.json()
          console.log(res)
          // error.style.display = 'block'
          // error.classlist.add('item')
          // errorMessage.textContent = res.message

              setTimeout(() => {
                error.remove();
            }, 3000)
          
        window.location.href = './dashboard.html'
        
        }

      
      } catch (error) {
        console.log(error)
      }

    })

  })