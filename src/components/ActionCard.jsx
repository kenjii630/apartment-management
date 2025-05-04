// src/components/EntityCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Card({ title, subtitle, badge, onEdit, rows, footer }) {
  return (
    <div className="bg-card text-primary rounded-xl shadow p-6 flex flex-col justify-between">
      {/* Header */}
      <div className={`flex justify-between items-start mb-4 ${title ? '' : 'hidden'}`}>
        {/* check if no title */}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && <p className="mt-1 text-sm">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <div>
              <button
                onClick={onEdit}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
            </div>
          )}
          {/* Badge */}
          {badge && (
            <div>
              <span
                className={[
                  "self-start inline-block text-xs font-medium px-2 py-0.5 rounded",
                  badge.variant === "positive"
                    ? "bg-green-100 text-green-700"
                    : badge.variant === "negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700",
                ].join(" ")}
              >
                {badge.text}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body rows */}
      <div className="space-y-2 text-sm">
        {rows.map(({ label, value, status }, i) => (
          <div key={i} className="flex justify-between">
            <span>{label}</span>
            <span
              className={
                status === "positive"
                  ? "text-green-600 font-medium"
                  : status === "negative"
                  ? "text-red-600 font-medium"
                  : "font-medium"
              }
            >
              {value ? value : "N/A"}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-primary`}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  badge: PropTypes.shape({
    text: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["positive", "negative", "neutral"]),
  }),
  onEdit: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.node.isRequired,
      status: PropTypes.oneOf(["positive", "negative", "neutral"]),
    })
  ).isRequired,
  footer: PropTypes.node,
};
Card.defaultProps = {
  subtitle: null,
  badge: null,
  onEdit: null,
  footer: null,
};
