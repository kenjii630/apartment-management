// src/modules/owner/OwnerDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { request } from "@/services/request";
import Card from "@/components/ActionCard";
// import { Button } from "@/components/ui/Button"; // your design system
import {
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { ownersData } from "@/data/ownerDetail";

export default function OwnerDetail() {
  const { t } = useTranslation();
  const { ownerId } = useParams();
  const navigate = useNavigate();

  const [owner, setOwner] = useState(ownersData[0]);
  const [loading, setLoading] = useState(true);

  //   if (loading) return <p className="p-8 text-center">{t("loading")}…</p>;
  if (!owner)
    return <p className="p-8 text-center text-red-500">{t("not_found")}</p>;
  const { properties, incomeSummary, paymentRecords, parking } = owner;

  return (
    <div className="p-9">
      {/* Page header */}
      <div className="flex items-start justify-between pb-1">
        <div>
          <h1 className="text-2xl font-semibold">
            {t("owner_detail")} - {owner.name}
          </h1>
        </div>
        <div className="space-x-2 flex items-center">
          <button
            variant="outline"
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-background text-primary"
            onClick={() => {
              /* TODO: export logic */
            }}
          >
            <DocumentTextIcon className="h-5 w-5 mr-1" /> {t("export_report")}
          </button>
          <button
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-background text-primary"
            onClick={() => navigate(`/owners/${owner?.id}/edit`)}
          >
            <PencilSquareIcon className="h-5 w-5 mr-1" /> {t("edit_info")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-4 gap-6">
        {/* Left: property overview */}
        <div className="lg:col-span-2 sm:col-span-4 flex-1 overflow-y-auto max-h-[calc(100vh-120px)] space-y-4 rounded-md shadow-md pt-0.5">
          <div className="bg-background text-primary p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              {t("property_overview")}
            </h2>
            <div className="space-y-4">
              {properties.map((prop) => (
                <Card
                  key={prop.id}
                  rows={[
                    { label: t("room_number"), value: prop.id },
                    { label: t("monthly_rent"), value: `$${prop.rent}` },
                    ...(prop.tenant
                      ? [{ label: t("tenant"), value: prop.tenant }]
                      : []),
                    {
                      label: t("rent_due"),
                      value: prop.rentPaid ? t("paid") : t("unpaid"),
                      status: prop.rentPaid ? "positive" : "negative",
                    },
                  ]}
                />
              ))}
            </div>
            <h2 className="text-lg font-semibold my-4">{t("parking_spots")}</h2>
            <div className="space-y-4">
              {parking.map((prop) => (
                <Card
                  key={prop.id}
                  rows={[
                    { label: t("room_number"), value: prop.roomNumber },
                    { label: t("owner"), value: prop.owner },
                    { label: t("monthly_rent"), value: `$${prop.rent}` },
                    ...(prop.tenant
                      ? [{ label: t("tenant"), value: prop.tenant }]
                      : []),
                    {
                      label: t("rent_due"),
                      value: prop.rentPaid ? t("paid") : t("unpaid"),
                      status: prop.rentPaid ? "positive" : "negative",
                    },
                  ]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 sm:col-span-4 space-y-6">
          {/* Income overview */}
          <div className="bg-background text-primary p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              {t("income_summary")}
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t("total_monthly")}</span>
                <span className="font-medium">{incomeSummary.total}</span>
              </div>
              {incomeSummary.deductions.map((d) => (
                <div key={d.label} className="flex justify-between">
                  <span>
                    {t(d.label)} ({d.rate}%)
                  </span>
                  <span className="text-red-600">−{d.amount}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>{t("net_income")}</span>
                <span className="text-green-600">{incomeSummary.net}</span>
              </div>
            </div>
          </div>

          {/* Payment records */}
          <div
            className="
    bg-background text-primary p-6 rounded-lg shadow
    flex flex-col              
    max-h-[calc(100vh-400px)]  
  "
          >
            {/* --- fixed header --- */}
            <div className="flex justify-between items-center mb-4 flex-none">
              <h2 className="text-lg font-semibold">{t("payment_history")}</h2>
              <span className="text-sm text-gray-500">
                {t("payment_cycle")}: {t(incomeSummary.cycle)}
              </span>
            </div>

            {/* --- scrollable body --- */}
            <div className="overflow-y-auto flex-1 space-y-2">
              {paymentRecords.map((r) => (
                <div
                  key={r.date}
                  className="flex justify-between bg-background rounded px-4 py-2"
                >
                  <div>
                    <div className="font-medium">{t(r.type)}</div>
                    <div className="text-xs text-gray-500">{r.date}</div>
                  </div>
                  <div className="font-medium">{r.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
