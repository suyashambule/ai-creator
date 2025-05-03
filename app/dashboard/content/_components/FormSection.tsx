"use client";
import React, { useState } from "react";
import { TEMPLATE, FORM } from "../../_components/TemplateListsection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface FormData {
  [key: string]: string;
}

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (data: FormData) => void;
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<FormData>({});

  const handleonChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const Onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    userFormInput(formData);
  };

  return (
    <div>
      <div className="p-5 shadow-md border rounded-lg">
        {selectedTemplate?.icon && (
          <img
            src={selectedTemplate.icon}
            alt="icon"
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <h2 className="text-[#7C3AED] text-2xl font-bold">
          {selectedTemplate?.name}
        </h2>
        <p className="text-gray-700">{selectedTemplate?.desc}</p>

        <form
          className="mt-6 p-5 shadow-md border rounded-lg"
          onSubmit={Onsubmit}
        >
          {(selectedTemplate?.form ?? []).map((item: FORM, index: number) => (
            <div key={index} className="space-y-2 flex flex-col gap-2 mb-7">
              <label className="font-bold" htmlFor={item.name}>
                {item.label}
              </label>
              {item.field === "input" ? (
                <Input
                  name={item.name}
                  required={item.required}
                  onChange={handleonChange}
                  value={formData[item.name] || ""}
                />
              ) : item.field === "textarea" ? (
                <Textarea
                  name={item.name}
                  required={item.required}
                  onChange={handleonChange}
                  value={formData[item.name] || ""}
                />
              ) : null}
            </div>
          ))}
          <Button
            type="submit"
            className="w-full bg-[#7C3AED] py-6"
            disabled={loading}
          >
            {loading && <Loader2Icon className="animate-spin" />}Generate
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormSection;
