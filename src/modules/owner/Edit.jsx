import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormContainer from "@/components/FormContainer";
import { request } from "@/services/request";
import { useTranslation } from "react-i18next";

// import { getRoomById, updateRoom } from "@/services/roomService";

export default function EditOwner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    roomNumber: "",
    rent: "",
    tenantName: "",
    tenantContact: "",
    contractStart: "",
    contractEnd: "",
    deposit: "",
    paymentPeriod: "monthly",
    utilityReading: "",
    utilityDue: "",
    decorationStatus: "finished",
    occupancyStatus: "occupied",
    depositStatus: "collected",
  });

  const { t } = useTranslation();

  useEffect(() => {
    // load existing data
    (async () => {
      const { data } = await request(() => getRoomById(id));
      if (data) setForm({ ...form, ...data });
    })();
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request(() => updateRoom(id, form), { isToast: true });
    navigate("/owners");
  };

  return (
    <div className="p-9">
      <div className="">
        <h1 className="text-2xl font-bold mb-4">{t("edit_owner")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-primary">
        <FormContainer
          titleKey="title_edit_parking"
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        >
          {/* grid of inputs */}
          <div>
            <label>{t("form.room_number.title")}</label>
            <input
              name="roomNumber"
              value={form.roomNumber}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label>{t("form.rent_amount.title")}</label>
            <input
              name="rent"
              type="number"
              value={form.rent}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>{t("form.name.title")}</label>
            <input
              name="name"
              value={form.roomNumber}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label>{t("form.phone.title")}</label>
            <input
              name="phone"
              type="number"
              value={form.rent}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>{t("form.contract_start_date.title")}</label>
            <input
              name="contract_start_date"
              type="date"
              value={form.roomNumber}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label>{t("form.contract_end_date.title")}</label>
            <input
              name="contract_end_date"
              type="date"
              value={form.rent}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          {/* add the rest of your fields in similar <div> slots */}
        </FormContainer>
      </div>
    </div>
  );
}
