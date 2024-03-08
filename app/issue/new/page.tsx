"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validateSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// disable ssr loading
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// zod 提供的方法，可以将 schema 转为 ts type
type FormData = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/api/issue", data);
      router.push("/issue");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "接口请求出错了",
      });
    }
  };
  return (
    <form
      className="w-full max-w-xl flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        <Input type="text" placeholder="title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </div>
      <div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              spellCheck={false}
              placeholder="description"
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </div>
      <Button disabled={isSubmitting}>
        Create Issue {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default NewIssuePage;
