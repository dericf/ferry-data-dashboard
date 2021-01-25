import React from "react";
import Select from "react-select";

export default function ActionBar({ terminals, selectedTerminal, onChange }) {
  return (
    <div
      className="flex flex-row justify-center align-center"
      style={{ width: "20rem" }}
    >
      <form>
        <select onChange={onChange} value={selectedTerminal}>
          {terminals.map((terminal) => (
            <option key={terminal.id} value={terminal.id}>
              {terminal.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
