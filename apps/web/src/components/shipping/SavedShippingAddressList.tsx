import { useState } from "react";
import { Circle, Plus } from "lucide-react";
import { cn } from "ui/lib/utils";
import { Button } from "ui/lib/components/ui/button";
import {
  deleteShippingAddress,
  getShippingAddressList,
} from "@/app/api/shipping";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/lib/components/ui/dialog";

export type ShippingAddress = {
  _id?: string;
  userId: string;
  email: string;
  phoneNumber: number;
  city: string;
  streetName: string;
  zipCode: number;
  country: string;
};

const SavedShippingAddressList = ({
  selectedAddress,
  onChangeShippingAddress,
}: {
  selectedAddress: ShippingAddress | undefined;
  onChangeShippingAddress: (address: ShippingAddress) => void;
}) => {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const [open, setOpen] = useState(false);

  const {
    data: shippingAddressList,
    isFetching,
    isLoading,
    isError,
  } = useQuery<ShippingAddress[]>(
    "shipping",
    () => getShippingAddressList(userId).then((response) => response?.data),
    {
      enabled: !!userId,
      onSuccess: (data) => {
        onChangeShippingAddress(data[0]);
      },
    },
  );

  const handleClickAddNewBtn = () => {
    const shippingForm = document.getElementById("shippingForm");
    if (!shippingForm) return;
    const firstNameInputField = shippingForm.querySelector(
      "#firstName",
    ) as HTMLInputElement;
    if (!firstNameInputField) return;
    firstNameInputField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstNameInputField.focus();
  };

  /* shipping address delete mutation */
  const mutation = useMutation((shippingId: string | undefined) =>
    deleteShippingAddress(shippingId!),
  );

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isFetching || isLoading) {
    return <div>Loading...</div>;
  }

  if (shippingAddressList?.length === 0) {
    return (
      <div className="w-full border-2 border-dashed rounded-md p-4 text-center">
        <p className="text-gray-600">
          No Shipping Address Found. Please add new one.
        </p>
        <div className="flex justify-center p-2 mt-2">
          <Button size={"sm"} onClick={handleClickAddNewBtn}>
            Add
            <Plus className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 items-center gap-4 w-full mt-2">
      {shippingAddressList?.map((shippingAddress: ShippingAddress) => (
        <div
          key={shippingAddress?._id}
          onClick={() => onChangeShippingAddress(shippingAddress)}
          className={cn(
            "relative p-5 rounded-2xl border-2  bg-blue-50/50 cursor-pointer transition-all",
            shippingAddress?._id === selectedAddress?._id
              ? "border-blue-600"
              : "",
          )}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-slate-900">Home</span>
            <span
              className={cn(
                "w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center transition-all",
                shippingAddress?._id === selectedAddress?._id
                  ? "opacity-100"
                  : "opacity-0",
              )}
            >
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed ">
            <span className="capitalize">
              {shippingAddress?.streetName}, {shippingAddress?.city},
              {shippingAddress?.zipCode}, {shippingAddress?.country}
            </span>
            <br />
            <span>
              {shippingAddress?.phoneNumber} • {shippingAddress?.email}
            </span>
          </p>

          <div className="absolute right-4 bottom-2 flex gap-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <Button
              size={"sm"}
              variant={"link"}
              className="p-0 m-0 text-xs text-blue-500"
            >
              View
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  size={"sm"}
                  variant={"link"}
                  className="p-0 m-0 text-xs text-red-700"
                >
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Shipping Address?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your shipping address and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    onClick={() =>
                      mutation.mutate(shippingAddress?._id, {
                        onSuccess: (data) => {
                          console.log("data", data);
                          setOpen(false);
                          toast.success(
                            "Shipping Address deleted successfully.",
                          );
                        },
                        onError: () => {
                          toast.error(
                            "Error occured while deleting shipping address. Please try again later.",
                          );
                        },
                      })
                    }
                  >
                    Confirm
                  </Button>
                  <DialogClose asChild>
                    <Button variant={"ghost"}>Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedShippingAddressList;
