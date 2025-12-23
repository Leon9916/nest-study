const mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/leon')

    const PersonSchema = new mongoose.Schema({
        name: String,
        age: Number,
        hobbies: [String]
    })

    const Person = mongoose.model('Person', PersonSchema)

    // const leon = new Person()
    // leon.name = 'Leon'
    // leon.age = 20

    // await leon.save()

    // const liao = new Person()
    // liao.name = 'liao'
    // liao.age = 21
    // liao.hobbies = ['reding', 'football']

    // await liao.save()

    // const persons = await Person.find()

    const persons = await Person.find({
        // $and: [{ age: { $gte: 19 }}, { name: /Leon/ }]
        age: { $in: [20, 21] }
    })
    console.log(persons);
}