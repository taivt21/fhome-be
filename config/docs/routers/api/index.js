const getUser = require('./Users/getUsers.docs')
const getAllPostings =require('./Posting/getAllPostings.docs')

module.exports = {
    paths:{
        "/getUser":{...getUser},
        "/getAllPostings":{...getAllPostings}
    }
}