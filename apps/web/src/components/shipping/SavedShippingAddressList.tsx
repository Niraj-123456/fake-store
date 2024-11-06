import { useState } from "react";
import { Circle, Plus } from "lucide-react";
import { cn } from "ui/lib/utils";
import { Button } from "ui/components/ui/button";
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
} from "ui/components/ui/dialog";

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
    }
  );

  const handleClickAddNewBtn = () => {
    const shippingForm = document.getElementById("shippingForm");
    if (!shippingForm) return;
    const firstNameInputField = shippingForm.querySelector(
      "#firstName"
    ) as HTMLInputElement;
    if (!firstNameInputField) return;
    firstNameInputField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstNameInputField.focus();
  };

  /* shipping address delete mutation */
  const mutation = useMutation((shippingId: string | undefined) =>
    deleteShippingAddress(shippingId!)
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
    <div className="w-full">
      <h4 className="text-lg font-medium text-gray-700">
        Saved Shipping Address
      </h4>
      <div className="grid grid-cols-2 items-center gap-4 w-full mt-2">
        {shippingAddressList?.map((shippingAddress: ShippingAddress) => (
          <div
            key={shippingAddress?._id}
            onClick={() => onChangeShippingAddress(shippingAddress)}
            className={cn(
              "w-full max-w-xs h-full border p-4 rounded-md relative text-[0.8125rem] text-gray-700 mt-2 cursor-pointer hover:outline hover:outline-2 hover:outline-blue-600 group",
              shippingAddress?._id === selectedAddress?._id
                ? "outline outline-2 outline-blue-600"
                : ""
            )}
          >
            <p className="max-w-48 line-clamp-2 text-sm">
              {shippingAddress?.streetName}, {shippingAddress?.city},{" "}
              {shippingAddress?.zipCode}, {shippingAddress?.country}
            </p>
            <p className="text-gray-600">{shippingAddress?.phoneNumber}</p>
            <p className="text-gray-600">{shippingAddress?.email}</p>
            <Circle
              className={cn(
                "w-4 h-4 absolute top-5 right-4",
                shippingAddress?._id === selectedAddress?._id
                  ? "stroke-blue-600"
                  : ""
              )}
            />

            <Circle
              className={cn(
                "w-2 h-2 absolute top-6 right-5 fill-blue-600",
                shippingAddress?._id === selectedAddress?._id
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />

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
                      your shipping address and remove your data from our
                      servers.
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
                              "Shipping Address deleted successfully."
                            );
                          },
                          onError: () => {
                            toast.error(
                              "Error occured while deleting shipping address. Please try again later."
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
    </div>
  );
};

export default SavedShippingAddressList;
