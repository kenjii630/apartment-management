// src/components/SearchBar.jsx
import React from "react";
import PropTypes from "prop-types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * SearchBar
 * A reusable search input with an icon.
 *
 * Props:
 * - value: current input value
 * - onChange: change handler (e: React.ChangeEvent)
 * - placeholder: placeholder text
 */
export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-96 bg-background rounded-xl">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 transform -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className="form-input pl-10 rounded-xl text-primary"
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: "",
};
