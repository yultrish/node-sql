window.addEventListener('load',async (e) => {
    e.preventDefault();

            //get available items
        const allItems = await fetch(' http://localhost:7070/todo/allItems')
        const items = await allItems.json();

        //items is an array
        items.forEach(itm => {
            const container = document.querySelector('.to-do-container');
            const item = document.createElement('div')
            item.classList.add('item')
            item.id = itm.id
            item.innerHTML += `
            <h2> ${itm.name}</h2>
            <span class="material-symbols-outlined delete" id="${itm.id}">delete</span>
            `
            container.appendChild(item)
        })

    const addItem = document.querySelector('.add-item span')

    addItem.addEventListener('click', async (e) => {
        e.preventDefault();




        try{
        const item = document.querySelector('.add-item input').value;
        if(item === "" || item == null){
            alert("please enter to do list item")
            return;
        }
        //code 
        document.querySelector('.add-item input').value = '';

     
        const url = 'http://localhost:7070/todo/items'
        const postData ={
            name: item
        }
        const result = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(postData) // Convert user data to JSON string
  
           })
      
        if(result.status == 200 || result.status == 201){
            const response = await result.json();
            console.log(response)
            const item = document.createElement('div')
            item.classList.add('item')
            item.id = response.id
            item.innerHTML += `
            <h2> ${response.name}</h2>
            <span class="material-symbols-outlined delete"id="${response.id}>delete</span>
            `
           const itemContainer = document.querySelector('.to-do-container') 
           itemContainer.appendChild(item)
        }

   
        }catch(err){
            console.error(err)
        }
       

     
    
    })
   
    
    
   const deleteBtn = document.querySelectorAll('span')
   deleteBtn.forEach(btn=>{
    btn.addEventListener('click', async(id)=>{
        console.log('hi')
        console.log(btn.id)
        let confirmed = confirm('arae you sure you want to delete '+ btn.id)
        if(confirmed===true){
            try {
                 const itemToDelete = document.getElementById(btn.id);
                    itemToDelete.classList.add('user-deleting-transition');
                result = await fetch(`http://localhost:7070/todo/item/${btn.id}`,{
                 method: 'DELETE',
                 headers: {
                    'Content-Type': 'application/json'
                 }
                })
                console.log(result)
                if (result.status===200||result.status===201){
                        console.log('item deleted successfully');
                         itemToDelete.addEventListener('transitionend', () => {
                                    itemToDelete.remove();
                                });
                return true;
            } else {
                console.log('Failed to delete user');
                return false;
            }
            
        
            } catch (error) {
                return false;
            }
        }
    })
   })

 




})