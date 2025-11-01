"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/data/types";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  courseName: z.string().min(2, "Course name must be at least 2 characters."),
  courseCode: z.string().min(2, "Course code is required."),
  credits: z.coerce.number().min(1, "Credits must be at least 1."),
});

type CourseFormValues = z.infer<typeof formSchema>;

interface CourseFormProps {
  initialData?: Course | null;
  onSuccess: () => void;
}

export function CourseForm({ initialData, onSuccess }: CourseFormProps) {
  const { toast } = useToast();
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      courseName: "",
      courseCode: "",
      credits: 0,
    },
  });

  const onSubmit = async (data: CourseFormValues) => {
    // Here you would typically call an API to save the data
    console.log(data);
    
    toast({
      title: initialData ? "Course Updated" : "Course Created",
      description: `Course ${data.courseCode} has been saved.`,
    });
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Introduction to Programming" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="courseCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="CS101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credits</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className="flex justify-end">
            <Button type="submit">
                {initialData ? "Save Changes" : "Create Course"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
