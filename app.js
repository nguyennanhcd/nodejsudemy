const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// when you run npm start, nodejs only run the code generator but not the middleware
app.use((req, res, next) => {
  User.findById('669f5c4288385f216bc27a82')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  console.log('Server is running on port 3000...');
  app.listen(3000);
});
