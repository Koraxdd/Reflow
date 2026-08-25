import { getPaginatedTrades } from "@/actions/trades"
import TradeJournalClient from "@/components/layout/TradeJournalClient"

export default async function TradeJournalPage() {
    const { trades } = await getPaginatedTrades(1, 10)

    return <TradeJournalClient initialTrades={trades} />
}
