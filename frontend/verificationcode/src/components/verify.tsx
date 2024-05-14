import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";

const App = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleSubmit = async () => {
    console.log("Loading...");
    const otp = verificationCode.join("");
    console.log("here is otp", otp);
    try {
      const verifycode = await axios.post(
        `${process.env.REACT_APP_VERIFYCODE}/verify`,
        {
          code: otp,
        }
      );
      console.log("here is verifycode", verifycode);
      if (verifycode.data.message === "success") {
        navigate("/success");
        toast.success("success!!");
      }
    } catch (error) {
      console.log("Here is error", error);
      // alert("error validation");
      toast.error("Error Validation!");
    }
  };

  const handleChange = (index: number, event: any) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(`digit${index + 2}`);
        if (nextInput) {
          nextInput.focus();
        }
      } else if (!value && index > 0) {
        const prevInput = document.getElementById(`digit${index}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedData = clipboardData.getData("text");
      console.log("Pasted data:", pastedData);
      if (/^\d{6}$/.test(pastedData)) {
        const newCode = pastedData.split("");
        const updatedVerificationCode = [...verificationCode];
        newCode.forEach((digit, i) => {
          const newIndex = index + i;
          if (newIndex < updatedVerificationCode.length) {
            updatedVerificationCode[newIndex] = digit;
          }
        });
        setVerificationCode(updatedVerificationCode);
        updatedVerificationCode.forEach((digit, i) => {
          const input = document.getElementById(
            `digit${i + 1}`
          ) as HTMLInputElement;
          if (input) {
            input.value = digit;
          }
        });
      }
    }
  };
  console.log("here is verification code ", verificationCode);
  return (
    <>
      <div className="container flex flex-col items-center justify-center h-screen  bg-slate-200">
        <h1 className="text-3xl text-bold">Verification Code:</h1>
        <div className="mt-8">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="w-12 h-12 text-2xl mx-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
              maxLength={1}
              onChange={(e) => handleChange(index, e)}
              onPaste={(e) => handlePaste(e, index)}
              id={`digit${index + 1}`}
              pattern="[0-9]"
              required
            />
          ))}
        </div>

        <div className="mt-8">
          <Toaster position="top-center" />
          <button
            rounded-md
            onClick={handleSubmit}
            className="px-16 py-2 bg-blue-950 text-white rounded-md"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
