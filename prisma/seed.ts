// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// async function main() {
//   try {
//     const hashedPassword = await bcrypt.hash("password", 10);

//     const admin = await prisma.user.upsert({
//       where: { email: "admin@gmail.com" },
//       update: {},
//       create: {
//         name: "Admin",
//         email: "admin@gmail.com",
//         password: hashedPassword,
//         role: "ADMIN",
//       },
//     });
//     console.log("✅ Lecturer user seeded:", admin);
//   } catch (error: any) {
//     if (error.code === "P2002" && error.meta?.target?.includes("name")) {
//       console.error("❌ Error: NIDK already exists in the database.");
//     } else {
//       console.error("❌ Error creating lecturer:", error);
//     }
//   }
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error("❌ Error seeding admin:", e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
