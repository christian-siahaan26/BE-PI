// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import { create } from "domain";

// const prisma = new PrismaClient();

// async function main() {
//   //   try {
//   //     const hashedPassword = await bcrypt.hash("password", 10);

//   //     const admin = await prisma.user.upsert({
//   //       where: { email: "admin@gmail.com" },
//   //       update: {},
//   //       create: {
//   //         name: "Admin",
//   //         email: "admin@gmail.com",
//   //         password: hashedPassword,
//   //         role: "ADMIN",
//   //         citizenId: 1,
//   //       },
//   //     });
//   //     console.log("✅ Admin seeded:", admin);
//   //   } catch (error: any) {
//   //     if (error.code === "P2002" && error.meta?.target?.includes("name")) {
//   //       console.error("❌ Error: Email already exists in the database.");
//   //     } else {
//   //       console.error("❌ Error creating admin:", error);
//   //     }
//   //   }

//   try {
//     const citizen = await prisma.user.upsert({
//       // where: { nameCitizen: "Admin" },
//       update: {},
//       create: {
//         nameCitizen: "Admin",
//         block: "W9 NO.16",
//       },
//     });
//     console.log("✅ Citizen seeded:", citizen);
//   } catch (error: any) {
//     if (error.code === "P2002" && error.meta?.target?.includes("name")) {
//       console.log("❌ Error: Name already exist in the database");
//     } else {
//       console.log("❌ Error creating citizen: ", error);
//     }
//   }
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error("❌ Unexpected error:", e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
