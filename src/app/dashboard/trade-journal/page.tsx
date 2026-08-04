import { getTrades } from "@/actions/trades"
import TradeJournalClient from "@/components/layout/TradeJournalClient"

export default async function TradeJournalPage() {
    const trades = await getTrades()

    return <TradeJournalClient initialTrades={trades} />
}
