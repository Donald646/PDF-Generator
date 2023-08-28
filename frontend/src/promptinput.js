import { React, useState } from "react";

const API_URL = "http://127.0.0.1:5000";
// send get request to backend to get the answer to the prompt from GPT

export const PromptInput = ({
  handleInput,
  input,
  handleReponse,
  setInput,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (input.trim() === "") {
      return alert("Enter something");
    }
    const jsonData = {};
    const response = await fetch(`${API_URL}/handle-prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    }); // might have to turn into a post request so I can send in data
    const data = response.json();
    // parse data
    // handleResponse(parsed data)
    setInput("");
  };

  return (
    <>
      <form className="prompt-container" onSubmit={handleSubmit}>
        <textarea type="text" value={input} onChange={handleInput} />

        <button type="submit">Generate Prompt</button>
      </form>
    </>
  );
};
