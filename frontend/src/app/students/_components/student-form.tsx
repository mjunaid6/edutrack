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
import type { Student } from "@/lib/data/types";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  department: z.string().min(2, "Department is required."),
});

type StudentFormValues = z.infer<typeof formSchema>;

interface StudentFormProps {
  initialData?: Student | null;
  onSuccess: () => void;
}

export function StudentForm({ initialData, onSuccess }: StudentFormProps) {
  const { toast } = useToast();
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    },
  });

  const onSubmit = async (data: StudentFormValues) => {
    // Here you would typically call an API to save the data
    console.log(data);
    
    toast({
      title: initialData ? "Student Updated" : "Student Created",
      description: `${data.firstName} ${data.lastName}'s record has been saved.`,
    });
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
            <Button type="submit">
                {initialData ? "Save Changes" : "Create Student"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
