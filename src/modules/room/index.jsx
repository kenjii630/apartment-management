import React, { useState } from "react";
import Card from "@/components/ActionCard";
import { useNavigate } from "react-router-dom";
import { roomsData } from "@/data/rooms";
import { useTranslation } from "react-i18next";
import SearchBar from "@/components/SearchBar";
import { useSearch } from "@/hooks/useSearch";

export default function RoomManagement() {
  const navigate = useNavigate();
  const [floor, setFloor] = useState("2");
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  // const {
  //   term: floor,
  //   setTerm: setFloor,
  //   results: rooms,
  //   loading,
  //   error,
  // } = useSearch(
  //   fetchRoomsByFloor, // (q) => Promise<Room[]>
  //   null,              // no local fields
  //   "2",               // initial floor
  //   { debounce: 300 }  // wait 300ms between calls
  // );

  return (
    <div className="p-9">
      <div className=" flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold mb-4">{t("room_management")}</h1>
        </div>
        <div>
          {/* select that has options that containning a value of 2, 3, 5, 6, 7, 8, and all */}
          <select
            className="mb-4 p-1 border rounded-lg bg-background text-primary"
            onChange={(e) => setFloor(e.target.value)}
            value={floor}
          >
            <option value="2">2人</option>
            <option value="3">3人</option>
            <option value="5">5人</option>
            <option value="6">6人</option>
            <option value="7">7人</option>
            <option value="8">8人</option>
            <option value="all">全部</option>
          </select>
          {/* {floor} */}
        </div>
      </div>

      <div className="mb-4">
        <SearchBar
          value={search}
          onChange={e => console.log(e.target.value)}
          className="w-full"
          placeholder={t("search_room")}
        />
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-170px)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {roomsData.map((r) => (
            <Card
              key={r.roomNumber}
              title={`${r.roomNumber}${t("room")}`}
              subtitle={`${t("owner")}: ${r.owner}`}
              badge={r.badge}
              onEdit={() => navigate(`/rooms/${r.roomNumber}/edit`)}
              rows={[
                { label: t("monthly_rent"), value: `$${r.rent}` },
                ...(r.tenant
                  ? [{ label: t("tenant"), value: r.tenant }]
                  : [{ label: t("tenant"), value: t("N/A") }]),
                { label: t("decoration_status"), value: r.decorationStatus },
                {
                  label: t("rent_due"),
                  value: r.rentPaid ? t("paid") : t("unpaid"),
                  status: r.rentPaid ? "positive" : "negative",
                },
                {
                  label: t("utility_fee"),
                  value: r.utilityPaid ? t("paid") : t("unpaid"),
                  status: r.utilityPaid ? "positive" : "negative",
                },
              ]}
              footer={
                <>
                  {r && (
                    <div className="flex justify-between">
                      <span>{t("last_payment")}</span>
                      <span>
                        {r.lastPaymentDate ? r.lastPaymentDate : t("N/A")}
                      </span>
                    </div>
                  )}

                  {r && (
                    <div className="flex justify-between mt-1">
                      <span>{t("next_payment")}</span>
                      <span>
                        {r.nextPaymentDate ? r.nextPaymentDate : t("N/A")}
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
