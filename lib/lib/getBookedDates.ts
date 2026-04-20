export async function getBookedDates(icalUrl?: string): Promise<string[]> {
  if (!icalUrl) return [];

  try {
    const response = await fetch(icalUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch ICS:", response.status, response.statusText);
      return [];
    }

    const text = await response.text();
    const bookedDates: string[] = [];

    const events = text.split("BEGIN:VEVENT");

    for (const event of events) {
      const startMatch = event.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
      const endMatch = event.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);

      if (!startMatch || !endMatch) continue;

      const start = parseICSDate(startMatch[1]);
      const end = parseICSDate(endMatch[1]);

      if (!start || !end) continue;

      const current = new Date(start);

      while (current < end) {
        bookedDates.push(formatDate(current));
        current.setDate(current.getDate() + 1);
      }
    }

    return [...new Set(bookedDates)];
  } catch (error) {
    console.error("Error loading calendar:", error);
    return [];
  }
}

function parseICSDate(value: string): Date | null {
  if (!/^\d{8}$/.test(value)) return null;

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6)) - 1;
  const day = Number(value.slice(6, 8));

  return new Date(year, month, day);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}