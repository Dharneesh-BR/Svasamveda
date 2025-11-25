import React, { useState } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AddressForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please login first");
        return;
      }

      await setDoc(doc(db, "users", user.uid, "address", "default"), {
        ...form,
        updatedAt: new Date()
      });

      setSuccess("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Address Details</h2>

      <form onSubmit={saveAddress} className="space-y-4">

        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full p-3 border rounded-xl"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 border rounded-xl"
          value={form.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />

        <textarea
          name="address"
          placeholder="House / Street / Area"
          className="w-full p-3 border rounded-xl"
          rows="2"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          className="w-full p-3 border rounded-xl"
          value={form.city}
          onChange={handleChange}
          required
        />

        <input
          name="state"
          placeholder="State"
          className="w-full p-3 border rounded-xl"
          value={form.state}
          onChange={handleChange}
          required
        />

        <input
          name="pincode"
          placeholder="Pincode"
          className="w-full p-3 border rounded-xl"
          value={form.pincode}
          onChange={handleChange}
          pattern="[0-9]{6}"
          required
        />

        <input
          name="landmark"
          placeholder="Landmark (optional)"
          className="w-full p-3 border rounded-xl"
          value={form.landmark}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Address"}
        </button>

        {success && <p className="text-green-600 text-center">{success}</p>}
      </form>
    </div>
  );
};

export default AddressForm;
