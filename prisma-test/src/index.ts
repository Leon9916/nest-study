import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function test1() {
//   await prisma.user.create({
//     data: {
//       name: "leon",
//       email: "2476288442@qq.com",
//     },
//   });

//   await prisma.user.create({
//     data: {
//       name: "liao",
//       email: "3054104579@qq.com",
//     },
//   });

//   const users = await prisma.user.findMany();
//   console.log(users);
// }

// test1();

const prisma = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
  ],
});

// async function test2() {
//   const user = await prisma.user.create({
//     data: {
//       name: "驅蚊器",
//       email: "控制臺suufiww",
//       posts: {
//         create: [
//           {
//             title: "aaa",
//             content: "aaaaaa",
//           },
//           {
//             title: "bbb",
//             content: "bbbbb",
//           },
//         ],
//       },
//     },
//   });
//   console.log(user);
// }

// test2();

// async function test3() {
//   await prisma.post.update({
//     where: {
//       id: 2,
//     },
//     data: {
//       content: "xxx",
//     },
//   });
// }

// test3();

async function test4() {
  await prisma.post.delete({
    where: {
      id: 2,
    },
  });
}

test4();
