"use client";

import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";

export default function VillaAvailability({
  villaSlug,
}: {
  villaSlug: string;
}) {
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCalendar() {
      try {
        const res = await fetch(`/api/calendar/${villaSlug}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (mounted) {
          setBookedDates(Array.isArray(data.bookedDates) ? data.bookedDates : []);
        }
      } catch (error) {
        console.error("Calendar fetch failed:", error);
        if (mounted) setBookedDates([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadCalendar();

    return () => {
      mounted = false;
    };
  }, [villaSlug]);

  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);

  return (
    <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
      <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-6">
        Availability
      </p>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
        <Calendar
          tileDisabled={({ date, view }) => {
            if (view !== "month") return false;
            const iso = formatDate(date);
            return bookedSet.has(iso);
          }}
        />

        <div className="flex flex-wrap items-center gap-6 mt-4 text-[12px] text-stone-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-sm bg-stone-300" />
            <span>Occupied</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-sm bg-white border border-stone-300" />
            <span>Available</span>
          </div>
        </div>

        <p className="text-sm text-stone-500 mt-4">
          {loading
            ? "Loading live availability..."
            : "Greyed out dates are unavailable. Contact us on WhatsApp to confirm your stay."}
        </p>
      </div>
    </section>
  );
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}