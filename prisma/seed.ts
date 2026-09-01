import { prisma } from "@/lib/prisma"

async function main() {
    const demoUser = await prisma.user.findUnique({
        where: { email: "demo@gmail.com" },
    })

    if (!demoUser) {
        return
    }

    await prisma.trade.deleteMany({
        where: { userId: demoUser.id },
    })

    await prisma.trade.createMany({
        data: [
            {
                userId: demoUser.id,
                symbol: "BTC",
                direction: "Long",
                entryPrice: 64200,
                exitPrice: 67500,
                quantity: 0.5,
                pnl: 1650,
                tags: ["swing"],
                openedAt: new Date("2026-05-01T10:00:00Z"),
                closedAt: new Date("2026-05-02T14:30:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "ETH",
                direction: "Short",
                entryPrice: 3500,
                exitPrice: 3420,
                quantity: 2.0,
                pnl: 160,
                tags: ["daytrade"],
                openedAt: new Date("2026-05-03T09:00:00Z"),
                closedAt: new Date("2026-05-03T16:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "SOL",
                direction: "Long",
                entryPrice: 145,
                exitPrice: 138,
                quantity: 15.0,
                pnl: -105,
                tags: ["breakout"],
                openedAt: new Date("2026-05-04T11:20:00Z"),
                closedAt: new Date("2026-05-04T18:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "BTC",
                direction: "Short",
                entryPrice: 68000,
                exitPrice: 66500,
                quantity: 0.3,
                pnl: 450,
                tags: ["scalp"],
                openedAt: new Date("2026-05-07T14:00:00Z"),
                closedAt: new Date("2026-05-07T15:30:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "ETH",
                direction: "Long",
                entryPrice: 3200,
                exitPrice: 3350,
                quantity: 1.5,
                pnl: 225,
                tags: ["swing"],
                openedAt: new Date("2026-05-08T10:00:00Z"),
                closedAt: new Date("2026-05-09T11:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "SOL",
                direction: "Short",
                entryPrice: 150,
                exitPrice: 142,
                quantity: 20.0,
                pnl: 160,
                tags: ["daytrade"],
                openedAt: new Date("2026-05-10T22:00:00Z"),
                closedAt: new Date("2026-05-11T02:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "BTC",
                direction: "Long",
                entryPrice: 65000,
                exitPrice: 67200,
                quantity: 0.4,
                pnl: 880,
                tags: ["swing"],
                openedAt: new Date("2026-05-12T09:30:00Z"),
                closedAt: new Date("2026-05-13T17:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "ETH",
                direction: "Short",
                entryPrice: 3600,
                exitPrice: 3550,
                quantity: 1.0,
                pnl: 50,
                tags: ["scalp"],
                openedAt: new Date("2026-05-14T12:00:00Z"),
                closedAt: new Date("2026-05-14T19:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "SOL",
                direction: "Long",
                entryPrice: 130,
                exitPrice: 140,
                quantity: 25.0,
                pnl: 250,
                tags: ["swing"],
                openedAt: new Date("2026-05-15T08:00:00Z"),
                closedAt: new Date("2026-05-16T21:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "BTC",
                direction: "Short",
                entryPrice: 67000,
                exitPrice: 68100,
                quantity: 0.2,
                pnl: -220,
                tags: ["daytrade"],
                openedAt: new Date("2026-05-17T13:30:00Z"),
                closedAt: new Date("2026-05-18T20:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "ETH",
                direction: "Long",
                entryPrice: 3400,
                exitPrice: 3320,
                quantity: 1.2,
                pnl: -96,
                tags: ["breakout"],
                openedAt: new Date("2026-05-19T10:00:00Z"),
                closedAt: new Date("2026-05-20T15:00:00Z"),
            },
            {
                userId: demoUser.id,
                symbol: "BTC",
                direction: "Long",
                entryPrice: 66800,
                exitPrice: null,
                quantity: 0.5,
                pnl: 0,
                tags: ["active"],
                openedAt: new Date(),
                closedAt: null,
            },
            {
                userId: demoUser.id,
                symbol: "ETH",
                direction: "Short",
                entryPrice: 3450,
                exitPrice: null,
                quantity: 1.5,
                pnl: 0,
                tags: ["active"],
                openedAt: new Date(),
                closedAt: null,
            },
            {
                userId: demoUser.id,
                symbol: "SOL",
                direction: "Long",
                entryPrice: 152,
                exitPrice: null,
                quantity: 10.0,
                pnl: 0,
                tags: ["active"],
                openedAt: new Date(),
                closedAt: null,
            },
        ],
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
