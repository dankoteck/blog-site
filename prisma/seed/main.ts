import { prisma } from "@/server/db";
import { createAuthor } from "./ultility";

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "lekhoa011159@gmail.com" },
  });

  if (user) {
    await prisma.author.create({ data: createAuthor(user.id) });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
