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
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { ChaptersList } from "./chapters-list";

interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(1),
});

export const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {
   const [isCreating, setIsCreating] = useState(false); 
   const [isUpdating, setIsUpdating] = useState(false);

   const toggleCreating = () => {setIsCreating((current) => !current);}
   
   const router = useRouter();
    
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
   });

   const { isSubmitting, isValid } = form.formState;

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong")
    }
   }

   const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
   }

   const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
   }

    return (
      <div className="relative p-4 mt-6 border rounded-md bg-slate-100">
        {isUpdating && (
          <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full rounded-m bg-slate-500/20">
            <Loader2 className="w-6 h-6 animate-spin text-sky-700" />
          </div>
        )}
        <div className="flex items-center justify-between font-medium">
          Course chapters
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add a Chapter
              </>
            )}
          </Button>
        </div>
        {isCreating && (
            <Form {...form}>
                <form
                  onSubmit= {form.handleSubmit(onSubmit)}
                  className="mt-4 space-y-4"
                >
                    <FormField 
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  placeholder="e.g. 'Introduction to the course'"
                                  {...field}
                                />
                            </FormControl>
                            <FormMessage / >
                        </FormItem>
                      )}
                    />
                      <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                      >
                        Create
                      </Button>
                </form>
            </Form>
        )}
        {!isCreating && (
          <div className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}>
            {!initialData.chapters.length && "No chapters"}
            <ChaptersList 
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.chapters || []}
            />
          </div>
        )}
        {!isCreating && (
          <p className="mt-4 text-xs text-muted-foreground">
            Drag and drop to reorder the chapters
          </p>
        )}
      </div>
    );
}