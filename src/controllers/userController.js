import client from '../config/dbConnect.js';

const usersCollection = client.db('bd_name').collection('users');

export const createUser = async (req, res) => {
  try {
    const userData = req.body;

    // Check if user already exists
    const isExist = await usersCollection.findOne({ email: userData.email });

    if (isExist) {
      return res.send(isExist);
    }

    // Create new user
    const result = await usersCollection.insertOne(userData);

    // Email notification functionality can be added here if needed

    res.send(result);
  } catch (error) {
    console.error('Post User:', error.message);
    res.status(500).send({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const userData = req.body;

    const updateDoc = {
      $set: {
        displayName: userData?.displayName,
        photoURL: userData?.photoURL,
      },
    };

    const result = await usersCollection.updateOne({ email }, updateDoc);
    res.send(result);
  } catch (error) {
    console.error('Update User:', error.message);
    res.status(500).send({ error: 'Failed to update user' });
  }
};

export const getUserRole = async (req, res) => {
  try {
    const email = req.params.email;

    if (req?.user?.email !== email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }

    const result = await usersCollection.findOne({ email });

    res.send({ role: result?.role });
  } catch (error) {
    console.error('Check Role:', error.message);
    res.status(500).send({ error: 'Failed to check role' });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  } catch (error) {
    console.error('Get User:', error.message);
    res.status(500).send({ error: 'Failed to get user' });
  }
};
