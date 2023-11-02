import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button/button";
import { cardFormSchema } from "@/components/cart/validation-card";

type FormData = z.infer<typeof cardFormSchema>;

function CardForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(cardFormSchema),
  });
  const onSubmit = async (data: FormData, event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    // Check for validation errors
    const isValid = await form.trigger();

    if (isValid) {
      console.log(data); // Data is valid, you can submit it or perform further actions
    }
  };

  return (
    <div className="p-5 bg-gray-800 rounded overflow-visible w-[340px] mx-auto">
      <div className="text-xl font-medium text-gray-100 block pb-3">
        Card Details
      </div>
      <div className="text-xs text-gray-400">Card Type</div>
      <div className="overflow-visible flex justify-between items-center mt-2">
        <div className="rounded w-36 h-30 bg-gray-500 py-2 px-3 relative right-6">
          <div className="italic text-lg font-medium text-gray-200 underline">
            VISA
          </div>
          <div className="flex justify-between items-center pt-3">
            <div className="text-xs text-gray-200 font-medium">****</div>
            <div className="text-xs text-gray-200 font-medium">****</div>
            <div className="text-xs text-gray-200 font-medium">****</div>
            <div className="text-xs text-gray-200 font-medium">****</div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-gray-200">Giga Tamarashvili</div>
            <div className="text-xs text-gray-200">12/18</div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col">
          <img
            src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
            width="36"
            className="relative right-5"
            alt="Mastercard"
          />
          <div className="text-xs font-medium text-gray-200 bottom-2 relative right-5">
            mastercard.
          </div>
        </div>
      </div>
      <div>
      <Form {...form}>
        <form className="space-y-4 max-w-sm w-full">
          <div className="flex flex-col pt-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Full Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Giga Tamarashvili" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Card Number </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="****     ****      ****      ****"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
                <div className="grid grid-cols-1 gap-1">
            <span>Expiration Date</span>
            <div className="flex flex-start">  
              <div className="">
                <FormField
                  control={form.control}
                  name="expirationDate.month"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-[50px]" placeholder="MM" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <div className="">
                <FormField
                  control={form.control}
                  name="expirationDate.year"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-[60px] ml-5" placeholder="YYYY" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> CVV </FormLabel>
                    <FormControl>
                      <Input className="w-[50px]" placeholder="XXX" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>
            <div className="space-y-2">
            <Button type="submit" onClick={(e) => onSubmit(form.getValues(), e)}>
        Submit
      </Button>
            </div>
          </div>
        </form>
      </Form>
            
      </div>
    </div>
  );
}

export default CardForm;
