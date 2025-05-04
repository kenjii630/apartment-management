// src/components/InfoCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function InfoCard({ titleKey, value, trend, icon: Icon }) {
  const { t } = useTranslation();

  const trendClasses = {
    neutral: "text-gray-500",
    positive: "text-green-600",
    negative: "text-red-600",
  };

  return (
    <div className="flex-1 bg-background rounded-lg p-4 mb-9 shadow-md flex items-center justify-between">
      <div>
        {/* translate here just like in Sidebar */}
        <p className="text-sm font-medium text-primary">{t(titleKey)}</p>
        <p className="mt-1 text-2xl font-semibold text-primary">{value}</p>
        {trend && (
          <p className={`mt-1 text-sm font-medium ${trendClasses[trend.type]}`}>
            {trend.text}
          </p>
        )}
      </div>
      {Icon && <Icon className="h-6 w-6 text-blue-600" />}
    </div>
  );
}

InfoCard.propTypes = {
  titleKey: PropTypes.string.isRequired, // translation key
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["neutral", "positive", "negative"]),
  }),
  icon: PropTypes.elementType,
};
InfoCard.defaultProps = {
  trend: null,
  icon: null,
};
