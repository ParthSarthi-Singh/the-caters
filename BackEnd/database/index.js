module.exports.init = function()
{
  const mongoose= require('mongoose')
  const url = 'mongodb+srv://cater:123@catering.m441fdc.mongodb.net/?retryWrites=true&w=majority'
  mongoose.connect(url)
  .then(function()
  {
    console.log("db is live")
  })
  .catch(function(err)
  {
    console.log("error in db connect, erer" ,err)
  })
}