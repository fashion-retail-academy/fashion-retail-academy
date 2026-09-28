"use client";

import { useState } from "react";

type Template = {
  id: string;
  title: string;
  description: string;
  price: number;
  file_name: string | null;
  file_path: string | null;
  published: boolean;
};

export default function TemplatesManager({
  initialTemplates,
}: {
  initialTemplates: Template[];
}) {
  const [templates, setTemplates] = useState(initialTemplates);
  const [busy, setBusy] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function createTemplate() {
    if (!title.trim()) {
      alert("Enter a template name.");
      return;
    }

    setBusy(true);

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("price", price || "0");

    if (file) {
      form.append("file", file);
    }

    const response = await fetch("/api/admin/templates", {
      method: "POST",
      body: form,
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Unable to create template.");
      setBusy(false);
      return;
    }

    setTemplates([...templates, result]);
    setTitle("");
    setDescription("");
    setPrice("");
    setFile(null);

    const input = document.getElementById("new-template-file") as HTMLInputElement;
    if (input) input.value = "";

    setBusy(false);
  }

  async function editTemplate(template: Template) {
    const newTitle = window.prompt("Template name:", template.title);
    if (newTitle === null) return;

    const newDescription = window.prompt(
      "Description:",
      template.description
    );
    if (newDescription === null) return;

    const newPrice = window.prompt(
      "Price in INR:",
      String(template.price)
    );
    if (newPrice === null) return;

    const form = new FormData();
    form.append("title", newTitle);
    form.append("description", newDescription);
    form.append("price", newPrice);

    setBusy(true);

    const response = await fetch(`/api/admin/templates/${template.id}`, {
      method: "PATCH",
      body: form,
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Unable to update template.");
      setBusy(false);
      return;
    }

    setTemplates(
      templates.map((item) =>
        item.id === template.id ? result : item
      )
    );

    setBusy(false);
  }

  async function replaceFile(template: Template, selected: File) {
    const form = new FormData();
    form.append("title", template.title);
    form.append("description", template.description);
    form.append("price", String(template.price));
    form.append("file", selected);

    setBusy(true);

    const response = await fetch(`/api/admin/templates/${template.id}`, {
      method: "PATCH",
      body: form,
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Unable to upload file.");
      setBusy(false);
      return;
    }

    setTemplates(
      templates.map((item) =>
        item.id === template.id ? result : item
      )
    );

    setBusy(false);
  }

  async function deleteTemplate(template: Template) {
    if (!confirm(`Delete "${template.title}"?`)) return;

    setBusy(true);

    const response = await fetch(`/api/admin/templates/${template.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const result = await response.json();
      alert(result.error || "Unable to delete template.");
      setBusy(false);
      return;
    }

    setTemplates(templates.filter((item) => item.id !== template.id));
    setBusy(false);
  }

  return (
    <div className="mt-10 space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Create New Template</h2>

        <div className="mt-6 grid gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Template name"
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in INR"
            type="number"
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <input
            id="new-template-file"
            type="file"
            accept=".xlsx,.xls,.csv,.xlsm"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <button
            onClick={createTemplate}
            disabled={busy}
            className="rounded-lg bg-[#0b1026] px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            {busy ? "Saving..." : "Create Template"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Existing Templates</h2>

        <div className="mt-6 space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-xl border border-slate-200 p-6"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold">{template.title}</h3>

                  <p className="mt-2 text-slate-600">
                    {template.description}
                  </p>

                  <p className="mt-2 text-lg font-bold">
                    ₹{Number(template.price).toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {template.file_name
                      ? `File: ${template.file_name}`
                      : "No Excel file uploaded"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => editTemplate(template)}
                    className="rounded-lg bg-[#0b1026] px-4 py-2 font-semibold text-white"
                  >
                    Edit
                  </button>

                  <label className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 font-semibold">
                    Replace Excel
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv,.xlsm"
                      className="hidden"
                      onChange={(e) => {
                        const selected = e.target.files?.[0];
                        if (selected) replaceFile(template, selected);
                      }}
                    />
                  </label>

                  <a
                    href={`/templates/${template.id}`}
                    className="rounded-lg border border-slate-300 px-4 py-2 font-semibold"
                  >
                    View
                  </a>

                  <button
                    onClick={() => deleteTemplate(template)}
                    className="rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {templates.length === 0 && (
            <p className="text-slate-500">
              No templates yet. Create your first template above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}