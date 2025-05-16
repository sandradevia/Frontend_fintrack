// src/components/CardSummary.tsx
import React, { useEffect, useState } from "react";
import InfoCard from "example/components/Cards/InfoCard";
import RoundIcon from "example/components/RoundIcon";
import { MoneyIcon, CartIcon, ChatIcon } from "icons";
import {
  cardSummaryData,
  getCardSummaryData,
} from "utils/superadmin/dashboardData";

const iconMap = {
  MoneyIcon,
  CartIcon,
  ChatIcon,
};

export default function CardSummary() {
  const [cardData, setCardData] = useState<cardSummaryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCardSummaryData()
      .then((data) => {
        // format value ke Rupiah
        const formattedData = data.map((item) => ({
          ...item,
          value: formatRupiah(Number(item.value)), // pastikan value number ya
        }));
        setCardData(formattedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatRupiah = (number: number) =>
    `Rp. ${number.toLocaleString("id-ID")},00`;

  if (loading) return <div>Memuat data summary...</div>;
  if (!cardData.length) return <div>Tidak ada data.</div>;

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      {cardData.map(
        ({ title, value, iconName, iconColorClass, bgColorClass }) => {
          const Icon = iconMap[iconName as keyof typeof iconMap];
          return (
            <InfoCard key={title} title={title} value={value}>
              {/* @ts-ignore */}
              <RoundIcon
                icon={Icon}
                iconColorClass={iconColorClass}
                bgColorClass={bgColorClass}
                className="mr-4"
              />
            </InfoCard>
          );
        }
      )}
    </div>
  );
}
