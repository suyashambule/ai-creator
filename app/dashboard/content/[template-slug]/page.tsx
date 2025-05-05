"use client";
import React, { useState, useEffect } from "react";
import Template from "@/app/(data)/Template";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/AImodel";
import { useRouter, useParams } from "next/navigation";
import { ChatSession } from "@google/generative-ai";
import { db } from "@/utils/db";
import { AIoutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

interface FormData {
  [key: string]: string;
}

interface AIResponse {
  response: {
    text: () => Promise<string>;
  };
}

export default function Page() {
  const { user } = useUser();
  const params = useParams();
  const templateSlug = params["template-slug"] as string;
  const selectedTemplate = Template.find((item) => item.slug === templateSlug);

  const [aiResponse, setAIResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const GeneratedAIcontent = async (formData: FormData) => {
    if (!selectedTemplate) return;

    setLoading(true);
    const SelectedPrompt = selectedTemplate.aiPrompt;
    const Final_ai_prompt = JSON.stringify(formData) + "," + SelectedPrompt;

    try {
      const result = await (chatSession as ChatSession).sendMessage(Final_ai_prompt);
      const text = await result.response.text();
      console.log(text);
      setAIResponse(text);
      await SaveInDb(formData, selectedTemplate?.slug, text);
    } catch (error) {
      console.error("AI generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb=async(formData:any,slug:any,aiResp:string)=>{
    const result =await db.insert(AIoutput).values({
      formData: JSON.stringify(formData),
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous@user.com',
      createdAt: new Date()
    })
    console.log(result);
  }

  return (
    <div>
      <div>
        <Link href="/dashboard" className="inline-block">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={GeneratedAIcontent}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiResponse={aiResponse} />
        </div>
      </div>
    </div>
  );
}
