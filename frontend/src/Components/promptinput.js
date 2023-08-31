import { React, useState } from "react";

const API_URL = "http://127.0.0.1:5000";
// send get request to backend to get the answer to the prompt from GPT

// TODO:
// work on handleSubmit

export const PromptInput = ({
  handleInput,
  input,
  handleResponse,
  setInput,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (input.trim() === "") {
      return alert("Enter something");
    }
    const jsonData = {
      prompt: input,
    };
    const response = await fetch(`${API_URL}/handle-prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    const data = await response.json();
    console.log(JSON.parse(data.reply));
    handleResponse(JSON.parse(data.reply));
    setIsLoading(false);
    setInput("");
  };

  return (
    <>
      <form className="prompt-container" onSubmit={handleSubmit}>
        <textarea type="text" value={input} onChange={handleInput} />

        <button type="submit" disabled={isLoading}>
          Generate Prompt
        </button>
      </form>
    </>
  );
};
