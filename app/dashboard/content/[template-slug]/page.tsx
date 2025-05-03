"use client";
import React, { use } from "react";
import templatesList from "@/app/(data)/Template";
import FormSection from "../_components/FormSection";
import { TEMPLATE } from "../../_components/TemplateListsection";
import Template from "@/app/(data)/Template";
import OutputSection from "../_components/OutputSection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/AImodel";

interface PROPS {
  params: Promise<{
    "template-slug": string;
  }>;
}

export default function Page({ params }: PROPS) {
  const unwrappedParams = use(params);

  const selectedTemplate = Template.find(
    (item) => item.slug === unwrappedParams["template-slug"]
  );
  const [loading,Setloading] = React.useState(false);
  const GeneratedAIcontent = async (formData: any) => {
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const Final_ai_prompt = JSON.stringify(formData) + "," + SelectedPrompt;
    const result = await chatSession.generate(Final_ai_prompt);
    console.log(result.response.text());
    Setloading(false);
  };

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
          userFormInput={(v: any) => GeneratedAIcontent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection />
        </div>
      </div>
    </div>
  );
}
