const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
      type:String,
      required:true,
      default:'user'
    }
});


user.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );
  
/**
 * Validates unique users name
 */
user.path('username').validate(async (username) => {
    const userNameCount = await mongoose.models.Users.countDocuments({ username })
    console.log(userNameCount)
    return !userNameCount
}, 'Username already exists');


user.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


module.exports = mongoose.model('Users', user);
