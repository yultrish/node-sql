const router = require('express').Router();
const knex = require('./config/db')

//create new item
router.post('/items', async (req, res) => {
  try {

    const item = req.body.item;

    if (!item) {
      return res.status(400).json({ error: 'item is required' });
    } else {
      const itemId = await knex('todo').insert({
        item: req.body.item
      });
      const currentItem = await knex('todo').where({ item }).first();
      return res.status(201).json(currentItem);
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'failed to add item' });
  }
});

// get all items
router.get('/allItems', async (req, res) => {
  try {
    const allItems = await knex('todo').select('*');
    return res.json(allItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

// get all users
router.get('/allUsers', async (req, res) => {
  try {
    const allusers = await knex('users').select('*');
    return res.json(allusers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//register new user
router.post('/user', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).json({ error: 'email is required' });
    }

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }
    if (!password) {
      return res.status(400).json({ error: 'password is required' });
    }

    //check if email is already used
    const user = await knex('users').where({ email }).first();

    if (user) {
      res.status(409).json({ message: 'email already exist' });
    } else {
      const userId = await knex('users').insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const user = await knex('users').where({ email }).first();
      const token = {
        tokenKey: "7-11ee-be56-0242ac120002 ",
        user
      }
      return res.status(201).json(token);
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'failed to register user' });
  }
});

//login user
router.post('/login', async (req, res) => {
  try {
    //deconstructing email from request body
    const { email } = req.body;
    const { password } = req.body;

    // Query the database to find a user by email and password
    const user = await knex('users').where({ email }).first();
    const userPassword = await knex('users').where({ password }).first();

    if (user && userPassword) {
      // User found, send it as a response
      res.status(200).json(user);
    } else {
      // User not found
      res.status(404).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await knex('employees').select('*');
    return res.json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

// get a single employee by id
router.get('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await knex('employees').where({ id }).first();

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    return res.json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//create new employee
router.post('/employee', async (req, res) => {
  try {

    //deconstruct req body object
    const { email, name, job_title } = req.body;
    //check if all fields were filled
    if (email == "" || email == null || name == "" || name == null || job_title == "" || job_title == null) {
      return res.status(400).json({ error: 'all fields are required' });
    }

    //check if email is already used
    const employee = await knex('employees').where({ email }).first();

    if (employee) {
      res.status(409).json({ message: 'email already exist' });
    } else {
      const employeeId = await knex('employees').insert({
        name: req.body.name,
        email: req.body.email,
        job_title: req.body.job_title,
      });
      const currentEmployee = await knex('employees').where({ email }).first();
      return res.status(201).json(currentEmployee);
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'failed to create employee' });
  }
});

// Update a employee by ID  patch http://localhost:7070/api/employee/1
router.patch('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = req.body; // Assuming you send updated user data in the request body

    // Update the employee in the database
    const result = await knex('employees').where({ id }).update(updatedEmployee);

    if (result) {
      // employee updated successfully
      res.status(200).json({ message: 'employee updated successfully' });
    } else {
      // employee not found
      res.status(404).json({ message: 'employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a employee by ID
router.delete('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the user from the database
    const result = await knex('employees').where({ id }).del();

    if (result) {
      // employee deleted successfully
      res.status(200).json({ message: 'employee deleted successfully' });
    } else {
      // employee not found
      res.status(404).json({ message: 'employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






module.exports = router;