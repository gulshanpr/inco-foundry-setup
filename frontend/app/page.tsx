'use client';
import { useState } from "react";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [gender, setGender] = useState("Male");
  const [error, setError] = useState("");

  // Handle First Name (Restrict to one word)
  const handleFirstNameChange = (e) => {
    const value = e.target.value.trim();
    if (value.includes(" ")) return; // Prevent spaces (only first name)
    setFirstName(value);
  };

  // Handle Message (Limit to 256 bytes)
  const handleMessageChange = (e) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(e.target.value);
    if (encoded.length <= 256) {
      setMessage(e.target.value);
    }
  };

  // Handle File Upload (Only PNG, JPG, JPEG) + Preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Only PNG, JPG, and JPEG files are allowed.");
        setFile(null);
        setPreview(null);
        return;
      }
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("File must be 2MB or smaller.");
        setFile(null);
        setPreview(null);
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Set preview URL
    }
  };

  // Handle Gender Toggle
  const toggleGender = () => {
    setGender((prev) => (prev === "Male" ? "Female" : "Male"));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !message || !gender) {
      setError("Please fill all required fields.");
      return;
    }

    console.log({ firstName, message, file, gender });
    alert("Form submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">User Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name Input */}
          <div>
            <label className="block text-sm font-medium">First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Message Input (256-byte limit) */}
          <div>
            <label className="block text-sm font-medium">Message (256 Bytes Max) *</label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              className="mt-1 w-full p-2 border rounded-md"
              rows="3"
              placeholder="Type your message here..."
              required
            />
            <p className="text-xs text-gray-500">{new TextEncoder().encode(message).length} / 256 bytes</p>
          </div>

          {/* File Upload (Only PNG, JPG, JPEG, Max: 2MB) */}
          <div>
            <label className="block text-sm font-medium">Upload Image (PNG, JPG, JPEG, Max: 2MB)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 w-full"
              accept="image/png, image/jpeg, image/jpg"
            />
            {preview && (
              <div className="mt-2">
                <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-md shadow-md" />
              </div>
            )}
          </div>

          {/* Gender Toggle Switch */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Gender *</label>
            <div
              className={`relative w-16 h-8 rounded-full cursor-pointer ${
                gender === "Male" ? "bg-blue-500" : "bg-pink-500"
              }`}
              onClick={toggleGender}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  gender === "Female" ? "translate-x-8" : "translate-x-0"
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm">{gender}</span>
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
