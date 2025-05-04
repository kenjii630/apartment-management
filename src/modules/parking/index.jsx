import React, { useState } from "react";
import Card from "@/components/ActionCard";
import { useNavigate } from "react-router-dom";
import { parkingData } from "@/data/parking";
import { useTranslation } from "react-i18next";
import SearchBar from "@/components/SearchBar";

export default function ParkingManagement() {
  const navigate = useNavigate();
  const [floor, setFloor] = useState("2");
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  return (
    <div className="p-9">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">{t("parking_management")}</h1>
        </div>
      </div>
      <div className="mb-4">
        <SearchBar
          value={search}
          onChange={(e) => console.log(e.target.value)}
          className="w-full"
          placeholder={t("search_room")}
        />
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-170px)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
          {parkingData.map((p) => (
            <Card
              key={p.spotId}
              title={`${t("spot")} ${p.spotId}`}
              subtitle={`${t("owner")}: ${p.owner}`}
              badge={{
                text: p.rentPaid ? t("rented") : t("vacant"),
                variant: p.rentPaid ? "positive" : "neutral",
              }}
              onEdit={() => navigate(`/parking/${p.spotId}/edit`)}
              rows={[
                ...(p.tenant
                  ? [{ label: t("tenant"), value: p?.tenant }]
                  : [{ label: t("tenant"), value: t("N/A") }]),
                { label: t("monthly_rent"), value: `$${p.rent}` },
                {
                  label: t("rent_due"),
                  value: p.rentPaid ? t("paid") : t("unpaid"),
                  status: p.rentPaid ? "positive" : "negative",
                },
              ]}
              footer={
                <>
                  {p && (
                    <div className="flex justify-between">
                      <span>{t("last_payment")}</span>
                      <span>
                        {p?.lastPaymentDate ? p?.lastPaymentDate : t("N/A")}
                      </span>
                    </div>
                  )}
                  {p && (
                    <div className="flex justify-between mt-1">
                      <span>{t("next_payment")}</span>
                      <span>
                        {p?.nextPaymentDate ? p?.nextPaymentDate : t("N/A")}
                      </span>
                    </div>
                  )}
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
