export const equityCurveTimeframes = [
    "1W",
    "1M",
    "3M",
    "6M",
    "1Y",
    "All",
] as const

export type EquityCurveTimeframe = (typeof equityCurveTimeframes)[number]
