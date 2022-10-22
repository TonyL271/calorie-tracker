const dbo = require('./db/calApp');
const express = require('express')
const cors = require('cors')
const app = express()

const port = 3000

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));
}

dbo.run().then(db => {
    app.listen(process.env.PORT || port, () => {
        console.log(`Example app listening on port ${process.env.PORT}`)
    })
})

