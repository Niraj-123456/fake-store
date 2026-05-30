import { addShippingAddress, updateShippingAddress } from "@/app/api/shipping";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "ui/lib/components/ui/button";
import { Input } from "ui/lib/components/ui/input";
import { Label } from "ui/lib/components/ui/label";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import CircularLoading from "ui/lib/components/loading/circular-loading/circular-loading";
import { ShippingAddress } from "./SavedShippingAddressList";
import { useQueryClient } from "react-query";

const ShippingForm = ({
  editingAddress,
  onCancelEdit,
}: {
  editingAddress?: ShippingAddress | null;
  onCancelEdit?: () => void;
}) => {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const initialFormState = {
    title: "HOME",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetName: "",
    city: "",
    country: "",
    zipCode: "",
  };

  const [shippingAddress, setShippinAddress] = useState(initialFormState);

  useEffect(() => {
    if (editingAddress) {
      setShippinAddress({
        title: editingAddress.title || "HOME",
        firstName: editingAddress.firstName || "",
        lastName: editingAddress.lastName || "",
        email: editingAddress.email || "",
        phoneNumber: editingAddress.phoneNumber?.toString() || "",
        streetName: editingAddress.streetName || "",
        city: editingAddress.city || "",
        country: editingAddress.country || "",
        zipCode: editingAddress.zipCode?.toString() || "",
      });
    } else {
      setShippinAddress(initialFormState);
    }
  }, [editingAddress]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setShippinAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippinAddress((prev) => ({
      ...prev,
      title: e.target.value.toUpperCase(),
    }));
  };

  const handleSubmitShippingAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...shippingAddress,
        userId,
        phoneNumber: Number(shippingAddress?.phoneNumber),
        zipCode: Number(shippingAddress?.zipCode),
        _id: editingAddress?._id,
      };

      const res = editingAddress
        ? await updateShippingAddress(payload)
        : await addShippingAddress(payload);

      if (res.status === 201 || res.status === 200) {
        toast.success(
          `Shipping address ${editingAddress ? "updated" : "added"} successfully`,
        );
        queryClient.invalidateQueries("shipping");
        if (editingAddress) {
          onCancelEdit?.();
        } else {
          setShippinAddress(initialFormState);
        }
      } else {
        toast.error(
          `Unable to ${editingAddress ? "update" : "add"} shipping address. Please try again later`,
        );
      }
    } catch (ex) {
      console.log("error", ex);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitShippingAddress}
      id="shippingForm"
      className="mt-4 flex flex-col gap-6"
    >
      {editingAddress && (
        <div className="flex">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancelEdit}
            className="text-xs"
          >
            Cancel Edit
          </Button>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={shippingAddress?.firstName}
            onChange={handleChange}
            className="w-full p-3.5 h-12 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={shippingAddress?.lastName}
            onChange={handleChange}
            className="w-full p-3.5 h-12 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="johndoe@gmail.com"
          value={shippingAddress?.email}
          onChange={handleChange}
          className="w-full p-3.5 h-12 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={shippingAddress?.phoneNumber}
          onChange={handleChange}
          className="w-full p-3.5 h-12 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
          Street Name
        </Label>
        <Input
          id="streetName"
          name="streetName"
          value={shippingAddress?.streetName}
          onChange={handleChange}
          className="w-full p-3.5 h-12 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
          City
        </Label>
        <Input
          id="city"
          name="city"
          value={shippingAddress?.city}
          onChange={handleChange}
          className="w-full p-3.5 h-12 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            value={shippingAddress?.country}
            onChange={handleChange}
            className="w-full p-3.5 h-12 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
            Zip Code
          </Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={shippingAddress?.zipCode}
            onChange={handleChange}
            className="w-full p-3.5 h-12 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase ml-1">
          Select a label for effective delivery
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <label className="relative cursor-pointer group">
            <input
              type="radio"
              name="address_label"
              value="home"
              className="peer hidden"
              checked={shippingAddress?.title === "HOME"}
              onChange={handleLabelChange}
            />

            <div
              className="flex items-center justify-center gap-3 py-4 px-6 border-2 border-slate-100 rounded-2xl bg-white transition-all 
                            peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:shadow-lg peer-checked:shadow-orange-500/10
                            group-hover:border-slate-200"
            >
              <svg
                className="w-5 h-5 text-slate-400 peer-checked:text-orange-500 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>

              <span className="text-xs font-black uppercase tracking-widest text-slate-600">
                Home
              </span>
            </div>
          </label>

          <label className="relative cursor-pointer group">
            <input
              type="radio"
              name="address_label"
              value="office"
              className="peer hidden"
              checked={shippingAddress?.title === "OFFICE"}
              onChange={handleLabelChange}
            />

            <div
              className="flex items-center justify-center gap-3 py-4 px-6 border-2 border-slate-100 rounded-2xl bg-white transition-all 
                            peer-checked:border-cyan-500 peer-checked:bg-cyan-50 peer-checked:shadow-lg peer-checked:shadow-cyan-500/10
                            group-hover:border-slate-200"
            >
              <svg
                className="w-5 h-5 text-slate-400 peer-checked:text-cyan-500 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>

              <span className="text-xs font-black uppercase tracking-widest text-slate-600">
                Office
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          className="w-full h-14 rounded-2xl text-base tracking-wider"
          disabled={submitting}
        >
          {editingAddress ? "Update Address" : "Save Address"}
          {submitting && (
            <CircularLoading
              width={"1.5rem"}
              thickness={4}
              color="#fff"
              style={{ marginLeft: "10px" }}
            />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ShippingForm;
