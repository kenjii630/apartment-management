import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormContainer from "@/components/FormContainer";
import { request } from "@/services/request";
import { useTranslation } from "react-i18next";

// import { getRoomById, updateRoom } from "@/services/roomService";

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState({
    roomNumber: "asd",
    rent: "",
    tenantName: "asd",
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
  const validate  = () => {
    const errors = {};
    if (!form.rent) {
      errors.rent = "Rent amount is required";
    }
    if (!form.tenantName) {
      errors.tenantName = "Tenant name is required";
    }
    if (!form.tenantContact) {
      errors.tenantContact = "Tenant contact is required";
    }
    if (!form.contractStart) {
      errors.contractStart = "Contract start date is required";
    }
    if (!form.contractEnd) {
      errors.contractEnd = "Contract end date is required";
    }
    if (!form.deposit) {
      errors.deposit = "Deposit amount is required";
    }
    if (!form.utilityReading) {
      errors.utilityReading = "Utility reading is required";
    }
    if (!form.utilityDue) {
      errors.utilityDue = "Utility due date is required";
    }
    if (!form.paymentPeriod) {
      errors.paymentPeriod = "Payment period is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }


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
    console.log("form", form);
    if (!validate()) return;
    const { data, error } = await request(() => updateRoom(id, form), {
      isToast: true,
    });
    if (error) {
      setErrors(error);
      return;
    }
    // if success, redirect to rooms page
    if (data) {
      navigate("/rooms");
    }
  };

  return (
    <div className="p-9">
      <div>
        <h1 className="text-2xl font-bold mb-4">{t("title_edit_room")}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <FormContainer
          titleKey="edit_room"
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
              className="form-input"
              disabled
            />
            {errors?.roomNumber && (
              <p className="text-red-500 text-sm">{errors.roomNumber}</p>
            )}
          </div>
          <div>
            <label>{t("form.rent_amount.title")}</label>
            <input
              name="rent"
              type="number"
              value={form.rent}
              onChange={handleChange}
              className={`form-input ${
                errors?.rent ? "form-error-input" : ""
              }`}
            />
            {errors?.rent && (
              <p className="text-red-500 text-sm">{errors.rent}</p>
            )}
          </div>

          <div>
            <label>{t("form.name.title")}</label>
            <input
              name="tenantName"
              type="text"
              value={form.tenantName}
              onChange={handleChange}
              className={`form-input ${
                errors?.tenantName ? "form-error-input" : ""
              }`}
            />
            {errors?.tenantName && (
              <p className="text-red-500 text-sm">{errors.tenantName}</p>
            )}
          </div>
          <div>
            <label>{t("form.phone.title")}</label>
            <input
              name="tenantContact"
              type="number"
              value={form.tenantContact}
              onChange={handleChange}
              className={`form-input ${
                errors?.tenantContact ? "form-error-input" : ""
              }`}
            />
            {errors?.tenantContact && (
              <p className="text-red-500 text-sm">{errors.tenantContact}</p>
            )}
          </div>

          <div>
            <label>{t("form.contract_start_date.title")}</label>
            <input
              name="contract_start_date"
              type="date"
              value={form.contractStart}
              onChange={handleChange}
              className={`form-input ${
                errors?.contractStart ? "form-error-input" : ""
              }`}
            />
            {errors?.contractStart && (
              <p className="text-red-500 text-sm">{errors.contractStart}</p>
            )}
          </div>
          <div>
            <label>{t("form.contract_end_date.title")}</label>
            <input
              name="contract_end_date"
              type="date"
              value={form.contractEnd}
              onChange={handleChange}
              className={`form-input ${
                errors?.contractEnd ? "form-error-input" : ""
              }`}
            />
            {errors?.contractEnd && (
              <p className="text-red-500 text-sm">{errors.contractEnd}</p>
            )}
          </div>

          <div>
            <label>{t("form.deposit.title")}</label>
            <input
              name="deposit"
              type="number"
              value={form.deposit}
              onChange={handleChange}
              className={`form-input ${
                errors?.deposit ? "form-error-input" : ""
              }`}
            />
            {errors?.deposit && (
              <p className="text-red-500 text-sm">{errors.deposit}</p>
            )}
          </div>
          <div>
            <label>{t("form.payment_period.title")}</label>
            <input
              name="paymentPeriod"
              value={form.paymentPeriod}
              onChange={handleChange}
              className={`form-input ${
                errors?.paymentPeriod ? "form-error-input" : ""
              }`}
            />
            {errors?.paymentPeriod && (
              <p className="text-red-500 text-sm">{errors.paymentPeriod}</p>
            )}
          </div>

          <div>
            <label>{t("form.waterandelectricity.title")}</label>
            <input
              name="utilityReading"
              type="number"
              value={form.utilityReading}
              onChange={handleChange}
              className={`form-input ${
                errors?.utilityReading ? "form-error-input" : ""
              }`}
            />
            {errors?.utilityReading && (
              <p className="text-red-500 text-sm">{errors.utilityReading}</p>
            )}
          </div>
          <div>
            <label>{t("form.utility_bill_due_date.title")}</label>
            <input
              name="utilityDue"
              type="date"
              value={form.utilityDue}
              onChange={handleChange}
              className={`form-input ${
                errors?.utilityDue ? "form-error-input" : ""
              }`}
            />
            {errors?.utilityDue && (
              <p className="text-red-500 text-sm">{errors.utilityDue}</p>
            )}
          </div>

          <div className="col-span-2 flex justify-between">
            <div>
              {/* radio between two options finsh and fixed */}
              <label>{t("form.decoration_status.title")}</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="decorationStatus"
                  value="finished"
                  checked={form.decorationStatus === "finished"}
                  onChange={handleChange}
                />
                <label className="ml-2 mr-4">
                  {t("form.decoration_status.options.1")}
                </label>
                <input
                  type="radio"
                  name="decorationStatus"
                  value="not_finished"
                  checked={form.decorationStatus === "not_finished"}
                  onChange={handleChange}
                />
                <label className="ml-2">
                  {t("form.decoration_status.options.2")}
                </label>
              </div>
            </div>
            <div>
              {/* radio between two options finsh and fixed */}
              <label>{t("form.check_in_status.title")}</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="occupancyStatus"
                  value="occupied"
                  checked={form.occupancyStatus === "occupied"}
                  onChange={handleChange}
                />
                <label className="ml-2 mr-4">
                  {t("form.check_in_status.options.1")}
                </label>
                <input
                  type="radio"
                  name="occupancyStatus"
                  value="not_occupied"
                  checked={form.occupancyStatus === "not_occupied"}
                  onChange={handleChange}
                />
                <label className="ml-2">
                  {t("form.check_in_status.options.2")}
                </label>
              </div>
            </div>
            <div className="">
              {/* radio between two options finsh and fixed */}
              <label>{t("form.deposite_status.title")}</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="depositStatus"
                  value="collected"
                  checked={form.depositStatus === "collected"}
                  onChange={handleChange}
                />
                <label className="ml-2 mr-4">
                  {t("form.deposite_status.options.1")}
                </label>
                <input
                  type="radio"
                  name="depositStatus"
                  value="not_collected"
                  checked={form.depositStatus === "not_collected"}
                  onChange={handleChange}
                />
                <label className="ml-2">
                  {t("form.deposite_status.options.2")}
                </label>
              </div>
            </div>
          </div>

          {/* add the rest of your fields in similar <div> slots */}
        </FormContainer>
      </div>
    </div>
  );
}
