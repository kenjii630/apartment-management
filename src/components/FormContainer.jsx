// src/components/FormContainer.jsx
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * FormContainer
 * A card-style form wrapper with header title, customizable content slots,
 * and footer actions (Cancel, Submit).
 *
 * Props:
 * - titleKey: translation key for the header title
 * - onSubmit: function(event)
 * - onCancel: function(event)
 * - submitTextKey: translation key for the submit button (default: 'save')
 * - cancelTextKey: translation key for the cancel button (default: 'cancel')
 * - children: form fields (JSX nodes)
 */
export default function FormContainer({
  titleKey,
  onSubmit,
  onCancel,
  children,
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-background text-primary rounded-lg shadow p-6">
      {/* Header */}
      {/* <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {t(titleKey)}
      </h2> */}

      {/* Form */}
      <form onSubmit={onSubmit}>
        {/* Flexible content: user can pass input groups here */}
        <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 space-y-4">{children}</div>

        {/* Footer actions */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {t('form.btn.cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t('form.btn.save')}
          </button>
        </div>
      </form>
    </div>
  );
}

FormContainer.propTypes = {
  titleKey: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitTextKey: PropTypes.string,
  cancelTextKey: PropTypes.string,
  children: PropTypes.node,
};

FormContainer.defaultProps = {
  submitTextKey: "save",
  cancelTextKey: "cancel",
  children: null,
};
