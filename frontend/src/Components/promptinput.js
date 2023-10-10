import { React, useState } from "react";

const API_URL = "https://shielded-refuge-96333-dd1d10ecd43a.herokuapp.com";
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
      type: "advanced",
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

    handleResponse(JSON.parse(data.reply));
    console.log(data.reply);
    setIsLoading(false);
    setInput("");
  };

  return (
    <>
      <form className="prompt-container" onSubmit={handleSubmit}>
        <textarea type="text" value={input} onChange={handleInput} />

        <button
          type="submit"
          className="all-buttons advanced-generate-button"
          disabled={isLoading}
          style={
            isLoading
              ? { backgroundColor: "gray", cursor: "not-allowed" }
              : null
          }
        >
          Generate Prompt
        </button>
      </form>
    </>
  );
};
