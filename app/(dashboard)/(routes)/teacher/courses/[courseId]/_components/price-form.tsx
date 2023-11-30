"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    price: z.coerce.number(),
});

export const PriceForm = ({
    initialData,
    courseId
}: PriceFormProps) => {
   const [isEditing, setIsEditing] = useState(false);

   const toggleEdit = () => setIsEditing((current) => !current);
   
   const router = useRouter();
    
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
   });

   const { isSubmitting, isValid } = form.formState;

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong")
    }
   }

    return (
      <div className="p-4 mt-6 border rounded-md bg-slate-100">
        <div className="flex items-center justify-between font-medium">
          Course price
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
            <p className={cn(
              "text-sm mt-2",
              !initialData.price && "text-slate-500 italic"
            )}>
                {initialData.price
                  ? formatPrice(initialData.price)
                  : "No price"
                }
            </p>
        )}
        {isEditing && (
            <Form {...form}>
                <form
                  onSubmit= {form.handleSubmit(onSubmit)}
                  className="mt-4 space-y-4"
                >
                    <FormField 
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                type="number"
                                step="0.01"
                                disabled={isSubmitting}
                                placeholder="Set a price for your course"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage / >
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center gap-x-2">
                      <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                </form>
            </Form>
        )}
      </div>
    );
}