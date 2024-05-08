import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";

const App = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    console.log("Here is otp", otp);
    try {
      const verifycode = await axios.post(
        `${process.env.REACT_APP_VERIFYCODE}/verify`,
        {
          code: otp,
        }
      );
      console.log("Here is verifycode", verifycode);
      if (verifycode.data.message === "success") {
        navigate("/success");
      }
    } catch (error) {
      console.log("Here is error", error);
      // alert("error validation");
      toast.error("Error Validation!");
    }
  };

  return (
    <>
      <div className="container flex flex-col items-center justify-center h-screen  bg-slate-200">
        <h1 className="text-3xl text-bold">Verification Code:</h1>
        <div className="mt-8">
          <OtpInput
            value={otp}
            inputStyle="bg-slate-400 border border-2 "
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
          />
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
