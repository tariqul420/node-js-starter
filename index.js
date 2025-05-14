const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
// const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Send mail using node mailer
// const sendEmail = (emailAddress, emailData) => {
//     // create email transporter
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.NODEMAILER_USER,
//             pass: process.env.NODEMAILER_PASS,
//         }
//     })

//     // Verify connection
//     transporter.verify((error, success) => {
//         if (error) {
//             return console.error(error)
//         } else {
//             console.log('Transporter is ready to emails.', success)
//         };
//     })

//     // create mail body
//     const mailBody = {
//         form: process.env.NODEMAILER_USER,
//         to: emailAddress,
//         subject: emailData?.subject,
//         html: emailData?.message,
//     }

//     // send email
//     transporter.sendMail(mailBody, (error, info) => {
//         if (error) {
//             return console.error(error)
//         } else {
//             console.log('Email Sent: ' + info?.response)
//         }
//     })
// }

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@tariqul-islam.mkjrj.mongodb.net/?retryWrites=true&w=majority&appName=TARIQUL-ISLAM`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    console.log('☘️  You successfully connected to MongoDB!');

    // Database Collection Name
    const db = client.db('DatabaseName');
    const usersCollection = db.collection('Users');

    // Verify Jwt Token
    const verifyToken = async (req, res, next) => {
      const token = req.cookies.TokenName;
      if (!token) return res.status(401).send({ error: 'unauthorized access' });

      // Verify Token
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(401).send({ error: 'unauthorized access' });

        req.user = decoded;
        next();
      });
    };

    // verify Admin
    const verifyAdmin = async (req, res, next) => {
      const email = req?.user?.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!user || !isAdmin) {
        return res.status(403).send({ message: 'forbidden access. || only access admin!' });
      }
      next();
    };

    // Create Jwt Token
    app.post('/jwt', async (req, res) => {
      try {
        const userInfo = req.body;
        const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        res
          .cookie('TokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true });
      } catch (err) {
        console.error('JWT:', err.message);
        res.status(500).send({ error: 'Failed to create jwt token' });
      }
    });

    //logout when not access jwt token
    app.post('/logout', async (req, res) => {
      try {
        res
          .clearCookie('ServiceOrbit_Token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true });
      } catch (error) {
        console.error('Logout:', err.message);
        res.status(500).send({ error: 'Failed to logout when not access jwt token' });
      }
    });

    // post single user in the database
    app.post('/users', async (req, res) => {
      try {
        const user = req.body;

        const isExist = await usersCollection.findOne({ email: user?.email });

        if (isExist) {
          return res.send(isExist);
        }

        const result = await usersCollection.insertOne(user);

        // send email when first login
        // if (result?.insertedId) {
        //   sendEmail(user?.email, {
        //     subject: 'Welcome to [Your Website Name]!',
        //     message: `
        //                 <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f3f4f6; padding: 20px;">
        //                 <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        //                     <!-- Header -->
        //                     <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
        //                     <h1 style="margin: 0; font-size: 24px;">Welcome to [Your Website Name]!</h1>
        //                     </div>

        //                     <!-- Body -->
        //                     <div style="padding: 20px; color: #333;">
        //                     <p style="font-size: 16px; margin-bottom: 20px;">Hi ${user.name},</p>
        //                     <p style="font-size: 16px; margin-bottom: 20px;">
        //                         Thank you for joining [Your Website Name]! We are delighted to have you on board and are excited to help you make the most of your experience.
        //                     </p>
        //                     <p style="font-size: 16px; font-weight: bold; margin-bottom: 20px;">Here’s how to get started:</p>
        //                     <ol style="font-size: 16px; color: #333; padding-left: 20px;">
        //                         <li style="margin-bottom: 10px;">
        //                         <strong style="color: #007bff;">Explore:</strong> Discover features and services tailored just for you.
        //                         </li>
        //                         <li style="margin-bottom: 10px;">
        //                         <strong style="color: #007bff;">Update Your Profile:</strong> Personalize your experience by updating your profile
        //                         <a href="[Profile Link]" style="color: #007bff; text-decoration: none;">here</a>.
        //                         </li>
        //                         <li style="margin-bottom: 10px;">
        //                         <strong style="color: #007bff;">Get Support:</strong> Need help? Visit our
        //                         <a href="[Support Link]" style="color: #007bff; text-decoration: none;">Support Center</a>.
        //                         </li>
        //                     </ol>
        //                     <p style="font-size: 16px; margin-bottom: 20px;">
        //                         If you have any questions or need assistance, feel free to reply to this email or reach out to us at
        //                         <a href="mailto:[Support Email]" style="color: #007bff; text-decoration: none;">[Support Email]</a>.
        //                     </p>
        //                     <p style="font-size: 16px; margin-bottom: 20px;">We’re here to help you succeed!</p>
        //                     <p style="font-size: 16px; margin-top: 30px;">Best regards,</p>
        //                     <p style="font-size: 16px; font-weight: bold;">The [Your Website Name] Team</p>
        //                     </div>

        //                     <!-- Footer -->
        //                     <div style="background-color: #f9f9f9; padding: 10px 20px; text-align: center; font-size: 12px; color: #777;">
        //                     <p style="margin: 0;">If you didn’t sign up for this account, please ignore this email or contact us at
        //                         <a href="mailto:[Support Email]" style="color: #007bff; text-decoration: none;">[Support Email]</a>.
        //                     </p>
        //                     <p style="margin: 10px 0;">&copy; ${new Date().getFullYear()} [Your Website Name]. All rights reserved.</p>
        //                     </div>
        //                 </div>
        //                 </div>
        //                 `,
        //   });
        // }

        res.send(result);
      } catch (error) {
        console.error('Post User:', error.message);
        res.status(500).send({ error: 'Failed to post user' });
      }
    });

    // Update User
    app.patch('/users/:email', async (req, res) => {
      const email = req.params.email;
      const userData = req.body;

      const updateDoc = {
        $set: {
          displayName: userData?.displayName,
          photoURL: userData?.photoUrl,
        },
      };

      const result = await usersCollection.updateOne({ email }, updateDoc);
      res.send(result);
    });

    // get user role
    app.get('/users/role/:email', verifyToken, async (req, res) => {
      try {
        const email = req.params.email;

        if (req?.user?.email !== email) {
          return res.status(403).send({ message: 'forbidden access' });
        }

        const result = await usersCollection.findOne({ email });

        res.send({ role: result?.role });
      } catch (error) {
        console.error('Check Role:', error.message);
        res.status(500).send({ error: 'Failed to check role' });
      }
    });
  } catch (err) {
    console.error('Mongodb', err.message);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Programmer. How Are You? This Server For No-Name Website ❤️');
});

app.listen(port, () => {
  console.log(`☘️  You successfully connected to Server: ${port}`);
});
