
window.addEventListener('load', () => {
    const addItemBtn = document.getElementById('addItemBtn');
    const itemInput = document.getElementById('itemInput');
    const toDoContainer = document.querySelector('.to-do-container');

    // Function to create a new to-do item on the client side
    const createToDoItem = (item) => {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <h2>${item.item}</h2>
            <span class="material-symbols-outlined delete" data-id="${item.id}">delete</span>
        `;
        toDoContainer.appendChild(newItem);

        // event listener for the delete button
        newItem.querySelector('.delete').addEventListener('click', async (e) => {
            const itemId = e.target.getAttribute('data-id');
            const confirmed = confirm(`Are you sure you want to delete item ${itemId}?`);

            if (confirmed) {
                try {
                    

                    const result = await fetch(`http://localhost:7070/todo/item/${itemId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });


                    if (result.status === 200) {
                        // Remove the item from the client side
                  
                     const itemElement = e.target.parentElement;
                      // CSS class to trigger the fading-out effect
                    itemElement.classList.add('item-deleting-transition');

            // Wait for the transition to complete and then remove the item
            itemElement.addEventListener('transitionend', () => {
                itemElement.remove();
                console.log('Item deleted successfully');
            });   
                     
                    } else {
                        console.log('Failed to delete item');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    // Event listener for adding a new to-do item
    addItemBtn.addEventListener('click', async () => {
        const newItemName = itemInput.value.trim();

        if (newItemName === "") {
            alert("Please enter a to-do list item");
            return;
        }

        try {
            const response = await fetch('http://localhost:7070/todo/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item: newItemName }) // Send the item as an object
            });

            if (response.status === 201) {
                const newItemData = await response.json();
                createToDoItem(newItemData); // Create the new item on the client side
                itemInput.value = ''; // Clear the input field
            } else {
                console.log('Failed to add item');
            }
        } catch (error) {
            console.error(error);
        }
    });

    // Fetch and display existing to-do items on page load
    const fetchAndDisplayItems = async () => {
        try {
            const response = await fetch('http://localhost:7070/todo/allItems');
            if (response.status === 200) {
                const items = await response.json();
                console.log(items)
                items.forEach((item) => {
                    createToDoItem(item);
                });
            } else {
                console.log('Failed to fetch items');
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchAndDisplayItems();
});






