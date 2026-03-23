import prisma from "./client";
async function test() {
    const users = await prisma.parent.findMany({
        include: { family: { include: { children: true } } },
    });
    console.log(JSON.stringify(users, null, 2));
}
test();
//# sourceMappingURL=testDB.js.map