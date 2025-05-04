// src/pages/OwnersPage.jsx
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { ownersData } from "@/data/owners";
import { useTranslation } from "react-i18next";
import SearchBar from "@/components/SearchBar";
import {
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function Owners() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div className="p-9">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">{t("owner_management")}</h1>
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {ownersData.map((o) => (
          <div
            key={o.id}
            onClick={() => nav(`/owners/${o.id}`)}
            className="bg-card rounded-lg shadow p-6 flex flex-col justify-between"
            style={{ cursor: "pointer" }}
          >
            {/* Header with two buttons */}
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-primary">{o.name}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    /* export logic */
                  }}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={t("export")}
                >
                  <DocumentTextIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nav(`/owners/${o.id}/edit`);
                  }}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={t("edit")}
                >
                  <PencilSquareIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Body rows */}
            <div className="mt-4 space-y-2 text-sm text-primary">
              <div className="flex justify-between">
                <span>{t("room_count")}</span>
                <span className="font-medium">{o.roomCount}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("parking_count")}</span>
                <span className="font-medium">{o.parkingCount}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("monthly_income")}</span>
                <span className="font-medium">${o.monthlyIncome}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-primary">
              <div className="flex justify-between">
                <span>{t("last_collection")}</span>
                <span>{o.lastCollectionDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
