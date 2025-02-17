import React, { useEffect, useState } from "react";

const UseCaptchaGenerator = () => {
 const [captcha, setCaptcha] = useState("");
 const [captchaImage, setCaptchaImage] = useState("");

 const generateRandomCaptcha = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Avoid confusing characters
  const captchaText = Array.from(
   { length: 6 },
   () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
  setCaptcha(captchaText);
  drawCaptcha(captchaText);
 };

 const drawCaptcha = (captchaText) => {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 70;
  const ctx = canvas.getContext("2d");

  // Background color

  ctx.fillStyle = "#E3F2FD";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add random curves & noise

  for (let i = 0; i < 7; i++) {
   ctx.beginPath();
   ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
   ctx.bezierCurveTo(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    Math.random() * canvas.width,
    Math.random() * canvas.height
   );

   ctx.strokeStyle = `rgba(0, 0, 0, 0.3)`;
   ctx.lineWidth = 2;
   ctx.stroke();

  }

  // Draw text with random skew and rotation

  ctx.font = "bold 30px Arial";
  for (let i = 0; i < captchaText.length; i++) {
   ctx.save();
   const x = 20 + i * 30;
   const y = 40 + Math.random() * 10;
   const angle = (Math.random() - 0.5) * 0.6;
   ctx.translate(x, y);
   ctx.rotate(angle);
   ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.9 + 0.1})`;
   ctx.fillText(captchaText[i], 0, 0);
   ctx.restore();

  }

  // Convert to Data URL
  setCaptchaImage(canvas.toDataURL());
 };

 useEffect(() => {
  generateRandomCaptcha();
 }, []);
 const verifyCaptcha = (userInput, resetForm) => {
  if (userInput === captcha) {
   return true; // Success
  } else {
   resetForm({ captcha: "" }, false);
   generateRandomCaptcha();
   return false; // Failure
  }
 };

 const captchaInputField = (formik) => (
  <div>
   <input
    type="text"
    {...formik.getFieldProps("captcha")}
    autoComplete="off"
    spellCheck="false"
    className="w-full p-2 border rounded"
    onPaste={(e) => e.preventDefault()} // Disable paste
    onCopy={(e) => e.preventDefault()} // Disable copy
    onCut={(e) => e.preventDefault()} // Disable cut
   />

   <span className="text-red-600 text-xs">
    {formik.touched.captcha && formik.errors.captcha
     ? formik.errors.captcha
     : null}
   </span>

  </div>

 );
 return {
  captchaInputField,
  captcha,
  captchaImage,
  verifyCaptcha,
  generateRandomCaptcha,
 };
};
export default UseCaptchaGenerator;

