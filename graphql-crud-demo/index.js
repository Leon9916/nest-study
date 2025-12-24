import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
    type Student {
        id: String,
        name: String,
        sex: Boolean,
        age: Int
    }

    type Teacher {
        id: String,
        name: String,
        age: Int,
        subject: [String],
        students: [Student]
    }

    type Query {
        students: [Student],
        teachers: [Teacher],
        studentsbyTeacherName(name: String!): [Student]
    }

    type Res {
        success: Boolean
        id: String
    }

    type Mutation {
        addStudent(name:String! age:Int! sex:Boolean!): Res

        updateStudent(id:String! name:String! age:Int! sex:Boolean!): Res

        deleteStudent(id:String!): Res
    }

    schema {
        mutation: Mutation
        query: Query
    }
`

const students = [
    {
        id: '1',
        name: async () => {
            await '取数据';
            return '澳澳'
        },
        sex: true,
        age: 12
    },
    {
        id: '2',
        name: '动工',
        sex: true,
        age: 13
    },
    {
        id: '3',
        name: '小红',
        sex: false,
        age: 11
    }
]

const teachers = [
    {
        id: '1',
        name: '李澳',
        sex: true,
        subject: ['语文', '英语'],
        age: 28,
        students: students
    }
]

async function addStudent(_, { name, age, sex }) {
    students.push({
        id: '一个随机 id',
        name,
        age,
        sex
    });
    return {
        success: true,
        id: 'xxx'
    }
}

async function updateStudent(_, { id, name, age, sex }) {

    return {
        success: true,
        id: 'xxx'
    }
}

async function deleteStudent(_, { id }) {
    return {
        success: true,
        id
    }
}


const resolvers = {
    Query: {
        students: () => students,
        teachers: () => teachers,
        studentsbyTeacherName: async (...args) => {
            console.log(args);
            await '取数据'
            return students
        }
    },
    Mutation: {
        addStudent: addStudent,
        updateStudent: updateStudent,
        deleteStudent: deleteStudent
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`🚀  Server ready at: ${url}`);