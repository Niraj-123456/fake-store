import { addShippingAddress } from "@/app/api/shipping";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "ui/lib/components/ui/button";
import { Input } from "ui/lib/components/ui/input";
import { Label } from "ui/lib/components/ui/label";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import CircularLoading from "ui/lib/components/loading/circular-loading/circular-loading";

const ShippingForm = () => {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const [submitting, setSubmitting] = useState(false);
  const [shippingAddress, setShippinAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetName: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setShippinAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitShippingAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await addShippingAddress({
        ...shippingAddress,
        userId,
        phoneNumber: Number(shippingAddress?.phoneNumber),
        zipCode: Number(shippingAddress?.zipCode),
      });

      if (res.status === 201) {
        toast.success("Shipping address added successfully");
      } else {
        toast.error("Unable to add shipping address. Please try again later");
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
      className="mt-4 flex flex-col gap-4"
    >
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-2 w-full">
          <Label>First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={shippingAddress?.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={shippingAddress?.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          id="email"
          name="email"
          value={shippingAddress?.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={shippingAddress?.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Street Name</Label>
        <Input
          id="streetName"
          name="streetName"
          value={shippingAddress?.streetName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>City</Label>
        <Input
          id="city"
          name="city"
          value={shippingAddress?.city}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-full">
          <Label>Country</Label>
          <Input
            id="country"
            name="country"
            value={shippingAddress?.country}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Zip Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={shippingAddress?.zipCode}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-2">
        <Button type="submit" className="w-full" disabled={submitting}>
          Add Shipping Information
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
