import { hashPassword } from "../src/utils/bcrypt.utils";
import prisma from "./client";

async function main() {
  // Create family
  const family = await prisma.family.create({
    data: {
      name: "Doe Family",
      parents: {
        create: [
          { name: "John Doe", email: "john@example.com", password: "123456" },
          { name: "Jane Doe", email: "jane@example.com", password: "123456" },
        ],
      },
      children: {
        create: [
          { name: "Alice", age: 7, height: 120, weight: 25 },
          { name: "Bob", age: 5, height: 110, weight: 20 },
        ],
      },
    },
    include: { parents: true, children: true },
  });

  // Habit logs
  for (const child of family.children) {
    await prisma.habitLog.createMany({
      data: [
        {
          childId: child.id,
          water: 5,
          fruits: 2,
          veggies: 1,
          activity: 30,
          screen: 60,
        },
        {
          childId: child.id,
          water: 6,
          fruits: 3,
          veggies: 2,
          activity: 40,
          screen: 50,
        },
      ],
    });
  }

  // Challenges
  await prisma.challenge.create({
    data: {
      title: "No Sugary Drinks Week",
      description: "Avoid all sugary drinks for 7 days",
      target:7,
      familyId: family.id,
    },
  });

  // Tips
  await prisma.tip.createMany({
    data: [
      {
        title: "Hydrate Often",
        content: "Drink at least 5 glasses of water daily",
      },
      { title: "Eat Veggies", content: "Include vegetables in every meal" },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
