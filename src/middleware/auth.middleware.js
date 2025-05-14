import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { getDb } from '../config/dbConnect.js';

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized access' });
  }

  // Verify Token
  jwt.verify(token, config.cookie.accessTokenSecret, (error, decoded) => {
    if (error) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    req.user = decoded;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  const email = req?.user?.email;
  if (!email) {
    return res.status(401).send({ error: 'Unauthorized access' });
  }

  try {
    const db = getDb();
    const usersCollection = db.collection('Users');
    const user = await usersCollection.findOne({ email });
    const isAdmin = user?.role === 'admin';

    if (!user || !isAdmin) {
      return res
        .status(403)
        .send({ message: 'Forbidden access. Only admins have access!' });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .send({ error: 'Server error', details: err.message });
  }
};

export { verifyAdmin, verifyToken };
