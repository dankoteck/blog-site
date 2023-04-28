// import { prisma } from "@/server/db";
// import { createAuthor } from "./ultility";

// async function main() {
//   const user1 = await prisma.user.findUnique({
//     where: { email: "lekhoa011159@gmail.com" },
//   });
//   const user2 = await prisma.user.findUnique({
//     where: { email: "lekhoa011159gpt@gmail.com" },
//   });

//   if (user1) {
//     await prisma.author.create({
//       data: createAuthor(user1.id, user1.email as "lekhoa011159@gmail.com"),
//     });
//   }

//   if (user2) {
//     await prisma.author.create({
//       data: createAuthor(user2.id, user2.email as "lekhoa011159gpt@gmail.com"),
//     });
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
