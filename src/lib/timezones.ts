export const timezones = [
    { label: "UTC (Coordinated Universal Time)", value: "UTC" },
    // Americas
    {
        label: "(UTC-05:00) Eastern Time — New York, Toronto",
        value: "America/New_York",
    },
    { label: "(UTC-06:00) Central Time — Chicago", value: "America/Chicago" },
    { label: "(UTC-07:00) Mountain Time — Denver", value: "America/Denver" },
    {
        label: "(UTC-08:00) Pacific Time — Los Angeles",
        value: "America/Los_Angeles",
    },
    { label: "(UTC-03:00) Brasilia, Buenos Aires", value: "America/Sao_Paulo" },
    // Europe / Middle East
    { label: "(UTC+00:00) London, Dublin, Lisbon", value: "Europe/London" },
    {
        label: "(UTC+01:00) Frankfurt, Paris, Amsterdam, Berlin",
        value: "Europe/Berlin",
    },
    { label: "(UTC+02:00) Athens, Istanbul, Cairo", value: "Europe/Athens" },
    { label: "(UTC+04:00) Dubai, Abu Dhabi", value: "Asia/Dubai" },
    // Asia / Oceania
    { label: "(UTC+05:30) Mumbai, New Delhi", value: "Asia/Kolkata" },
    { label: "(UTC+08:00) Singapore, Hong Kong", value: "Asia/Singapore" },
    { label: "(UTC+09:00) Tokyo, Seoul", value: "Asia/Tokyo" },
    { label: "(UTC+10:00) Sydney, Melbourne", value: "Australia/Sydney" },
    { label: "(UTC+12:00) Auckland, Wellington", value: "Pacific/Auckland" },
] as const
