import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const createToken = async (req, res) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, config.cookie.tokenSecret, {
      expiresIn: '1d',
    });

    res
      .cookie(config.cookie.tokenName, token, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: config.nodeEnv === 'production' ? 'none' : 'strict',
      })
      .send({ success: true });
  } catch (err) {
    console.error('JWT:', err.message);
    res.status(500).send({ error: 'Failed to create jwt token' });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie(config.cookie.tokenName, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: config.nodeEnv === 'production' ? 'none' : 'strict',
      })
      .send({ success: true });
  } catch (err) {
    console.error('Logout:', err.message);
    res.status(500).send({ error: 'Failed to logout' });
  }
};
