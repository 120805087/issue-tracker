"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<FormData>();
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
      </div>
      <Button>Create Issue</Button>
    </form>
  );
};

export default NewIssuePage;
